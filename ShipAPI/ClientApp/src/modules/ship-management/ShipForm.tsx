import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Ship } from "../../types/Ship";
import { TextField, Button, Grid, Typography, Divider } from "@mui/material";
import { useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate, useParams } from "react-router-dom";
import ShipManagementContext from "./ShipManagementContext";

type ShipEditFormProps = {
  // onSubmitSpy: (data: Ship) => void;
};
const ShipForm = (props: ShipEditFormProps) => {
  const routeParams = useParams();
  const navigate = useNavigate();
  const { goBackUrl } = useContext(ShipManagementContext);
  const { id } = routeParams as { id: string };
  const action = id === "new" ? "create" : "edit";
  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    lengthInMeters: yup
      .number()
      .nullable()
      .typeError("Length in meters must be a number")
      .positive("Length in meters must be a positive number"),
    widthInMeters: yup
      .number()
      .typeError("Width in meters must be a number")
      .positive("Width in meters must be a positive number"),
    code: yup
      .string()
      .required("Code is required")
      .matches(/^[A-Za-z]{4}-\d{4}-[A-Za-z]\d$/, "Code must be in the format of AAAA-1111-A1"),
  });
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<Ship>({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (data: Ship) => {
    if (action === "create") {
      fetch("/api/Ship", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((response) => {
        if (response.ok) {
          console.log("created");
          navigate(goBackUrl);
          return response.json();
        }
      });
    } else {
      fetch(`/api/Ship/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((response) => {
        if (response.ok) {
          console.log("updated");
          navigate(goBackUrl);
        }
      });
    }
    return data;
  };

  useEffect(() => {
    if (action === "create") {
      setValue("id", uuidv4());
    } else {
      // fetch ship by id
      fetch(`/api/Ship/${id}`)
        .then((response) => response.json())
        .then((ship) => {
          reset(ship);
        });
    }
  }, [action]);

  return (
    <form role="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item xs={12} sm={12}>
          <Typography variant="h4" component="div" sx={{ px: 2 }}>
            {action === "create" ? "Create Ship" : "Update Ship"}
          </Typography>
          <Divider sx={{ mx: 1, mb: 2 }} />
        </Grid>

        <Grid item xs={12} sm={12}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Name"
                variant="outlined"
                margin="normal"
                fullWidth
                {...field}
                error={!!errors?.name}
                helperText={errors?.name?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Controller
            name="lengthInMeters"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <TextField
                label="Length in meters"
                variant="outlined"
                type="number"
                margin="normal"
                fullWidth
                {...field}
                error={!!errors?.lengthInMeters}
                helperText={errors?.lengthInMeters?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Controller
            name="widthInMeters"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <TextField
                label="Width in meters"
                variant="outlined"
                type="number"
                margin="normal"
                fullWidth
                {...field}
                error={!!errors?.widthInMeters}
                helperText={errors?.widthInMeters?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Controller
            name="code"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Code"
                variant="outlined"
                margin="normal"
                fullWidth
                {...field}
                error={!!errors?.code}
                helperText={errors?.code?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="inherit"
              component={Link}
              to={goBackUrl}
              sx={{ mt: 2, mr: 2, fontSize: 18, width: 120 }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, mr: 2, fontSize: 18, width: 120 }}>
              Save
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

export default ShipForm;
