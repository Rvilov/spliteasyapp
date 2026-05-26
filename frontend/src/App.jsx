import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register.jsx';
import Groups from './pages/Groups.jsx';
import GroupDetail from './pages/GroupDetails.jsx';
import JoinGroup from './pages/JoinGroup.jsx';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />

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
        <h1>SplitEasyApp</h1>
      </div>
    </BrowserRouter>
  );
}

export default App;
