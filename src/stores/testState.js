import { writable } from 'svelte/store';

export const testStarted = writable(false);  // Holds the test state, true = test started, false = test stopped