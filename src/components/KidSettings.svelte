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
        ListGroup
    } from "sveltestrap";
    import dayjs from "dayjs";
    import {set, remove, update} from "../firebase";
    import {createEventDispatcher, onMount} from "svelte";
    import {user} from "../store";

    let dispatch = createEventDispatcher();

    export let kid;
    let open = false;
    const toggle = () => (open = !open);
    let name;
    let birthday;
    let interest;
    let save;
    let share;
    let parentEmail;
    let invalidEmail = false;
    let validEmail = false;

    onMount(() => {
        reset();
    })

    function reset() {
        console.log('resetting')
        console.log(kid.birthday)
        birthday = dayjs(kid.birthday).format('YYYY-MM-DD');
        console.log(birthday)
        name = kid.name;
        interest = kid.interest;
        save = kid.save;
        share = kid.share;
        parentEmail = '';
    }

    function saveKid() {
        let updatedKid = {
            birthday,
            name,
            interest,
            save,
            share,
        }
        dispatch('save', updatedKid);
        open = false;
    }

    async function addParent(e) {
        e.preventDefault();
        if(invalidEmail) return;
        parentEmail = parentEmail.toLowerCase()
        let emailKey = parentEmail.replace('.', '%2E');
        console.log(`Adding parent: ${parentEmail}`)
        await set(`children/${kid.id}/parents/${emailKey}`, true)
        await set(`parents/${emailKey}/${kid.id}`, true)
        parentEmail = '';
    }

    async function deleteParent(email) {
        await remove(`children/${kid.id}/parents/${email}`);
        await remove(`parents/${email}/${kid.id}`);
        if (email === $user.key) {
            window.location.hash = '';
            toggle();
        }
    }
    function testEmail(){
        invalidEmail = !String(parentEmail)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        validEmail = !invalidEmail;
    }

    async function deleteKid() {
        console.log(`deleting ${kid.name}`)
        const parents = Object.keys(kid.parents);
        const changes = {};
        changes[`children/${kid.id}`] = null;
        for (let p in parents) {
            changes[`parents/${parents[p]}/${kid.id}`] = null;
        }
        console.log(JSON.stringify(changes))
        await update('/', changes);
        toggle();
        window.location.hash = '';
        window.location.reload()
    }

    async function consolidate() {
        console.log(`consolidating ${kid.name}`)
        const transactions = Object.keys(kid.transactions);
        const changes = {};
        let payload = {
            amount: kid.spendable,
            name: 'Initial Amount',
            save: kid.saved,
            share: kid.shared,
        };
        await dispatch('consolidate', payload);
        for (let t in transactions) {
            changes[`children/${kid.id}/transactions/${transactions[t]}`] = null;
        }
        await update(`/`, changes);
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
                    <Input type="number" bind:value={interest}/>
                    <InputGroupText>%</InputGroupText>
                </InputGroup>
            </FormGroup>
            <FormGroup>
                <Label for="saveRange">Save Rate (% per allowance, calculated first)</Label>
                <InputGroup>
                    <Input id="saveRange" type="range" step="{5}" min={0} max={100} bind:value={save}/>
                </InputGroup>
                <InputGroup>
                    <Input type="number" bind:value={save}/>
                    <InputGroupText>%</InputGroupText>
                </InputGroup>
                <InputGroup>
                    <Input style="width:100%;" id="saveRange" type="range" step="{5}" min={0} max={100} bind:value={save}/>
                </InputGroup>
            </FormGroup>
            <FormGroup>
                <Label for="shareRange">Share Rate (% per allowance, calculated second)</Label>
                <InputGroup>
                   <Input id="shareRange" type="range" step="{5}" min={0} max={100} bind:value={share}/>
                </InputGroup>
                <InputGroup>
                    <Input type="number" bind:value={share}/>
                    <InputGroupText>%</InputGroupText>
                </InputGroup>
                <InputGroup>
                    <Input style="width:100%;" id="shareRange" type="range" step="{5}" min={0} max={100} bind:value={share}/>
                </InputGroup>
            </FormGroup>
        </Form>
        <Form>
            <FormGroup>
                <Label>Parents</Label>
                <ListGroup>
                    {#each Object.entries(kid.parents) as [email, bool]}
                        <InputGroup>
                            <Input style="border-radius: 0; border: none;" type="text" disabled value="{email.replace('%2E','.')}"/>
                            <Button style="border-radius: 0; border: none;" color="danger" on:click={()=>deleteParent(email)}><Icon name="x-circle-fill"/></Button>
                        </InputGroup>
                    {/each}
                </ListGroup>
            </FormGroup>
        </Form>
        <Form>
            <FormGroup>
                <Label for="parentEmail">Add a new parent</Label>
                <InputGroup>
                    <Input placeholder="Parent's Email Address" bind:valid="{validEmail}" bind:invalid="{invalidEmail}"
                           on:keypress={testEmail} type="email" bind:value={parentEmail}/>
                    <Button on:click={addParent}>Add Parent</Button>
                </InputGroup>
            </FormGroup>
        </Form>
        <Button color="danger" on:click={deleteKid}>Delete {name}</Button>
        <Button color="primary" on:click={consolidate}>Consolidate all transactions</Button>
    </ModalBody>
    <ModalFooter>
        <Button color="secondary" on:click={toggle}>Close</Button>
        <Button color="primary" on:click={saveKid}>Save</Button>
    </ModalFooter>
</Modal>

<style>
</style>