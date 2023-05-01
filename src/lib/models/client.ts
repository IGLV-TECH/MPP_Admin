
export interface Client {
    lastName: string,
    firstName: string,
    phone: string,
    email: string,
    balance: number,
    idAddress: number,
}

export interface Address {
    county: string,
    city: string,
    street: string,
    number: number,
    zipCode: string,
}

export interface ClientAddress {
    client: Client,
    address: Address,
}

export const clients: ClientAddress[] = [
    {
        client: {
            lastName: "Smith",
            firstName: "John",
            phone: "555-1234",
            email: "john.smith@example.com",
            balance: 1000.0,
            idAddress: 1,
        },
        address: {
            county: "Los Angeles",
            city: "Los Angeles",
            street: "Main St",
            number: 1234,
            zipCode: "90001",
        },
    },
    {
        client: {
            lastName: "Doe",
            firstName: "Jane",
            phone: "555-5678",
            email: "jane.doe@example.com",
            balance: 2500.0,
            idAddress: 2,
        },
        address: {
            county: "San Francisco",
            city: "San Francisco",
            street: "Market St",
            number: 5678,
            zipCode: "94103",
        },
    },
    {
        client: {
            lastName: "Johnson",
            firstName: "Bob",
            phone: "555-9012",
            email: "bob.johnson@example.com",
            balance: 500.0,
            idAddress: 3,
        },
        address: {
            county: "San Diego",
            city: "San Diego",
            street: "Broadway",
            number: 9012,
            zipCode: "92101",
        },
    },
    {
        client: {
            lastName: "Williams",
            firstName: "Mary",
            phone: "555-3456",
            email: "mary.williams@example.com",
            balance: 0.0,
            idAddress: 4,
        },
        address: {
            county: "Orange",
            city: "Irvine",
            street: "Jamboree Rd",
            number: 3456,
            zipCode: "92612",
        },
    },
    {
        client: {
            lastName: "Garcia",
            firstName: "David",
            phone: "555-7890",
            email: "david.garcia@example.com",
            balance: 1500.0,
            idAddress: 5,
        },
        address: {
            county: "Riverside",
            city: "Riverside",
            street: "University Ave",
            number: 7890,
            zipCode: "92521",
        },
    },
    {
        client: {
            lastName: "Brown",
            firstName: "Sarah",
            phone: "555-2345",
            email: "sarah.brown@example.com",
            balance: 2000.0,
            idAddress: 6,
        },
        address: {
            county: "Santa Clara",
            city: "San Jose",
            street: "First St",
            number: 2345,
            zipCode: "95113",
        },
    },
    {
        client: {
            lastName: "Lee",
            firstName: "Michael",
            phone: "555-6789",
            email: "michael.lee@example.com",
            balance: 3500.0,
            idAddress: 7,
        },
        address: {
            county: "Alameda",
            city: "Oakland",
            street: "Telegraph Ave",
            number: 6789,
            zipCode: "94609",
        },
    },
    {
        client: {
            lastName: "Rodriguez",
            firstName: "Isabella",
            phone: "555-0123",
            email: "isabella.rodriguez@example.com",
            balance: 800.0,
            idAddress: 8,
        },
        address: {
            county: "Sacramento",
            city: "Sacramento",
            street: "J St",
            number: 123,
            zipCode: "95814",
        },
    },
    {
        client: {
            lastName: "Gonzalez",
            firstName: "Juan",
            phone: "555-4567",
            email: "juan.gonzalez@example.com",
            balance: 1200.0,
            idAddress: 9,
        },
        address: {
            county: "Contra Costa",
            city: "Walnut Creek",
            street: "Main St",
            number: 4567,
            zipCode: "94596",
        },
    },
    {
        client: {
            lastName: "Lopez",
            firstName: "Gabriela",
            phone: "555-8901",
            email: "gabriela.lopez@example.com",
            balance: 600.0,
            idAddress: 10,
        },
        address: {
            county: "San Mateo",
            city: "Redwood City",
            street: "Broadway",
            number: 8901,
            zipCode: "94063",
        },
    },
];
