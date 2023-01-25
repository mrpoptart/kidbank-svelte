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
        await db.collection('children').doc('C_ZwnhLTqaVuGlahO5bTw', {
            "birthday": "2014-11-13",
            "interest": 10,
            "name": "Malcolm",
            "parents": [
                "anagabrielaraphael@gmail.com",
                "bullsontheblvd@gmail.com",
                "ghleach@gmail.com",
                "luckyelement7@gmail.com",
                "mrpoptart@gmail.com"
            ],
            "payday": 1,
            "save": 50,
            "share": 50,
            "transactions": {
                "1636643893000": {
                    "amount": "55.00",
                    "name": "Initial Amount",
                    "save": "267.00",
                    "share": "0"
                },
                "1636963200000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1637568000000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1638172800000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1638345660001": {
                    "amount": 6.03,
                    "name": "🪙 Interest",
                    "save": 27.75,
                    "share": 0.53
                },
                "1638777600000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1639382400000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1639880511427": {
                    "amount": "0.25",
                    "name": "Trash out",
                    "save": "0.50",
                    "share": "0.25"
                },
                "1639987200000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1640533303000": {
                    "amount": 25,
                    "name": "Xmas from Uncles",
                    "save": 0,
                    "share": 0
                },
                "1640592000000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1640746048000": {
                    "amount": 25,
                    "name": "Grandma Ana Xmas",
                    "save": 50,
                    "share": 25
                },
                "1641024060001": {
                    "amount": 12.35,
                    "name": "🪙 Interest",
                    "save": 36.98,
                    "share": 3.8
                },
                "1641196800000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1641432240000": {
                    "amount": 1,
                    "name": "Helped with trash",
                    "save": 0,
                    "share": 0
                },
                "1641680700000": {
                    "amount": -20,
                    "name": "Charlie's present legos",
                    "save": 0,
                    "share": 0
                },
                "1641680820000": {
                    "amount": -2.29,
                    "name": "Mints",
                    "save": 0,
                    "share": 0
                },
                "1641801600000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1642406400000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1642554000000": {
                    "amount": -2,
                    "name": "Chips",
                    "save": 0,
                    "share": 0
                },
                "1642776120000": {
                    "amount": -10,
                    "name": "Roblux",
                    "save": 0,
                    "share": 0
                },
                "1642794420000": {
                    "amount": 1.25,
                    "name": "Clean garage and make lunch",
                    "save": 0,
                    "share": 0
                },
                "1643011200000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1643149500000": {
                    "amount": -33,
                    "name": "Star wars game",
                    "save": 0,
                    "share": 0
                },
                "1643493000000": {
                    "amount": -3.78,
                    "name": "Bought 2 kitkats",
                    "save": 0,
                    "share": 0
                },
                "1643616000000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1643702460001": {
                    "amount": 7.58,
                    "name": "🪙 Interest",
                    "save": 42.42,
                    "share": 5.06
                },
                "1644106860000": {
                    "amount": -29.99,
                    "name": "Astroneer",
                    "save": 0,
                    "share": 0
                },
                "1644193260000": {
                    "amount": -18.5,
                    "name": "Maui fish hook",
                    "save": 0,
                    "share": 0
                },
                "1644220800000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1644825600000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1645430400000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1645747140000": {
                    "amount": -19.99,
                    "name": "Pet from Target",
                    "save": 0,
                    "share": 0
                },
                "1645931280000": {
                    "amount": 2,
                    "name": "Drunk dad got water",
                    "save": 0,
                    "share": 0
                },
                "1646004840000": {
                    "amount": -8,
                    "name": "Dragon egg",
                    "save": 0,
                    "share": 0
                },
                "1646035200000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1646121660001": {
                    "amount": 1.59,
                    "name": "🪙 Interest",
                    "save": 48.07,
                    "share": 6.26
                },
                "1646258580000": {
                    "amount": 1,
                    "name": "Helped Mom with cat litter",
                    "save": 0,
                    "share": 0
                },
                "1646640000000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1646667420000": {
                    "amount": 1,
                    "name": "Tooth fairy money",
                    "save": 1,
                    "share": 0
                },
                "1646699100000": {
                    "amount": 11.36,
                    "name": "From change jar",
                    "save": 0,
                    "share": 0
                },
                "1647012420000": {
                    "amount": 2,
                    "name": "Tooth fairy money",
                    "save": 0,
                    "share": 0
                },
                "1647046440000": {
                    "amount": 1,
                    "name": "Helped out",
                    "save": 0,
                    "share": 0
                },
                "1647046560000": {
                    "amount": -17.92,
                    "name": "Beyblades",
                    "save": 0,
                    "share": 0
                },
                "1647052500000": {
                    "amount": 0.3175,
                    "name": "Brussel sprouts ",
                    "save": 0.635,
                    "share": 0.3175
                },
                "1647241200000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1647724440000": {
                    "amount": -0.25,
                    "name": "Lollipop",
                    "save": 0,
                    "share": 0
                },
                "1647846000000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1648078860000": {
                    "amount": 1,
                    "name": "Trash",
                    "save": 0,
                    "share": 0
                },
                "1648326854000": {
                    "amount": -19.89,
                    "name": "beybade",
                    "save": 0,
                    "share": 0
                },
                "1648450800000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1648679340000": {
                    "amount": -3.25,
                    "name": "Coffee cake",
                    "save": 0,
                    "share": 0
                },
                "1648796460001": {
                    "amount": 0.09,
                    "name": "🪙 Interest",
                    "save": 54.44,
                    "share": 7.62
                },
                "1649055600000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1649291520000": {
                    "amount": -3.87,
                    "name": "Broken beyblade replacement ",
                    "save": 0,
                    "share": 0
                },
                "1649521320000": {
                    "amount": 0.5,
                    "name": "Dish drying",
                    "save": 1,
                    "share": 0.5
                },
                "1649660400000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1650265200000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1650591720000": {
                    "amount": -2.5,
                    "name": "Chips",
                    "save": 0,
                    "share": 0
                },
                "1650667440000": {
                    "amount": 50.37,
                    "name": "Paycheck",
                    "save": 0,
                    "share": 0
                },
                "1650841560000": {
                    "amount": -20.65,
                    "name": "Sylvian Pokemon stuffy ",
                    "save": 0,
                    "share": 0
                },
                "1650870000000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1651196340000": {
                    "amount": -2.5,
                    "name": "Chips",
                    "save": 0,
                    "share": 0
                },
                "1651388460001": {
                    "amount": 2.93,
                    "name": "🪙 Interest",
                    "save": 61.38,
                    "share": 9.13
                },
                "1651474800000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1652079600000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1652313600000": {
                    "amount": -1.6,
                    "name": "Ripped up mom s bag",
                    "save": 0,
                    "share": 0
                },
                "1652407920000": {
                    "amount": -3,
                    "name": "Ripped up Kleenex box",
                    "save": 0,
                    "share": 0
                },
                "1652485740000": {
                    "amount": 0.55,
                    "name": "Sold chocolates",
                    "save": 0,
                    "share": 0
                },
                "1652566020000": {
                    "amount": -15,
                    "name": "Bought sunglasses",
                    "save": 0,
                    "share": 0
                },
                "1652566080000": {
                    "amount": -4.69,
                    "name": "Mentos",
                    "save": 0,
                    "share": 0
                },
                "1652684400000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1653289200000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1653894000000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1654066860001": {
                    "amount": 1.72,
                    "name": "🪙 Interest",
                    "save": 69.27,
                    "share": 10.92
                },
                "1654498800000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1654824540000": {
                    "amount": -2.5,
                    "name": "Ice skate snack",
                    "save": 0,
                    "share": 0
                },
                "1655103600000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1655248440000": {
                    "amount": 2,
                    "name": "Tooth fairy",
                    "save": 0,
                    "share": 0
                },
                "1655708400000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1655742785000": {
                    "amount": -2,
                    "name": "snacks ice",
                    "save": 0,
                    "share": 0
                },
                "1655742808000": {
                    "amount": -2,
                    "name": "chabot chips",
                    "save": 0,
                    "share": 0
                },
                "1655944200000": {
                    "amount": 0.16,
                    "name": "Found change",
                    "save": 0,
                    "share": 0
                },
                "1656095040000": {
                    "amount": -15,
                    "name": "NASA water bottle ",
                    "save": 0,
                    "share": 0
                },
                "1656313200000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1656345557000": {
                    "amount": 1,
                    "name": "Found a dollar ",
                    "save": 0,
                    "share": 0
                },
                "1656602208000": {
                    "amount": 60,
                    "name": "Amazon Second Payment",
                    "save": 0,
                    "share": 0
                },
                "1656658860001": {
                    "amount": 6.76,
                    "name": "🪙 Interest",
                    "save": 77.59,
                    "share": 12.71
                },
                "1656781560000": {
                    "amount": -40,
                    "name": "tiger",
                    "save": 0,
                    "share": 0
                },
                "1656810299000": {
                    "amount": 0.5,
                    "name": "Garage help",
                    "save": 0,
                    "share": 0
                },
                "1656918000000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1657522800000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1658127600000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1658516274000": {
                    "amount": 1,
                    "name": "Campsite cleanup ",
                    "save": 0,
                    "share": 0
                },
                "1658520258000": {
                    "amount": 108,
                    "name": "Gap model shoot",
                    "save": 0,
                    "share": 0
                },
                "1658616149000": {
                    "amount": -33.18,
                    "name": "Dr strange outfit",
                    "save": 0,
                    "share": 0
                },
                "1658732400000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1659129410000": {
                    "amount": 0.5,
                    "name": "Trash help",
                    "save": 0,
                    "share": 0
                },
                "1659337200000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1659337260001": {
                    "amount": 12,
                    "name": "🪙 Interest",
                    "save": 87.1,
                    "share": 14.86
                },
                "1659393440000": {
                    "amount": -45,
                    "name": "Light sabers ",
                    "save": 0,
                    "share": 0
                },
                "1659551683000": {
                    "amount": 0.25,
                    "name": "Bridge",
                    "save": 0,
                    "share": 0
                },
                "1659942000000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1660000265000": {
                    "amount": 1,
                    "name": "Listening to dad",
                    "save": 0,
                    "share": 0
                },
                "1660432044000": {
                    "amount": -2,
                    "name": "Mints",
                    "save": 0,
                    "share": 0
                },
                "1660546800000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1660786690000": {
                    "amount": 36,
                    "name": "Little passports ",
                    "save": 0,
                    "share": 0
                },
                "1661151600000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1661309206000": {
                    "amount": -15,
                    "name": "Satisfactory ",
                    "save": 0,
                    "share": 0
                },
                "1661389688000": {
                    "amount": 0.25,
                    "name": "Iono",
                    "save": 0,
                    "share": 0
                },
                "1661756400000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1662015660001": {
                    "amount": 11.45,
                    "name": "🪙 Interest",
                    "save": 97.21,
                    "share": 17.05
                },
                "1662261177000": {
                    "amount": 0.25,
                    "name": "Take out recycles ",
                    "save": 0.5,
                    "share": 0.25
                },
                "1662361200000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1662403146000": {
                    "amount": 1,
                    "name": "Back yard help ",
                    "save": 0,
                    "share": 0
                },
                "1662773671000": {
                    "amount": 1,
                    "name": "Helped mom 2x",
                    "save": 0,
                    "share": 0
                },
                "1662966000000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1663457302000": {
                    "amount": -20,
                    "name": "Henry bday present",
                    "save": 0,
                    "share": 0
                },
                "1663570800000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1663683439000": {
                    "amount": 1,
                    "name": "Tooth",
                    "save": 0,
                    "share": 1
                },
                "1663689357000": {
                    "amount": 60,
                    "name": "Standford job",
                    "save": 0,
                    "share": 0
                },
                "1663983721000": {
                    "amount": -1,
                    "name": "Ice cream",
                    "save": 0,
                    "share": 0
                },
                "1664131292000": {
                    "amount": -1.6,
                    "name": "Mike n ike",
                    "save": 0,
                    "share": 0
                },
                "1664175600000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1664607660001": {
                    "amount": 17.36,
                    "name": "🪙 Interest",
                    "save": 108.39,
                    "share": 19.58
                },
                "1664644026000": {
                    "amount": -6,
                    "name": "Peanuts",
                    "save": 0,
                    "share": 0
                },
                "1664762985000": {
                    "amount": 1,
                    "name": "Trash out",
                    "save": 0,
                    "share": 0
                },
                "1664780400000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1665245727000": {
                    "amount": -4,
                    "name": "Snapple",
                    "save": 0,
                    "share": 0
                },
                "1665248338000": {
                    "amount": -5,
                    "name": "Pita chips ",
                    "save": 0,
                    "share": 0
                },
                "1665381600000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1665385200000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1665973947000": {
                    "amount": -10,
                    "name": "Bought Charlie portal",
                    "save": 0,
                    "share": 0
                },
                "1665990000000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1666541378000": {
                    "amount": -40.7,
                    "name": "Thor hammer",
                    "save": 0,
                    "share": 0
                },
                "1666557136000": {
                    "amount": -50,
                    "name": "Foxtail Pouch",
                    "save": 0,
                    "share": 0
                },
                "1666594800000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1667011551000": {
                    "amount": -12.2,
                    "name": "Special car",
                    "save": 0,
                    "share": 0
                },
                "1667199600000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1667286060001": {
                    "amount": 7.45,
                    "name": "🪙 Interest",
                    "save": 121.32,
                    "share": 22.58
                },
                "1667665321000": {
                    "amount": 20,
                    "name": "Scrap mechanic ",
                    "save": 0,
                    "share": 0
                },
                "1667782772000": {
                    "amount": 0,
                    "name": "Extra life",
                    "save": 0,
                    "share": -248.42
                },
                "1667808000000": {
                    "amount": 1.75,
                    "name": "💰 Allowance",
                    "save": 3.5,
                    "share": 1.75
                },
                "1668380475000": {
                    "amount": 12.5,
                    "name": "Uncles Bday Money",
                    "save": 0,
                    "share": 12.5
                },
                "1668412800000": {
                    "amount": 2,
                    "name": "💰 Allowance",
                    "save": 4,
                    "share": 2
                },
                "1668900501000": {
                    "amount": -16.5,
                    "name": "Wand ",
                    "save": 0,
                    "share": 0
                },
                "1668981462000": {
                    "amount": -3,
                    "name": "Snack",
                    "save": 0,
                    "share": 0
                },
                "1669017600000": {
                    "amount": 2,
                    "name": "💰 Allowance",
                    "save": 4,
                    "share": 2
                },
                "1669622400000": {
                    "amount": 2,
                    "name": "💰 Allowance",
                    "save": 4,
                    "share": 2
                },
                "1669881660001": {
                    "amount": 10.27,
                    "name": "🪙 Interest",
                    "save": 135.01,
                    "share": 2.02
                },
                "1670227200000": {
                    "amount": 2,
                    "name": "💰 Allowance",
                    "save": 4,
                    "share": 2
                },
                "1670719196000": {
                    "amount": 0.75,
                    "name": "Helping parents ",
                    "save": 0,
                    "share": 0
                },
                "1670719239000": {
                    "amount": -5,
                    "name": "Naomi Christmas",
                    "save": 0,
                    "share": 0
                },
                "1670722421000": {
                    "amount": -17.6,
                    "name": "Beyblade",
                    "save": 0,
                    "share": 0
                },
                "1670820385000": {
                    "amount": 2,
                    "name": "Toothlessness",
                    "save": 0,
                    "share": 0
                },
                "1670832000000": {
                    "amount": 2,
                    "name": "💰 Allowance",
                    "save": 4,
                    "share": 2
                },
                "1671297049000": {
                    "amount": -1,
                    "name": "Donut subsidy",
                    "save": 0,
                    "share": 0
                },
                "1671299380000": {
                    "amount": -3,
                    "name": "Chocolate chip cookie at the Farmers market",
                    "save": 0,
                    "share": 0
                },
                "1671436800000": {
                    "amount": 2,
                    "name": "💰 Allowance",
                    "save": 4,
                    "share": 2
                },
                "1671987233000": {
                    "amount": 20,
                    "name": "Xmas money",
                    "save": 0,
                    "share": 0
                },
                "1672041600000": {
                    "amount": 2,
                    "name": "💰 Allowance",
                    "save": 4,
                    "share": 2
                },
                "1672560060001": {
                    "amount": 11.71,
                    "name": "🪙 Interest",
                    "save": 150.11,
                    "share": 3.03
                },
                "1672646400000": {
                    "amount": 2,
                    "name": "💰 Allowance",
                    "save": 4,
                    "share": 2
                },
                "1673213570000": {
                    "amount": -7.5,
                    "name": "Ferry snacks",
                    "save": 0,
                    "share": 0
                },
                "1673251200000": {
                    "amount": 2,
                    "name": "💰 Allowance",
                    "save": 4,
                    "share": 2
                },
                "1673856000000": {
                    "amount": 2,
                    "name": "💰 Allowance",
                    "save": 4,
                    "share": 2
                },
                "1674270326000": {
                    "amount": -2.2,
                    "name": "Candy",
                    "save": 0,
                    "share": 0
                },
                "1674322966000": {
                    "amount": -5,
                    "name": "Cheesecake",
                    "save": 0,
                    "share": 0
                },
                "1674460800000": {
                    "amount": 2,
                    "name": "💰 Allowance",
                    "save": 4,
                    "share": 2
                }
            }
        })
    } catch (error) {
        console.log(error, 'database seed failed');
    }
}

getSeedData();
