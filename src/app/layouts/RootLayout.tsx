import { Outlet } from "react-router-dom";
import AnalyticsTracker from "../../analytics/AnalyticsTracker";
import AppHeader from "../../components/layout/AppHeader";


export default function RootLayout() {
  return (
    <>
      <AnalyticsTracker />
      <AppHeader />
      <Outlet />
    </>
  );
}