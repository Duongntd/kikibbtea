import "./App.css";
import { Outlet } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { HeaderMegaMenu } from "./components/Header";
import { RecoilRoot } from "recoil";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
library.add(fas, faEnvelope);

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <HeaderMegaMenu />
          <Outlet />
        </MantineProvider>{" "}
      </RecoilRoot>
    </div>
  );
}

export default App;
