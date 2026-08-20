declare global {
  interface Window {
    google?: any;
    __googleMapsLoadingPromise?: Promise<any>;
  }
}

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

export const isGoogleMapsKeyConfigured = (): boolean => {
  return typeof GOOGLE_MAPS_API_KEY === "string" && GOOGLE_MAPS_API_KEY.trim().length > 0;
};

export const loadGoogleMapsScript = (libraries: string[] = ["places"]): Promise<any> => {
  if (typeof window === "undefined") {
    return Promise.resolve(null);
  }

  // Already loaded
  if (window.google && window.google.maps) {
    return Promise.resolve(window.google.maps);
  }

  // Currently loading
  if (window.__googleMapsLoadingPromise) {
    return window.__googleMapsLoadingPromise;
  }

  if (!isGoogleMapsKeyConfigured()) {
    console.info("Google Maps key not configured. Graceful fallback mode active.");
    return Promise.resolve(null);
  }

  const promise = new Promise<any>((resolve, reject) => {
    const existingScript = document.getElementById("google-maps-script");
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(window.google?.maps || null));
      existingScript.addEventListener("error", (e) => reject(e));
      return;
    }

    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.type = "text/javascript";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=${libraries.join(",")}&loading=async`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      resolve(window.google?.maps || null);
    };

    script.onerror = (err) => {
      console.warn("Failed to load Google Maps script. Falling back to local offline mode.");
      resolve(null);
    };

    document.head.appendChild(script);
  });

  window.__googleMapsLoadingPromise = promise;
  return promise;
};
