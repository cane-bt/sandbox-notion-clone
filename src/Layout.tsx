import SideBar from "./components/SideBar";
import SearchModal from "./components/SearchModal";
import "./styles/layout.css";
import { Navigate, Outlet } from "react-router-dom";
import { currentUserAtom } from "./modules/auth/current-user.state";
import { useAtomValue } from "jotai";

export default function Layout() {
  const currentUser = useAtomValue(currentUserAtom);

  if (!currentUser) return <Navigate to="/signin" replace />;

  return (
    <div className="layout-container">
      <SideBar />
      <main className="layout-main">
        <Outlet />
      </main>
      <SearchModal />
    </div>
  );
}
