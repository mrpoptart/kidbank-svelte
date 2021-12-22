import {writable, derived} from "svelte/store";

export const chosenKid = writable(null);
export const hash = writable({});
export const user = writable(null);
export const loggedIn = derived(user, $user => !!$user);
export const kids = writable([]);