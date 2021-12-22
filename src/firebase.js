import {getAnalytics} from "firebase/analytics";
import {getDatabase, remove as fbRemove, onValue as fbOnValue, ref as fbref, set as fbset} from "firebase/database";
import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithRedirect, signOut} from "firebase/auth";
import {user, kids} from "./store";
import dayjs from "dayjs";
import {get} from 'svelte/store';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyBy3AS4m3rAnmPuVOBONZDFIEMSzY2InAg",
   authDomain: "dadbank-fcbc6.firebaseapp.com",
   projectId: "dadbank-fcbc6",
   storageBucket: "dadbank-fcbc6.appspot.com",
   messagingSenderId: "746183158777",
   appId: "1:746183158777:web:e4e91c63baa0ddd6932b28",
   measurementId: "G-635NKSRBHC"
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
getAnalytics(firebaseApp);

export const auth = getAuth();
export const db = getDatabase();
export const logout = async () => {
   await signOut(auth)
};
export const login = () => {
   return signInWithRedirect(auth, new GoogleAuthProvider());
};

export const set = (path, value) => {
   console.log(`Setting ${path} to ${JSON.stringify(value)}`)
   return fbset(fbref(db, path), value);
}

export const onValue = (path, callback) => {
   return fbOnValue(fbref(db, path), callback);
}

export const remove = (path)=> {
   console.log(`Deleting ${path}`)
   return fbRemove(fbref(db, path));
}

async function backup(){
   let kidsObj = {children:{}};
   await onValue(`parents/${user.key}`, (snapshot) => {
      kidsObj.children = snapshot.val();
      for (let childId in kidsObj.children) {
         onValue(`children/${childId}`, (childSnap) => {
            kidsObj.children[childId] = childSnap.val();
            console.log(JSON.stringify(kidsObj));
         })
      }
   })
}

function getKids(user) {
   let kidsObj = {};
   onValue(`parents/${user.key}`, (snapshot) => {
         let children = snapshot.val();
         for (let childId in children) {
            onValue(`children/${childId}`, (childSnap) => {
                  kidsObj[childId] = childSnap.val();
                  kidsObj[childId].id = childId;
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
                  kidsObj[childId].key = user.key;
                  kidsObj[childId].spendable = spendable;
                  kidsObj[childId].saved = saved;
                  kidsObj[childId].shared = shared;
                  kids.set(kidsObj);
            })
         }
   })
   backup()
}

auth.onAuthStateChanged(async fireUser => {
   if (fireUser) {
      fireUser.key = fireUser.email.replace('.', "%2E")
      user.set(fireUser);
      getKids(fireUser);
   } else {
      user.set(null);
   }
})

export const payAllowance = (kid) => {
   let ageYears = dayjs().diff(kid.birthday, 'years');
   earn(kid, ageYears, '💰 Allowance');
}

function payInterest(kid) {
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

function spend(kid, amount, name) {
   this.amount = parseFloat(amount);
   let save = 0;
   let share = 0;
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
   })
}