import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <main>
      <FontAwesomeIcon icon={faEnvelope} />
      <h1>Home</h1>
    </main>
  );
}
