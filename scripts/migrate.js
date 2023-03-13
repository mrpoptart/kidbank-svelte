const assert = require("assert");
const admin = require('firebase-admin');
const {initializeTestEnvironment, assertSucceeds, assertFails} = require("@firebase/rules-unit-testing");
const {readFileSync} = require('fs')
const {setDoc, query, where, doc, getDocs, setLogLevel, collection} = require("firebase/firestore")
const {getDatabase, ref, child, get} = require("firebase/database");

let serviceAccount = require('./dadbank-fcbc6-20fc8e1ae6b3.json');

const firebaseConfig = {
    apiKey: "AIzaSyBy3AS4m3rAnmPuVOBONZDFIEMSzY2InAg",
    authDomain: "dadbank-fcbc6.firebaseapp.com",
    databaseURL: "https://dadbank-fcbc6-default-rtdb.firebaseio.com",
    projectId: "dadbank-fcbc6",
    storageBucket: "dadbank-fcbc6.appspot.com",
    messagingSenderId: "746183158777",
    appId: "1:746183158777:web:22c347402ba0a76a932b28",
    measurementId: "G-79Q150R6KR",
    credential: admin.credential.cert(serviceAccount),
};

const projectId = "dadbank-fcbc6";

setLogLevel('error')

admin.initializeApp(firebaseConfig);

function getAdminFirestore() {
    return admin.firestore();
}

function getAdminRealtimeDb() {
    return admin.database()
}

async function getOldData(){
    let adminDb = getAdminRealtimeDb();
    let snap = await adminDb.ref('children').get()
    return snap.val();
}

async function migrateToNewData(oldData){
    const adminFirestore = getAdminFirestore();
    for(childId in oldData) {
        const oldChild = oldData[childId];
        const newChild = {};
        newChild.id = childId
        newChild.birthday = oldChild.birthday
        newChild.interest = oldChild.interest
        newChild.name = oldChild.name
        newChild.payday = oldChild.payday
        newChild.save = oldChild.save
        newChild.share = oldChild.share
        newChild.parents = [];
        for(parentEmail in oldChild.parents) {
            newChild.parents.push(parentEmail.replace('%2E', '.'))
        }
        newChild.transactions = {};
        for(transactionId in oldChild.transactions) {
            newChild.transactions[transactionId] = oldChild.transactions[transactionId];
            newChild.transactions[transactionId].id = transactionId;
        }
        console.log(newChild);
        await adminFirestore.collection('children').doc(childId).set(newChild)
    }
}

async function init() {
    let oldData = await getOldData();
    migrateToNewData(oldData);
}

init().catch();