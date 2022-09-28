import React from "react";
import { db } from "../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
export default function Signup() {
  const [data, setData] = React.useState({});
  const [newUser, setNewUser] = React.useState({
    username: "",
    password: "",
    point: 0,
    preRegister: true,
    favDrinks: [],
    pastOrder: [],
  });
  const [submitMessage, setSubmitMessage] = React.useState(false);
  const docSnap = async (ref) => {
    const res = await getDoc(ref);
    const document = res?.data();
    setData(document);
  };
  React.useEffect(() => {
    const docRef = doc(db, "greifswald", "users");
    docSnap(docRef);
    console.log("signup fetch");
    //eslint-disable-next-line
  }, []);
  const createNewUser = async () => {
    let newId = uuidv4();
    try {
      await setDoc(doc(db, "greifswald", "users"), {
        ...data,
        [newId]: {
          ...newUser,
        },
      });
      setData({
        ...data,
        [newId]: {
          ...newUser,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createNewUser();
    setSubmitMessage(true);
  };
  return (
    <main>
      <h2>Sign Up</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            id="username"
            name="username"
            value={newUser.username}
            onChange={(e) =>
              setNewUser({ ...newUser, username: e.target.value })
            }
          />
        </label>
        <label htmlFor="username">
          Password:
          <input
            type="text"
            id="password"
            name="password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />
        </label>
        <button>Submit</button>
      </form>
      {submitMessage && <p>Sign up successful</p>}
    </main>
  );
}
