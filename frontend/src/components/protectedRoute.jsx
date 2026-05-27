import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (token) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
// This component checks if a user is authenticated by looking for a token in localStorage. If the token exists, it renders the child components; otherwise, it redirects the user to the login page.
