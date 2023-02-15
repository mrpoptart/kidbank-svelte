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
    <div style="text-align: center">
        <h4>How often have you heard questions like these:</h4>
        <p class="quote">Daaaad... How much money do I have in my wallet at home?</p>
        <p class="quote">Mom, can we go out to dinner?</p>
        <p class="quote">Grandpa, can you buy this for me... please?</p>
        <h4>What if the questions sounded like this instead:</h4>
        <p class="quote">Can I please use three of my dollars to buy a candy?</p>
        <p class="quote">Have I saved up enough to buy a new toy?</p>
        <p class="quote">I know I've got $10 left, when does my interest get paid?</p>
        <h4>Talking to our kids about money is important.
            Here's what we offer:</h4>
        <ul class="how">
            <li>At-a-glance views of each kid's balance</li>
            <li>Easy tracking of earning and spending</li>
            <li>Automatic tracking of allowance and interest</li>
        </ul>

        <h4>Here's how it works:</h4>
        <ol>
            <li>Every kid gets their age in dollars every Monday.</li>
            <li>By default 50% of their allowance is saved.</li>
            <li>By default kids get 10% interest per month.</li>
        </ol>
        <p>By tracking your kids balances and spending, they can get used to saving and spending money</p>
        <p></p>
        <h4>Tips for success:</h4>
        <ul>
            <li>Learning how money works is important at any age.</li>
            <li>Saving your money makes a big difference.</li>
            <li>Investments are worth more than paychecks.</li>
        </ul>
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

    .quote {
        border-radius: 15px;
        background-color: #EEE;
        color: #525252;
        padding: 10px 30px;
        position: relative;
    }

    .quote:before {
        content: '"';
        position: absolute;
        top: 10px;
        left: 15px;
    }

    .quote:after {
        content: '"';
        position: absolute;
        bottom: 10px;
        right: 10px;
    }

    ul {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0 0 20px 0;
        padding: 0;
        gap: 10px;
        flex-wrap: wrap;
    }

    ol li {
        text-align: left;
    }

    .how li {
        border-radius: 5px;
        list-style-type: none;
        background-color: #525252;
        color: #EEE;
        padding: 10px;
        text-align: left;
        font-size: 18px;
        min-width: 180px;
    }

    h4 {
        font-size: 20px;
        margin-top: 1rem;
        padding: 10px 0;
        border-radius: 5px;
        text-align: left;
    }

    .googleButton {
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