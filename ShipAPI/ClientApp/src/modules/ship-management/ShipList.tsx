import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/system";

const ShipList = () => {
  const ships = [
    {
      id: 1,
      name: "Ship 1",

      lengthInMeters: 100,
      widthInMeters: 50,
      code: "S1",
    },
    {
      id: 2,
      name: "Ship 2",
      lengthInMeters: 200,
      widthInMeters: 100,
      code: "S2",
    },
  ];

  const handleEdit = (id: number) => {
    console.log("Edit ship with id: " + id);
  };
  const handleDelete = (id: number) => {
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
                <TableCell align="right">Length (m)</TableCell>
                <TableCell align="right">Width (m)</TableCell>
                <TableCell align="right">Code</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ships.map((ship) => (
                <TableRow key={ship.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {ship.name}
                  </TableCell>

                  <TableCell align="right">{ship.lengthInMeters}</TableCell>
                  <TableCell align="right">{ship.widthInMeters}</TableCell>
                  <TableCell align="right">{ship.code}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleEdit(ship.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(ship.id)}>
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
