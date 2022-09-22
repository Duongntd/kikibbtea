import React from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function User() {
  const [data, setData] = React.useState({});
  const [userId, setUserId] = React.useState("");
  const [adminPriv, setAdminPriv] = React.useState(false);
  const [noUserFound, setNoUserFound] = React.useState(false);
  const docSnap = async (ref) => {
    const res = await getDoc(ref);
    const doc = res.data();
    setData(doc[userId]);
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
    if (thisUser === "0d7347b6-6e6d-4f3b-88d7-343c5593096e") {
      setAdminPriv(true);
      getIdFromParams();
      if (userId) {
        const docRef = doc(db, "greifswald", "users");
        docSnap(docRef);
        setNoUserFound(false);
      } else setNoUserFound(true);
    } else {
      setAdminPriv(false);
    }
    // eslint-disable-next-line
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
