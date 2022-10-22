import React from "react";
import { Outlet } from "react-router-dom";

export default function Account() {
  return (
    <main className="home-container">
      <section className="home-left">
        <h1>Good morning</h1>
      </section>
      <section className="home-right">
        <div className="m-4 overflow-hidden">
          <Outlet />
        </div>
      </section>
    </main>
  );
}
