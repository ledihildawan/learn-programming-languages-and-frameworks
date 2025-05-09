import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  setDoc,
  writeBatch,
  query,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDLWrBAhfplyfZobjRXQpV9moar3_7wtJ4',
  authDomain: 'dev-minergo-systems.firebaseapp.com',
  projectId: 'dev-minergo-systems',
  storageBucket: 'dev-minergo-systems.appspot.com',
  messagingSenderId: '889991387842',
  appId: '1:889991387842:web:232cdf331a32a77f50f95b',
  measurementId: 'G-GP76R9088B',
  databaseURL: 'https://DATABASE_NAME.firebaseio.com',
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const credentialFromResultGoogle = (result) =>
  GoogleAuthProvider.credentialFromResult(result);

export async function createUserDocumentFromAuth(
  userAuth,
  additionalInformation = {}
) {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('Error creating the user ', error.message);
    }
  }

  return userDocRef;
}

export async function addCollecitonAndDocuments(collectionKey, objectsToAdd) {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());

    batch.set(docRef, object);
  });

  await batch.commit();

  console.log('done');
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export async function createAuthUserWithEmailAndPassword(
  email: string,
  password: string
) {
  if (!email || !password) {
    return;
  }

  return await createUserWithEmailAndPassword(auth, email, password);
}

export async function signInAuthUserWithEmailAndPassword(
  email: string,
  password: string
) {
  if (!email || !password) {
    return;
  }

  return await signInWithEmailAndPassword(auth, email, password);
}

export async function signOutUser() {
  return await signOut(auth);
}

export function onAuthStateChangedListener(callback: () => void) {
  return onAuthStateChanged(auth, callback);
}
