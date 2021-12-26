<script>
    import {currencyFormatter, hash} from "./helpers";
    import {payAllowance, payInterest, set, update} from "./firebase";
    import KidTransactionTable from "./components/KidTransactionTable.svelte";
    import dayjs from "dayjs";
    import Transact from "./Transact.svelte";
    import {Button, Col, Container, Icon, Row} from "sveltestrap";
    import KidSettings from "./components/KidSettings.svelte";

    export let kid;
    export let visible = false;

    let lastPayday = Math.abs(dayjs().isoWeekday(kid.payday) - dayjs()) / 1000 / 60 / 60 / 24 + 1;

    function transact(time, save, share, amount, name) {
        set(`children/${kid.id}/transactions/${time}`, {
            save,
            share,
            amount,
            name,
        })
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
                if(amount > 0) amount *=-1;
                break;
            case 'save':
                save = value;
                if(save > 0) save *=-1;
                break;
            case 'share':
                share = value;
                if(share > 0) share *=-1;
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

    async function saveKid(e){
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
                <h2 style="text-align: center">Spendable {currencyFormatter(kid.spendable)}</h2>
            </Col>
        </Row>
        <Row>
            <Col style="text-align: center">Savings {currencyFormatter(kid.saved)}</Col>
            <Col style="text-align: center">Sharing {currencyFormatter(kid.shared)}</Col>
        </Row>
    </Container>
    <div style="margin: 10px">
        <div>{dayjs().subtract(lastPayday+1, 'days').format('MMM-D')}: Last Paycheck</div>
        <div>{dayjs().format('MMM-D')}: Today</div>
        <div>{dayjs().add(8 - lastPayday, 'days').format('MMM-D')}: Next Paycheck</div>
    </div>
    <Transact kid="{kid}" on:submit={handleSpend} spend/>
    <Transact kid="{kid}" on:submit={handleEarn}/>
    <Button on:click={()=>{payAllowance(kid)}}>Allowance</Button>
    <Button on:click={()=>{payInterest(kid)}}>Interest</Button>
    <KidSettings kid="{kid}" on:save={saveKid}/>
    <KidTransactionTable kidId="{kid.id}" transactions="{kid.transactions}"/>
{/if}


<style>
    .name {
        text-align: center;
        font-family: Brush Script MT, Brush Script Std, cursive;
        font-size: 70px;
        line-height: 70px;
        margin: 20px 0 10px;
    }
</style>