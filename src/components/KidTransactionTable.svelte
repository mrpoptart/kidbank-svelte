<script>
    import dayjs from "dayjs";
    import {currencyFormatter} from "../helpers";
    import {set} from "../firebase";
    import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "sveltestrap";

    export let kid;
    export let lastPayday;

    function del(tid) {
        delete kid.transactions[tid]
        set(kid.id, kid)
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
        <th style="min-width: 110px; max-width: 110px;">Date</th>
        <th>Description</th>
        <th>Amount</th>
    </tr>
    </thead>
    <tbody>
    {#each Object.keys(kid.transactions).sort().reverse() as key, i}
        <tr id="t-{i}" on:click={()=>{selectedTransaction=kid.transactions[key]; toggle()}}
            class="{getAllowanceClass(key, kid.transactions[key])}">
            <td>{dayjs(parseInt(key)).format('M-D-YYYY')}</td>
            <td>{kid.transactions[key].name}</td>
            <td>{currencyFormatter(kid.transactions[key].amount)}</td>
        </tr>
    {/each}
    </tbody>
</Table>

<style>
    tr {
        cursor: pointer;
    }
</style>