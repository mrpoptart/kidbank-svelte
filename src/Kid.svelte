<script>
    import {currencyFormatter} from "./helpers";
    import {payAllowance, payInterest, set} from "./firebase";
    import KidTransactionTable from "./components/KidTransactionTable.svelte";
    import dayjs from "dayjs";
    import Transact from "./Transact.svelte";

    export let kid;
    export let visible = false;

    let lastPayday = Math.abs(dayjs().isoWeekday(kid.payday) - dayjs()) / 1000 / 60 / 60 / 24 + 1;
    function handleSpend(e){
        console.log(`handling ${JSON.stringify(e.detail)}`);
        const time = new Date(e.detail.date).getTime()
        // set(`children/${kid.id}/transactions/${time}`, {
        //     save: e.detail.save,
        //     share: e.detail.share,
        //     amount: -e.detail.amount,
        //     name: e.detail.name,
        // })
    }
    function handleEarn(e){
        console.log(`handling ${JSON.stringify(e.detail)}`);
        const time = new Date(e.detail.date).getTime()
        //if we save
        //if we share
        //if we both
    }
</script>

{#if visible}
    <div class="name">{kid.name}</div>
    <h2>Spendable {currencyFormatter(kid.spendable)}</h2>
    <div style="margin: 10px">
        <div>Savings {currencyFormatter(kid.saved)}</div>
        <div>Sharing {currencyFormatter(kid.shared)}</div>
    </div>
    <div style="margin: 10px">
        <div>Last Payday: {dayjs().subtract(lastPayday, 'days').format('M-D-YYYY')}</div>
        <div>Today: {dayjs().format('M-D-YYYY')}</div>
        <div>Next Payday: {dayjs().add(7 - lastPayday, 'days').format('M-D-YYYY')}</div>
    </div>
    <Transact kid="{kid}" on:submit={handleSpend} spend/>
    <Transact kid="{kid}" on:submit={handleEarn} />
    <button on:click={()=>{payAllowance(kid)}}>Allowance</button>
    <button on:click={()=>{payInterest(kid)}}>Interest</button>
    <KidTransactionTable kidId="{kid.id}" transactions="{kid.transactions}"/>
{/if}


<style>
    .name {
        font-family: Brush Script MT, Brush Script Std, cursive;
        font-size: 70px;
        line-height: 70px;
        margin: 20px 0 10px;
    }
</style>