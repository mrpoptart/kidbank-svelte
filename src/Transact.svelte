<script>
    import dayjs from 'dayjs';
    import {currencyFormatter} from "./helpers";
    import { createEventDispatcher } from 'svelte';
    import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "sveltestrap";
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
        toggle();
    }
    let open = false;
    const toggle = () => {
        open = !open;
        reset();
    };
</script>
<Button on:click={toggle}>{spend?'Spend':'Earn'}</Button>
<Modal isOpen={open} {toggle}>
    <ModalHeader>What was {spend?'spent':'earned'}?</ModalHeader>
    <ModalBody>
        <Form>
            <FormGroup>
                <Label>Date</Label>
                <Input type="datetime-local" bind:value={date} step="2"/>
            </FormGroup>
            <FormGroup>
                <Label>Name</Label>
                <Input type="text" bind:value={name} placeholder="What was done?"/>
            </FormGroup>
            <FormGroup>
                <Label>Amount</Label>
                <Input type="number" bind:value={amount} placeholder="How much was {spend?'spent':'earned'}?"/>
            </FormGroup>
        </Form>
        {#if spend}
            <h3>Spend from:</h3>
            <FormGroup>
                <Input name="spend" type="radio" bind:group={spendFrom} value="spend" label="Spend"/>
                <Input name="spend" type="radio" bind:group={spendFrom} value="share" label="Share"/>
                <Input name="spend" type="radio" bind:group={spendFrom} value="save" label="Save"/>
            </FormGroup>
        {:else}
            <FormGroup>
                <Input label="Save ({kid.save}%)?" type="checkbox" bind:checked={save}/>
                <Input label="Share ({kid.share}%)?" type="checkbox" bind:checked={share}/>
            </FormGroup>
        {/if}
    </ModalBody>
    <ModalFooter>
        <Button color="secondary"  on:click={toggle}>Cancel</Button>
        <Button color="primary" on:click={submit}>Save</Button>
    </ModalFooter>
</Modal>

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