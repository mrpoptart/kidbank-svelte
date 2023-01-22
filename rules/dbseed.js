const admin = require('firebase-admin');
const {getDocs, query, collection, where} = require("firebase/firestore");

// initialization
const projectId = 'dadbank-fcbc6';
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8000';
admin.initializeApp({projectId});

const db = admin.firestore();

// seed function
async function getSeedData() {
    try {
        await db.collection('children').doc('12345').set({
            name: "Bob",
            parents: ['success@kidbank.com']
        })
        await db.collection('children').doc('12346').set({
            name: "Tom",
            parents: ['success@kidbank.com', 'willy@here.com']
        })
        await db.collection('children').doc('12347').set({
            name: "bill",
            parents: ['willy@here.com']
        })
        console.log('success kids')
        let o = await db.collection('children').where("parents", "array-contains", 'success@kidbank.com').get();
        for (const docsKey in o.docs) {
            console.log(o.docs[docsKey].data())
        }
        console.log('willy kids')
        o = await db.collection('children').where("parents", "array-contains", 'willy@here.com').get();
        for (const docsKey in o.docs) {
            console.log(o.docs[docsKey].data())
        }
        console.log('database seed was successful');
    } catch (error) {
        console.log(error, 'database seed failed');
    }
}

getSeedData();
