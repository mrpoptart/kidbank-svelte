<script>
   import {user, kids, chosenKid} from './store'
   import Kid from "./Kid.svelte";
   import {hash} from "./helpers";
   import {set} from "./firebase";
   import { onMount } from 'svelte';
   import Nav from './components/Nav.svelte';
   import AddKidModal from "./components/AddKidModal.svelte";
   import {Modal} from "sveltestrap";
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
<Nav on:addKid={toggleAddKid}/>

{#each Object.entries($kids) as [id, kid]}
    <Kid kid="{kid}" visible="{kid.name === $chosenKid}"/>
{/each}
<Modal isOpen={addKidOpen} toggle="{toggleAddKid}">
    <AddKidModal on:addKid={addKid} on:cancel={toggleAddKid}/>
</Modal>
<style>
    :global(a) {cursor: pointer}
</style>