<script>
    import {
        ButtonDropdown,
        DropdownItem,
        DropdownMenu,
        DropdownToggle,
        Icon,
    } from "sveltestrap";

    import {logout} from "../firebase"
    import {currencyFormatter} from "../helpers";

    export let loggedIn;
    export let toggleAddKid;
    export let kids;
</script>


<ButtonDropdown style="width:100%">
    <DropdownToggle color="light" caret>💰 Kid Bank</DropdownToggle>
    <DropdownMenu>
        <DropdownItem on:click="{()=>{window.location.hash=''}}">
            <Icon name="house-door"/>
            Home
        </DropdownItem>
        {#if $loggedIn}
            <DropdownItem on:click={toggleAddKid}>
                <Icon name="plus-circle"/>
                Add Kid
            </DropdownItem>
            {#each Object.entries($kids) as [id, kid]}
                <DropdownItem color="primary" on:click="{window.location.hash=`kid/${kid.name}`}">
                    <Icon name="person"/>
                    {kid.name} - {currencyFormatter(kid.spendable)}
                </DropdownItem>
            {/each}
            <DropdownItem on:click={logout}>
                <Icon name="door-open"/>
                Log Out
            </DropdownItem>
        {/if}
    </DropdownMenu>
</ButtonDropdown>