import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Login from './pages/Login';
import Register from './pages/Register.jsx';
import Groups from './pages/Groups.jsx';
import GroupDetail from './pages/GroupDetails.jsx';
import JoinGroup from './pages/JoinGroup.jsx';
import Nav from './components/Nav.jsx';
import HomePage from './pages/HomePage.jsx';

function App() {
  return (
    <div>
      <Nav />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/groups"
          element={
            <ProtectedRoute>
              <Groups />
            </ProtectedRoute>
          }
        />
        <Route
          path="/groupdetail/:groupId"
          element={
            <ProtectedRoute>
              <GroupDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/join/:inviteToken"
          element={
            <ProtectedRoute>
              <JoinGroup />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
