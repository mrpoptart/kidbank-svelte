<script>
    import dayjs from 'dayjs';
    import { createEventDispatcher } from 'svelte';
    import {
        Button,
        Form,
        FormGroup, Icon,
        Input, InputGroup, InputGroupText,
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
    let submitted = false;

    function reset(){
        amount='';
        date=dayjs().format('YYYY-MM-DDTHH:mm:ss');
        name='';
        save=true;
        share=true;
        spendFrom='spend';
        submitted = false;
    }

    function submit(){
        submitted = true;
        if(
            isNaN(Date.parse(date)) ||
            isNaN(parseFloat(amount)) ||
            parseFloat(amount) <= 0 ||
            name.trim() === ''
        ) {
            return
        }
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
        submitted = false;
        toggle();
    }
    let open = false;
    const toggle = () => {
        open = !open;
        reset();
    };
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
                <Input invalid={submitted && isNaN(Date.parse(date))} feedback="Please choose a date" type="datetime-local" bind:value={date} step="2"/>
            </FormGroup>
            <FormGroup>
                <Input invalid={submitted && name.trim() === ''} feedback="Please include a reason"  type="text" bind:value={name} placeholder="For what reason?"/>
            </FormGroup>
            <FormGroup>
                <InputGroup>
                    <InputGroupText>$</InputGroupText>
                    <Input invalid={submitted && (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0)} feedback="Please provide a positive number"  type="number" bind:value={amount} placeholder="Amount?"/>
                </InputGroup>
            </FormGroup>
        </Form>
        {#if spend}
            <h5>Spend from:</h5>
            <FormGroup style="display: flex; gap: 10px;">
                <Input name="spend" type="radio" bind:group={spendFrom} value="spend" label="Spend"/>
                <Input name="spend" type="radio" bind:group={spendFrom} value="share" label="Share"/>
                <Input name="spend" type="radio" bind:group={spendFrom} value="save" label="Save"/>
            </FormGroup>
        {:else}
            <FormGroup style="display: flex; gap: 10px;">
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