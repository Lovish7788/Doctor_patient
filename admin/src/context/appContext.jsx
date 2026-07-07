import { createContext } from "react";

export const AppContext = createContext();

const AppConextProvider = (props)=>
{
const value ={
// currenrySymbol : '₹'
currencySymbol : '$'
}

return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
)
}

export default AppConextProvider





