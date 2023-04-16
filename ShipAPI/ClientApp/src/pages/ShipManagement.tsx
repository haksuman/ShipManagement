import { useState, useEffect } from "react";
import { Ship } from "../types/Ship";
import ShipDrawer from "../modules/ship-management/ShipDrawer";
import ShipList from "../modules/ship-management/ShipList";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ShipManagementContext from "../modules/ship-management/ShipManagementContext";

type ShipManagementProps = {};

export default function ShipManagement(props: ShipManagementProps) {
  const [ships, setShips] = useState<Ship[]>([]);
  const goBackUrl = "/ship-management";
  const routeParams = useParams();

  useEffect(() => {
    fetch("/api/Ship")
      .then((response) => response.json())
      .then((ships) => {
        setShips(ships);
      });
  }, [routeParams]);

  return (
    <ShipManagementContext.Provider value={{ ships, setShips, goBackUrl }}>
      <div>
        <h1>Ship Management</h1>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="success"
            component={Link}
            to="/ship-management/edit/new"
            sx={{
              width: 200,
              fontSize: 20,
            }}
          >
            <AddIcon sx={{ mr: 1 }} />
            Add Ship
          </Button>
        </div>
        <ShipDrawer />
        <ShipList ships={ships} />
        {/* TODO: Add form to create new ships */}
        {/* TODO: Render list of existing ships */}
      </div>
    </ShipManagementContext.Provider>
  );
}
