<script>
    import dayjs from 'dayjs';
    import {currencyFormatter} from "./helpers";
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let kid;
    export let spend = false;

    let showTransact=false;
    let amount;
    let date;
    let name;
    let save;
    let share;
    let spendFrom;

    function reset(){
        amount='';
        date=dayjs().format('YYYY-M-DTHH:mm:ss');
        name='';
        save=true;
        share=true;
        spendFrom='spend';
    }

    function submit(){
        let payload
        if(spend){
            payload = {
                amount,
                date,
                name,
                spendFrom,
            };
        } else {
            payload = {
                amount,
                date,
                name,
                save,
                share,
            };
        }
        dispatch('submit', payload);
        showTransact=false;
    }

</script>

<button on:click={()=>{reset(); showTransact=true}}>{spend?'Spend':'Earn'}</button>
{#if showTransact}
    <div on:click="{(e)=>{if(e.currentTarget.id === 'overlay') showTransact=false;}}" id="overlay">
        <div on:click="{(e)=>{e.stopPropagation()}}" class="card">
            <h1>What was {spend?'spent':'earned'}?</h1>
            <label>Date
                <input style="width: 100%" type="datetime-local" bind:value={date} step="2">
            </label>
            <label>Name
                <input style="width: 100%" type="text" bind:value={name} placeholder="What was done?">
            </label>
            <label>Amount
                <input style="width: 100%" type="text" bind:value={amount} placeholder="How much was {spend?'spent':'earned'}?">
            </label>
            {#if spend}
                <h3>Spend from:</h3>
                <label>Spend ({currencyFormatter(kid.spendable)})
                    <input name="spend" type="radio" bind:group={spendFrom} value="spend">
                </label>
                <label>Share ({currencyFormatter(kid.shared)})
                    <input name="spend" type="radio" bind:group={spendFrom} value="share">
                </label>
                <label>Share ({currencyFormatter(kid.saved)})
                    <input name="spend" type="radio" bind:group={spendFrom} value="save">
                </label>
            {:else}
                <label>Save ({kid.save}%)?</label>
                <input type="checkbox" bind:checked={save}>
                <label>Share ({kid.share}%)?</label>
                <input type="checkbox" bind:checked={share}>
            {/if}
            <br>
            <button on:click={()=>{showTransact=false}}>Cancel</button>
            <button on:click={submit}>Save</button>
        </div>
    </div>
{/if}

<style>
    #overlay{
        width: 100%;
        position: absolute;
        top:0px;
        left:0px;
        height: 100%;
        background: rgba(121, 121, 121, 0.27);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .card {
        padding: 2em;
        background-color: #FFFFFF;
        border-radius: 5px;
        box-shadow: 2px 2px 5px #888888;
    }
</style>