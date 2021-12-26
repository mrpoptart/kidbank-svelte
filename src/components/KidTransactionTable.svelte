<script>
    import dayjs from "dayjs";
    import {currencyFormatter} from "../helpers";
    import {remove} from "../firebase";

    export let kidId;
    export let transactions;

    function del(tid) {
        remove(`children/${kidId}/transactions/${tid}`)
    }
</script>

<table>
    <thead>
    <th>Date</th>
    <th>Amount</th>
    <th>Description</th>
    <th>Delete</th>
    </thead>
    <tbody>
    {#each Object.entries(transactions).reverse() as [id, transaction]}
        <tr>
            <td>{dayjs(parseInt(id)).format('M-D-YYYY')}</td>
            <td>{currencyFormatter(transaction.amount)}</td>
            <td>{transaction.name}</td>
            <td><a on:click={del(transaction.id)}>🗑️</a></td>
        </tr>
    {/each}
    </tbody>
</table>

<style>
    table{
        width: 100%;
        border: 0px;
        border-collapse: collapse;
        text-align: left;
    }
    td, th{
        padding: 5px 10px;
    }
    tr:nth-child(2n) {
        background-color: #eeeeee;
    }
</style>