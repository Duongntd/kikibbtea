import React from "react";
import menu from "../items/menu.json";
import toppingList from "../items/topping.json";
export default function Order() {
  const [order, setOrder] = React.useState({
    id: 10,
    name: "Pfirsich Eistee",
    size: "Medium",
    price: "4,00",
    topping: "Tapioka",
    custom: {
      default: true,
      milch: "normal",
      ice: "normal",
      warm: false,
      sweet: "normal",
    },
  });

  const orderCustom = () => {
    if (order.custom.default === true) return <p>None</p>;
    else
      return (
        <div>
          {order.custom.milch !== "normal" && <p>{order.custom.milch}</p>}
          {order.custom.ice !== "normal" && <p>{order.custom.ice}</p>}
          {order.custom.warm !== false && <p>Warm</p>}
          {order.custom.sweet !== "normal" && <p>{order.custom.sweet}</p>}
        </div>
      );
  };

  const menuMap = menu.map((drink) => {
    return (
      <div
        className={drink.type}
        onClick={() => setOrder({ ...order, id: drink.id, name: drink.name })}
      >
        <span>{drink.id}</span>
        <span>{drink.name}</span>
        <span>{drink.priceM}</span>
        <span>{drink.priceL}</span>
      </div>
    );
  });
  const listEistee = menuMap.filter(
    (drink) => drink.props.className === "Eistee"
  );
  const listTee = menuMap.filter((drink) => drink.props.className === "Tee");
  const listMilchtee = menuMap.filter(
    (drink) => drink.props.className === "Milchtee"
  );
  const listJoghurt = menuMap.filter(
    (drink) => drink.props.className === "Joghurt"
  );
  const listBraunerZucker = menuMap.filter(
    (drink) => drink.props.className === "Brauner Zucker"
  );
  const listCafe = menuMap.filter((drink) => drink.props.className === "Cafe");
  const listSmoothie = menuMap.filter(
    (drink) => drink.props.className === "Smoothie"
  );

  const toppingMap = toppingList.map((tp) => {
    return (
      <div className="topping-container">
        <h3 onClick={() => setOrder({ ...order, topping: tp.name })}>
          {tp.name}
        </h3>
      </div>
    );
  });
  return (
    <main>
      <h2>Order</h2>
      <section className="menu">
        <div className="tab">
          <h3>Fruchtiger Eistee</h3>
          {listEistee}
        </div>
        <div className="tab">
          <h3>Tee</h3>
          {listTee}
        </div>
        <div className="tab">
          <h3>Milchtee</h3>
          {listMilchtee}
        </div>
        <div className="tab">
          <h3>Joghurt</h3>
          {listJoghurt}
        </div>
        <div className="tab">
          <h3>Braun Zucker</h3>
          {listBraunerZucker}
        </div>
        <div className="tab">
          <h3>Cafe</h3>
          {listCafe}
        </div>
        <div className="tab">
          <h3>Smoothie</h3>
          {listSmoothie}
        </div>
      </section>
      <section className="order-step">
        <div className="steps">
          <h2>Step 1: Choose your bubble tea</h2>
          <h2>Your selection: {order.name}</h2>
        </div>
        <div className="steps">
          <h2>Step 2: Choose size</h2>
          <span onClick={() => setOrder({ ...order, size: "Medium" })}>
            Medium
          </span>
          <span onClick={() => setOrder({ ...order, size: "Large" })}>
            Large
          </span>
        </div>
        <div className="steps">
          <h2>Step 3: Choose topping</h2>
          {toppingMap}
        </div>
        <div className="steps">
          <h2>Step 4: Custom</h2>
          <div></div>
          <p
            onClick={() =>
              setOrder({
                ...order,
                custom: {
                  ...order.custom,
                  default: true,
                  ice: "normal",
                  warm: false,
                  sweet: "normal",
                },
              })
            }
          >
            None
          </p>
          <p
            onClick={() =>
              setOrder({
                ...order,
                custom: {
                  ...order.custom,
                  default: false,
                  milch: "Hafermilch",
                },
              })
            }
          >
            Hafermilch (für Milchtee)
          </p>
          <p
            onClick={() =>
              setOrder({
                ...order,
                custom: { ...order.custom, default: false, ice: "No Ice" },
              })
            }
          >
            No Ice
          </p>
          <p
            onClick={() =>
              setOrder({
                ...order,
                custom: { ...order.custom, default: false, ice: "Less Ice" },
              })
            }
          >
            Weniger Ice
          </p>
          <p
            onClick={() =>
              setOrder({
                ...order,
                custom: { ...order.custom, default: false, warm: true },
              })
            }
          >
            Warm
          </p>
          <p
            onClick={() =>
              setOrder({
                ...order,
                custom: {
                  ...order.custom,
                  default: false,
                  sweet: "Less Sweet",
                },
              })
            }
          >
            Weniger Süß
          </p>
          <p
            onClick={() =>
              setOrder({
                ...order,
                custom: {
                  ...order.custom,
                  default: false,
                  sweet: "More Sweet",
                },
              })
            }
          >
            Extra Süß
          </p>
        </div>
        <div className="review">
          <h2>Review your Order: </h2>
          <div>
            <p>
              <b>Item: </b>
              {order.name}
            </p>
            <p>
              <b>Size:</b> {order.size}
            </p>
            <p>
              <b>Topping: </b> {order.topping}
            </p>
            <div>
              <b>Custom: </b> {orderCustom()}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
