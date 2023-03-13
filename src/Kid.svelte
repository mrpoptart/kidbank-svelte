<script>
    import {currencyFormatter, hash, moneyRound} from "./helpers";
    import {set, update} from "./firebase";
    import KidTransactionTable from "./components/KidTransactionTable.svelte";
    import dayjs from "dayjs";
    import Transact from "./Transact.svelte";
    import {ButtonGroup, Col, Container, Icon, Row, Table} from "sveltestrap";
    import KidSettings from "./components/KidSettings.svelte";

    export let kid;
    export let visible = false;
    let ALLOWANCE = '💰 Allowance';
    let INTEREST = '🪙 Interest';

    let today = dayjs();
    let startOfWeek = today.startOf('week');
    let lastMonday = startOfWeek.add(1, 'day');
    // since the week starts on sunday, the "start of week"
    // monday might be after today if today is sunday.
    if (lastMonday > today) {
        lastMonday = lastMonday.subtract(7, 'day');
    }
    ensureAllowance();
    ensureInterest();

    async function transact(time, save, share, amount, name) {
        kid.transactions[time] = {
            amount: amount,
            id: time,
            name: name,
            save: save,
            share: share,
        }
        return await set(`${kid.id}`, kid)
    }

    async function consolidate(e) {
        await set(`${kid.id}`, e.detail)
        // await set('C_ZwnhLTqaVuGlahO5bTw', {
        //     "birthday": "2014-11-13",
        //     "interest": 10,
        //     "name": "Malcolm",
        //     "parents": [
        //         "anagabrielaraphael@gmail.com",
        //         "bullsontheblvd@gmail.com",
        //         "ghleach@gmail.com",
        //         "luckyelement7@gmail.com",
        //         "mrpoptart@gmail.com"
        //     ],
        //     "payday": 1,
        //     "save": 50,
        //     "share": 50,
        //     "transactions": {
        //         "1636643893000": {
        //             "amount": "55.00",
        //             "name": "Initial Amount",
        //             "save": "267.00",
        //             "share": "0"
        //         },
        //         "1636963200000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1637568000000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1638172800000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1638345660001": {
        //             "amount": 6.03,
        //             "name": "🪙 Interest",
        //             "save": 27.75,
        //             "share": 0.53
        //         },
        //         "1638777600000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1639382400000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1639880511427": {
        //             "amount": "0.25",
        //             "name": "Trash out",
        //             "save": "0.50",
        //             "share": "0.25"
        //         },
        //         "1639987200000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1640533303000": {
        //             "amount": 25,
        //             "name": "Xmas from Uncles",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1640592000000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1640746048000": {
        //             "amount": 25,
        //             "name": "Grandma Ana Xmas",
        //             "save": 50,
        //             "share": 25
        //         },
        //         "1641024060001": {
        //             "amount": 12.35,
        //             "name": "🪙 Interest",
        //             "save": 36.98,
        //             "share": 3.8
        //         },
        //         "1641196800000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1641432240000": {
        //             "amount": 1,
        //             "name": "Helped with trash",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1641680700000": {
        //             "amount": -20,
        //             "name": "Charlie's present legos",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1641680820000": {
        //             "amount": -2.29,
        //             "name": "Mints",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1641801600000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1642406400000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1642554000000": {
        //             "amount": -2,
        //             "name": "Chips",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1642776120000": {
        //             "amount": -10,
        //             "name": "Roblux",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1642794420000": {
        //             "amount": 1.25,
        //             "name": "Clean garage and make lunch",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1643011200000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1643149500000": {
        //             "amount": -33,
        //             "name": "Star wars game",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1643493000000": {
        //             "amount": -3.78,
        //             "name": "Bought 2 kitkats",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1643616000000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1643702460001": {
        //             "amount": 7.58,
        //             "name": "🪙 Interest",
        //             "save": 42.42,
        //             "share": 5.06
        //         },
        //         "1644106860000": {
        //             "amount": -29.99,
        //             "name": "Astroneer",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1644193260000": {
        //             "amount": -18.5,
        //             "name": "Maui fish hook",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1644220800000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1644825600000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1645430400000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1645747140000": {
        //             "amount": -19.99,
        //             "name": "Pet from Target",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1645931280000": {
        //             "amount": 2,
        //             "name": "Drunk dad got water",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1646004840000": {
        //             "amount": -8,
        //             "name": "Dragon egg",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1646035200000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1646121660001": {
        //             "amount": 1.59,
        //             "name": "🪙 Interest",
        //             "save": 48.07,
        //             "share": 6.26
        //         },
        //         "1646258580000": {
        //             "amount": 1,
        //             "name": "Helped Mom with cat litter",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1646640000000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1646667420000": {
        //             "amount": 1,
        //             "name": "Tooth fairy money",
        //             "save": 1,
        //             "share": 0
        //         },
        //         "1646699100000": {
        //             "amount": 11.36,
        //             "name": "From change jar",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1647012420000": {
        //             "amount": 2,
        //             "name": "Tooth fairy money",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1647046440000": {
        //             "amount": 1,
        //             "name": "Helped out",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1647046560000": {
        //             "amount": -17.92,
        //             "name": "Beyblades",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1647052500000": {
        //             "amount": 0.3175,
        //             "name": "Brussel sprouts ",
        //             "save": 0.635,
        //             "share": 0.3175
        //         },
        //         "1647241200000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1647724440000": {
        //             "amount": -0.25,
        //             "name": "Lollipop",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1647846000000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1648078860000": {
        //             "amount": 1,
        //             "name": "Trash",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1648326854000": {
        //             "amount": -19.89,
        //             "name": "beybade",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1648450800000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1648679340000": {
        //             "amount": -3.25,
        //             "name": "Coffee cake",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1648796460001": {
        //             "amount": 0.09,
        //             "name": "🪙 Interest",
        //             "save": 54.44,
        //             "share": 7.62
        //         },
        //         "1649055600000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1649291520000": {
        //             "amount": -3.87,
        //             "name": "Broken beyblade replacement ",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1649521320000": {
        //             "amount": 0.5,
        //             "name": "Dish drying",
        //             "save": 1,
        //             "share": 0.5
        //         },
        //         "1649660400000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1650265200000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1650591720000": {
        //             "amount": -2.5,
        //             "name": "Chips",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1650667440000": {
        //             "amount": 50.37,
        //             "name": "Paycheck",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1650841560000": {
        //             "amount": -20.65,
        //             "name": "Sylvian Pokemon stuffy ",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1650870000000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1651196340000": {
        //             "amount": -2.5,
        //             "name": "Chips",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1651388460001": {
        //             "amount": 2.93,
        //             "name": "🪙 Interest",
        //             "save": 61.38,
        //             "share": 9.13
        //         },
        //         "1651474800000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1652079600000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1652313600000": {
        //             "amount": -1.6,
        //             "name": "Ripped up mom s bag",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1652407920000": {
        //             "amount": -3,
        //             "name": "Ripped up Kleenex box",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1652485740000": {
        //             "amount": 0.55,
        //             "name": "Sold chocolates",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1652566020000": {
        //             "amount": -15,
        //             "name": "Bought sunglasses",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1652566080000": {
        //             "amount": -4.69,
        //             "name": "Mentos",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1652684400000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1653289200000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1653894000000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1654066860001": {
        //             "amount": 1.72,
        //             "name": "🪙 Interest",
        //             "save": 69.27,
        //             "share": 10.92
        //         },
        //         "1654498800000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1654824540000": {
        //             "amount": -2.5,
        //             "name": "Ice skate snack",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1655103600000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1655248440000": {
        //             "amount": 2,
        //             "name": "Tooth fairy",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1655708400000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1655742785000": {
        //             "amount": -2,
        //             "name": "snacks ice",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1655742808000": {
        //             "amount": -2,
        //             "name": "chabot chips",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1655944200000": {
        //             "amount": 0.16,
        //             "name": "Found change",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1656095040000": {
        //             "amount": -15,
        //             "name": "NASA water bottle ",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1656313200000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1656345557000": {
        //             "amount": 1,
        //             "name": "Found a dollar ",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1656602208000": {
        //             "amount": 60,
        //             "name": "Amazon Second Payment",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1656658860001": {
        //             "amount": 6.76,
        //             "name": "🪙 Interest",
        //             "save": 77.59,
        //             "share": 12.71
        //         },
        //         "1656781560000": {
        //             "amount": -40,
        //             "name": "tiger",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1656810299000": {
        //             "amount": 0.5,
        //             "name": "Garage help",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1656918000000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1657522800000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1658127600000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1658516274000": {
        //             "amount": 1,
        //             "name": "Campsite cleanup ",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1658520258000": {
        //             "amount": 108,
        //             "name": "Gap model shoot",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1658616149000": {
        //             "amount": -33.18,
        //             "name": "Dr strange outfit",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1658732400000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1659129410000": {
        //             "amount": 0.5,
        //             "name": "Trash help",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1659337200000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1659337260001": {
        //             "amount": 12,
        //             "name": "🪙 Interest",
        //             "save": 87.1,
        //             "share": 14.86
        //         },
        //         "1659393440000": {
        //             "amount": -45,
        //             "name": "Light sabers ",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1659551683000": {
        //             "amount": 0.25,
        //             "name": "Bridge",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1659942000000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1660000265000": {
        //             "amount": 1,
        //             "name": "Listening to dad",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1660432044000": {
        //             "amount": -2,
        //             "name": "Mints",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1660546800000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1660786690000": {
        //             "amount": 36,
        //             "name": "Little passports ",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1661151600000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1661309206000": {
        //             "amount": -15,
        //             "name": "Satisfactory ",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1661389688000": {
        //             "amount": 0.25,
        //             "name": "Iono",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1661756400000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1662015660001": {
        //             "amount": 11.45,
        //             "name": "🪙 Interest",
        //             "save": 97.21,
        //             "share": 17.05
        //         },
        //         "1662261177000": {
        //             "amount": 0.25,
        //             "name": "Take out recycles ",
        //             "save": 0.5,
        //             "share": 0.25
        //         },
        //         "1662361200000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1662403146000": {
        //             "amount": 1,
        //             "name": "Back yard help ",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1662773671000": {
        //             "amount": 1,
        //             "name": "Helped mom 2x",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1662966000000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1663457302000": {
        //             "amount": -20,
        //             "name": "Henry bday present",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1663570800000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1663683439000": {
        //             "amount": 1,
        //             "name": "Tooth",
        //             "save": 0,
        //             "share": 1
        //         },
        //         "1663689357000": {
        //             "amount": 60,
        //             "name": "Standford job",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1663983721000": {
        //             "amount": -1,
        //             "name": "Ice cream",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1664131292000": {
        //             "amount": -1.6,
        //             "name": "Mike n ike",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1664175600000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1664607660001": {
        //             "amount": 17.36,
        //             "name": "🪙 Interest",
        //             "save": 108.39,
        //             "share": 19.58
        //         },
        //         "1664644026000": {
        //             "amount": -6,
        //             "name": "Peanuts",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1664762985000": {
        //             "amount": 1,
        //             "name": "Trash out",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1664780400000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1665245727000": {
        //             "amount": -4,
        //             "name": "Snapple",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1665248338000": {
        //             "amount": -5,
        //             "name": "Pita chips ",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1665381600000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1665385200000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1665973947000": {
        //             "amount": -10,
        //             "name": "Bought Charlie portal",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1665990000000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1666541378000": {
        //             "amount": -40.7,
        //             "name": "Thor hammer",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1666557136000": {
        //             "amount": -50,
        //             "name": "Foxtail Pouch",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1666594800000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1667011551000": {
        //             "amount": -12.2,
        //             "name": "Special car",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1667199600000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1667286060001": {
        //             "amount": 7.45,
        //             "name": "🪙 Interest",
        //             "save": 121.32,
        //             "share": 22.58
        //         },
        //         "1667665321000": {
        //             "amount": 20,
        //             "name": "Scrap mechanic ",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1667782772000": {
        //             "amount": 0,
        //             "name": "Extra life",
        //             "save": 0,
        //             "share": -248.42
        //         },
        //         "1667808000000": {
        //             "amount": 1.75,
        //             "name": "💰 Allowance",
        //             "save": 3.5,
        //             "share": 1.75
        //         },
        //         "1668380475000": {
        //             "amount": 12.5,
        //             "name": "Uncles Bday Money",
        //             "save": 0,
        //             "share": 12.5
        //         },
        //         "1668412800000": {
        //             "amount": 2,
        //             "name": "💰 Allowance",
        //             "save": 4,
        //             "share": 2
        //         },
        //         "1668900501000": {
        //             "amount": -16.5,
        //             "name": "Wand ",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1668981462000": {
        //             "amount": -3,
        //             "name": "Snack",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1669017600000": {
        //             "amount": 2,
        //             "name": "💰 Allowance",
        //             "save": 4,
        //             "share": 2
        //         },
        //         "1669622400000": {
        //             "amount": 2,
        //             "name": "💰 Allowance",
        //             "save": 4,
        //             "share": 2
        //         },
        //         "1669881660001": {
        //             "amount": 10.27,
        //             "name": "🪙 Interest",
        //             "save": 135.01,
        //             "share": 2.02
        //         },
        //         "1670227200000": {
        //             "amount": 2,
        //             "name": "💰 Allowance",
        //             "save": 4,
        //             "share": 2
        //         },
        //         "1670719196000": {
        //             "amount": 0.75,
        //             "name": "Helping parents ",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1670719239000": {
        //             "amount": -5,
        //             "name": "Naomi Christmas",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1670722421000": {
        //             "amount": -17.6,
        //             "name": "Beyblade",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1670820385000": {
        //             "amount": 2,
        //             "name": "Toothlessness",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1670832000000": {
        //             "amount": 2,
        //             "name": "💰 Allowance",
        //             "save": 4,
        //             "share": 2
        //         },
        //         "1671297049000": {
        //             "amount": -1,
        //             "name": "Donut subsidy",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1671299380000": {
        //             "amount": -3,
        //             "name": "Chocolate chip cookie at the Farmers market",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1671436800000": {
        //             "amount": 2,
        //             "name": "💰 Allowance",
        //             "save": 4,
        //             "share": 2
        //         },
        //         "1671987233000": {
        //             "amount": 20,
        //             "name": "Xmas money",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1672041600000": {
        //             "amount": 2,
        //             "name": "💰 Allowance",
        //             "save": 4,
        //             "share": 2
        //         },
        //         "1672560060001": {
        //             "amount": 11.71,
        //             "name": "🪙 Interest",
        //             "save": 150.11,
        //             "share": 3.03
        //         },
        //         "1672646400000": {
        //             "amount": 2,
        //             "name": "💰 Allowance",
        //             "save": 4,
        //             "share": 2
        //         },
        //         "1673213570000": {
        //             "amount": -7.5,
        //             "name": "Ferry snacks",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1673251200000": {
        //             "amount": 2,
        //             "name": "💰 Allowance",
        //             "save": 4,
        //             "share": 2
        //         },
        //         "1673856000000": {
        //             "amount": 2,
        //             "name": "💰 Allowance",
        //             "save": 4,
        //             "share": 2
        //         },
        //         "1674270326000": {
        //             "amount": -2.2,
        //             "name": "Candy",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1674322966000": {
        //             "amount": -5,
        //             "name": "Cheesecake",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1674460800000": {
        //             "amount": 2,
        //             "name": "💰 Allowance",
        //             "save": 4,
        //             "share": 2
        //         }
        //     }
        // });
        // await set('X92fC0JV9LJyerM7dUwo4', {
        //     "birthday": "2016-9-16",
        //     "interest": 10,
        //     "name": "Henry",
        //     "parents": [
        //         "anagabrielaraphael@gmail.com",
        //         "bullsontheblvd@gmail.com",
        //         "ghleach@gmail.com",
        //         "luckyelement7@gmail.com",
        //         "mrpoptart@gmail.com"
        //     ],
        //     "payday": 1,
        //     "save": 50,
        //     "share": 50,
        //     "transactions": {
        //         "1634422577444": {
        //             "amount": "5.58",
        //             "name": "Initial Amount",
        //             "save": "179.37",
        //             "share": "52.80"
        //         },
        //         "1634540400000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1635104520549": {
        //             "amount": -4.99,
        //             "name": "Robo spider",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1635145200000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1635750000000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1635750060001": {
        //             "amount": 0.43,
        //             "name": "🪙 Interest",
        //             "save": 18.69,
        //             "share": 5.66
        //         },
        //         "1636358400000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1636654664077": {
        //             "amount": "0.00",
        //             "name": "ELGM",
        //             "save": "0.00",
        //             "share": "-63.46"
        //         },
        //         "1636963200000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1637568000000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1637609978574": {
        //             "amount": "-4.49",
        //             "name": "Snake snap bracelet",
        //             "save": "0.00",
        //             "share": "0.00"
        //         },
        //         "1638172800000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1638345660001": {
        //             "amount": 0.53,
        //             "name": "🪙 Interest",
        //             "save": 21.56,
        //             "share": 0.37
        //         },
        //         "1638655770568": {
        //             "amount": "-4.40",
        //             "name": "Cupcake",
        //             "save": "0.00",
        //             "share": "0.00"
        //         },
        //         "1638777600000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1639382400000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1639874391006": {
        //             "amount": "0.25",
        //             "name": "Brought dad phone",
        //             "save": "0.50",
        //             "share": "0.25"
        //         },
        //         "1639987200000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1640034800219": {
        //             "amount": "-1.50",
        //             "name": "Tic tacs",
        //             "save": "0.00",
        //             "share": "0.00"
        //         },
        //         "1640533278000": {
        //             "amount": 25,
        //             "name": "Xmas from Uncles",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1640592000000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1640660657000": {
        //             "amount": -10,
        //             "name": "800 robux",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1640746033000": {
        //             "amount": 25,
        //             "name": "Grandma Ana Xmas",
        //             "save": 50,
        //             "share": 25
        //         },
        //         "1640901569000": {
        //             "amount": -4.99,
        //             "name": "Gravity coil Roblox",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1640913005000": {
        //             "amount": 1,
        //             "name": "Trash help",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1641024060001": {
        //             "amount": 4.12,
        //             "name": "🪙 Interest",
        //             "save": 29.76,
        //             "share": 3.44
        //         },
        //         "1641196800000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1641680760000": {
        //             "amount": -20,
        //             "name": "Charlie's present legos",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1641680820000": {
        //             "amount": -1.39,
        //             "name": "Tictacs",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1641801600000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1642406400000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1642480680000": {
        //             "amount": -10,
        //             "name": "Robux",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1642794360000": {
        //             "amount": 0.75,
        //             "name": "Clean out the garage",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1642821240000": {
        //             "amount": 2,
        //             "name": "Tooth",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1642976760000": {
        //             "amount": -1.39,
        //             "name": "Chocolate",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1643011200000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1643240880000": {
        //             "amount": -5.24,
        //             "name": "Necklace in Hawaii",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1643492940000": {
        //             "amount": -2.64,
        //             "name": "Post card and mentor",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1643616000000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1643665320000": {
        //             "amount": -4.5,
        //             "name": "Haribo gummy bottles",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1643702460001": {
        //             "amount": 0.91,
        //             "name": "🪙 Interest",
        //             "save": 33.99,
        //             "share": 4.41
        //         },
        //         "1644220800000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1644825600000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1645061580000": {
        //             "amount": -1.79,
        //             "name": "Chocolate",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1645430400000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1645733100000": {
        //             "amount": 6,
        //             "name": "Counted change",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1645747140000": {
        //             "amount": -4.99,
        //             "name": "Slime",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1646004780000": {
        //             "amount": -4,
        //             "name": "Squeeze egg",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1646035200000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1646121660001": {
        //             "amount": 1.03,
        //             "name": "🪙 Interest",
        //             "save": 38.39,
        //             "share": 5.35
        //         },
        //         "1646519220000": {
        //             "amount": -3.3,
        //             "name": "Bought candy",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1646640000000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1647241200000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1647724440000": {
        //             "amount": -2,
        //             "name": "Cupcakes",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1647846000000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1648450800000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1648796460001": {
        //             "amount": 1.1,
        //             "name": "🪙 Interest",
        //             "save": 43.23,
        //             "share": 6.38
        //         },
        //         "1649055600000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1649285580000": {
        //             "amount": 0.5,
        //             "name": "Helped with trash",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1649660400000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1649687040000": {
        //             "amount": 1,
        //             "name": "Tooth fairy money",
        //             "save": 0,
        //             "share": 1
        //         },
        //         "1650207060000": {
        //             "amount": 0.3,
        //             "name": "Easter egg change",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1650265200000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1650591720000": {
        //             "amount": -2.5,
        //             "name": "Chips",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1650841560000": {
        //             "amount": -8.69,
        //             "name": "Rubiks 2x2",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1650870000000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1650944760000": {
        //             "amount": -1,
        //             "name": "Didn't listen",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1651196340000": {
        //             "amount": -2,
        //             "name": "Hershey's ",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1651388460001": {
        //             "amount": 0.47,
        //             "name": "🪙 Interest",
        //             "save": 48.55,
        //             "share": 7.62
        //         },
        //         "1651474800000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1652079600000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1652684400000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1653289200000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1653894000000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1654066860001": {
        //             "amount": 1.14,
        //             "name": "🪙 Interest",
        //             "save": 54.65,
        //             "share": 9.01
        //         },
        //         "1654498800000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1654824540000": {
        //             "amount": -2.5,
        //             "name": "Ice skate snack ",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1655103600000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1655489940000": {
        //             "amount": 0.5,
        //             "name": "Modeling",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1655708400000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1655742854000": {
        //             "amount": -2.5,
        //             "name": "ice candy",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1656094920000": {
        //             "amount": -3,
        //             "name": "Nasa store",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1656313200000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1656658860001": {
        //             "amount": 1.01,
        //             "name": "🪙 Interest",
        //             "save": 61.12,
        //             "share": 10.41
        //         },
        //         "1656810285000": {
        //             "amount": 0.5,
        //             "name": "Helped in the kitchen ",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1656918000000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1657522800000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1657903313000": {
        //             "amount": -5.29,
        //             "name": "Paper fan ",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1658127600000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1658274865000": {
        //             "amount": 0.1,
        //             "name": "Found a dime",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1658516289000": {
        //             "amount": 1,
        //             "name": "Campsite cleanup ",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1658732400000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1659129393000": {
        //             "amount": 0.5,
        //             "name": "Trash help",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1659337200000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1659337260001": {
        //             "amount": 1.41,
        //             "name": "🪙 Interest",
        //             "save": 68.48,
        //             "share": 12.07
        //         },
        //         "1659551713000": {
        //             "amount": 0.25,
        //             "name": "Bridge ",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1659942000000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1660430788000": {
        //             "amount": -1.8,
        //             "name": "Mints",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1660432004000": {
        //             "amount": -2,
        //             "name": "Mints",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1660546800000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1661042593000": {
        //             "amount": 0.1,
        //             "name": "found a dime",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1661151600000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1661309034000": {
        //             "amount": -15,
        //             "name": "Satisfactory ",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1661756400000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1662015660001": {
        //             "amount": 0.21,
        //             "name": "🪙 Interest",
        //             "save": 76.33,
        //             "share": 13.78
        //         },
        //         "1662361200000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1662403190000": {
        //             "amount": 0.25,
        //             "name": "Help mommy",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1662773649000": {
        //             "amount": 0.5,
        //             "name": "Helped mom",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1662966000000": {
        //             "amount": 1.25,
        //             "name": "💰 Allowance",
        //             "save": 2.5,
        //             "share": 1.25
        //         },
        //         "1663379565000": {
        //             "amount": 5,
        //             "name": "Genes money for bday",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1663445928000": {
        //             "amount": 25,
        //             "name": "T&C Bday",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1663537348000": {
        //             "amount": 5,
        //             "name": "Bday money from Benjamin ",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1663570800000": {
        //             "amount": 1.5,
        //             "name": "💰 Allowance",
        //             "save": 3,
        //             "share": 1.5
        //         },
        //         "1664131274000": {
        //             "amount": -2.3,
        //             "name": "Pez",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1664175600000": {
        //             "amount": 1.5,
        //             "name": "💰 Allowance",
        //             "save": 3,
        //             "share": 1.5
        //         },
        //         "1664607660001": {
        //             "amount": 4.12,
        //             "name": "🪙 Interest",
        //             "save": 85.06,
        //             "share": 15.71
        //         },
        //         "1664780400000": {
        //             "amount": 1.5,
        //             "name": "💰 Allowance",
        //             "save": 3,
        //             "share": 1.5
        //         },
        //         "1665245738000": {
        //             "amount": -3.5,
        //             "name": "San pellegrino ",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1665381600000": {
        //             "amount": 1.5,
        //             "name": "💰 Allowance",
        //             "save": 3,
        //             "share": 1.5
        //         },
        //         "1665385200000": {
        //             "amount": 1.5,
        //             "name": "💰 Allowance",
        //             "save": 3,
        //             "share": 1.5
        //         },
        //         "1665865599000": {
        //             "amount": -5,
        //             "name": "Arcade",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1665990000000": {
        //             "amount": 1.5,
        //             "name": "💰 Allowance",
        //             "save": 3,
        //             "share": 1.5
        //         },
        //         "1666386467000": {
        //             "amount": -1.5,
        //             "name": "Cat cup",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1666585087000": {
        //             "amount": -4,
        //             "name": "Hammer",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1666594800000": {
        //             "amount": 1.5,
        //             "name": "💰 Allowance",
        //             "save": 3,
        //             "share": 1.5
        //         },
        //         "1667071962000": {
        //             "amount": 0.5,
        //             "name": "Helped with recycling ",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1667199600000": {
        //             "amount": 1.5,
        //             "name": "💰 Allowance",
        //             "save": 3,
        //             "share": 1.5
        //         },
        //         "1667286060001": {
        //             "amount": 4.09,
        //             "name": "🪙 Interest",
        //             "save": 95.37,
        //             "share": 18.18
        //         },
        //         "1667782903000": {
        //             "amount": 0,
        //             "name": "Extra life ",
        //             "save": 0,
        //             "share": -199.98
        //         },
        //         "1667808000000": {
        //             "amount": 1.5,
        //             "name": "💰 Allowance",
        //             "save": 3,
        //             "share": 1.5
        //         },
        //         "1668412800000": {
        //             "amount": 1.5,
        //             "name": "💰 Allowance",
        //             "save": 3,
        //             "share": 1.5
        //         },
        //         "1668900487000": {
        //             "amount": -16.5,
        //             "name": "Want",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1668981453000": {
        //             "amount": -3,
        //             "name": "Snack",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1669017600000": {
        //             "amount": 1.5,
        //             "name": "💰 Allowance",
        //             "save": 3,
        //             "share": 1.5
        //         },
        //         "1669622400000": {
        //             "amount": 1.5,
        //             "name": "💰 Allowance",
        //             "save": 3,
        //             "share": 1.5
        //         },
        //         "1669881660001": {
        //             "amount": 3.15,
        //             "name": "🪙 Interest",
        //             "save": 106.11,
        //             "share": 0.6
        //         },
        //         "1670227200000": {
        //             "amount": 1.5,
        //             "name": "💰 Allowance",
        //             "save": 3,
        //             "share": 1.5
        //         },
        //         "1670793931000": {
        //             "amount": -2.2,
        //             "name": "Mamba candy ",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1670832000000": {
        //             "amount": 1.5,
        //             "name": "💰 Allowance",
        //             "save": 3,
        //             "share": 1.5
        //         },
        //         "1671299690000": {
        //             "amount": -1,
        //             "name": "Farmers market honey",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1671300048000": {
        //             "amount": -4,
        //             "name": "Christmas gifts at the dollar store",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1671436800000": {
        //             "amount": 1.5,
        //             "name": "💰 Allowance",
        //             "save": 3,
        //             "share": 1.5
        //         },
        //         "1672041600000": {
        //             "amount": 1.5,
        //             "name": "💰 Allowance",
        //             "save": 3,
        //             "share": 1.5
        //         },
        //         "1672560060001": {
        //             "amount": 3.34,
        //             "name": "🪙 Interest",
        //             "save": 117.92,
        //             "share": 1.26
        //         },
        //         "1672646400000": {
        //             "amount": 1.5,
        //             "name": "💰 Allowance",
        //             "save": 3,
        //             "share": 1.5
        //         },
        //         "1672971422000": {
        //             "amount": 0.5,
        //             "name": "Trash ",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1673218233000": {
        //             "amount": -3,
        //             "name": "Honey sticks",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1673251200000": {
        //             "amount": 1.5,
        //             "name": "💰 Allowance",
        //             "save": 3,
        //             "share": 1.5
        //         },
        //         "1673421499000": {
        //             "amount": 20,
        //             "name": "Christmas money",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1673481341000": {
        //             "amount": 1,
        //             "name": "Charlie didn't get out of Henry's room",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1673856000000": {
        //             "amount": 1.5,
        //             "name": "💰 Allowance",
        //             "save": 3,
        //             "share": 1.5
        //         },
        //         "1674270344000": {
        //             "amount": -1.1,
        //             "name": "Warheads ",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1674322982000": {
        //             "amount": -5,
        //             "name": "Cheesecake ",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1674460800000": {
        //             "amount": 1.5,
        //             "name": "💰 Allowance",
        //             "save": 3,
        //             "share": 1.5
        //         },
        //         "1674602099000": {
        //             "amount": -3,
        //             "name": "Char bday gift",
        //             "save": 0,
        //             "share": 0
        //         }
        //     }
        // });
        // await set('i7U45-nALrPyfJUwDt-XD', {
        //     "birthday": "2013-1-24",
        //     "interest": "10",
        //     "name": "Charlie",
        //     "parents": [
        //         "bullsontheblvd@gmail.com",
        //         "luckyelement7@gmail.com",
        //         "mrpoptart@gmail.com"
        //     ],
        //     "payday": "1",
        //     "save": "50",
        //     "share": "50",
        //     "transactions": {
        //         "1634422553560": {
        //             "amount": "46.66",
        //             "name": "Initial Amount",
        //             "save": "341.56",
        //             "share": "91.79"
        //         },
        //         "1634488958659": {
        //             "amount": -12.17,
        //             "name": "Minecraft book",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1634540400000": {
        //             "amount": 2,
        //             "name": "💰 Allowance",
        //             "save": 4,
        //             "share": 2
        //         },
        //         "1635104520587": {
        //             "amount": -34.99,
        //             "name": "Wall remote control car",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1635125341717": {
        //             "amount": 0.1875,
        //             "name": "Cleaned raisins",
        //             "save": 0.375,
        //             "share": 0.1875
        //         },
        //         "1635145200000": {
        //             "amount": 2,
        //             "name": "💰 Allowance",
        //             "save": 4,
        //             "share": 2
        //         },
        //         "1635750000000": {
        //             "amount": 2,
        //             "name": "💰 Allowance",
        //             "save": 4,
        //             "share": 2
        //         },
        //         "1635750060001": {
        //             "amount": 0.57,
        //             "name": "🪙 Interest",
        //             "save": 35.39,
        //             "share": 9.8
        //         },
        //         "1636358400000": {
        //             "amount": 2,
        //             "name": "💰 Allowance",
        //             "save": 4,
        //             "share": 2
        //         },
        //         "1636654709769": {
        //             "amount": "0.00",
        //             "name": "ELGM",
        //             "save": "0.00",
        //             "share": "-109.78"
        //         },
        //         "1636963200000": {
        //             "amount": 2,
        //             "name": "💰 Allowance",
        //             "save": 4,
        //             "share": 2
        //         },
        //         "1637568000000": {
        //             "amount": 2,
        //             "name": "💰 Allowance",
        //             "save": 4,
        //             "share": 2
        //         },
        //         "1638172800000": {
        //             "amount": 2,
        //             "name": "💰 Allowance",
        //             "save": 4,
        //             "share": 2
        //         },
        //         "1638345660001": {
        //             "amount": 1.43,
        //             "name": "🪙 Interest",
        //             "save": 40.53,
        //             "share": 0.6
        //         },
        //         "1638777600000": {
        //             "amount": 2,
        //             "name": "💰 Allowance",
        //             "save": 4,
        //             "share": 2
        //         },
        //         "1639382400000": {
        //             "amount": 2,
        //             "name": "💰 Allowance",
        //             "save": 4,
        //             "share": 2
        //         },
        //         "1639987200000": {
        //             "amount": 2,
        //             "name": "💰 Allowance",
        //             "save": 4,
        //             "share": 2
        //         },
        //         "1640533313000": {
        //             "amount": 25,
        //             "name": "Xmas from Uncles",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1640592000000": {
        //             "amount": 2,
        //             "name": "💰 Allowance",
        //             "save": 4,
        //             "share": 2
        //         },
        //         "1640620223984": {
        //             "amount": "0.25",
        //             "name": "Melatonin",
        //             "save": "0.50",
        //             "share": "0.25"
        //         },
        //         "1640620237688": {
        //             "amount": "0.25",
        //             "name": "Spider dream",
        //             "save": "0.50",
        //             "share": "0.25"
        //         },
        //         "1640655250000": {
        //             "amount": 0.25,
        //             "name": "asked for help in the car",
        //             "save": 0.5,
        //             "share": 0.25
        //         },
        //         "1640746017000": {
        //             "amount": 25,
        //             "name": "Grandma Ana Xmas",
        //             "save": 50,
        //             "share": 25
        //         },
        //         "1641024060001": {
        //             "amount": 7.44,
        //             "name": "🪙 Interest",
        //             "save": 51.34,
        //             "share": 4.04
        //         },
        //         "1641196800000": {
        //             "amount": 2,
        //             "name": "💰 Allowance",
        //             "save": 4,
        //             "share": 2
        //         },
        //         "1641275003000": {
        //             "amount": 0.5,
        //             "name": "Help mom",
        //             "save": 1,
        //             "share": 0.5
        //         },
        //         "1641275019000": {
        //             "amount": -19.93,
        //             "name": "Last Kids Video Game",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1641801600000": {
        //             "amount": 2,
        //             "name": "💰 Allowance",
        //             "save": 4,
        //             "share": 2
        //         },
        //         "1642406400000": {
        //             "amount": 2,
        //             "name": "💰 Allowance",
        //             "save": 4,
        //             "share": 2
        //         },
        //         "1642794420000": {
        //             "amount": 0.75,
        //             "name": "Clean out the garage",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1642976760000": {
        //             "amount": -2,
        //             "name": "Chocolate",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1643011200000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1643616000000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1643702460001": {
        //             "amount": 7.17,
        //             "name": "🪙 Interest",
        //             "save": 58.67,
        //             "share": 5.54
        //         },
        //         "1644220800000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1644825600000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1645376820000": {
        //             "amount": -2.79,
        //             "name": "Gum",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1645430400000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1645747080000": {
        //             "amount": -33.99,
        //             "name": "Crash bandicoot",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1646004840000": {
        //             "amount": -8,
        //             "name": "Dragon egg",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1646035200000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1646121660001": {
        //             "amount": 4.31,
        //             "name": "🪙 Interest",
        //             "save": 66.34,
        //             "share": 6.99
        //         },
        //         "1646518200000": {
        //             "amount": -3.3,
        //             "name": "Bought candy at the shoe store",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1646640000000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1647052560000": {
        //             "amount": 0.25,
        //             "name": "Brussel sprouts ",
        //             "save": 0.5,
        //             "share": 0.25
        //         },
        //         "1647131280000": {
        //             "amount": -4,
        //             "name": "Cookie",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1647241200000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1647724440000": {
        //             "amount": -4,
        //             "name": "Drumstick",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1647846000000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1648325193000": {
        //             "amount": -12.28,
        //             "name": "beyblade",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1648450800000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1648679400000": {
        //             "amount": -3.25,
        //             "name": "Coffee cake",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1648796460001": {
        //             "amount": 2.98,
        //             "name": "🪙 Interest",
        //             "save": 74.82,
        //             "share": 8.62
        //         },
        //         "1649055600000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1649660400000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1650265200000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1650591720000": {
        //             "amount": -2.5,
        //             "name": "Chips",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1650739860000": {
        //             "amount": 0,
        //             "name": "Donated to save the ocean",
        //             "save": 0,
        //             "share": -25
        //         },
        //         "1650841500000": {
        //             "amount": -6.51,
        //             "name": "Rubiks 3x1",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1650857820000": {
        //             "amount": -2,
        //             "name": "Didn't listen to mama",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1650870000000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1651196340000": {
        //             "amount": -2,
        //             "name": "Hershey's ",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1651388460001": {
        //             "amount": 2.88,
        //             "name": "🪙 Interest",
        //             "save": 84.1,
        //             "share": 7.88
        //         },
        //         "1651474800000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1651723080000": {
        //             "amount": -4,
        //             "name": "Reese's pieces",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1652079600000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1652313600000": {
        //             "amount": -1.6,
        //             "name": "Ripped up mom s bag",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1652684400000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1653090840000": {
        //             "amount": -5,
        //             "name": "Hopscotching with cat",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1653289200000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1653894000000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1654066860001": {
        //             "amount": 3.23,
        //             "name": "🪙 Interest",
        //             "save": 94.76,
        //             "share": 9.79
        //         },
        //         "1654498800000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1655103600000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1655708400000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1655742823000": {
        //             "amount": -2.5,
        //             "name": "chabot candy",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1655742838000": {
        //             "amount": -2,
        //             "name": "Ice chips",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1655856900000": {
        //             "amount": 0.25,
        //             "name": "Told Mama about her margarita",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1656313200000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1656658860001": {
        //             "amount": 4.03,
        //             "name": "🪙 Interest",
        //             "save": 106.04,
        //             "share": 11.67
        //         },
        //         "1656870961000": {
        //             "amount": -5,
        //             "name": "Private areas",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1656918000000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1657049548000": {
        //             "amount": -1,
        //             "name": "Private areas",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1657522800000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1657747552000": {
        //             "amount": -8,
        //             "name": "Water shooters",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1658127600000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1658516296000": {
        //             "amount": 1,
        //             "name": "Campsite cleanup ",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1658601420000": {
        //             "amount": -14.39,
        //             "name": "Max meow",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1658732400000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1659211266000": {
        //             "amount": -5,
        //             "name": "On to of Malcolm",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1659337200000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1659337260001": {
        //             "amount": 2.32,
        //             "name": "🪙 Interest",
        //             "save": 118.89,
        //             "share": 13.96
        //         },
        //         "1659551726000": {
        //             "amount": 0.25,
        //             "name": "Bridge ",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1659942000000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1660546800000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1660605565000": {
        //             "amount": -5,
        //             "name": "Don't be on top of people",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1661151600000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1661309046000": {
        //             "amount": -15,
        //             "name": "Satisfactory ",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1661756400000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1662015660001": {
        //             "amount": 1.48,
        //             "name": "🪙 Interest",
        //             "save": 132.58,
        //             "share": 16.26
        //         },
        //         "1662309334000": {
        //             "amount": -14.99,
        //             "name": "Super Meat Boy",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1662361200000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1662966000000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1663034881000": {
        //             "amount": -5,
        //             "name": "Touched Private Area",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1663040817000": {
        //             "amount": -5.75,
        //             "name": "Henry's present",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1663379016000": {
        //             "amount": 1,
        //             "name": "Trash",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1663570800000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1663684327000": {
        //             "amount": 1,
        //             "name": "Trash out",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1664066097000": {
        //             "amount": 1,
        //             "name": "Trash out",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1664175600000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1664607660001": {
        //             "amount": 0.25,
        //             "name": "🪙 Interest",
        //             "save": 147.64,
        //             "share": 18.79
        //         },
        //         "1664780400000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1664845949000": {
        //             "amount": -5,
        //             "name": "Farted on henry ",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1665336180000": {
        //             "amount": -1,
        //             "name": "Didn't stop",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1665381600000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1665385200000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1665627611000": {
        //             "amount": 0.5,
        //             "name": "Helping with trash and good attitude ",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1665938978000": {
        //             "amount": 2,
        //             "name": "Art",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1665990000000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1666585070000": {
        //             "amount": -4,
        //             "name": "Hammer",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1666585155000": {
        //             "amount": -5,
        //             "name": "Darts",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1666594800000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1666928771000": {
        //             "amount": 15,
        //             "name": "Trash might",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1667199600000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1667286060001": {
        //             "amount": 1.87,
        //             "name": "🪙 Interest",
        //             "save": 165.1,
        //             "share": 22.01
        //         },
        //         "1667782571000": {
        //             "amount": 0.5,
        //             "name": "Trash cans",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1667782836000": {
        //             "amount": 0,
        //             "name": "Extra life",
        //             "save": 0,
        //             "share": -200
        //         },
        //         "1667808000000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1668316341000": {
        //             "amount": -16.5,
        //             "name": "Wimpy kid book",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1668412800000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1668981442000": {
        //             "amount": -3,
        //             "name": "Snacks",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1669017600000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1669177264000": {
        //             "amount": -5,
        //             "name": "Punched Malcolm in the balls",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1669622400000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1669881660001": {
        //             "amount": 0.56,
        //             "name": "🪙 Interest",
        //             "save": 183.41,
        //             "share": 5.11
        //         },
        //         "1670227200000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1670793877000": {
        //             "amount": -1.75,
        //             "name": "Donut ",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1670832000000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1671299367000": {
        //             "amount": -3,
        //             "name": "Chocolate chip cookie at the Farmers market",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1671436800000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1672041600000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1672560060001": {
        //             "amount": 1.04,
        //             "name": "🪙 Interest",
        //             "save": 203.56,
        //             "share": 6.53
        //         },
        //         "1672646400000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1673218243000": {
        //             "amount": -3,
        //             "name": "Honey sticks ",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1673251200000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1673481315000": {
        //             "amount": -1,
        //             "name": "Didn't get out of Henry's room",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1673856000000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         },
        //         "1674179103000": {
        //             "amount": 0,
        //             "name": "Pop sale",
        //             "save": 0,
        //             "share": -1
        //         },
        //         "1674270289000": {
        //             "amount": -4.4,
        //             "name": "Ice cream",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1674322991000": {
        //             "amount": -5,
        //             "name": "Cheesecake ",
        //             "save": 0,
        //             "share": 0
        //         },
        //         "1674460800000": {
        //             "amount": 2.25,
        //             "name": "💰 Allowance",
        //             "save": 4.5,
        //             "share": 2.25
        //         }
        //     }
        // });
    }

    /**
     *
     * @param transactionIds {Array}
     * @param name {string}
     * @returns {boolean}
     */
    function checkTransactions(transactionIds, name) {
        for (let t in transactionIds) {
            let transaction = kid.transactions[transactionIds[t]];

            // console.log(`${kid.name} checking to see if ${transaction.name} matches ${name}`)
            if (transaction.name === name) {
                // console.log(`${kid.name} ${JSON.stringify(transaction)}`)
                return true;
            }
        }
        return false;
    }

    function ensureAllowance() {
        let keys = Object.keys(kid.transactions);
        let initialTransactionId = keys[0];
        let initialDate = dayjs(parseInt(initialTransactionId));
        let allowanceStart = initialDate.startOf('week').add(8, 'day')
        while (allowanceStart.valueOf() < dayjs().valueOf()) {
            ensureAllowanceForWeek(allowanceStart, keys);
            allowanceStart = allowanceStart.add(7, 'day')
        }
    }

    function ensureAllowanceForWeek(allowanceStart, keys) {
        let allowanceEnd = allowanceStart.add(7, 'day')
        let weekKeys = keys.filter(key => key >= allowanceStart && key < allowanceEnd)
        let foundAllowance = checkTransactions(weekKeys, ALLOWANCE);
        // console.log(`${kid.name} checking between: ${allowanceStart} and ${allowanceEnd}`)
        if (!foundAllowance) {
            let ageAtAllowance = allowanceStart.diff(dayjs(kid.birthday), 'year')

            const time = allowanceStart.valueOf()
            let name = ALLOWANCE;

            let value = moneyRound(ageAtAllowance);
            let save = value * (moneyRound(kid.save) / 100);
            let share = (value - save) * (moneyRound(kid.share) / 100);
            let amount = value - save - share;
            kid.transactions[time] = {
                amount: amount,
                id: time,
                name: name,
                save: save,
                share: share,
            }
            console.log(`${kid.name} No allowance found for: ${allowanceStart}`)
            console.log(`${kid.name} born ${kid.birthday} adding ${time}, ${save}, ${share}, ${amount}, ${name}`)
            transact(time, save, share, amount, name);
        }
    }

    function ensureInterestForMonth(interestStart) {
        let interestEnd = interestStart.startOf('month').add(1, 'month').add(1, 'minute');
        let keys = Object.keys(kid.transactions);
        // console.log(`${kid.name} checking between: ${interestStart} and ${interestEnd}`)
        let monthKeys = keys.filter(key => key > interestStart.valueOf() && key < interestEnd.valueOf())

        let foundInterest = checkTransactions(monthKeys, INTEREST)
        if (!foundInterest) {
            // console.log(`No interest found for ${kid.name} on ${interestStart}`)
            let totalKeys = keys.filter(key => key < interestStart)
            let totalAmount = 0;
            let totalSave = 0;
            let totalShare = 0;
            totalKeys.forEach((key) => {
                let amount = moneyRound(kid.transactions[key].amount);
                let save = moneyRound(kid.transactions[key].save);
                let share = moneyRound(kid.transactions[key].share);
                // console.log(`spend: ${amount} save: ${save} share: ${share}`)
                totalAmount += amount;
                totalSave += save;
                totalShare += share;
            })
            // console.log(`totalSpend: ${moneyRound(totalAmount)} totalSave: ${moneyRound(totalSave)} totalShare: ${moneyRound(totalShare)}`)
            let interestAmount = moneyRound(totalAmount * kid.interest / 100);
            let interestSave = moneyRound(totalSave * kid.interest / 100);
            let interestShare = moneyRound(totalShare * kid.interest / 100);
            const time = interestStart.valueOf() + 1;
            console.log(`${time}, ${interestSave}, ${interestShare}, ${interestAmount}, ${INTEREST}`);
            kid.transactions[time] = {
                amount: interestAmount,
                id: time,
                name: INTEREST,
                save: interestSave,
                share: interestShare,
            }
            transact(time, interestSave, interestShare, interestAmount, INTEREST);

        }
    }

    function ensureInterest() {
        let keys = Object.keys(kid.transactions);
        let initialTransactionId = keys[0];
        let initialDate = dayjs(parseInt(initialTransactionId));
        let interestStart = initialDate.startOf('month').add(1, 'month').add(1, 'minute');
        if (interestStart > dayjs()) {
            return;
        }
        while (interestStart.add(1, 'month').valueOf() < dayjs().valueOf()) {
            ensureInterestForMonth(interestStart);
            interestStart = interestStart.add(1, 'month')
        }
        ensureInterestForMonth(interestStart, keys);
    }

    function handleSpend(e) {
        console.log(`handling ${JSON.stringify(e.detail)}`);
        const time = new Date(e.detail.date).getTime()
        let name = e.detail.name;
        let value = e.detail.amount;
        let save = 0;
        let share = 0;
        let amount = 0;

        switch (e.detail.spendFrom) {
            case 'spend':
                amount = value;
                if (amount > 0) amount *= -1;
                break;
            case 'save':
                save = value;
                if (save > 0) save *= -1;
                break;
            case 'share':
                share = value;
                if (share > 0) share *= -1;
                break;
        }
        transact(time, save, share, amount, name);
    }

    function handleEarn(e) {
        console.log(`handling ${JSON.stringify(e.detail)}`);
        const time = new Date(e.detail.date).getTime()
        let name = e.detail.name;
        let value = e.detail.amount;
        let save = 0;
        let share = 0;

        if (e.detail.save) {
            save = value * (moneyRound(kid.save) / 100);
        }

        if (e.detail.share) {
            share = (value - save) * (moneyRound(kid.share) / 100);
        }

        let amount = value - save - share;
        transact(time, save, share, amount, name);
    }

    async function saveKid(e) {
        let updatedKid = e.detail;
        await update(`${kid.id}`, updatedKid);
        hash.set('kid', updatedKid.name)
    }
