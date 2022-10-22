import React from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default function Profile() {
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
      console.log("profile saved");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <main className="profile-container">
      <h1>Duong Nguyen</h1>
      <div className="flex items-center justify-center">
        <form action="" className="flex flex-col gap-10">
          <div className="profile-input relative">
            <label htmlFor="profile-fname" className="profile-label">
              First name
            </label>
            <input
              type="text"
              name="profile-fname"
              id="profile-fname"
              className="w-full"
              value={data?.firstName}
              onChange={(e) => setData({ ...data, firstName: e.target.value })}
            />
          </div>
          <div className="profile-input relative">
            <label htmlFor="profile-lname" className="profile-label">
              Last name
            </label>
            <input
              type="text"
              name="profile-lname"
              id="profile-lname"
              className="w-full"
              value={data?.lastName}
              onChange={(e) => setData({ ...data, lastName: e.target.value })}
            />
          </div>
          <div className="profile-input relative">
            <label htmlFor="profile-bd" className="profile-label">
              Birthday
            </label>
            <input
              type="text"
              name="profile-bd"
              id="profile-bd"
              className="w-full"
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
