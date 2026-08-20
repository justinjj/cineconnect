import ReactGA from "react-ga4";

class AnalyticsService {
  initialize() {
    const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

    if (!measurementId) {
      console.warn("Google Analytics Measurement ID not found.");
      return;
    }

    ReactGA.initialize(measurementId);
  }

  trackPageView(path: string) {
    ReactGA.send({
      hitType: "pageview",
      page: path,
    });
  }

  trackActorSearch(
    query: string,
    resultCount: number
  ) {
      ReactGA.event("search_actor", {
        search_term: query,
        result_count: resultCount,
      });
  }  

  trackEvent(
    eventName: string,
    params?: Record<string, string | number | boolean>
  ) {
    ReactGA.event(eventName, params);
  }
}

export const analytics = new AnalyticsService();