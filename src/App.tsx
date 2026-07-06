import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { CvList } from './pages/CvList';
import { CreateCv } from './pages/CreateCv';


function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/cvs"
        element={
          <ProtectedRoute>
            <CvList />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/cvs" />} />
      <Route
          path="/cvs/new"
          element={
            <ProtectedRoute>
              <CreateCv />
            </ProtectedRoute>
          }
        />



    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;