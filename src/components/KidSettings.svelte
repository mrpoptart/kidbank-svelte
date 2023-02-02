<script>
    import {
        Form,
        FormGroup,
        Input,
        InputGroup,
        InputGroupText,
        Button,
        Icon,
        Modal,
        ModalHeader,
        ModalBody,
        ModalFooter,
        Label,
    } from "sveltestrap";
    import dayjs from "dayjs";
    import {update, remove} from "../firebase";
    import {createEventDispatcher, onMount} from "svelte";
    import Parents from "./Parents.svelte";

    let dispatch = createEventDispatcher();

    export let kid;
    let open = false;
    const toggle = () => (open = !open);
    let name;
    let birthday;
    let interest;
    let save;
    let share;

    onMount(() => {
        reset();
    })

    function reset() {
        birthday = dayjs(kid.birthday).format('YYYY-MM-DD');
        name = kid.name;
        interest = kid.interest;
        save = kid.save;
        share = kid.share;
    }

    function saveKid() {
        console.log('saving')
        let updatedKid = {
            birthday,
            name,
            interest,
            save,
            share,
        }
        dispatch('save', updatedKid);
    }

    async function deleteKid() {
        console.log(`deleting ${kid.name}`)
        await remove(kid.id)
        toggle();
        window.location.hash = '';
        window.location.reload()
    }

    async function consolidate() {
        console.log(`consolidating ${kid.name}`)
        kid.transactions = {};
        kid.transactions[new Date().getTime()] = {
            name: 'Initial Amount',
            amount: kid.spendable,
            save: kid.saved,
            share: kid.shared,
        };
        await dispatch('consolidate', kid);
        toggle();
    }
</script>

<Button size="lg" style="min-width: 3rem" on:click={toggle}>
    <Icon name="gear-fill"/>
</Button>
<Modal isOpen={open} {toggle}>
    <ModalHeader {toggle}>Settings for {name}</ModalHeader>
    <ModalBody>
        <Form>
            <FormGroup>
                <Label for="name">Name</Label>
                <Input id="name" type="text" bind:value={name}/>
            </FormGroup>
            <FormGroup>
                <Label for="birthday">Birthday</Label>
                <Input id="birthday" type="date" bind:value={birthday}/>
            </FormGroup>
            <FormGroup>
                <Label for="saveRange">Interest Rate (% per month)</Label>
                <InputGroup>
                    <Input on:change={saveKid} type="number" bind:value={interest}/>
                    <InputGroupText>%</InputGroupText>
                </InputGroup>
            </FormGroup>
            <FormGroup>
                <Label for="saveRange">Save Rate (% per allowance, calculated first)</Label>
                <InputGroup>
                    <Input on:change={saveKid} type="number" bind:value={save}/>
                    <InputGroupText>%</InputGroupText>
                </InputGroup>
                <InputGroup>
                    <Input on:change={saveKid} style="width:100%;" id="saveRange" type="range" step="{5}" min={0} max={100} bind:value={save}/>
                </InputGroup>
            </FormGroup>
            <FormGroup>
                <Label for="shareRange">Share Rate (% per allowance, calculated second)</Label>
                <InputGroup>
                    <Input on:change={saveKid} type="number" bind:value={share}/>
                    <InputGroupText>%</InputGroupText>
                </InputGroup>
                <InputGroup>
                    <Input on:change={saveKid} style="width:100%;" id="shareRange" type="range" step="{5}" min={0} max={100} bind:value={share}/>
                </InputGroup>
            </FormGroup>
        </Form>

        <Parents {kid} {toggle}/>

        <Button color="danger" on:click={deleteKid}>Delete {name}</Button>
        <Button color="primary" on:click={consolidate}>Consolidate all transactions</Button>
    </ModalBody>
    <ModalFooter>
        <Button color="primary" on:click={open=false}>Done</Button>
    </ModalFooter>
</Modal>

<style>
</style>