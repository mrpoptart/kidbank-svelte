<script>
    import {Button, Form, FormGroup, Icon, Input, InputGroup, Label, ListGroup} from "sveltestrap";
    import {set} from "../firebase";
    import {user} from "../store";

    export let kid;
    export let toggle;
    let parentEmail;
    let invalidEmail = false;

    async function addParent(e) {
        e.preventDefault();
        emailInvalid();
        if (invalidEmail) return;
        parentEmail = parentEmail.toLowerCase()
        console.log(`Adding parent: ${parentEmail}`)
        kid.parents.push(parentEmail)
        await set(kid.id, kid)
        parentEmail = '';
    }

    async function deleteParent(email) {
        if (kid.parents.length === 1) {
            return
        }
        if (email === $user.email) {
            if(!confirm("Remove yourself? \nThis kid will no longer be part of your account")){
                return;
            }
        }
        kid.parents.splice(kid.parents.indexOf(email), 1);
        await set(kid.id, kid)
        if (email === $user.email) {
            window.location.hash = '';
            toggle();
        }
    }

    function emailInvalid() {
        invalidEmail = !parentEmail || !String(parentEmail)
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
            {#each Object.entries(kid.parents) as [i, parentEmail]}
                <InputGroup style="overflow: hidden; border-radius: 5px; margin-bottom: 2px;">
                    <Input style="border-radius: 0; border: none;" type="text" disabled value="{parentEmail}"/>
                    {#if kid.parents.length > 1}
                        <Button style="border-radius: 0; border: none;" color="danger"
                                on:click={()=>deleteParent(parentEmail)}>
                            <Icon name="x-circle-fill"/>
                        </Button>
                    {/if}
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
                   on:keypress={emailInvalid}
                   type="email"
                   bind:value={parentEmail}
            />
            <Button on:click={addParent}>Add Parent</Button>
        </InputGroup>
    </FormGroup>
</Form>