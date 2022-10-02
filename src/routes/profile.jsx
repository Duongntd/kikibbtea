import React from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { LeadGrid } from "../components/Grid";

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
      <LeadGrid></LeadGrid>
      <h1>My Profile</h1>
      <div className="profile-header">
        <div className="profile-grid-col-1">
          <h2 className="overview-title">Overview</h2>
          {!adminPriv ? (
            <div className="profile-card-container">
              <div className="profile-card-col-1">
                <p className="profile-username">{data?.displayName}</p>
                <div className="profile-bio-container">
                  <p>{data?.bio}</p>
                </div>
              </div>
              <div className="profile-card-col-2">
                <div className="profile-card-title">
                  <strong>Title: </strong>
                  <span>Kunden</span>
                </div>
                <p>Punkte: {data?.point}</p>
              </div>
              <div className="profile-card-row-2">
                <p>Change username</p>
                <p>Change password</p>
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
        <div className="profile-grid-col-2">
          <div className="profile-grid-rows">
            <p>
              Favorite Drinks:{" "}
              {data?.favDrinks?.map((drink) => (
                <b>{drink}</b>
              ))}
            </p>
          </div>
          <div className="profile-grid-rows">
            <p>
              Past Orders:{" "}
              {data?.pastOrders?.map((order) => (
                <b>{order}</b>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
