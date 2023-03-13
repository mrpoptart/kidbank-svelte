<script>
    import {Button} from "sveltestrap";
    import {login} from "../firebase";
</script>
<div style="width: 100%; margin-top: 15px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
    <h2>Welcome to KidBank</h2>
    <p class="subtitle">A better way to teach your kids about money.</p>
    <div class="googleButton" on:click="{login}">
        <img alt="Google Logo" src="images/glogo.png"/>
        Log in with Google
    </div>
</div>

<style>
    p {
        font-size: 20px;
        text-align: left;
    }
    .subtitle {
        font-size: 16px;
        margin-top: -12px;
    }


    .googleButton {
        cursor: pointer;
        margin: 10px 0 5px;
        display: flex !important;
        gap: 0;
        background: white;
        color: #444;
        width: 220px;
        justify-content: space-between;
        padding: 5px 32px 5px 5px;
        border-radius: 5px;
        border: thin solid #888;
        align-items: center;
    }
</style>