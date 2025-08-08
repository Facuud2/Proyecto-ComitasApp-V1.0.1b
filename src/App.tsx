import './App.css'
import ReservationForm from './components/ReservationForm'
import ReservationList from './components/ReservationList'
import { useEffect, useReducer } from 'react'
import { reservationReducer, initialState } from './reducers/reservation-reducer'

function App() {

  const [state, dispatch] = useReducer(reservationReducer, initialState);


  useEffect( () => {
    localStorage.setItem('reservations', JSON.stringify(state.reservations));
  }, [state.reservations] )

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4 overflow-hidden">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg flex flex-col md:flex-row">

        <ReservationForm
          state={state}
          dispatch={dispatch}
        />

        <ReservationList
          state={state.reservations}
          dispatch={dispatch}
          reservationState={state}
        />



      </div>
    </div>
  )
}

export default App
