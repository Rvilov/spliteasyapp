import { Routes, Route, useNavigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Login from './pages/Login';
import Register from './pages/Register.jsx';
import Groups from './pages/Groups.jsx';
import GroupDetail from './pages/GroupDetails.jsx';
import JoinGroup from './pages/JoinGroup.jsx';

function App() {
  const navigate = useNavigate();
  return (
    <div className="he">
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1 className="text-2xl font-bold">Home</h1>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => navigate('/register')}
              >
                Register
              </button>
            </div>
          }
        />

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
