import { Route, Routes } from "react-router-dom";

import ShipManagement from "../pages/ShipManagement";

export const routes = (
  <Routes>
    {/* Shared route */}
    <Route path="/ship-management" element={<ShipManagement />} />
  </Routes>
);
