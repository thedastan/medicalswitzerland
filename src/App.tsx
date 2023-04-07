/* External dependencies */
import { Box } from "@chakra-ui/layout";

/* Local dependencies */
import Interface from "./Components/Interface/Interface";
import Tabs from "./Components/Ui/Tab/Tabs";
import Notfall from "./Containers/Notfall/Notfall";

function App() {
  return (
    <Box bg="black">
      <Interface>
        <Tabs akte={<Box textColor="white">Akte</Box>} notfall={<Notfall />} />
      </Interface>
    </Box>
  );
}

export default App;
