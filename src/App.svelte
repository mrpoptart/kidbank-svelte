<script>
   import Auth from './Auth.svelte';
   import {kids, chosenKid} from './store'
   import Kid from "./Kid.svelte";
   import {hash} from "./helpers";
   import { onMount } from 'svelte';

   let isOpen = false;

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
</script>
<Auth/><br>
{#each Object.entries($kids) as [id, kid]}
    <a class="{kid.name === $chosenKid? 'active' : ''}" href="#kid/{kid.name}">{kid.name}</a>&nbsp;
{/each}
{#each Object.entries($kids) as [id, kid]}
    <Kid kid="{kid}" visible="{kid.name === $chosenKid}"/>
{/each}

<style>
    :global(a) {cursor: pointer}
    .active{
        font-weight: bold;
    }
</style>