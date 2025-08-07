import { categories } from "../data/categories";
import { formatDate } from "../helpers/formatDate";
import type { TReservation } from "../types";
import { useMemo } from "react";

type TReservationListProps = {
  state: TReservation[]
}

const ReservationList = ( {state} : TReservationListProps ) => {


  const typeName = useMemo( () => 
      (type: TReservation['type']) => categories.map ( cat => cat.id === type ? cat.name : '' ),
    [categories] );


  return (
    <div className="md:w-1/2 w-full p-8 flex flex-col bg-white">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Reservas recientes</h2>
        { state.length === 0 
        ? (<div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No hay reservas recientes.</p>
          </div>) 
        : <div className="space-y-5">
          {state.map((reservation : TReservation) => (
            <div key={reservation.id} className="space-y-5">
            <div className="space-y-5">
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 flex flex-col gap-2 border border-gray-100 hover:shadow-2xl transition-shadow duration-200 max-w-md mx-auto space-y-5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-lg text-blue-700 truncate" title={reservation.responsable}>{reservation.responsable}</span>
                <span className="text-sm text-gray-500 bg-blue-50 px-2 py-1 rounded-lg">{typeName(+reservation.type)}</span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-1">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>{formatDate(reservation.datetime)}</span>
                <span className="flex items-center gap-1"><svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4.13a4 4 0 10-8 0 4 4 0 008 0z" /></svg>{reservation.people} personas</span>
                <span className="flex items-center gap-1"><svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a5 5 0 00-10 0v2M5 9h14a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2z" /></svg>{reservation.paymentMethod}</span>
              </div>
              {reservation.description 
              ? <p className="text-gray-700 text-sm mt-1 line-clamp-3">{reservation.description}</p>
              : (<p className="text-gray-400 text-sm mt-1 line-clamp-3">Sin descripción</p>)
              }
               
            </div>


            </div>
        </div>
          ))}
          </div>}

          
        </div>
  )
}

export default ReservationList