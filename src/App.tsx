/* External dependencies */
import { Box } from "@chakra-ui/layout";
import { Route, Routes } from "react-router";

/* Local dependencies */
import Akte from "./Containers/Akte/Akte";
import Interface from "./Components/Interface/Interface";
import Tabs from "./Components/Ui/Tab/Tabs";
import Notfall from "./Containers/Notfall/Notfall";
import WelcomePage from "./Components/WelcomePage/WelcomePage";
import Registration from "./Components/Registration/Registration";
import { getAccessToken } from "./Components/Helpers";

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
      </Routes>
    </Box>
  );
}

export default App;
