import { useState, useEffect } from "react";
import { Ship } from "../types/Ship";
import ShipDrawer from "../modules/ship-management/ShipDrawer";
import ShipList from "../modules/ship-management/ShipList";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ShipManagementContext from "../modules/ship-management/ShipManagementContext";

type ShipManagementProps = {};

export default function ShipManagement(props: ShipManagementProps) {
  const [ships, setShips] = useState<Ship[]>([]);

  useEffect(() => {
    fetch("/api/Ship")
      .then((response) => response.json())
      .then((ships) => {
        setShips(ships);
      });
  }, []);

  return (
    <ShipManagementContext.Provider value={{ ships, setShips }}>
      <div>
        <h1>Ship Management</h1>
        <Button variant="contained" color="primary" component={Link} to="/ship-management/create">
          <AddIcon />
          Create Ship
        </Button>
        <ShipDrawer />
        <ShipList ships={ships} />
        {/* TODO: Add form to create new ships */}
        {/* TODO: Render list of existing ships */}
      </div>
    </ShipManagementContext.Provider>
  );
}
