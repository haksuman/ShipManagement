import { createContext } from "react";
import { Ship } from "../../types/Ship";

type ShipManagementContextType = {
  ships: Ship[];
  setShips: (ships: Ship[]) => void;
  goBackUrl: string;
  setDeleteCount: (count: number) => void;
};

const ShipManagementContext = createContext<ShipManagementContextType>({
  ships: [],
  setShips: () => {
    throw new Error("setShips not implemented");
  },
  goBackUrl: "",
  setDeleteCount: () => {
    throw new Error("setDeleteCount not implemented");
  },
});

export default ShipManagementContext;
