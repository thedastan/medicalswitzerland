/* External dependencies */
import { Box } from "@chakra-ui/layout";

/* Local dependencies */
import Akte from "./Containers/Akte/Akte";
import Interface from "./Components/Interface/Interface";
import Tabs from "./Components/Ui/Tab/Tabs";
import Notfall from "./Containers/Notfall/Notfall";
import WelcomePage from "./Components/WelcomePage/WelcomePage";

function App() {
  return (
    <Box bg="black" pos="relative">
      <WelcomePage />
      <Interface>
        <Tabs akte={<Akte />} notfall={<Notfall />} />
      </Interface>
    </Box>
  );
}

export default App;
