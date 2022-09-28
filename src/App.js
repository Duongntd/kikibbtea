import "./App.css";
import { Outlet } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { HeaderSimple } from "./components/Header";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <HeaderSimple
            links={[
              { link: "/", label: "Home" },
              { link: "/login", label: "Login" },
              { link: "/profile", label: "Profile" },
              { link: "/order", label: "Order" },
              { link: "/logout", label: "Logout" },
            ]}
          ></HeaderSimple>
          <Outlet />
        </MantineProvider>{" "}
      </RecoilRoot>
    </div>
  );
}

export default App;
