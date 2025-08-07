import { categories, paymentMethods, sedes } from "../data/categories";
import type { ReservationActions } from "../reducers/reservation-reducer";
import { v4 as uuidv4 } from "uuid";
import type { TReservation } from "../types";
import type { ChangeEvent, Dispatch, FormEvent } from "react";
import { useState } from "react";

type TReservationFormProps = {
  dispatch: Dispatch<ReservationActions>
}

const ReservationForm = ( {dispatch} : TReservationFormProps ) => {

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
    <div className="md:w-1/2 w-full p-8 bg-gradient-to-br from-blue-100 to-blue-50 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Reserva tu mesa</h2>
          <form 
          className="space-y-5"
          onSubmit={handleSubmit}
          >

            {/* Campo de tipo de reserva */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Tipo de reserva</label>
              <select 
              id="type" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
              value={reservationData.type}
              onChange={handleChange}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div>


              {/* Campo sede del restaurante */}
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Sede del restaurante</label>
              <select 
              id="location" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
              value={reservationData.location}
              onChange={handleChange}>
                {sedes.map(sede => (
                  <option key={sede.id} value={sede.id}>{sede.name}</option>
                ))}
              </select>
            </div>


            {/* Campo fecha */}
            <div>
              <label htmlFor="datetime" className="block text-sm font-medium text-gray-700 mb-1">Fecha y hora</label>
              <input id="datetime" 
              type="datetime-local" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white" 
              value={reservationData.datetime}
              onChange={handleChange}
              />
            </div>


            {/* Campo nombre responsable */}
            <div>
              <label htmlFor="responsable" className="block text-sm font-medium text-gray-700 mb-1">Nombre del responsable</label>
              <input id="responsable" 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white" placeholder="Tu nombre" 
              value={reservationData.responsable}
              onChange={handleChange}/>
            </div>


            {/* Campo cantidad de personas */}
            <div>
              <label htmlFor="people" className="block text-sm font-medium text-gray-700 mb-1">Cantidad de personas</label>
              <input id="people" 
              type="number" 
              min={2}
              max={16}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white" 
              placeholder="Ej: 4" 
              value={reservationData.people}
              onChange={handleChange}
              />
            </div>


            {/* Campo descripción breve */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descripción breve</label>
              <textarea id="description" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white resize-none" rows={3} placeholder="Ej: Celebración de cumpleaños"
              onChange={handleChange}
              value={reservationData.description}
              ></textarea>
            </div>

            {/* Campo método de pago */}
            <div>
              <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">Método de pago</label>
              <select 
              id="paymentMethod" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
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
            className="w-full py-3 mt-2 bg-blue-400 text-white font-semibold cursor-pointer hover:bg-blue-500 transition-all rounded-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-blue-400"
            disabled={!isFormValid()}
            value={reservationData.type === 1 ? "Reservar cena" 
              : reservationData.type === 2 ? "Reservar merienda" 
              : reservationData.type === 3 ?"Reservar evento" 
              : "Reservar"}
            >
            </input>
          </form>
        </div>
  )
}

export default ReservationForm