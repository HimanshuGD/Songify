import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserSessionPersistence, updateProfile } from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";



const firebaseConfig = {
    apiKey: "YOUR",
    authDomain: "YOUR",
    projectId: "YOUR",
    storageBucket: "YOUR",
    messagingSenderId: "YOUR",
    appId: "YOUR",
    measurementId: "YOUR"
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

