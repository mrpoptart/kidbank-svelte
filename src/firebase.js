import {getAnalytics} from "firebase/analytics";
import {
    collection,
    deleteDoc,
    doc,
    getFirestore,
    onSnapshot,
    query,
    setDoc,
    updateDoc,
    where,
    connectFirestoreEmulator,
} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut, connectAuthEmulator} from "firebase/auth";
import {kids, kidsLoading, user} from "./store";
import dayjs from "dayjs";

const firebaseConfig = {
    apiKey: "AIzaSyBy3AS4m3rAnmPuVOBONZDFIEMSzY2InAg",
    authDomain: "dadbank-fcbc6.firebaseapp.com",
    databaseURL: "https://dadbank-fcbc6-default-rtdb.firebaseio.com",
    projectId: "dadbank-fcbc6",
    storageBucket: "dadbank-fcbc6.appspot.com",
    messagingSenderId: "746183158777",
    appId: "1:746183158777:web:22c347402ba0a76a932b28",
    measurementId: "G-79Q150R6KR"
};
const firebaseApp = initializeApp(firebaseConfig);
getAnalytics(firebaseApp);

const provider = new GoogleAuthProvider();
export const auth = getAuth();
auth.useDeviceLanguage();
export let db;
async function init(){
    if(!['', '5000'].includes(window.location.port)){
        connectAuthEmulator(auth, "http://localhost:9092");
        db = getFirestore();
        connectFirestoreEmulator(db, 'localhost', 8000);
    } else{
// Initialize Firebase
        db = getFirestore(firebaseApp);
    }
}

export const logout = async () => {
    await signOut(auth)
};
export const login = async () => {
    try {
        const result = await signInWithPopup(auth, provider)
        user.set(result.user);
    } catch (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error({
            errorCode,
            errorMessage,
            email,
            credential
        })
    }
};

export const set = async (document, value) => {
    await setDoc(doc(db, 'children', document), value)
}

export const update = async (document, value) => {
    await updateDoc(doc(db, 'children', document), value)
}

export const remove = async (document) => {
    await deleteDoc(doc(db, 'children', document))
}

function getKids(user) {
    let q = query(collection(db, 'children'), where("parents", "array-contains", user.email))
    onSnapshot(q, async (children) => {
        let kidsObj = {};
        for (let childId in children.docs) {
            kidsObj[childId] = await children.docs[childId].data();
            kidsObj[childId].id = children.docs[childId].id;
            let spendable = 0;
            let shared = 0;
            let saved = 0;
            for (let t in kidsObj[childId]['transactions']) {
                kidsObj[childId]['transactions'][t].id = t;
                let transaction = kidsObj[childId]['transactions'][t];
                spendable += parseFloat(transaction.amount);
                saved += parseFloat(transaction.save);
                shared += parseFloat(transaction.share);
            }
            kidsObj[childId].spendable = spendable;
            kidsObj[childId].saved = saved;
            kidsObj[childId].shared = shared;
            kids.set(kidsObj);
        }
        kidsLoading.set(false);
    })
}

auth.onAuthStateChanged(async fireUser => {
    if (fireUser) {
        user.set(fireUser);
        getKids(fireUser);
    } else {
        user.set(null);
        kidsLoading.set(false);
    }
})

export const payAllowance = (kid) => {
    let ageYears = dayjs().diff(kid.birthday, 'years');
    earn(kid, ageYears, '💰 Allowance');
}
export const payInterest = (kid) => {
    let newSpend = kid.spendable * (kid.interest / 100);
    let newSave = kid.saved * (kid.interest / 100);
    let newShare = kid.shared * (kid.interest / 100);
    transact(kid, newSave, newShare, newSpend, 'Interest');
}

function earn(kid, value, name) {
    value = parseFloat(value);
    let save = value * (parseFloat(kid.save) / 100);
    let share = (value - save) * (parseFloat(kid.share) / 100);
    let amount = value - save - share;
    transact(kid, save, share, amount, name);
}

function transact(kid, save, share, amount, name) {
    const time = new Date().getTime();
    save = save.toFixed(2);
    share = share.toFixed(2);
    amount = amount.toFixed(2);
    set(`children/${kid.id}/transactions/${time}`, {
        save,
        share,
        amount,
        name,
    }).catch()
}

init().catch();