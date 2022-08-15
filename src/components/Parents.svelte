<script>
    import {Button, Form, FormGroup, Icon, Input, InputGroup, Label, ListGroup} from "sveltestrap";
    import {remove, set} from "../firebase";
    import {user} from "../store";
    export let kid;
    export let toggle;
    let parentEmail;
    let invalidEmail = false;

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
    }
</script>

<Form>
    <FormGroup>
        <Label>Parents</Label>
        <ListGroup>
            {#each Object.entries(kid.parents) as [email, bool]}
                <InputGroup style="overflow: hidden; border-radius: 5px; margin-bottom: 2px;">
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
            <Input placeholder="Parent's Email Address"
                   bind:invalid="{invalidEmail}"
                   on:keypress={testEmail}
                   type="email"
                   bind:value={parentEmail}
            />
            <Button on:click={addParent}>Add Parent</Button>
        </InputGroup>
    </FormGroup>
</Form>