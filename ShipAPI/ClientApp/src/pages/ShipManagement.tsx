import { useState } from "react";
import { Ship } from "../types/Ship";
import ShipDrawer from "../modules/ship-management/ShipDrawer";
import ShipList from "../modules/ship-management/ShipList";

type ShipManagementProps = {};

export default function ShipManagement(props: ShipManagementProps) {
  const [ships, setShips] = useState<Ship[]>([]);

  const [open, setOpen] = useState(true);
  const action = "create";

  // // Function to create a new ship
  // const createShip = (name: string, lengthInMeters: number, widthInMeters: number, code: string) => {
  //   const newShip: Ship = { name, lengthInMeters, widthInMeters, code };
  //   setShips([...ships, newShip]);
  // };

  // // Function to update an existing ship
  // const updateShip = (id: number, name: string, lengthInMeters: number, widthInMeters: number, code: string) => {
  //   const updatedShip: Ship = { id, name, lengthInMeters, widthInMeters, code };
  //   const updatedShips = ships.map((ship) => (ship.id === id ? updatedShip : ship));
  //   setShips(updatedShips);
  // };

  // // Function to delete a ship
  // const deleteShip = (id: number) => {
  //   const updatedShips = ships.filter((ship) => ship.id !== id);
  //   setShips(updatedShips);
  // };

  return (
    <div>
      <h1>Ship Management</h1>
      <ShipDrawer open={open} setOpen={setOpen} action={action} />
      <ShipList />
      {/* TODO: Add form to create new ships */}
      {/* TODO: Render list of existing ships */}
    </div>
  );
}
