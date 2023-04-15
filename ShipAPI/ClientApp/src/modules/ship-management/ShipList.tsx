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
                <TableCell align="left">Actions</TableCell>
                <TableCell>Ship Name</TableCell>
                <TableCell align="left">Length (m)</TableCell>
                <TableCell align="left">Width (m)</TableCell>
                <TableCell align="left">Code</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ships.map((ship) => (
                <TableRow key={ship.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="left">
                    <IconButton onClick={() => handleEdit(ship.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(ship.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {ship.name}
                  </TableCell>

                  <TableCell align="left">{ship.lengthInMeters}</TableCell>
                  <TableCell align="left">{ship.widthInMeters}</TableCell>
                  <TableCell align="left">{ship.code}</TableCell>
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
