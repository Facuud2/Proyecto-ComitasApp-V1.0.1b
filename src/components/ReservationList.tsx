import { categories, sedes, paymentMethods } from "../data/categories";
import { formatDate } from "../helpers/formatDate";
import { formatString } from "../helpers/formatString";
import type { TReservation } from "../types";
import { FaUser, FaCalendarAlt, FaUsers, FaMapMarkerAlt, FaRegCreditCard, FaRegStickyNote, FaTrashAlt, FaRegTimesCircle } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import type { Dispatch } from "react";
import type { ReservationActions, ReservationState } from "../reducers/reservation-reducer";

type TReservationListProps = {
  state: TReservation[],
  reservationState: ReservationState,
  dispatch: Dispatch<ReservationActions>
}

const ReservationList = ({ state, dispatch, reservationState }: TReservationListProps) => {

  const isReservationsEmpty = () => {
    return reservationState.reservations.length === 0;
  }


  return (
    <div className="md:w-1/2 w-full p-8 flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-[300px] overflow-y-scroll sm">
      {/* Encabezado fijo */}
  <div className="sticky top-0 z-20  border-blue-100 pb-4 mb-6">
        <h2 className="text-3xl font-bold text-blue-800 tracking-tight flex items-center gap-2">
          <FaCalendarAlt className="text-blue-500" /> Reservas recientes
        </h2>
        <button
          className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200 my-4 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isReservationsEmpty()}
          onClick={() => dispatch({ type: 'delete-all-reservations', payload: { id: '' } })}
        >
          <FaRegTimesCircle className="mr-2 w-4 h-4" /> Eliminar todas las reservas
        </button>
      </div>
      {state.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 text-lg">No hay reservas recientes.</p>
        </div>
      ) : (
        <div className="grid gap-7 md:grid-cols-1 h-24">
          <div className="flex flex-col gap-4 ">
            {state.map((reservation: TReservation) => (
              <div
                key={reservation.id}
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-200 border border-blue-100 p-6 flex flex-col gap-4 relative overflow-hidden"
              >
                {/* Etiqueta tipo de reserva */}
                <span className="absolute top-4 right-4 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm uppercase tracking-wide">
                  {formatString(reservation.type, categories)}
                </span>
                {/* Nombre responsable */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-blue-50 rounded-full p-2">
                    <FaUser className="text-blue-500 text-lg" />
                  </div>
                  <span className="font-semibold text-lg text-gray-800 truncate" title={reservation.responsable}>
                    {reservation.responsable}
                  </span>
                </div>
                {/* Info principal */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-400" />
                    {formatDate(reservation.datetime)}
                  </span>
                  <span className="flex items-center gap-2">
                    <FaUsers className="text-blue-400" />
                    {reservation.people} personas
                  </span>
                  <span className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-blue-400" />
                    {formatString(reservation.location, sedes)}
                  </span>
                  <span className="flex items-center gap-2">
                    <FaRegCreditCard className="text-blue-400" />
                    {formatString(reservation.paymentMethod, paymentMethods)}
                  </span>
                </div>
                {/* Descripción */}
                <div className="flex items-start gap-2 mt-2">
                  <FaRegStickyNote className="text-blue-300 mt-1" />
                  {reservation.description ? (
                    <p className="text-gray-700 text-sm line-clamp-3">{reservation.description}</p>
                  ) : (
                    <p className="text-gray-400 text-sm">Sin descripción</p>
                  )}
                </div>
                {/* Botones de acción */}
                <div className="absolute flex gap-3 bottom-4 right-4">
                  <button
                    type="button"
                    title="Editar"
                    onClick={() => dispatch({ type: 'set-activeId', payload: { id: reservation.id } })}
                    className="bg-blue-100 text-blue-600 rounded-full p-2 shadow-md hover:bg-blue-200 hover:text-blue-800 active:bg-blue-300 active:scale-95 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    <HiPencilAlt className="w-5 h-5 cursor-pointer" />
                  </button>
                  <button
                    type="button"
                    title="Eliminar"
                    onClick={() => dispatch({ type: 'delete-reservation', payload: { id: reservation.id } })}
                    className="bg-red-100 text-red-600 rounded-full p-2 shadow-md hover:bg-red-200 hover:text-red-800 active:bg-red-300 active:scale-95 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-red-300"
                  >
                    <FaTrashAlt className="w-5 h-5 cursor-pointer" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationList;