import { writable } from 'svelte/store';

export const authUser = writable(null);

export function login(username = "demo-user") {
  authUser.set({ name: username });
}

export function logout() {
  authUser.set(null);
}
