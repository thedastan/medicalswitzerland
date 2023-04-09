/* External dependencies */
import { Box } from "@chakra-ui/layout";

/* Local dependencies */
import Akte from "./Containers/Akte/Akte";
import Interface from "./Components/Interface/Interface";
import Tabs from "./Components/Ui/Tab/Tabs";
import Notfall from "./Containers/Notfall/Notfall";

function App() {
  return (
    <Box bg="black">
      <Interface>
        <Tabs akte={<Akte />} notfall={<Notfall />} />
      </Interface>
    </Box>
  );
}

export default App;
