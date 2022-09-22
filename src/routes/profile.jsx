import React from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function Profile() {
  const [data, setData] = React.useState({});
  const [adminPriv, setAdminPriv] = React.useState(false);
  const [searchName, setSearchName] = React.useState("");
  const [searchResult, setSearchResult] = React.useState(true);

  const navigate = useNavigate();

  const userId = localStorage.getItem("user");
  const docSnap = async (ref) => {
    const res = await getDoc(ref);
    const doc = res.data();
    setData(doc[userId]);
  };
  React.useEffect(() => {
    if (userId) {
      if (userId === "0d7347b6-6e6d-4f3b-88d7-343c5593096e") {
        setAdminPriv(true);
        const docRef = doc(db, "greifswald", "users");
        docSnap(docRef);
      } else {
        const docRef = doc(db, "greifswald", "users");
        docSnap(docRef);
      }
    }
    // eslint-disable-next-line
  }, []);

  const searchUser = () => {
    let userIdList = localStorage.getItem("userIdList");
    let userId;
    if (userIdList) {
      userId = JSON.parse(userIdList).find(
        (user) => user.username === searchName
      )?.id;
    }
    if (userId) {
      navigate(`/user?id=${userId}`);
    } else setSearchResult(false);
  };
  return (
    <main>
      <h2>Profile</h2>
      <p>Role: {adminPriv ? <span>Admin</span> : <span>Kunden</span>}</p>

      {!adminPriv ? (
        <div>
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
      ) : (
        <div>
          <h3>Seach User</h3>
          <label htmlFor="username">
            Username:
            <input
              type="text"
              id="username"
              name="username"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <button onClick={() => searchUser()}>Search</button>
          </label>
          {!searchResult && <p>No user found!</p>}
        </div>
      )}
    </main>
  );
}
