import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore, collection, doc, getDoc, getDocs,
  setDoc, addDoc, updateDoc, deleteDoc,
  query, where, orderBy, limit, serverTimestamp,
} from "firebase/firestore";
import {
  getAuth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
  ActionCodeSettings,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// ── EMAIL LINK AUTH ──
export function getActionCodeSettings(): ActionCodeSettings {
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return {
    url: `${baseUrl}/sign-in`,
    handleCodeInApp: true,
  };
}

export async function sendEmailLink(email: string) {
  await sendSignInLinkToEmail(auth, email, getActionCodeSettings());
  if (typeof window !== "undefined") {
    window.localStorage.setItem("emailForSignIn", email);
  }
}

export async function completeEmailSignIn(email: string, href: string) {
  if (!isSignInWithEmailLink(auth, href)) throw new Error("Invalid sign-in link");
  const result = await signInWithEmailLink(auth, email, href);
  window.localStorage.removeItem("emailForSignIn");
  const uid = result.user.uid;
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);
  if (!snap.exists()) {
    await setDoc(userRef, {
      email: result.user.email,
      credits: 5,       // Free plan: 5 lifetime credits (matches paywall)
      plan: "free",
      createdAt: serverTimestamp(),
    });
  }
  return result.user;
}

export function checkIsEmailLink(href: string) {
  return isSignInWithEmailLink(auth, href);
}

export async function signOut() {
  await firebaseSignOut(auth);
}

export { onAuthStateChanged, type User };

// ── PLAN LIMITS ──
export interface PlanLimits {
  plan: string;
  maxResumes: number;
  maxPortfolios: number;
  unlimitedCredits: boolean;
  creditsPerMonth: number;
  canUse3DTemplates: boolean;
  canDownloadHTML: boolean;
  hasWatermark: boolean;
  priorityAI: boolean;
}

export function getPlanLimits(plan: string): PlanLimits {
  switch (plan) {
    case "pro":
      return { plan, maxResumes: -1, maxPortfolios: -1, unlimitedCredits: false, creditsPerMonth: 50, canUse3DTemplates: false, canDownloadHTML: true, hasWatermark: false, priorityAI: false };
    case "elite":
      return { plan, maxResumes: -1, maxPortfolios: -1, unlimitedCredits: true, creditsPerMonth: 99999, canUse3DTemplates: true, canDownloadHTML: true, hasWatermark: false, priorityAI: true };
    case "lifetime":
      return { plan, maxResumes: -1, maxPortfolios: -1, unlimitedCredits: true, creditsPerMonth: 99999, canUse3DTemplates: true, canDownloadHTML: true, hasWatermark: false, priorityAI: true };
    default:
      return { plan: "free", maxResumes: 2, maxPortfolios: 1, unlimitedCredits: false, creditsPerMonth: 5, canUse3DTemplates: false, canDownloadHTML: false, hasWatermark: true, priorityAI: false };
  }
}

// ── RESUMES ──
export async function saveResume(uid: string, data: Record<string, unknown>) {
  const payload = { ...data, userId: uid, updatedAt: serverTimestamp() };
  if (data.id) {
    await setDoc(doc(db, "resumes", data.id as string), payload, { merge: true });
    return data.id as string;
  } else {
    const ref = await addDoc(collection(db, "resumes"), {
      ...payload, createdAt: serverTimestamp(), downloads: 0,
    });
    return ref.id;
  }
}

export async function getUserResumes(uid: string) {
  try {
    const q = query(collection(db, "resumes"), where("userId", "==", uid), orderBy("updatedAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch {
    const q2 = query(collection(db, "resumes"), where("userId", "==", uid));
    const snap2 = await getDocs(q2);
    return snap2.docs.map((d) => ({ id: d.id, ...d.data() })).sort((a: Record<string, unknown>, b: Record<string, unknown>) => {
      const at = (a.updatedAt as { seconds?: number })?.seconds ?? 0;
      const bt = (b.updatedAt as { seconds?: number })?.seconds ?? 0;
      return bt - at;
    });
  }
}

export async function getResume(id: string) {
  const snap = await getDoc(doc(db, "resumes", id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function deleteResume(id: string) {
  await deleteDoc(doc(db, "resumes", id));
}

// ── ATS HISTORY ──
export async function saveATSScore(uid: string, score: number, role: string) {
  await addDoc(collection(db, "atsHistory"), { userId: uid, score, role, createdAt: Date.now() });
}

export async function getATSHistory(uid: string, n = 8) {
  try {
    const q = query(collection(db, "atsHistory"), where("userId", "==", uid), orderBy("createdAt", "asc"), limit(n));
    const snap = await getDocs(q);
    return snap.docs.map((d) => d.data());
  } catch {
    const q2 = query(collection(db, "atsHistory"), where("userId", "==", uid), limit(n));
    const snap2 = await getDocs(q2);
    return snap2.docs.map((d) => d.data());
  }
}

// ── PORTFOLIOS ──
export async function savePortfolio(uid: string, data: Record<string, unknown>) {
  const payload = { ...data, userId: uid, updatedAt: serverTimestamp() };
  if (data.id) {
    await setDoc(doc(db, "portfolios", data.id as string), payload, { merge: true });
    return data.id as string;
  } else {
    const ref = await addDoc(collection(db, "portfolios"), { ...payload, createdAt: serverTimestamp() });
    return ref.id;
  }
}

export async function getUserPortfolios(uid: string) {
  try {
    const q = query(collection(db, "portfolios"), where("userId", "==", uid), orderBy("updatedAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch {
    const q2 = query(collection(db, "portfolios"), where("userId", "==", uid));
    const snap2 = await getDocs(q2);
    return snap2.docs.map((d) => ({ id: d.id, ...d.data() })).sort((a: Record<string, unknown>, b: Record<string, unknown>) => {
      const at = (a.updatedAt as { seconds?: number })?.seconds ?? 0;
      const bt = (b.updatedAt as { seconds?: number })?.seconds ?? 0;
      return bt - at;
    });
  }
}

export async function getPortfolio(id: string) {
  const snap = await getDoc(doc(db, "portfolios", id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function deletePortfolio(id: string) {
  await deleteDoc(doc(db, "portfolios", id));
}

// ── USER CREDITS & PLAN ──
export async function getUserCredits(uid: string) {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) {
    await setDoc(doc(db, "users", uid), { credits: 5, plan: "free", createdAt: serverTimestamp() });
    return { credits: 5, plan: "free" };
  }
  const d = snap.data() as { credits: number; plan: string };
  return { credits: d.credits ?? 5, plan: d.plan ?? "free" };
}

export async function updateUserCredits(uid: string, credits: number) {
  await setDoc(doc(db, "users", uid), { credits }, { merge: true });
}

export async function updateUserPlan(uid: string, plan: string) {
  const creditsMap: Record<string, number> = { free: 5, pro: 50, elite: 99999, lifetime: 99999 };
  await setDoc(doc(db, "users", uid), {
    plan,
    credits: creditsMap[plan] ?? 5,
    planUpdatedAt: serverTimestamp(),
  }, { merge: true });
}

// Deduct 1 credit; returns false if user has 0 credits (and is not elite/lifetime)
export async function deductCredit(uid: string): Promise<boolean> {
  const { credits, plan } = await getUserCredits(uid);
  if (plan === "elite" || plan === "lifetime") return true;
  if (credits < 1) return false;
  await updateUserCredits(uid, credits - 1);
  return true;
}

export { collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc, query, where, orderBy, limit, serverTimestamp };
