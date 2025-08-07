
import type { TReservation} from "../types"


export const displayName = (options : TReservation[]) => {

const optionName = () => 
    (option: TReservation['type']) => options.map( opt => opt.id === option ? opt.name : '' )


return optionName;
}
