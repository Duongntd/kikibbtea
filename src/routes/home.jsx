import React from "react";
import { FooterLinks } from "../components/Footer";

export default function Home() {
  return (
    <main className="home-container">
      <section className="home-left">
        <h1>Good morning</h1>
      </section>
      <section className="home-right">
        <h1>Home page</h1>
        <div className="m-4 overflow-hidden">
          <h2 className="mb-2">lorem ipsum</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
        <div className="m-4 overflow-hidden">
          <h2 className="mb-2">lorem ipsum</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
        <div className="m-4 overflow-hidden">
          <h2 className="mb-2">lorem ipsum</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
        <div className="m-4 overflow-hidden">
          <h2 className="mb-2">lorem ipsum</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
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
      </section>
    </main>
  );
}
