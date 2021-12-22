<script>
   import Auth from './Auth.svelte';
   import {kids, chosenKid} from './store'
   import Kid from "./Kid.svelte";
   import {currencyFormatter, hash} from "./helpers";
   import { onMount } from 'svelte';
   import {MDBContainer, MDBBtn} from 'mdbsvelte'
   import {
      MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
      MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
   } from "mdbsvelte";

   let isOpen = false;

   function toggleCollapse() {
      isOpen = !isOpen;
   }

   function handleUpdate(event) {
      isOpen = event.detail.isOpen;
   }

   hash.onHashUpdate(chooseKid)

   function chooseKid(){
      chosenKid.set(hash.get('kid'));
      console.log(`chosen kid is now ${$chosenKid}`)

   }
</script>
<MDBNavbar color="primary-color" dark expand="md">
    <MDBNavbarBrand>
        <strong class="brand">💰 Kid Bank</strong>
    </MDBNavbarBrand>
    <MDBNavbarToggler on:click={toggleCollapse}/>
    <MDBCollapse id="navbarCollapse3" {isOpen} navbar expand="md" on:update={handleUpdate}>
        <MDBNavbarNav left>
            {#each Object.entries($kids) as [id, kid]}
                <MDBNavItem active="{kid.name === $chosenKid}">
                    <MDBNavLink href="#kid/{kid.name}">{kid.name} - {currencyFormatter(kid.spendable)}</MDBNavLink>
                </MDBNavItem>
            {/each}
        </MDBNavbarNav>
        <MDBNavbarNav right>
            <MDBNavItem>
                <MDBNavLink>LogOut</MDBNavLink>
            </MDBNavItem>
        </MDBNavbarNav>
    </MDBCollapse>
</MDBNavbar>
    {#each Object.entries($kids) as [id, kid]}
        <Kid kid="{kid}" id="{id}" visible="{kid.name === $chosenKid}"/>
    {/each}

<style>
    :global(a) {cursor: pointer}
    .brand {
        font-family: Brush Script MT, Brush Script Std, cursive;
    }
</style>