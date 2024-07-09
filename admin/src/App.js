import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import NewUser from "./pages/newUser/NewUser";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";
import axios from "axios";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user, logout } = useContext(AuthContext);
    if (!user) {
      return <Navigate to="/login" />;
    }
    axios.post('/api/auth/verify-admin').then((response) => {
      if (!response.data.isAdmin) {
        return logout();
      }
    }).catch((error) => {
      return logout();
    });
    return children;
  };

  const AuthRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (user) {
      return <Navigate to="/" />;
    }
    return children;
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter basename="/admin">
        <Routes>
          <Route path="/">
            <Route
              path="login"
              element={
                <AuthRoute>
                  <Login />
                </AuthRoute>
              }
            />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={userColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":userId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewUser />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="hotels">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={hotelColumns} />
                  </ProtectedRoute>
                }
              />
              <Route path=":hotelId" element={<Single />} />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewHotel />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="rooms">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={roomColumns} />
                  </ProtectedRoute>
                }
              />
              <Route path=":roomId" element={<Single />} />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewRoom />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
