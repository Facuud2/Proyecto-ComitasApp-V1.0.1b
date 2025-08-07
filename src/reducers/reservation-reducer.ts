import type { TReservation } from "../types"

export type ReservationActions = {
    type: 'save-reservation', payload: { newReservation : TReservation }
}

type ReservationState = {
    reservations: TReservation[]
}

export const initialState : ReservationState = {
    reservations: []
}

export const reservationReducer = ( 
    state : ReservationState = initialState, 
    action : ReservationActions ) => {

        if( action.type === 'save-reservation' ) {
            return {
                ...state,
                reservations: [...state.reservations, action.payload.newReservation]
            }
            
            
        }


        return state;

}