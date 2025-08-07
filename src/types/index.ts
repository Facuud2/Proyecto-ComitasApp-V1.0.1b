export type TSelect = {
    id: number;
    name: string;
}

export type TReservation = {
    id: string;
    type: number;
    location: number;
    datetime: string;
    responsable: string;
    people: number;
    description: string;
    paymentMethod: number;
}