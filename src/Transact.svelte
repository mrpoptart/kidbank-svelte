<script>
    import dayjs from 'dayjs';
    import { createEventDispatcher } from 'svelte';
    import {
        Button,
        Form,
        FormGroup, Icon,
        Input,
        Label,
        Modal,
        ModalBody,
        ModalFooter,
        ModalHeader
    } from "sveltestrap";
    const dispatch = createEventDispatcher();

    export let kid;
    export let spend = false;

    let amount;
    let date;
    let name;
    let save;
    let share;
    let spendFrom;

    function reset(){
        amount='';
        date=dayjs().format('YYYY-MM-DDTHH:mm:ss');
        console.log(date)
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
    function onChange(e){
        console.log(e.target.value)
    }
</script>
{#if spend}
    <Button size="lg" danger on:click={toggle}>
        <Icon name="wallet"/>
        Spend
    </Button>
{:else}
    <Button size="lg" primary on:click={toggle}>
        <Icon name="piggy-bank"/>
        Earn
    </Button>
{/if}
<Modal isOpen={open} {toggle}>
    <ModalHeader>What was {spend?'spent':'earned'}?</ModalHeader>
    <ModalBody>
        <Form>
            <FormGroup>
                <Label>Date</Label>
                <Input type="datetime-local" bind:value={date} on:change={onChange} step="2"/>
            </FormGroup>
            <FormGroup>
                <Label>Name</Label>
                <Input type="text" bind:value={name} placeholder="{spend?'What was bought?':'What was earned?'}"/>
            </FormGroup>
            <FormGroup>
                <Label>Amount</Label>
                <Input type="number" bind:value={amount} placeholder="How much?"/>
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
</style>