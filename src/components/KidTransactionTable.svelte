<script>
   import dayjs from "dayjs";
   import {currencyFormatter} from "../helpers";
   import {mdiTrashCanOutline} from '@mdi/js';
   import {remove} from "../firebase";
   import {Overlay, Card, Table, Button} from '@kahi-ui/framework'

   export let kidId;
   export let transactions;
   let active = false;
   let selectedTransaction = {};

   function open(transaction) {
      active = true;
      console.log(JSON.stringify(transaction));
      selectedTransaction = transaction;
   }
   function close() {
      active = false;
      selectedTransaction = {};
   }

   function del(transactionId) {
      active = false;
      remove(`children/${kidId}/transactions/${selectedTransaction.id}`)
   }
</script>

<Overlay logic_id="active">
    <Card.Container>
        <Card.Header>
            {selectedTransaction.name}
        </Card.Header>
        <Card.Section>
            <div>
                <div> Spend: {selectedTransaction.amount}</div>
                <div> Save: {selectedTransaction.save}</div>
                <div> Share: {selectedTransaction.share}</div>
            </div>
        </Card.Section>
        <Card.Footer>
            <Button text on:click={del}>Delete</Button>
            <Button text on:click={close}>Cancel</Button>
        </Card.Footer>
    </Card.Container>
</Overlay>

<Table.Container class="d-flex">
    <Table.Header class="d-flex">
        <Table.Row class="d-flex">
            <Table.Heading class="d-flex">Date</Table.Heading>
            <Table.Heading class="d-flex">Amount</Table.Heading>
            <Table.Heading class="d-flex">Description</Table.Heading>
            <Table.Heading class="d-flex">Delete</Table.Heading>
        </Table.Row>
    </Table.Header>
    <Table.Section>
        {#each Object.entries(transactions).reverse() as [id, transaction]}
            <Table.Row>
                <Table.Column>{dayjs(parseInt(id)).format('M-D-YYYY')}</Table.Column>
                <Table.Column>{currencyFormatter(transaction.amount)}</Table.Column>
                <Table.Column>{transaction.name}</Table.Column>
                <Table.Column>
                    <Button fab class="red white-text" size="small" on:click={()=>{open(transaction)}}>
                        <i path="{mdiTrashCanOutline}"/>
                    </Button>
                </Table.Column>
            </Table.Row>
        {/each}
    </Table.Section>
</Table.Container>