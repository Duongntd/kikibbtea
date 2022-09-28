import React from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function User() {
  const [data, setData] = React.useState({});
  const [userList, setUserList] = React.useState({});
  const [userId, setUserId] = React.useState("");
  const [adminPriv, setAdminPriv] = React.useState(false);
  const [noUserFound, setNoUserFound] = React.useState(false);
  const docSnap = async (ref) => {
    const res = await getDoc(ref);
    const document = res.data();
    setUserList(document);
    setData(document[userId]);
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
  const pointDecrement = () => {
    setData({
      ...data,
      point: data.point - 1,
    });
  };
  const pointIncrement = () => {
    setData({
      ...data,
      point: data.point + 1,
    });
  };
  const saveChange = async () => {
    try {
      await setDoc(doc(db, "greifswald", "users"), {
        ...userList,
        [userId]: {
          ...data,
        },
      });
      console.log("saved");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <main>
      {!noUserFound && adminPriv ? (
        <div>
          <h2>Profile</h2>
          <p>Name: {data.username}</p>
          {data.preRegister && <b>Pre-registered</b>}
          <p>Password: {data.password}</p>
          <div className="user-point">
            <span className="minus-icon" onClick={() => pointDecrement()}>
              -
            </span>
            <span>Punkte: {data.point}</span>
            <span className="plus-icon" onClick={() => pointIncrement()}>
              +
            </span>
          </div>
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
          <button onClick={() => saveChange()}>Save</button>
        </div>
      ) : noUserFound && adminPriv ? (
        <p>No User Found!</p>
      ) : (
        <p>You are not authorize to view this page!</p>
      )}
    </main>
  );
}
