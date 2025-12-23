import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { UIProvider } from "./context/UIProvider";
import { AuthProvider } from "./context/AuthProvider";
import { Layout } from "./layouts/Layout";
import { LoginPage } from "./pages/public/LoginPage";

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

  switch (appStatus?.mode) {
    case "under_construction":
      return (
        <UIProvider>
          <UnderConstruction />
        </UIProvider>
      );
    case "maintenance":
      return <h1 className="font-bold text-2xl">{appStatus.message}</h1>;
    case "production":
    default:
      break;
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <UIProvider>
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
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
