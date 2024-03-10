import { createContext, useContext } from "react";

const PropertyContext = createContext(null)
export const useProperty = () => useContext(PropertyContext)
export default PropertyContext

