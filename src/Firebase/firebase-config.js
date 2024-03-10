import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserSessionPersistence, updateProfile } from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyCwUfipp_F0jQK2XRDSdESNI2HeYuEx1IU",
    authDomain: "songify-7a272.firebaseapp.com",
    projectId: "songify-7a272",
    storageBucket: "songify-7a272.appspot.com",
    messagingSenderId: "971802617416",
    appId: "1:971802617416:web:a3a6d5396958a37da15a7d",
    measurementId: "G-QPP7PSS6R5"
};

const app = initializeApp(firebaseConfig);

const auth1 = getAuth(app);
setPersistence(auth1, browserSessionPersistence)
    .then(() => {
    })
    .catch((error) => {
        console.error('Error enabling session persistence:', error);
    });
export const auth = getAuth(app);



const storage = getStorage(app);
// Storage
export async function upload(file, currentUser, setLoading) {
    const fileRef = ref(storage, currentUser.uid + '.png');

    setLoading(true);

    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);

    updateProfile(currentUser, { photoURL });

    setLoading(false);
    alert("Uploaded file!");
}

