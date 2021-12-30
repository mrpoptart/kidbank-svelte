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
        Label, Container, Row, Col, ListGroupItem, ListGroup, DropdownItem
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

    onMount(()=>{
        reset();
    })

    function reset(){
        birthday=dayjs(kid.birthday).format('YYYY-M-D');
        name=kid.name;
        interest=kid.interest;
        save=kid.save;
        share=kid.share;
        parentEmail='';
        console.log(`birthday: ${birthday}`)
    }

    function saveKid(){
        let updatedKid = {
            birthday,
            name,
            interest,
            save,
            share,
        }
        dispatch('save', updatedKid);
        open=false;
    }

    async function addParent(e){
        e.preventDefault();
        if(parentEmail === '') return;
        parentEmail = parentEmail.toLowerCase()
        let emailKey = parentEmail.replace('.', '%2E');
        console.log(`Adding parent: ${parentEmail}`)
        await set(`children/${kid.id}/parents/${emailKey}`, true)
        await set(`parents/${emailKey}/${kid.id}`, true)
        parentEmail = '';
    }

    async function deleteParent(email){
        await remove(`children/${kid.id}/parents/${email}`);
        await remove(`parents/${email}/${kid.id}`);
        if(email === $user.key) {
            window.location.hash = '';
            toggle();
        }
    }

    let invalidEmail = true;
    let validEmail = false;
    function testEmail(){
        console.log('testing')
        invalidEmail = !String(parentEmail)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        validEmail = !invalidEmail;
    }

    async function deleteKid(){
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
    }
</script>

<Button style="min-width: 3rem" on:click={toggle}>
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
                <Label for="saveRange">Interest Rate</Label>
                <InputGroup>
                    <Input type="number" bind:value={interest}/>
                    <InputGroupText>%</InputGroupText>
                </InputGroup>
            </FormGroup>
            <FormGroup>
                <Label for="saveRange">Save Percent</Label>
                <Input id="saveRange" type="range" step="{5}" min={0} max={100} bind:value={save}/>
                <InputGroup>
                    <Input type="number" bind:value={save}/>
                    <InputGroupText>%</InputGroupText>
                </InputGroup>
            </FormGroup>
            <FormGroup>
                <Label for="shareRange">Share Percent</Label>
                <Input id="shareRange" type="range" step="{5}" min={0} max={100} bind:value={share}/>
                <InputGroup>
                    <Input type="number" bind:value={share}/>
                    <InputGroupText>%</InputGroupText>
                </InputGroup>
            </FormGroup>
        </Form>
        <p>Parents</p>
        <ListGroup>
            {#each Object.entries(kid.parents) as [email,bool]}
            <InputGroup>
                <Input type="text" disabled value="{email.replace('%2E','.')}"/>
                <Button color="danger" on:click={()=>deleteParent(email)}><Icon name="x-circle-fill"/></Button>
            </InputGroup>
            {/each}
        </ListGroup>
        <Form>
            <FormGroup>
                <Label for="parentEmail">Add a new parent</Label>
                <InputGroup>
                    <Input placeholder="Parent's Email Address" bind:valid="{validEmail}" bind:invalid="{invalidEmail}" on:keypress={testEmail} type="email" bind:value={parentEmail}/>
                    <Button on:click={addParent}>Add Parent</Button>
                </InputGroup>
            </FormGroup>
        </Form>
        <Button color="danger" on:click={deleteKid}>Delete {name}</Button>
    </ModalBody>
    <ModalFooter>
        <Button color="secondary" on:click={toggle}>Close</Button>
        <Button color="primary" on:click={saveKid}>Save</Button>
    </ModalFooter>
</Modal>

<style>
</style>