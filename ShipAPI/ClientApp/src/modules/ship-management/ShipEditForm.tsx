import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Ship } from "../../types/Ship";
import { TextField, Button, Grid } from "@mui/material";

type ShipEditFormProps = {};
const ShipEditForm = (props: ShipEditFormProps) => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    lengthInMeters: yup.number().required(),
  });
  // create react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Ship>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: Ship) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <TextField
            label="Name"
            variant="outlined"
            margin="normal"
            fullWidth
            {...register("name")}
            error={!!errors.name}
            helperText={errors?.name?.message}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            label="Length in meters"
            variant="outlined"
            margin="normal"
            fullWidth
            {...register("lengthInMeters")}
            error={!!errors.lengthInMeters}
            helperText={errors?.lengthInMeters?.message}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            label="Width in meters"
            variant="outlined"
            margin="normal"
            fullWidth
            {...register("widthInMeters")}
            error={!!errors.widthInMeters}
            helperText={errors?.widthInMeters?.message}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            label="Code"
            variant="outlined"
            margin="normal"
            fullWidth
            {...register("code")}
            error={!!errors.code}
            helperText={errors?.code?.message}
          />
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, mb: 2 }}>
        Save
      </Button>
    </form>
  );
};

export default ShipEditForm;
