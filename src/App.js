import React from "react";
import { Route, Routes } from "react-router-dom";

import Chart from "./containers/Chart";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Chart />} />
      </Routes>
    </div>
  );
};

export default App;
