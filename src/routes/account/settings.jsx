import React from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default function Settings() {
  const [data, setData] = React.useState({});
  const [ogList, setOgList] = React.useState({});

  const userId = localStorage.getItem("user");
  const docSnap = async (ref) => {
    const res = await getDoc(ref);
    const doc = res?.data();
    setOgList(doc);
    setData(doc[userId]);
  };
  React.useEffect(() => {
    if (userId) {
      const docRef = doc(db, "greifswald", "users");
      docSnap(docRef);
    }
    // eslint-disable-next-line
  }, []);
  const saveChanges = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "greifswald", "users"), {
        ...ogList,
        [userId]: {
          ...data,
        },
      });
      console.log("settings saved");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <main className="profile-container">
      <h1>Account</h1>
      <div className="flex items-center justify-center">
        <form className="flex flex-col gap-10">
          <div className="profile-input relative">
            <label htmlFor="profile-fname" className="profile-label">
              Username
            </label>
            <input
              type="text"
              name="profile-fname"
              id="profile-fname"
              className="w-full"
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />
          </div>
          <div className="profile-input relative">
            <label htmlFor="profile-lname" className="profile-label">
              Password
            </label>
            <input
              type="password"
              name="profile-lname"
              id="profile-lname"
              className="w-full"
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>

          <button
            className="save-button self-start"
            onClick={(e) => saveChanges(e)}
          >
            Save changes
          </button>
        </form>
      </div>
    </main>
  );
}
