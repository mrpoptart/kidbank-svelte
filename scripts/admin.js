const assert = require("assert");
const admin = require('firebase-admin');
const {initializeTestEnvironment, assertSucceeds, assertFails} = require("@firebase/rules-unit-testing");
const {readFileSync} = require('fs')
const {setDoc, query, where, doc, getDocs, setLogLevel, collection} = require("firebase/firestore")

const projectId = "dadbank-fcbc6";
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8000';

setLogLevel('error')

const authed_email = "success@kidbank.com"

admin.initializeApp({projectId});

function getAdminDb() {
    return admin.firestore();
}
async function init(){
    let adminDb = getAdminDb();
    await adminDb.collection('test-transactions').doc('23456').set({
        name: "Bob",
        parents: ['success@kidbank.com']
    })
    await adminDb.collection('test-transactions').doc('23457').set({
        name: "Tom",
        parents: ['success@kidbank.com', 'fail@kidbank.com']
    })
    // await adminDb.collection('children').doc('23456').delete();
    // await adminDb.collection('children').doc('23457').delete();
}

init().catch();