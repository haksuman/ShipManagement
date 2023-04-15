import * as yup from "yup";

type ShipEditFormProps = {};
const ShipEditForm = (props: ShipEditFormProps) => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    lengthInMeters: yup.number().required(),
  });

  return <></>;
};

export default ShipEditForm;
