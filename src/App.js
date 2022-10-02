import "./App.css";
import { Outlet } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { HeaderSimple } from "./components/Header";
import { FooterLinks } from "./components/Footer";
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
          <FooterLinks
            data={[
              {
                title: "About us",
                links: [
                  { label: "Location", link: "/about" },
                  { label: "Kiki Tee", link: "/about" },
                  { label: "Kiki Food", link: "/about" },
                ],
              },
              {
                title: "Get in touch",
                links: [
                  { label: "Contact", link: "/contact" },
                  { label: "Leave a review", link: "/contact" },
                ],
              },
              {
                title: "FAQ",
                links: [
                  { label: "Have a question?", link: "/faq" },
                  { label: "Search", link: "/faq" },
                ],
              },
            ]}
          ></FooterLinks>
        </MantineProvider>{" "}
      </RecoilRoot>
    </div>
  );
}

export default App;
