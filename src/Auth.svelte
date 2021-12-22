<script>
   import {user, loggedIn} from './store';
   import {login, logout} from "./firebase"
   import {MDBNavLink} from "mdbsvelte";
</script>
{#if $loggedIn}
    <MDBNavLink on:click={logout}>Log Out</MDBNavLink>
<!--    <a on:click={logout}>Logout</a>-->
{:else}
    <a on:click|preventDefault={login}>Sign In with Google</a>
{/if}
<style>
    a {
        cursor: pointer;
    }
</style>