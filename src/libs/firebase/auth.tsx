import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const getFirebaseAuth = () => {
    const {
        REACT_APP_FIREBASE_API_KEY,
        REACT_APP_FIREBASE_PROJECT_ID,
        REACT_APP_FIREBASE_APP_ID,
        REACT_APP_FIREBASE_DB_URL,
    } = process.env;

    const app = initializeApp({
        apiKey: REACT_APP_FIREBASE_API_KEY,
        authDomain: `${REACT_APP_FIREBASE_PROJECT_ID}.firebaseapp.com`,
        databaseURL: REACT_APP_FIREBASE_DB_URL,
        projectId: REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: `${REACT_APP_FIREBASE_PROJECT_ID}.appspot.com`,
        appId: REACT_APP_FIREBASE_APP_ID,
    });
    return getAuth(app);
};

export default getFirebaseAuth;
