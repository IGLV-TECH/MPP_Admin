
import { writable } from "svelte/store";

export const token = writable<string | null>(null);

export type LoginResponse = {
    token: string;
};