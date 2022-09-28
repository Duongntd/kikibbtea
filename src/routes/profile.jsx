import React from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function Profile() {
  const [data, setData] = React.useState({});
  const [userList, setUserList] = React.useState({});
  const [adminPriv, setAdminPriv] = React.useState(false);
  const [searchName, setSearchName] = React.useState("");
  const [searchResult, setSearchResult] = React.useState(true);

  const navigate = useNavigate();

  const userId = localStorage.getItem("user");
  const docSnap = async (ref) => {
    const res = await getDoc(ref);
    const doc = res?.data();
    setData(doc[userId]);
    let list = [];
    for (let user in doc) {
      list.push({
        ...doc[user],
        id: user,
      });
    }
    setUserList(list);
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
    const found = userList?.find((user) => user.username === searchName);

    if (found && found.id) {
      navigate(`/user?id=${found.id}`);
    } else setSearchResult(false);
  };
  return (
    <div className="profile-page-container">
      <h2>Profile</h2>
      {!adminPriv ? (
        <div className="profile-card-container">
          <div className="profile-pic"></div>
          <div className="flex-around">
            <div className="profile-col-1">
              <p className="profile-username">{data?.displayName}</p>
              <div className="profile-bio-container">
                <p>{data?.bio}</p>
              </div>
              <p>
                Favorite Drinks:{" "}
                {data?.favDrinks?.map((drink) => (
                  <b>{drink}</b>
                ))}
              </p>
              <p>
                Past Orders:{" "}
                {data?.pastOrders?.map((order) => (
                  <b>{order}</b>
                ))}
              </p>
            </div>
            <div className="profile-col-2">
              <p>Punkte: {data?.point}</p>
            </div>
          </div>
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
    </div>
  );
}
