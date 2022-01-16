<script>
    import {user, kids, chosenKid, loggedIn} from './store'
   import Kid from "./Kid.svelte";
   import {currencyFormatter, hash} from "./helpers";
   import {login, logout, set} from "./firebase";
   import { onMount } from 'svelte';
   import AddKidModal from "./components/AddKidModal.svelte";
    import {
        Button, ButtonGroup, Collapse,
        ButtonDropdown,
        Dropdown,
        DropdownItem,
        DropdownMenu,
        DropdownToggle, Icon,
        Modal, Nav,
        Navbar, NavbarBrand, NavbarToggler,
        NavItem,
        NavLink
    } from "sveltestrap";
   import {nanoid} from "nanoid";


   let isOpen = false;
   let addKidOpen = false;

   function toggleCollapse() {
      isOpen = !isOpen;
   }

   function handleUpdate(event) {
      isOpen = event.detail.isOpen;
   }

   hash.onHashUpdate(chooseKid)
   onMount(chooseKid)

   function chooseKid(){
      chosenKid.set(hash.get('kid'));
      console.log(`chosen kid is now ${$chosenKid}`)
   }

   function addKid(e){
       toggleAddKid();
       let kid = e.detail;
       const childId = nanoid();
       set(`parents/${$user.key}/${childId}`, true);
       set(`children/${childId}/`, kid);
   }

   function toggleAddKid(){
       addKidOpen = !addKidOpen;
   }

</script>
<div style="width: 100%; display:flex; justify-content:center;">
    <div style="max-width: 600px;">
        <ButtonDropdown style="width:100%">
            <DropdownToggle color="light" caret>💰 Kid Bank</DropdownToggle>
            <DropdownMenu>
                <DropdownItem on:click="{()=>{window.location.hash=''}}">
                    <Icon name="house-door"></Icon>
                    Home
                </DropdownItem>
                {#if $loggedIn}
                    <DropdownItem on:click={toggleAddKid}>
                        <Icon name="plus-circle"></Icon>
                        Add Kid
                    </DropdownItem>
                    {#each Object.entries($kids) as [id, kid]}
                        <DropdownItem color="primary" on:click="{window.location.hash=`kid/${kid.name}`}">
                            <Icon name="person"></Icon>
                            {kid.name} - {currencyFormatter(kid.spendable)}
                        </DropdownItem>
                    {/each}
                    <DropdownItem on:click={logout}>
                        <Icon name="door-open"></Icon>
                        Log Out
                    </DropdownItem>
                {/if}
            </DropdownMenu>
        </ButtonDropdown>

        {#if !$chosenKid}
            {#if $loggedIn}
                <div style="margin-top:15px; display:flex; flex-direction: column; gap: 15px">
                    {#each Object.entries($kids) as [id, kid]}
                        <div style="width: 100%">
                            <Button style="padding: 30px 50px" block color="primary"
                                    on:click="{window.location.hash=`kid/${kid.name}`}">
                                <div style="font-size: 40px; line-height: 30px;">
                                    <Icon name="person-circle"/>
                                    {kid.name}
                                </div>
                                <div>{currencyFormatter(kid.spendable)}</div>
                            </Button>
                        </div>
                    {/each}
                    <div style="width: 100%">
                        <Button style="padding: 30px 0" block color="success" on:click="{toggleAddKid}">
                            <div style="font-size: 40px; line-height: 30px;">
                                <Icon name="plus-circle"/>
                                Add Kid
                            </div>
                            <div>Add another kid</div>
                        </Button>
                    </div>
                </div>
            {:else}
                <div style="width: 100%; margin-top: 15px;">
                    <Button style="padding: 30px 0" block color="primary" on:click="{login}">
                        <div style="font-size: 30px; line-height: 30px;">
                            Log In with Google
                        </div>
                    </Button>
                </div>
            {/if}
        {/if}

        {#each Object.entries($kids) as [id, kid]}
            <Kid kid="{kid}" visible="{kid.name === $chosenKid}"/>
        {/each}
    </div>
</div>
<Modal isOpen={addKidOpen} toggle="{toggleAddKid}">
    <AddKidModal on:addKid={addKid} on:cancel={toggleAddKid}/>
</Modal>
<style>
    :global(a) {cursor: pointer}
    :global(body) {
        background-color: #1d3040;
        color: #bfc2c7;
    }
</style>