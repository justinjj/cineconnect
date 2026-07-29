import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { analytics } from "./analyticsService";

export default function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    analytics.trackPageView(
      location.pathname + location.search
    );
  }, [location]);

  return null;
}