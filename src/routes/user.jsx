import React from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function User() {
  const [data, setData] = React.useState({});
  const [userId, setUserId] = React.useState("");
  const [adminPriv, setAdminPriv] = React.useState(false);
  const [noUserFound, setNoUserFound] = React.useState(false);
  const docSnap = async (ref) => {
    const doc = await getDoc(ref);
    setData(doc.data());
  };
  const getIdFromParams = () => {
    let params = new URL(document.location).searchParams;
    let id = params.get("id");
    if (id) setUserId(id);
    else console.log("No user found");
  };
  React.useEffect(() => {
    console.log("Effect ran");
    let thisUser = localStorage.getItem("user");
    if (thisUser === "dUDc4IorGxtsR2HDHoy4") {
      setAdminPriv(true);
      getIdFromParams();
      if (userId) {
        const docRef = doc(db, "users", userId);
        docSnap(docRef);
        setNoUserFound(false);
      } else setNoUserFound(true);
    } else {
      setAdminPriv(false);
    }
  }, [userId]);

  return (
    <main>
      {!noUserFound && adminPriv ? (
        <div>
          <h2>Profile</h2>
          <p>Name: {data.username}</p>
          {data.preRegister && <b>Pre-registered</b>}
          <p>Password: {data.password}</p>
          <p>Punkte: {data.point}</p>
          <p>
            Favorite Drinks:{" "}
            {data.favDrinks?.map((drink) => (
              <b>{drink}</b>
            ))}
          </p>
          <p>
            Past Orders:{" "}
            {data.pastOrders?.map((order) => (
              <b>{order}</b>
            ))}
          </p>
        </div>
      ) : noUserFound && adminPriv ? (
        <p>No User Found!</p>
      ) : (
        <p>You are not authorize to view this page!</p>
      )}
    </main>
  );
}
