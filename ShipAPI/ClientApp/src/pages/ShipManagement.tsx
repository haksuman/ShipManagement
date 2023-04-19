import { useState, useEffect } from "react";
import { Ship } from "../types/Ship";
import ShipDrawer from "../modules/ship-management/ShipDrawer";
import ShipList from "../modules/ship-management/ShipList";
import { Link, useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ShipManagementContext from "../modules/ship-management/ShipManagementContext";

type ShipManagementProps = {};

export default function ShipManagement(props: ShipManagementProps) {
  const [ships, setShips] = useState<Ship[]>([]);
  const [deleteCount, setDeleteCount] = useState(0);
  const goBackUrl = "";
  const routeParams = useParams();

  useEffect(() => {
    const fetchUrl = new URL("/api/Ship", window.location.href);
    fetch(fetchUrl, {
      // fetch("/api/Ship", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((ships) => {
        setShips(ships);
      });
  }, [routeParams, deleteCount]);

  return (
    <ShipManagementContext.Provider value={{ ships, setShips, goBackUrl, setDeleteCount }}>
      <Box
        sx={{
          backgroundColor: "rgb(238, 238, 238)",
          p: 3,
          minHeight: "100vh",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Inter var, Roboto, Helvetica, Arial, sans-serif",
            fontWeight: 600,
            mt: 3,
          }}
        >
          Ship Management
        </Typography>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="success"
            component={Link}
            to={`${goBackUrl}/edit/new`}
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
      </Box>
    </ShipManagementContext.Provider>
  );
}
