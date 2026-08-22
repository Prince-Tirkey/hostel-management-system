import { Link, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { DashboardPage } from "../features/dashboard/pages/DashboardPage";
import { HostelPage } from "../features/hostel/pages/HostelPage";
import { MessPage } from "../features/mess/pages/MessPage";
import { ComplaintsPage } from "../features/complaints/pages/ComplaintsPage";
import { CommunityPage } from "../features/community/pages/CommunityPage";
import { UnauthorizedPage } from "../pages/UnauthorizedPage";

export default function App() {
  return (
    <>
      <nav className="nav">
        <strong>Smart Hostel</strong>
        <div>
          <Link to="/">Dashboard</Link>
          <Link to="/hostel">Hostel</Link>
          <Link to="/mess">Mess</Link>
          <Link to="/complaints">Complaints</Link>
          <Link to="/community">Community</Link>
          <Link to="/login">Login</Link>
        </div>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/hostel" element={<HostelPage />} />
            <Route path="/mess" element={<MessPage />} />
            <Route path="/complaints" element={<ComplaintsPage />} />
            <Route path="/community" element={<CommunityPage />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}
