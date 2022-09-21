import React from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
export default function Signup() {
  const [newUser, setNewUser] = React.useState({
    username: "",
    password: "",
    point: 0,
    preRegister: true,
    favDrinks: [],
    pastOrder: [],
  });
  const [submitMessage, setSubmitMessage] = React.useState(false);

  const usersCollectionRef = collection(db, "users");
  const createNewUser = async () => {
    try {
      await addDoc(usersCollectionRef, newUser);
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
