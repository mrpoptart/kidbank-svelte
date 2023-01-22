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

async function getTestEnv() {
    return await initializeTestEnvironment({
        projectId: projectId,
        firestore: {
            rules: readFileSync('firestore.rules', 'utf8'),
            "host": "127.0.0.1",
            "port": "8000"
        },
    });
}

async function getAuthenticatedDb() {
    let env = await getTestEnv();
    return env.authenticatedContext('mrp', {email: authed_email, email_verified: true}).firestore()
}

async function getUnauthenticatedDb() {
    let env = await getTestEnv();
    return env.unauthenticatedContext().firestore();
}

function getAdminDb() {
    return admin.firestore();
}

describe("Child Creation", async () => {
    it(`authed user can create a child with their own email`, async () => {
        const db = await getAuthenticatedDb();
        await assertSucceeds(setDoc(await doc(await db, 'children', '23456'), {
            name: "Bob", parents: [authed_email]
        }))
        let adminDb = getAdminDb();
        await adminDb.collection('children').doc('23456').delete();
    })
    it(`authed user can't create a child with no parents`, async () => {
        const db = await getAuthenticatedDb();
        await assertFails(setDoc(await doc(await db, 'children', '23457'), {
            name: "Bob"
        }))
    })
    it(`authed user can't create a child with someone else's email`, async () => {
        const db = await getAuthenticatedDb();
        await assertFails(setDoc(await doc(await db, 'children', '23458'), {
            name: "Bob", parents: ["bob@bob.com"]
        }))
    })
    it(`unauthed user can't create a child with a bad email`, async () => {
        const db = await getUnauthenticatedDb();
        await assertFails(setDoc(await doc(await db, 'children', '23459'), {
            name: "Bob", parents: ["bob@bob.com"]
        }))
    })
    it(`unauthed user can't create a child with a good email`, async () => {
        const db = await getUnauthenticatedDb();
        await assertFails(setDoc(await doc(await db, 'children', '23460'), {
            name: "Bob", parents: [authed_email]
        }))
    })
})

describe("Child Reading", async () => {
    it(`authed user can list all children they have permissions for`, async () => {
        let adminDb = getAdminDb();
        await adminDb.collection('children').doc('23456').set({
            name: "Bob",
            parents: ['success@kidbank.com']
        })
        await adminDb.collection('children').doc('23457').set({
            name: "Tom",
            parents: ['success@kidbank.com', 'fail@kidbank.com']
        })
        try {
            const db = await getAuthenticatedDb();
            const o = await db.collection('children').where("parents", "array-contains", authed_email).get();
            assert.equal(o.docs.length, 2)

        } catch (e) {
            console.error(e)
        }
        await adminDb.collection('children').doc('23456').delete();
        await adminDb.collection('children').doc('23457').delete();
    })
    it(`Authed users don't list children they don't have permissions for`, async () => {
        let adminDb = getAdminDb();
        await adminDb.collection('children').doc('23456').set({
            name: "Bob",
            parents: ['fail@kidbank.com']
        })
        await adminDb.collection('children').doc('23457').set({
            name: "Tom",
            parents: ['fail@kidbank.com']
        })
        try {
            const db = await getAuthenticatedDb();
            const o = await db.collection('children').where("parents", "array-contains", authed_email).get();
            assert.equal(o.docs.length, 0)

        } catch (e) {
            console.error(e)
        }
        await adminDb.collection('children').doc('23456').delete();
        await adminDb.collection('children').doc('23457').delete();
    })
    it(`Authed users can't get children they don't have permissions for`, async () => {
        let adminDb = getAdminDb();
        await adminDb.collection('children').doc('23456').set({
            name: "Bob",
            parents: ['fail@kidbank.com']
        })
        const db = await getAuthenticatedDb();
        assert.throws(await db.collection('children').where("parents", "array-contains", 'fail@kidbank.com').get)
        await adminDb.collection('children').doc('23456').delete();
    })
    it(`authed`, async () => {
    })
});