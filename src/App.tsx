import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { UIProvider } from "./context/UIProvider";
import { AuthProvider } from "./context/AuthProvider";
import { Layout } from "./layouts/Layout";
import { LoginPage } from "./pages/public/LoginPage";
import { AutoTitleManager } from "./components/app/AutoTitleManager";

import Home from "./pages/public/Home";
import Profile from "./pages/public/Profile";
import { useAppStatus } from "./hooks/app/useAppStatus";
import LoadingScreen from "./pages/public/LoadingScreen";
import UnderConstruction from "./pages/public/appModes/UnderConstruction";

function App() {
  const { appStatus, isLoading } = useAppStatus();

  if (isLoading) {
    return (
      <UIProvider>
        <LoadingScreen message="Loading site.." />
      </UIProvider>
    );
  }

  if (!appStatus) {
    return (
      <UIProvider>
        <UnderConstruction />
      </UIProvider>
    );
  }

  const mode = "mode" in appStatus ? appStatus.mode : appStatus.appStatus.mode;
  const message =
    "mode" in appStatus ? appStatus.message : appStatus.appStatus.message;

  switch (mode) {
    case "under_construction":
      return (
        <UIProvider>
          <UnderConstruction />
        </UIProvider>
      );
    case "maintenance":
      return (
        <h1 className="font-bold text-2xl">
          {message ?? "Site is under maintenance."}
        </h1>
      );
    case "production":
    default:
      break;
  }

  return (
    <AuthProvider>
      <HashRouter>
        <UIProvider>
          <AutoTitleManager />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route
                path="*"
                element={<h1 className="font-bold text-2xl">Not Found</h1>}
              />
            </Route>
            <Route path="/signin" element={<LoginPage />}></Route>
          </Routes>
        </UIProvider>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
