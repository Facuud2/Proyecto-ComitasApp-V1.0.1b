import type { TReservation } from "../types";

export type ReservationActions =
  | { type: "save-reservation"; payload: { newReservation: TReservation } }
  | { type: "delete-reservation"; payload: { id: TReservation["id"] } }
  | { type: "set-activeId"; payload: { id: TReservation["id"] } }
  | { type: "delete-all-reservations"; payload: { id: TReservation["id"] } };

export type ReservationState = {
  reservations: TReservation[];
  activeId: TReservation["id"];
};
const localStorageReservations = () : TReservation[] => {
  const reservations = localStorage.getItem("reservations");
  return reservations ? JSON.parse(reservations) : [];
};

export const initialState: ReservationState = {
  reservations: localStorageReservations(),
  activeId: "",
};



export const reservationReducer = (
  state: ReservationState = initialState,
  action: ReservationActions
) => {
  if (action.type === "save-reservation") {
    let updatedReservations: TReservation[] = [];

    if (state.activeId) {
      updatedReservations = state.reservations.map((reservation) =>
        reservation.id === state.activeId
          ? action.payload.newReservation
          : reservation
      );
    } else {
      updatedReservations = [
        ...state.reservations,
        action.payload.newReservation,
      ];
    }

    return {
      ...state,
      reservations: updatedReservations,
      activeId: "",
    };
  }

  if (action.type === "set-activeId") {
    return {
      ...state,
      activeId: action.payload.id,
    };
  }

  if (action.type === "delete-reservation") {
    return {
      ...state,
      reservations: state.reservations.filter(
        (reservation) => reservation.id !== action.payload.id
      ),
    };
  }

  if(action.type === "delete-all-reservations") {

    localStorage.removeItem('reservations');

    return {
      ...state,
      reservations: []
    }
  }

  return state;
};