</script>

{#if visible}
    <Container>
        <Row>
            <Col>
                <div class="name">{kid.name}</div>
            </Col>
        </Row>
        <Row>
            <Col>
                <div style="text-align: center">Spend</div>
                <div style="line-height: 80px;font-size: 80px; font-family: Impact, sans-serif; text-align: center">{currencyFormatter(kid.spendable)}</div>
            </Col>
        </Row>
        <Row>
            <Col style="text-align: center">Savings {currencyFormatter(kid.saved)}</Col>
            <Col style="text-align: center">Sharing {currencyFormatter(kid.shared)}</Col>
        </Row>
    </Container>

    <Table bordered style="width: 100%;margin: 15px 0;">
        <tr class="payday-head" style="width: 100%; font-size: 12px;">
            <td>{lastMonday.format('M/D')}</td>
            <td>Tues</td>
            <td>Weds</td>
            <td>Thurs</td>
            <td>Fri</td>
            <td>Sat</td>
            <td>Sun</td>
            <td>{lastMonday.add(7, 'days').format('M/D')}</td>
        </tr>
        <tr style="width: 100%">
            {#each Array(8) as ai, i}
                <td style="text-align:center; font-size: 20px;">
                    {#if (dayjs().diff(lastMonday, 'days') === i)}
                        <Icon name="star-fill"/>
                    {/if}
                </td>
            {/each}
        </tr>
    </Table>


    <ButtonGroup style="width:100%; display:flex">
        <Transact kid="{kid}" on:submit={handleSpend} spend/>
        <Transact kid="{kid}" on:submit={handleEarn}/>
        <KidSettings kid="{kid}" on:consolidate={consolidate} on:save={saveKid}/>
    </ButtonGroup>


    <KidTransactionTable kid="{kid}" lastPayday="{lastMonday}"/>
{/if}


<style>
    .name {
        text-align: center;
        font-family: Brush Script MT, Brush Script Std, cursive;
        font-size: 70px;
        line-height: 70px;
        margin: 20px 0 10px;
    }

    .payday-head td {
        padding: 3px;
        width: 12.5%;
        text-align: center;
    }
</style>