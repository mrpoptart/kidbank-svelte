import App from './App.svelte';
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday';
dayjs.extend(weekday);

const app = new App({
	target: document.body,
});


export default app;