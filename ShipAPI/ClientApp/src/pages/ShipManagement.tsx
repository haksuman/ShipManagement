import { useState } from "react";
import { Ship } from "../types/Ship";
import ShipDrawer from "../modules/ship-management/ShipDrawer";
import ShipList from "../modules/ship-management/ShipList";
import { useEffect } from "react";

type ShipManagementProps = {};

export default function ShipManagement(props: ShipManagementProps) {
  const [ships, setShips] = useState<Ship[]>([]);

  useEffect(() => {
    // fetch("api/Ship")
    fetch("https://localhost:7097/api/Ship")
      .then((response) => response.json())
      .then((ships) => {
        setShips(ships);
        console.log(ships);
      });
  }, []);

  return (
    <div>
      <h1>Ship Management</h1>
      <ShipDrawer />
      <ShipList />
      {/* TODO: Add form to create new ships */}
      {/* TODO: Render list of existing ships */}
    </div>
  );
}
