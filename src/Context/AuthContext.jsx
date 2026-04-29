import { useEffect, useState, createContext } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext();

export default function AuthContextprovider({ children }) {
  const [userLogin, setUserLogin] = useState(null);
  const [userId, setuserId] = useState(null);
  const [userData, setUserData] = useState(null);

  // ✅ 1. هات التوكن أول مرة
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setUserLogin(token);
    }
  }, []);

  // ✅ 2. فك التوكن
  useEffect(() => {
    if (userLogin) {
      const { user } = jwtDecode(userLogin);
      setuserId(user);
    } else {
      setuserId(null);
    }
  }, [userLogin]);

  // ✅ 3. هات بيانات اليوزر من API
  useEffect(() => {
    async function getUserData() {
      if (userLogin) {
        try {
          const { data } = await axios.get(
            "https://route-posts.routemisr.com/users/profile-data",
            {
              headers: {
                Authorization: `Bearer ${userLogin}`,
              },
            }
          );

          setUserData(data.data.user); // ✅ الصح
        } catch (error) {
          console.log(error);
        }
      }
    }

    getUserData();
  }, [userLogin]);

  // ✅ 4. logout
  function logout() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    setuserId(null);
    setUserData(null);
  }

  return (
    <AuthContext.Provider
      value={{
        userLogin,
        setUserLogin,
        userId,
        userData, // ✅ مهم جدًا
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}