/* External dependencies */
import { Box } from "@chakra-ui/layout";
import { Route, Routes } from "react-router-dom";

/* Local dependencies */
import Akte from "./Containers/Akte/Akte";
import Interface from "./Components/Interface/Interface";
import Tabs from "./Components/Ui/Tab/Tabs";
import Notfall from "./Containers/Notfall/Notfall";
import WelcomePage from "./Components/WelcomePage/WelcomePage";
import ResetPassword from "./Containers/reset/Reset";

function App() {
  return (
    <Box bg="black" pos="relative">
      <WelcomePage />
      <Routes>
        <Route
          path="/user/:id"
          element={
            <Interface>
              <Tabs akte={<Akte />} notfall={<Notfall />} />
            </Interface>
          }
        />
        <Route path="/reset/*" element={<ResetPassword />} />
      </Routes>
    </Box>
  );
}

export default App;
