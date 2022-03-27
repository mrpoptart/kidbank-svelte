<script>
    import dayjs from "dayjs";
    import {currencyFormatter} from "../helpers";
    import {remove} from "../firebase";
    import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "sveltestrap";

    export let kidId;
    export let lastPayday;
    export let transactions;

    function del(tid) {
        remove(`children/${kidId}/transactions/${tid}`)
    }

    let selectedTransaction;
    let open = false;
    const toggle = () => (open = !open);

    const getAllowanceClass = (tid, transaction) => {
        let parsedTid = dayjs(parseInt(tid));
        return parsedTid.valueOf() >= lastPayday.valueOf() && transaction.name === '💰 Allowance' ? 'pay' : ''
    }
</script>

<Modal isOpen={open} {toggle}>
    <ModalHeader {toggle}>{selectedTransaction.name}</ModalHeader>
    <ModalBody>
        <div>Spend: {currencyFormatter(selectedTransaction.amount)}</div>
        <div>Save: {currencyFormatter(selectedTransaction.save)}</div>
        <div>Share: {currencyFormatter(selectedTransaction.share)}</div>
        <Button style="margin-top: 15px" block color="danger" on:click={()=>{del(selectedTransaction.id);toggle()}}>
            Delete
        </Button>
    </ModalBody>
    <ModalFooter>
        <Button block color="secondary" on:click={toggle}>Done</Button>
    </ModalFooter>
</Modal>
<Table striped>
    <thead>
    <tr>
        <th style="max-width: 130px">Date</th>
        <th>Description</th>
        <th>Amount</th>
    </tr>
    </thead>
    <tbody>
    {#each Object.entries(transactions).reverse() as [tid, transaction]}
        <tr on:click={()=>{selectedTransaction=transaction; toggle()}}
            class="{getAllowanceClass(tid, transaction)}">
            <td>{dayjs(parseInt(tid)).format('M-D-YYYY')}</td>
            <td>{transaction.name}</td>
            <td>{currencyFormatter(transaction.amount)}</td>
        </tr>
    {/each}
    </tbody>
</Table>

<style>
    tr {
        cursor: pointer;
    }
</style>