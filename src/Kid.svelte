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

    let lastPayday = dayjs().startOf('week').add(kid.payday, 'day');

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
        <tr style="width: 100%; font-size: 12px;">
            <td style="width:12.5%; text-align: center;">{lastPayday.format('M/D')}</td>
            <td style="width:12.5%; text-align: center;">Tues</td>
            <td style="width:12.5%; text-align: center;">Weds</td>
            <td style="width:12.5%; text-align: center;">Thurs</td>
            <td style="width:12.5%; text-align: center;">Fri</td>
            <td style="width:12.5%; text-align: center;">Sat</td>
            <td style="width:12.5%; text-align: center;">Sun</td>
            <td style="width:12.5%; text-align: center;">{lastPayday.add(7, 'days').format('M/D')}</td>
        </tr>
        <tr style="width: 100%">
            {#each Array(8) as ai, i}
                <td style="text-align:center; font-size: 20px;">
                    {#if (dayjs().diff(lastPayday, 'days') === i)}
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


    <KidTransactionTable kidId="{kid.id}" transactions="{kid.transactions}" lastPayday="{lastPayday}"/>
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