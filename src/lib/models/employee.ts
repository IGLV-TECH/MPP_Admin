import type { Address } from "./adress";


export interface Employee {
    lastName: string,
    firstName: string,
    phoneNumber: string,
    email: string,
    address: Address,
    id: number,
}