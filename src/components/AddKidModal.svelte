<script>
    import {user} from "../store";
    import {
        Button,
        Form,
        FormGroup,
        Input,
        InputGroup,
        InputGroupText,
        Label,
        ModalBody,
        ModalFooter,
        ModalHeader
    } from "sveltestrap";
    import dayjs from "dayjs";
    import {createEventDispatcher, onMount} from "svelte";

    const dispatch = createEventDispatcher()

    function addKid() {
        if (
            name === '' ||
            birthday === '' ||
            initialSpend === null ||
            initialShare === null ||
            initialSave === null
        ) {
            return;
        }
        let child = {
            name,
            birthday,
            payday: 1,
            interest: 10,
            save: 50,
            share: 50,
            transactions: {},
            parents: {},
        };
        child.parents[$user.key] = true;
        child.transactions[new Date().getTime()] = {
            name: "Initial Amount",
            amount: initialSpend,
            save: initialSave,
            share: initialShare,
        };
        dispatch('addKid', child);
    }

    function reset(){
        name = '';
        birthday = dayjs().subtract(4, 'years').format('YYYY-M-D');
        initialSpend = null;
        initialShare = null;
        initialSave = null;
    }

    onMount(()=>{reset()})

    let name;
    let birthday;
    let initialSpend;
    let initialShare;
    let initialSave;
</script>


<ModalHeader>Add a Kid</ModalHeader>
<ModalBody>
    <Form>
        <FormGroup>
            <Label for="name">Name</Label>
            <Input invalid={name===''} feedback="Name is required" bind:value={name} type="text" id="name"
                   placeholder="Kid's name"/>
        </FormGroup>
        <FormGroup>
            <Label for="birthday">Birthday</Label>
            <Input invalid={birthday===''} feedback="Birthday is required" bind:value={birthday} type="date"
                   id="birthday" placeholder="Kid's birthday"/>
        </FormGroup>
        <FormGroup>
            <Label for="initialSpend">Spend</Label>
            <InputGroup>
                <InputGroupText>$</InputGroupText>
                <Input invalid={initialSpend === null} feedback="Spend amount is required" bind:value={initialSpend}
                       type="number" id="initialSpend" placeholder="Initial spend Amount"/>
            </InputGroup>
        </FormGroup>
        <FormGroup>
            <Label for="initialShare">Share</Label>
            <InputGroup>
                <InputGroupText>$</InputGroupText>
                <Input invalid={initialShare === null} feedback="Share amount is required" bind:value={initialShare}
                       type="number" id="initialShare" placeholder="Initial share Amount"/>
            </InputGroup>
        </FormGroup>
        <FormGroup>
            <Label for="initialSave">Save</Label>
            <InputGroup>
                <InputGroupText>$</InputGroupText>
                <Input invalid={initialSave === null} feedback="Save amount is required" bind:value={initialSave}
                       type="number" id="initialSave" placeholder="Initial save Amount"/>
            </InputGroup>
        </FormGroup>
    </Form>

</ModalBody>
<ModalFooter>
    <Button on:click={addKid} color="primary">Add {name}</Button>
    <Button on:click={()=>dispatch('cancel')} color="secondary">Cancel</Button>
</ModalFooter>