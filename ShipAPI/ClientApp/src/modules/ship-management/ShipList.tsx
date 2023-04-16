import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/system";
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
      <Box sx={{ p: 4 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{
                  "&:last-child th, &:last-child td": {
                    border: 0,
                  },
                  backgroundColor: "#f5f5f5",
                }}
              >
                {headers.map((header) => (
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
                          <IconButton color="primary" component={Link} to={`${goBackUrl}/edit/${ship.id}`}>
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
        <Dialog open={openDeleteDialog} onClose={handleDeleteCancel}>
          <DialogTitle>Delete Ship</DialogTitle>
          <DialogContent>Are you sure you want to delete this ship?</DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel}>Cancel</Button>
            <Button onClick={handleDeleteConfirm} autoFocus color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default ShipList;
