import App from './App.svelte';
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek';
dayjs.extend(isoWeek);

const app = new App({
	target: document.body,
});


export default app;