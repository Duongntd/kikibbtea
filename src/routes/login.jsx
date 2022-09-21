import React from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { loginState } from "../components/Header";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const usersCollectionRef = collection(db, "users");
  const [data, setData] = React.useState([]);
  const [loginCre, setLoginCre] = React.useState({
    username: "",
    password: "",
  });
  const [loginMessage, setLoginMessage] = React.useState();
  const setLoggedIn = useSetRecoilState(loginState);
  const navigate = useNavigate();

  React.useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await getDocs(usersCollectionRef);
        setData(
          data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      } catch (err) {
        console.log("Error getting message: ", err);
      }
    };
    getUsers();
    // eslint-disable-next-line
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();

    const found = data.find(
      (user) =>
        user.username === loginCre.username &&
        user.password === loginCre.password
    );
    if (found) {
      localStorage.setItem("user", found.id);
      localStorage.setItem("loggedIn", "true");
      if (found.username === "admin") {
        let userIdList = data.map((user) => ({
          username: user.username,
          id: user.id,
        }));
        localStorage.setItem("userIdList", JSON.stringify(userIdList));
        setLoginMessage(<p>Logged in as admin! Redirecting...</p>);
        setTimeout(() => {
          navigate("/");
          setLoggedIn(true);
        }, 1500);
      } else {
        localStorage.setItem("userIdList", "");
        setLoginMessage(<p>Login successful! Redirecting...</p>);
        setTimeout(() => {
          navigate("/");
          setLoggedIn(true);
        }, 1500);
      }
    } else {
      localStorage.setItem("userIdList", "");
      setLoginMessage(<p>Wrong username or password!</p>);
    }
  };
  return (
    <main>
      <h2>Login</h2>
      <h2>LoginCre</h2>
      <section>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="user-name">
            Username:
            <input
              type="text"
              id="user-name"
              name="user-name"
              value={loginCre.username}
              onChange={(e) =>
                setLoginCre({ ...loginCre, username: e.target.value })
              }
            />
          </label>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              id="password"
              name="password"
              value={loginCre.password}
              onChange={(e) =>
                setLoginCre({ ...loginCre, password: e.target.value })
              }
            />
          </label>
          <button>Login</button>
          {loginMessage}
        </form>
        <div>
          <Link to="/signup">Sign up</Link>
        </div>
      </section>
    </main>
  );
}
