<script>
    import dayjs from "dayjs";
    import {currencyFormatter} from "../helpers";
    import {remove} from "../firebase";
    import {Button, Icon, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "sveltestrap";

    export let kidId;
    export let transactions;

    function del(tid) {
        remove(`children/${kidId}/transactions/${tid}`)
    }
    let selectedTransaction;
    let open = false;
    const toggle = () => (open = !open);
</script>

<Modal isOpen={open} {toggle}>
    <ModalHeader {toggle}>{selectedTransaction.name}</ModalHeader>
    <ModalBody>
        <div>Spend: {currencyFormatter(selectedTransaction.amount)}</div>
        <div>Save: {currencyFormatter(selectedTransaction.save)}</div>
        <div>Share: {currencyFormatter(selectedTransaction.share)}</div>
        <Button style="margin-top: 15px" block color="danger" on:click={()=>{del(selectedTransaction.id);toggle()}}>Delete</Button>
    </ModalBody>
    <ModalFooter>
        <Button block color="secondary" on:click={toggle}>Done</Button>
    </ModalFooter>
</Modal>
<Table striped>
    <thead>
        <tr>
            <th>Date</th>
            <th>Amount</th>
<!--            <th>Save</th>-->
<!--            <th>Share</th>-->
            <th>Description</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
    {#each Object.entries(transactions).reverse() as [id, transaction]}
        <tr on:click={()=>{selectedTransaction=transaction; toggle()}}>
            <td>{dayjs(parseInt(id)).format('M-D-YYYY')}</td>
            <td>{currencyFormatter(transaction.amount)}</td>
<!--            <td>{currencyFormatter(transaction.save)}</td>-->
<!--            <td>{currencyFormatter(transaction.share)}</td>-->
            <td>{transaction.name}</td>
            <td><Icon name="three-dots"/></td>
        </tr>
    {/each}
    </tbody>
</Table>

<style>
</style>