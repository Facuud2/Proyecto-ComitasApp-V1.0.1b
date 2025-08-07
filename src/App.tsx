import './App.css'
import ReservationForm from './components/ReservationForm'
import ReservationList from './components/ReservationList'
import { useReducer } from 'react'
import { reservationReducer, initialState } from './reducers/reservation-reducer'

function App() {

  const [state, dispatch] = useReducer(reservationReducer, initialState);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden">
        
        <ReservationForm
          dispatch={dispatch}
        />

        <ReservationList 
          state={state.reservations}
        />
        
      </div>
    </div>
  )
}

export default App
