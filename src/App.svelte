<script>
    import {swipe} from 'svelte-gestures';
    import {chosenKid, kids, kidsLoading, loggedIn} from './store'
    import Kid from "./Kid.svelte";
    import {currencyFormatter, hash} from "./helpers";
    import {set, logout} from "./firebase";
    import {onMount} from 'svelte';
    import AddKidModal from "./components/AddKidModal.svelte";
    import {Button, Icon, Modal, Spinner,} from "sveltestrap";
    import {nanoid} from "nanoid";
    import Menu from "./components/Menu.svelte";
    import Welcome from "./components/Welcome.svelte";


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

    function chooseKid() {
        chosenKid.set(hash.get('kid'));
    }

    function addKid(e) {
        toggleAddKid();
        let kid = e.detail;
        const childId = nanoid();
        set(`${childId}`, kid);
    }

    function toggleAddKid() {
        addKidOpen = !addKidOpen;
    }

    function swipeHandler(e) {
        let kidsNames = Object.values($kids).map((kid) => {
            return kid.name
        })
        let currentIndex = kidsNames.indexOf($chosenKid);
        let targetKid = 0;
        switch (e.detail.direction) {
            case 'left':
                console.log('swipe left')
                if (currentIndex !== (kidsNames.length - 1)) {
                    targetKid = currentIndex + 1;
                }
                break;
            case 'right':
                targetKid = currentIndex - 1;
                if (targetKid < 0) {
                    targetKid = (kidsNames.length - 1);
                }
                break;
        }
        window.location.hash = `kid/${kidsNames[targetKid]}`
    }
</script>
<div style="width: 100%; display:flex; justify-content:center;">
    {#if !$kidsLoading}
        <div style="max-width: 600px;">
            {#if $loggedIn}
                <Menu {loggedIn} {toggleAddKid} {kids}/>
                {#if !$chosenKid}
                    <div style="margin-top:15px; display:flex; flex-direction: column; gap: 15px">
                        {#each Object.entries($kids) as [id, kid]}
                            <div style="width: 100%">
                                <Button id="kid-{id}" style="padding: 30px 50px" block color="primary"
                                        on:click="{window.location.hash=`kid/${kid.name}`}">
                                    <div style="font-size: 40px; line-height: 30px;">
                                        <Icon name="person-circle"/>
                                        {kid.name}
                                    </div>
                                    <div>{currencyFormatter(kid.spendable)}</div>
                                </Button>
                            </div>
                        {/each}
                        <div style="width: 100%">
                            <Button id="add-kid-btn" style="padding: 30px 0" block color="success" on:click="{toggleAddKid}">
                                <div style="font-size: 40px; line-height: 30px;">
                                    <Icon name="plus-circle"/>
                                    Add Kid
                                </div>
                                <div>Add another kid</div>
                            </Button>
                        </div>
                    </div>
                {/if}

                {#each Object.entries($kids) as [id, kid]}
                    <div use:swipe={{timeframe: 300, minSwipeDistance: 100, touchAction: 'pan-y'}} on:swipe={swipeHandler}>
                        <Kid kid="{kid}" visible="{kid.name === $chosenKid}"/>
                    </div>
                {/each}

                <p id="welcome-email" style="text-align: center; margin-top: 10px; font-size: small">
                    <Button color="link" on:click={logout}><Icon name="door-open"/> Log Out</Button>
                </p>


            {:else}
                <Welcome/>
            {/if}
        </div>
    {:else}
        <div>
            Loading...&nbsp;
            <Spinner style="margin-top:3px;" color="light" size="sm"/>
        </div>
    {/if}
</div>
<Modal isOpen={addKidOpen} toggle="{toggleAddKid}">
    <AddKidModal on:addKid={addKid} on:cancel={toggleAddKid}/>
</Modal>
<div style="display:none" class="btn-close visually-hidden"></div>
<style>
    /* Global styles go in ../public/global.css */
</style>