import type { TSelect } from "../types";

export const categories : TSelect[] = [
    { id: 1, name: 'Cena' },
    { id: 2, name: 'Merienda' },
    { id: 3, name: 'Evento' }]

export const sedes : TSelect[] = [
    { id: 1, name: 'Sede Centro' },
    { id: 2, name: 'Sede Norte' },
    { id: 3, name: 'Sede Sur' }]

export const paymentMethods : TSelect[] = [
    { id: 1, name: 'Efectivo' },
    { id: 2, name: 'Tarjeta de crédito' },
    { id: 3, name: 'Tarjeta de débito' },
    { id: 4, name: 'Mercado Pago' }]