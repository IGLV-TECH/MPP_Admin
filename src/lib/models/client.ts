import type { Address } from "./adress";

export interface Client {
    lastName: string,
    firstName: string,
    phoneNumber: string,
    email: string,
    balance: number,
    address: Address,
    id: number,
}

