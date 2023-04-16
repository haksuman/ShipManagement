import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/system";
import { Ship } from "../../types/Ship";
import { Link } from "react-router-dom";

type ShipListProps = {
  ships: Ship[];
};

const ShipList = (props: ShipListProps) => {
  const { ships } = props;

  const handleEdit = (id: string) => {
    console.log("Edit ship with id: " + id);
  };
  const handleDelete = (id: string) => {
    console.log("Delete ship with id: " + id);
  };
  return (
    <>
      <Box sx={{ p: 4 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Ship Name</TableCell>
                <TableCell align="left">Length (m)</TableCell>
                <TableCell align="left">Width (m)</TableCell>
                <TableCell align="left">Code</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ships?.map((ship) => (
                <TableRow key={ship?.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {ship?.name}
                  </TableCell>
                  <TableCell align="left">{ship?.lengthInMeters}</TableCell>
                  <TableCell align="left">{ship?.widthInMeters}</TableCell>
                  <TableCell align="left">{ship?.code}</TableCell>
                  <TableCell align="left">
                    <IconButton color="primary" component={Link} to={`/ship-management/edit/|${ship.id}`}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(ship.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default ShipList;
