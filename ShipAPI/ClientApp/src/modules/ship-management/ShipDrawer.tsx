import Drawer from "@mui/material/Drawer";
import { Divider, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ShipEditForm from "./ShipEditForm";

type ShipDrawerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  action: string;
};

const ShipDrawer = (props: ShipDrawerProps) => {
  return (
    <Drawer
      variant="permanent"
      anchor="right"
      open={props.open}
      sx={{
        [`& .MuiDrawer-paper`]: { width: 600, boxSizing: "border-box" },
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={() => props.setOpen(false)}>
          <CloseIcon
            sx={{
              fontSize: 30,
            }}
          />
        </IconButton>
      </div>

      <Typography variant="h4" component="div" sx={{ px: 2 }}>
        {props.action === "create" ? "Create Ship" : "Update Ship"}
      </Typography>
      <Divider sx={{ mx: 1 }} />
      <ShipEditForm />
    </Drawer>
  );
};

export default ShipDrawer;
