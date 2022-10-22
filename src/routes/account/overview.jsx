import React from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { LeadGrid } from "../../components/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import bubbleTeaIcon from "../../assets/icons/bubbleTeaIcon.svg";

export default function Overview() {
  const [data, setData] = React.useState({});
  const [userList, setUserList] = React.useState({});
  const [ogList, setOgList] = React.useState({});
  const [adminPriv, setAdminPriv] = React.useState(false);
  const [searchName, setSearchName] = React.useState("");
  const [searchResult, setSearchResult] = React.useState(true);
  const [edittingBio, setEdittingBio] = React.useState(false);
  const [edittingUsername, setEdittingUsername] = React.useState(false);
  const [edittingPassword, setEdittingPassword] = React.useState(false);

  const navigate = useNavigate();

  const userId = localStorage.getItem("user");
  const docSnap = async (ref) => {
    const res = await getDoc(ref);
    const doc = res?.data();
    setOgList(doc);
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
  const save = async () => {
    try {
      await setDoc(doc(db, "greifswald", "users"), {
        ...ogList,
        [userId]: {
          ...data,
        },
      });
      console.log("bio saved");
    } catch (err) {
      console.log(err);
    }
    setEdittingBio(false);
    setEdittingUsername(false);
    setEdittingPassword(false);
  };
  return (
    <div className="profile-page-container">
      <LeadGrid></LeadGrid>
      <h1>My Profile</h1>
      <div className="profile-header">
        <div className="profile-grid-col-1">
          <h2 className="overhead-title">Overview</h2>
          {!adminPriv ? (
            <div className="profile-card-container">
              <div className="profile-card-col-1">
                {!edittingBio ? (
                  <div className="profile-display-name">
                    {data?.firstName} {data?.lastName}
                  </div>
                ) : (
                  <input
                    type="text"
                    value={data?.displayName}
                    onChange={(e) =>
                      setData({
                        ...data,
                        displayName: e.target.value,
                      })
                    }
                    className="profile-display-name-input"
                  />
                )}
                <div className="profile-bio-container">
                  {!edittingBio ? (
                    <p className="profile-bio mb-3">{data?.bio}</p>
                  ) : (
                    <textarea
                      name="text"
                      value={data?.bio}
                      onChange={(e) =>
                        setData({
                          ...data,
                          bio: e.target.value,
                        })
                      }
                      wrap="soft"
                      className="profile-bio-input"
                    />
                  )}
                </div>
                {!edittingBio ? (
                  <div
                    className="cursor-pointer"
                    onClick={() => setEdittingBio(true)}
                  >
                    <span className="mr-2">Edit</span>
                    <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                  </div>
                ) : (
                  <button onClick={save}>Save</button>
                )}
              </div>
              <div className="profile-card-col-2">
                <div className="profile-card-title">
                  <strong>Title: </strong>
                  <span>Kunden</span>
                </div>
                <div className="flex items-center">
                  <img
                    src={bubbleTeaIcon}
                    alt="bubble-tea-icon"
                    width={25}
                    className="pb-2"
                  />
                  <span className="profile-point">~ {data?.point}</span>
                </div>
              </div>
              <div className="profile-card-row-2">
                <div className="flex justify-between">
                  <p onClick={() => setEdittingUsername((prev) => !prev)}>
                    Change username
                  </p>
                  {edittingUsername && (
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={data.username}
                        onChange={(e) =>
                          setData({
                            ...data,
                            username: e.target.value,
                          })
                        }
                        className="profile-credential-inputs"
                      />
                      <button onClick={save}>Save</button>
                    </div>
                  )}
                </div>
                <div className="flex justify-between">
                  <p onClick={() => setEdittingPassword((prev) => !prev)}>
                    Change password
                  </p>
                  {edittingPassword && (
                    <div className="flex items-center">
                      <input
                        type="password"
                        onChange={(e) =>
                          setData({
                            ...data,
                            password: e.target.value,
                          })
                        }
                        className="profile-credential-inputs"
                      />
                      <button onClick={save}>Save</button>
                    </div>
                  )}
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
        <div className="profile-grid-col-2">
          <div className="profile-grid-rows">
            <h2 className="overhead-title smaller">Favorite Drinks: </h2>
            <div className="test">
              {data?.favDrinks?.map((drink) => (
                <div className="flex items-end">
                  <FontAwesomeIcon icon="fa-solid fa-star" className="pb-1.5" />
                  <span className="ml-4">{drink}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="profile-grid-rows">
            <h2 className="overhead-title smaller">Past Orders: </h2>
            {data?.pastOrders?.map((order) => (
              <b>{order}</b>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
