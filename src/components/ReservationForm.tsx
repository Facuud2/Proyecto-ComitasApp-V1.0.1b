import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { categories, paymentMethods, sedes } from "../data/categories";
import type { ReservationActions, ReservationState } from "../reducers/reservation-reducer";
import { v4 as uuidv4 } from "uuid";
import type { TReservation } from "../types";
import type { ChangeEvent, Dispatch, FormEvent } from "react";
import { useEffect, useState } from "react";

type TReservationFormProps = {
  state: ReservationState
  dispatch: Dispatch<ReservationActions>
}

const ReservationForm = ( { state, dispatch} : TReservationFormProps ) => {
  
  const initialState : TReservation = {
    id: uuidv4(),
    type: 1,
    location: 1,
    datetime: '',
    responsable: '',
    people: 2,
    description: '',
    paymentMethod: 1
  }

  const [reservationData, setReservationData] = useState<TReservation>(initialState);

  useEffect( () => {
    if(state.activeId) {
      const selectedReservation = state.reservations.filter( reservation => reservation.id === state.activeId)[0];
      setReservationData(selectedReservation);
    }
  }, [state.activeId, state.reservations]);



    const handleChange = (e : ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {

        const isNumberField = ['type', 'location', 'people'].includes(e.target.id);

        setReservationData({
            ...reservationData,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
            
        }
    );


    }

    const isFormValid = () => {
        const { type, location, datetime, responsable, people, paymentMethod } = reservationData;

        return type !== 999 
        && location !== 999 
        && datetime 
        && responsable.trim() !== '' 
        && people > 0 
        && paymentMethod !== 999;
    } 
    


    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      dispatch({ type: 'save-reservation', payload: { newReservation: reservationData }});
      setReservationData({
        ...initialState,
        id: uuidv4()
      });
    }

  return (
    <div className="md:w-1/2 w-full p-8 bg-gradient-to-br from-blue-200 via-white to-blue-100 flex flex-col justify-center rounded-3xl shadow-2xl border border-blue-100 sm:mb-3">
      <h2 className="text-2xl font-extrabold text-blue-800 mb-8 flex items-center gap-2 tracking-tight">
        <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        Reserva tu mesa
      </h2>
      <form 
        className="space-y-7"
        onSubmit={handleSubmit}
      >

            {/* Campo de tipo de reserva */}
        <div>
          <label htmlFor="type" className="block text-sm font-semibold text-blue-700 mb-2">Tipo de reserva</label>
          <select 
            id="type" 
            className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-sm transition-all duration-150"
            value={reservationData.type}
            onChange={handleChange}
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-semibold text-blue-700 mb-2">Sede del restaurante</label>
          <select 
            id="location" 
            className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-sm transition-all duration-150"
            value={reservationData.location}
            onChange={handleChange}
          >
            {sedes.map(sede => (
              <option key={sede.id} value={sede.id}>{sede.name}</option>
            ))}
          </select>
        </div>


            {/* Campo fecha */}
        <div>
          <label htmlFor="datetime" className="text-sm font-semibold text-blue-700 mb-2 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Fecha y hora
          </label>
          <DatePicker
            id="datetime"
            selected={reservationData.datetime ? new Date(reservationData.datetime) : null}
            onChange={date => {
              const event = { target: { id: "datetime", value: date ? date.toISOString().slice(0, 24) : "" } };
              handleChange(event as ChangeEvent<HTMLInputElement>);
            }}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            dateFormat="dd/MM/yyyy HH:mm"
            placeholderText="Selecciona fecha y hora"
            className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-sm transition-all duration-150 text-blue-800 font-medium tracking-wide"
            minDate={new Date()}
            autoComplete="off"
          />
        </div>


            {/* Campo nombre responsable */}
        <div>
          <label htmlFor="responsable" className="block text-sm font-semibold text-blue-700 mb-2">Nombre del responsable</label>
          <input id="responsable" 
            type="text" 
            className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-sm transition-all duration-150 placeholder:text-blue-300" placeholder="Tu nombre" 
            value={reservationData.responsable}
            onChange={handleChange}
          />
        </div>


            {/* Campo cantidad de personas */}
        <div>
          <label htmlFor="people" className="block text-sm font-semibold text-blue-700 mb-2">Cantidad de personas</label>
          <input id="people" 
            type="number" 
            min={2}
            max={16}
            className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-sm transition-all duration-150 placeholder:text-blue-300" 
            placeholder="Ej: 4" 
            value={reservationData.people}
            onChange={handleChange}
          />
        </div>


            {/* Campo descripción breve */}
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-blue-700 mb-2">Descripción breve</label>
          <textarea id="description" 
            className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-sm transition-all duration-150 resize-none placeholder:text-blue-300" 
            rows={3} 
            placeholder="Ej: Celebración de cumpleaños"
            onChange={handleChange}
            value={reservationData.description}
          ></textarea>
        </div>

            {/* Campo método de pago */}
        <div>
          <label htmlFor="paymentMethod" className="block text-sm font-semibold text-blue-700 mb-2">Método de pago</label>
          <select 
            id="paymentMethod" 
            className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-sm transition-all duration-150"
            onChange={handleChange}
            value={reservationData.paymentMethod}
          >
            {paymentMethods.map(sede => (
              <option key={sede.id} value={sede.name}>{sede.name}</option>
            ))}
          </select>
        </div>
        <input 
          type="submit" 
          className="w-full py-3 mt-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold rounded-xl shadow-lg opacity-80 hover:opacity-100 hover:scale-[1.02] active:scale-95 transition-all duration-150 tracking-wide text-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-blue-400"
          disabled={!isFormValid()}
          value={reservationData.type === 1 ? "Reservar cena" 
            : reservationData.type === 2 ? "Reservar merienda" 
            : reservationData.type === 3 ?"Reservar evento" 
            : "Reservar"}
        />
          </form>
        </div>
  )
}

export default ReservationForm