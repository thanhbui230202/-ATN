import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole: string;
} 

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token'); // Ensure the key is consistent
  if (!token) {
    console.error('No token found. Redirecting to login.');
    return <Navigate to="/login" replace />;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('Decoded JWT Payload:', payload); 

    const role = payload.role || ""; 

    console.log('User role:', role); // Debug: Log the role

    if (role !== requiredRole) {
      console.error(`User does not have the required role. Required: ${requiredRole}, Found: ${role}`);
      return <Navigate to="/unauthorized" replace />;
    }
  } catch (error) {
    console.error('Error decoding token:', error); // Debug: Log decoding error
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>; // Render children if authorized
};
export default PrivateRoute;
