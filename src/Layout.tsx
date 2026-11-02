import "./styles/layout.css";

import { useAtomValue } from "jotai";
import { Navigate, Outlet } from "react-router-dom";

import SearchModal from "./components/SearchModal";
import SideBar from "./components/SideBar";
import { currentUserAtom } from "./modules/auth/current-user.state";

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
