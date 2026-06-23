declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

// Log pageviews manually on client-side routing transitions
export const pageview = (url: string) => {
  if (typeof window !== "undefined") {
    if (window.gtag && GA_TRACKING_ID) {
      window.gtag("config", GA_TRACKING_ID, {
        page_path: url,
      });
    }
    if (window.fbq && FB_PIXEL_ID) {
      window.fbq("track", "PageView");
    }
  }
};

// Log generic/GA4 events
export const event = (action: string, params?: Record<string, unknown>) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, params);
  }
};

// Log Meta (Facebook) Pixel standard or custom events
export const fbqEvent = (name: string, params?: Record<string, unknown>) => {
  if (typeof window !== "undefined" && window.fbq) {
    if (params) {
      window.fbq("track", name, params);
    } else {
      window.fbq("track", name);
    }
  }
};
