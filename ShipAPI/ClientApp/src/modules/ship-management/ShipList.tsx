import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Ship } from "../../types/Ship";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import ShipManagementContext from "./ShipManagementContext";

type ShipListProps = {
  ships: Ship[];
};

const ShipList = (props: ShipListProps) => {
  const { ships } = props;
  const { setDeleteCount, goBackUrl } = useContext(ShipManagementContext);

  const headers = [
    { id: "name", label: "Ship Name", minWidth: 170 },
    { id: "lengthInMeters", label: "Length (m)", minWidth: 100 },
    { id: "widthInMeters", label: "Width (m)", minWidth: 100 },
    { id: "code", label: "Code", minWidth: 100 },
    { id: "actions", label: "Actions", minWidth: 100 },
  ];

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedShipId, setSelectedShipId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setSelectedShipId(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    fetch(`/api/Ship/${selectedShipId}`, {
      method: "DELETE",
    }).then(() => {
      setOpenDeleteDialog(false);
      setSelectedShipId(null);
      setDeleteCount(((prev: number) => prev + 1) as any);
    });
  };

  const handleDeleteCancel = () => {
    setSelectedShipId(null);
    setOpenDeleteDialog(false);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          mt: 3,
          borderRadius: 5,
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
        }}
      >
        <Table sx={{ minWidth: "100%" }}>
          <TableHead>
            <TableRow
              sx={{
                "&:last-child th, &:last-child td": {
                  border: 0,
                },
                backgroundColor: "#f5f5f5",
              }}
            >
              {headers?.map((header) => (
                <TableCell key={header.id} style={{ minWidth: header.minWidth }}>
                  {header.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ships?.map((ship) => (
              <TableRow key={ship?.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                {headers.map((header) => (
                  <TableCell key={header.id} align="left">
                    {header.id === "actions" ? (
                      <>
                        <IconButton color="primary" component={Link} to={`${goBackUrl}edit/${ship.id}`}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(ship.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </>
                    ) : (
                      ship?.[header?.id]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteCancel}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: 5,
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
            px: 2,
            py: 1,
          },
        }}
      >
        <DialogTitle>
          <Typography
            variant="h6"
            sx={{
              fontSize: "1.5rem",
              fontWeight: 600,
            }}
          >
            Delete Ship
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="body1"
            sx={{
              fontSize: "1.2rem",
              mb: 1,
            }}
          >
            Are you sure you want to delete this ship?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteCancel}
            variant="outlined"
            sx={{
              fontSize: "1.1rem",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            autoFocus
            color="error"
            sx={{
              fontSize: "1.1rem",
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ShipList;
