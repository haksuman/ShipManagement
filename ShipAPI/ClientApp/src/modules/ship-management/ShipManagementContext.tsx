import { createContext } from "react";
import { Ship } from "../../types/Ship";

type ShipManagementContextType = {
  ships: Ship[];
  setShips: (ships: Ship[]) => void;
  goBackUrl: string;
};

const ShipManagementContext = createContext<ShipManagementContextType>({
  ships: [],
  setShips: () => {
    throw new Error("setShips not implemented");
  },
  goBackUrl: "/ship-management",
});

export default ShipManagementContext;
