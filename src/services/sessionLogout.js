import { useNavigate } from "react-router-dom";
// // import { useRecoilState } from "recoil";
// // import { userData } from "../data/atom";

// // const [user, setUser] = useRecoilState(userData);
// const navigate = useNavigate();

export const handleLogout = () => {
  localStorage.removeItem("x-auth-token");
  localStorage.removeItem("userData");
  setUser({
    token: null,
    user_id: null,
    name: "",
    email: "",
    loggedIn: false,
  });
  navigate("/login");
};
