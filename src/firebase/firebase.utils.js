import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDeZ_Vb6Ab7UwYyfGWVmZ2NHpxSLRbZEKg",
    authDomain: "crown-clothing-9da5c.firebaseapp.com",
    databaseURL: "https://crown-clothing-9da5c.firebaseio.com",
    projectId: "crown-clothing-9da5c",
    storageBucket: "crown-clothing-9da5c.appspot.com",
    messagingSenderId: "554375714073",
    appId: "1:554375714073:web:0584314e57e576494ee188",
    measurementId: "G-FF0QY9SM31"
};

export const createUserProfileDocument = async (userAuth, additionalData ) => {
    if (!userAuth) {
        return;
    }
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user!!!', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;