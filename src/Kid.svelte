<script>
   import {currencyFormatter} from "./helpers";
   import {onMount} from "svelte";
   import {payAllowance, remove} from "./firebase";
   import dayjs from "dayjs";
   // import KidTransactionTable from "./components/KidTransactionTable.svelte";
   import {MDBBtn} from 'mdbsvelte'

   export let kid;
   export let id;
   export let visible = false;

   onMount(() => {
      // console.log(kid.transactions)
   })

   function del(transactionId) {
      remove(`children/${kid.id}/transactions/${transactionId}`)
   }
</script>

{#if visible}
    <div class="name">{kid.name}</div>
    <h2>Spendable {currencyFormatter(kid.spendable)}</h2>
    <div>Savings {currencyFormatter(kid.saved)}</div>
    <div>Sharing {currencyFormatter(kid.shared)}</div>
    <MDBBtn on:click={()=>{payAllowance(kid)}}>Allowance</MDBBtn>
<!--        <KidTransactionTable kidId="{kid.id}" transactions="{kid.transactions}"/>-->
{/if}


<style>
    .name {
        font-family: Brush Script MT, Brush Script Std, cursive;
        font-size: 70px;
        line-height: 70px;
        margin: 20px 0 10px;
    }
</style>