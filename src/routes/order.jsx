import React from "react";
import menu from "../items/menu.json";
import toppingList from "../items/topping.json";
export default function Order() {
  const [order, setOrder] = React.useState({
    id: 10,
    name: "Pfirsich Eistee",
    size: "Medium",
    type: "Eistee",
    basePrice: 4,
    topping: [],
    custom: {
      topping: "normal",
      milch: "normal",
      ice: "normal",
      warm: false,
      sweet: "normal",
    },
  });

  const [basket, setBasket] = React.useState([]);
  const [viewBasket, setViewBasket] = React.useState(false);
  const basketCustom = (item) => {
    if (
      item.custom.topping === "normal" &&
      item.custom.milch === "normal" &&
      item.custom.ice === "normal" &&
      item.custom.sweet === "normal" &&
      item.custom.warm === false
    )
      return <p>None</p>;
    else
      return (
        <div>
          {item.custom.topping !== "normal" && (
            <p>Topping: {item.custom.topping}</p>
          )}
          {item.custom.milch !== "normal" && <p>Milch: {item.custom.milch}</p>}
          {item.custom.ice !== "normal" && <p>Ice: {item.custom.ice}</p>}
          {item.custom.sweet !== "normal" && <p>Sweet: {item.custom.sweet}</p>}
          {item.custom.warm !== false && <p>Warm</p>}
        </div>
      );
  };
  const basketMap = basket.map((item, index) => {
    return (
      <div>
        <div>
          <h3>Item {index + 1}</h3>
          <span
            onClick={() => {
              const newBasket = [...basket];
              newBasket.splice(index, 1);
              setBasket(newBasket);
            }}
          >
            Entfernen
          </span>
        </div>
        <p>{item?.name}</p>
        <p>Size: {item?.size}</p>
        <p>Topping: {item.topping.length ? item.topping : <span>None</span>}</p>
        <div>Custom: {basketCustom(item)}</div>
        <p>Preis: {item?.finalPrice}€</p>
      </div>
    );
  });

  const orderCustom = () => {
    if (
      order.custom.topping === "normal" &&
      order.custom.milch === "normal" &&
      order.custom.ice === "normal" &&
      order.custom.sweet === "normal" &&
      order.custom.warm === false
    )
      return <p>None</p>;
    else
      return (
        <div>
          {order.custom.topping !== "normal" && (
            <p>
              Topping: {order.custom.topping}{" "}
              <span
                onClick={() =>
                  setOrder({
                    ...order,
                    custom: {
                      ...order.custom,
                      topping: "normal",
                    },
                  })
                }
              >
                X
              </span>
            </p>
          )}
          {order.custom.milch !== "normal" && (
            <p>
              {order.custom.milch}{" "}
              <span
                onClick={() =>
                  setOrder({
                    ...order,
                    custom: {
                      ...order.custom,
                      milch: "normal",
                    },
                  })
                }
              >
                X
              </span>
            </p>
          )}
          {order.custom.ice !== "normal" && (
            <p>
              {order.custom.ice}{" "}
              <span
                onClick={() =>
                  setOrder({
                    ...order,
                    custom: {
                      ...order.custom,
                      ice: "normal",
                    },
                  })
                }
              >
                X
              </span>
            </p>
          )}
          {order.custom.warm !== false && (
            <p>
              Warm{" "}
              <span
                onClick={() =>
                  setOrder({
                    ...order,
                    custom: {
                      ...order.custom,
                      warm: false,
                    },
                  })
                }
              >
                X
              </span>
            </p>
          )}
          {order.custom.sweet !== "normal" && (
            <p>
              {order.custom.sweet}{" "}
              <span
                onClick={() =>
                  setOrder({
                    ...order,
                    custom: {
                      ...order.custom,
                      sweet: "normal",
                    },
                  })
                }
              >
                X
              </span>
            </p>
          )}
        </div>
      );
  };

  const menuMap = menu.map((drink) => {
    return (
      <div
        className={drink.type}
        onClick={() =>
          setOrder({
            ...order,
            id: drink.id,
            name: drink.name,
            type: drink.type,
            basePrice: drink.priceM,
          })
        }
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
        <span
          onClick={() =>
            setOrder({
              ...order,
              topping: order.topping.filter((tpg) => tpg !== tp.name),
            })
          }
        >
          -
        </span>
        <h3>{tp.name}</h3>
        <span
          onClick={() => {
            if (order.topping.length < 2)
              setOrder({ ...order, topping: [...order.topping, tp.name] });
          }}
        >
          +
        </span>
      </div>
    );
  });

  const priceCalc = () => {
    let finalPrice = order.basePrice;
    if (order.size === "Large") finalPrice += 0.5;
    if (order.custom.topping === "Extra") finalPrice += 1;
    return finalPrice;
  };
  const totalPrice = () => {
    return basket.reduce((total, currItem) => total + currItem?.finalPrice, 0);
  };
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
          <h2 onClick={() => console.log(order)}>Step 3: Choose topping</h2>
          <p
            onClick={() =>
              setOrder({
                ...order,
                custom: {
                  ...order.custom,
                  topping: "Extra",
                },
              })
            }
          >
            Extra topping? (+1 Euro)
          </p>
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
                  topping: "normal",
                  milch: "normal",
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
                custom: { ...order.custom, ice: "No Ice" },
              })
            }
          >
            No Ice
          </p>
          <p
            onClick={() =>
              setOrder({
                ...order,
                custom: { ...order.custom, ice: "Less Ice" },
              })
            }
          >
            Weniger Ice
          </p>
          <p
            onClick={() =>
              setOrder({
                ...order,
                custom: { ...order.custom, warm: true },
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
              <b>Topping: </b>{" "}
              {order.topping.length ? (
                order.topping.map((tp) => <span>{tp}</span>)
              ) : (
                <span>None</span>
              )}
            </p>
            <div>
              <b>Custom: </b> {orderCustom()}
            </div>
            <div>
              <h3>Preis: </h3> {priceCalc()}
            </div>
            <div>
              <p>Order now</p>
              <p
                onClick={() =>
                  setBasket([...basket, { ...order, finalPrice: priceCalc() }])
                }
              >
                Add to basket
              </p>
              <p
                onClick={() => {
                  console.log(basket);
                  setViewBasket((prev) => !prev);
                }}
              >
                View basket
              </p>
            </div>
            <div>
              <h2>Basket</h2>
              <div>{viewBasket && basketMap}</div>
              <h3>Total Price: {totalPrice()}€</h3>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
