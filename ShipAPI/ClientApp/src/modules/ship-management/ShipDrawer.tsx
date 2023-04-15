import Drawer from "@mui/material/Drawer";
import { Divider, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ShipForm from "./ShipForm";
import { Outlet, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

type ShipDrawerProps = {
  // open: boolean;
  // setOpen: (open: boolean) => void;
  // action: string;
};

const ShipDrawer = (props: ShipDrawerProps) => {
  // const { open, setOpen } = props;
  const [open, setOpen] = useState(false);
  const routeParams = useParams();

  useEffect(() => {
    if (routeParams.id) {
      setOpen(true);
    }
  }, [routeParams]);

  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={open}
      sx={{
        [`& .MuiDrawer-paper`]: { width: 600, boxSizing: "border-box" },
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={() => setOpen(false)}>
          <CloseIcon
            sx={{
              fontSize: 30,
            }}
          />
        </IconButton>
      </div>

      <Outlet />
    </Drawer>
  );
};

export default ShipDrawer;
