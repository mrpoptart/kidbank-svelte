<script>
    import {kids, loggedIn} from '../store'
    import {login, logout} from "../firebase"
    import {
        Collapse,
        Navbar,
        NavbarToggler,
        NavbarBrand,
        Nav,
        NavItem,
        NavLink,
        Dropdown,
        DropdownToggle,
        DropdownMenu,
        DropdownItem, Icon
    } from 'sveltestrap';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let isOpen = false;

    function handleUpdate(event) {
        isOpen = event.detail.isOpen;
    }

    function addKid(){
        dispatch('addKid');
    }
</script>

<Navbar style="width: 100%" color="dark" dark expand="xs">
    <NavbarBrand href="/">KidBank</NavbarBrand>
    <NavbarToggler on:click={() => (isOpen = !isOpen)} />
    <Collapse {isOpen} navbar expand="xs" on:update={handleUpdate}>
        <Nav class="ms-auto" navbar>
            {#each Object.entries($kids) as [id, kid]}
                <NavItem>
                    <NavLink href="#kid/{kid.name}">{kid.name}</NavLink>
                </NavItem>
            {/each}
            <Dropdown>
                <DropdownToggle nav><Icon name="three-dots"></Icon></DropdownToggle>
                <DropdownMenu end>
                    <DropdownItem on:click={addKid}>Add Kid</DropdownItem>
                    {#if $loggedIn}
                        <DropdownItem on:click={logout}>Log Out</DropdownItem>
                    {:else}
                        <DropdownItem on:click={login}>Sign In with Google</DropdownItem>
                    {/if}
                </DropdownMenu>
            </Dropdown>
        </Nav>
    </Collapse>
</Navbar>