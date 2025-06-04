import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userData } from "../data/atom";

export default function useAuth() {
  const [user, setUser] = useRecoilState(userData);
  const navigate = useNavigate();

  function handleLogout() {
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
  }

  return { user, handleLogout };
}
