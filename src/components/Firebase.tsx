import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";


// Your web app's Firebase configuration
console.log(import.meta.env.VITE_FIREBASE_APIKEY)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//google auth provider
const provider = new GoogleAuthProvider()

//google auth flow
const auth = getAuth()

export const authWithGoogleFn = async () => {
    let user = null;

    await signInWithPopup(auth, provider)
    .then((result) => {
        user = result.user
    })
    .catch((err) => {
        console.log(`Error occured while signing in with google ${err}`)
    })

    return user
}
