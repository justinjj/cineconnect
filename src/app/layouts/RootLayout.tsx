import { Outlet } from "react-router-dom";
import AnalyticsTracker from "../../analytics/AnalyticsTracker";


export default function RootLayout() {
  return (
    <>
      <AnalyticsTracker />
      <Outlet />
    </>
  );
}