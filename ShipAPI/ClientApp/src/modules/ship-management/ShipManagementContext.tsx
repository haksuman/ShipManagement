import { createContext } from "react";
import { Ship } from "../../types/Ship";

type ShipManagementContextType = {
  ships: Ship[];
  setShips: (ships: Ship[]) => void;
};

const ShipManagementContext = createContext<ShipManagementContextType>({
  ships: [],
  setShips: () => {
    throw new Error("setShips not implemented");
  },
});

export default ShipManagementContext;
