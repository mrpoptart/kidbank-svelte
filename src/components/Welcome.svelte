<script>
    import {Button} from "sveltestrap";
    import {login} from "../firebase";
</script>
<div style="width: 100%; margin-top: 15px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
    <h2>Welcome to KidBank</h2>
    <p>A better way to teach your kids about money.</p>
    <Button outline
            style=" margin:20px 0 0; max-width: 175px; display: flex !important; background-color:white; padding: 5px"
            block
            color="light" on:click="{login}">
        <img alt="Google Logo" src="images/glogo.png"/>
        <div style="color: #333; margin-top: 4px">Log in with Google</div>
    </Button>
    <div style="text-align: center">
        <h4>What to do:</h4>
        <ul class="how">
            <li>Register all of your kids</li>
            <li>Track their spending</li>
            <li>Teach them how it works</li>
        </ul>
        <h4>How it helps:</h4>
        <ul>
            <li>Every kid gets their age in dollars every Monday.</li>
            <li>By default 50% of their allowance is saved.</li>
            <li>By default kids get 10% interest per month.</li>
        </ul>
        <h4>Tips for success:</h4>
        <ul>
            <li>Learning how money works is important at any age.</li>
            <li>Saving your money makes a big difference.</li>
            <li>Investments are worth more than paychecks.</li>
        </ul>
    </div>
</div>

<style>
    ul {
        display: flex;
        justify-content: center;
        margin: 0 0 20px 0;
        padding: 0;
        gap: 10px;
        flex-wrap: wrap;
    }
    .how li {
        font-size: 23px;
    }

    li {
        border-radius: 5px;
        list-style-type: none;
        background-color: #525252;
        color: #EEE;
        width: 30%;
        padding: 10px;
        text-align: center;
        font-size: 17px;
        min-width: 180px;
    }

    h4 {
        border: 1px solid white;
        margin-top: 40px;
        padding: 5px;
        border-radius: 5px;
    }
</style>