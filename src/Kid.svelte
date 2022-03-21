<script>
    import {currencyFormatter, hash} from "./helpers";
    import {payAllowance, payInterest, set, update} from "./firebase";
    import KidTransactionTable from "./components/KidTransactionTable.svelte";
    import dayjs from "dayjs";
    import Transact from "./Transact.svelte";
    import {
        Button,
        ButtonDropdown,
        ButtonGroup,
        Col,
        Container, DropdownItem,
        DropdownMenu,
        DropdownToggle,
        Icon,
        Row, Table
    } from "sveltestrap";
    import KidSettings from "./components/KidSettings.svelte";

    export let kid;
    export let visible = false;

    let today = dayjs();
    let startOfWeek = today.startOf('week');
    let lastMonday = startOfWeek.add(1, 'day');
    // since the week starts on sunday, the "start of week"
    // monday might be after today if today is sunday.
    if(lastMonday > today) {
        lastMonday = lastMonday.subtract(7, 'day');
    }
    ensureAllowance()

    function transact(time, save, share, amount, name) {
        set(`children/${kid.id}/transactions/${time}`, {
            save,
            share,
            amount,
            name,
        })
    }

    /**
     *
     * @param transactionIds {Array}
     * @returns {boolean}
     */
    function checkTransactionsForAllowance(transactionIds){
        let allowanceFound = false;
        for (let t in transactionIds) {
            let transaction = kid.transactions[transactionIds[t]];
             if (transaction.name === '💰 Allowance') {
                allowanceFound = true;
            }
        }
        return allowanceFound;
    }

    function ensureAllowanceForWeek(allowanceStart, keys){
        let allowanceEnd = allowanceStart.add(7, 'day')
        let weekKeys = keys.filter(key=>key > allowanceStart && key < allowanceEnd)
        let foundAllowance = checkTransactionsForAllowance(weekKeys);
        if(!foundAllowance){
            let ageAtAllowance = allowanceStart.diff(dayjs(parseInt(kid.birthday)), 'year')

            const time = allowanceStart.valueOf()
            let name = '💰 Allowance';

            let value = parseFloat(ageAtAllowance);
            let save = value * (parseFloat(kid.save) / 100);
            let share = (value - save) * (parseFloat(kid.share) / 100);
            let amount = value - save - share;
            transact(time, save, share, amount, name);
        }

    }

    function ensureAllowance() {
        let keys = Object.keys(kid.transactions);
        let initialTransactionId = keys[0];
        let initialDate = dayjs(parseInt(initialTransactionId));
        let allowanceStart = initialDate.startOf('week').add(8, 'day')
        while(allowanceStart.valueOf() < dayjs().valueOf()) {
            ensureAllowanceForWeek(allowanceStart, keys);
            allowanceStart = allowanceStart.add(7, 'day')
        }


        // start with the week of the initial payment
        // add a week to it
        // for each week afterward until today
            // determine if an allowance was granted
        // for each month afterward until today
            // determine if interest was granted

        // console.log(`new Kid: ${kid.name}`)
        // let lastAllowance = false;
        // for (let t in kid.transactions) {
        //     let transaction = kid.transactions[t];
        //     let prevAllowanceDay;
        //     let startOfPrevWeek;
        //     let prevWeekStart;
        //     let prevWeekEnd;
        //     if(!lastAllowance || transaction.name === '💰 Allowance') {
        //         lastAllowance = transaction;
        //         prevAllowanceDay = dayjs(parseInt(transaction.id));
        //         startOfPrevWeek = prevAllowanceDay.startOf('week');
        //         prevWeekStart = startOfPrevWeek.add(1, 'day');
        //         prevWeekEnd = prevWeekStart.add(7, 'day');
        //         console.log(transaction)
        //         console.log(`Checking to see if ${dayjs(parseInt(transaction.id))} is less than ${prevWeekEnd}`)
        //     } else {
        //         console.log(transaction)
        //     }
        // }
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
            save = value * (parseFloat(kid.save) / 100);
        }

        if (e.detail.share) {
            share = (value - save) * (parseFloat(kid.share) / 100);
        }

        let amount = value - save - share;
        transact(time, save, share, amount, name);
    }

    async function saveKid(e) {
        let updatedKid = e.detail;
        await update(`children/${kid.id}`, updatedKid);
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
        <ButtonDropdown style="width: 100%">
            <DropdownToggle color="primary" caret>Transact</DropdownToggle>
            <DropdownMenu style="width: 100%">
                <Transact kid="{kid}" on:submit={handleSpend} spend/>
                <Transact kid="{kid}" on:submit={handleEarn}/>
                <DropdownItem on:click={()=>{payAllowance(kid)}}>
                    <Icon name="cash"/>
                    Allowance - {currencyFormatter(dayjs().diff(kid.birthday, 'years'))}
                </DropdownItem>
                <DropdownItem on:click={()=>{payInterest(kid)}}>
                    <Icon name="percent"/>
                    Interest - {kid.interest}%
                </DropdownItem>
            </DropdownMenu>
        </ButtonDropdown>
        <KidSettings kid="{kid}" on:save={saveKid}/>
    </ButtonGroup>


    <KidTransactionTable kidId="{kid.id}" transactions="{kid.transactions}" lastPayday="{lastMonday}"/>
{/if}


<style>
    .name {
        text-align: center;
        font-family: Brush Script MT, Brush Script Std, cursive;
        font-size: 70px;
        line-height: 70px;
        margin: 20px 0 10px;
    }

    .payday-head td{
        padding: 3px;
        width: 12.5%;
        text-align: center;
    }
</style>