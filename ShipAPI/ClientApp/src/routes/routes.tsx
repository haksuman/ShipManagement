import { Route, Routes } from "react-router-dom";

import ShipManagement from "../pages/ShipManagement";
import ShipForm from "../modules/ship-management/ShipForm";

export const routes = (
  <Routes>
    <Route path="/" element={<ShipManagement />}>
      <Route path="edit/:id" element={<ShipForm />} />
    </Route>
  </Routes>
);
