
import { initializeApp } from "firebase/app";
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from "firebase/auth";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_apiKey,
	authDomain: process.env.REACT_APP_authDomain,
	projectId: process.env.REACT_APP_projectId,
	storageBucket: process.env.REACT_APP_storageBucket,
	messagingSenderId: process.env.REACT_APP_messagingSenderId,
	appId: process.env.REACT_APP_appId,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const registerUser = async (email, password, displayName) => {
  try { 
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {displayName})
    console.log(auth.currentUser);
  }
  catch (err) { 
    return err.message.replace('Firebase:', '');
  }

}

export const login = async (email, password) => {
  try {
  await signInWithEmailAndPassword(auth, email, password);
    
  } catch (err) { 
    return err.message.replace("Firebase:", "");
  }
}


export const userObserver = (setCurrentUser) => { 
  onAuthStateChanged(auth, (user) => { 
    if (user) setCurrentUser(user)
    else setCurrentUser(null)
  })
} 

export const logout = () => { 
  signOut(auth);
}

export const signUpProvider = async() => { 
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
}


export const forgotPassword = async(email) => { 
  console.log('Forgot password')
  try {
    await sendPasswordResetEmail(auth, email);
    return 'Please check your mail box !'
  } catch (err) { 
    console.log(err)
    return err.message.replace("Firebase:", "");
  }
}

