import { toast } from "react-toastify";

export interface ShareOptions {
  title: string;
  text?: string;
  url?: string;
}

export const shareProperty = async (options: ShareOptions): Promise<void> => {
  const shareUrl = options.url || (typeof window !== "undefined" ? window.location.href : "https://velmora.in");
  const shareText = options.text || `Take a look at ${options.title} on VELMORA.`;
  const shareTitle = `VELMORA | ${options.title}`;

  // 1. Native navigator.share
  if (typeof navigator !== "undefined" && (navigator as any).share) {
    try {
      await (navigator as any).share({
        title: shareTitle,
        text: shareText,
        url: shareUrl,
      });
      return;
    } catch (err: any) {
      // User cancelled share
      if (err.name === "AbortError") {
        return;
      }
      console.warn("Native share failed, attempting clipboard fallback:", err);
    }
  }

  // 2. Clipboard API fallback
  if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Property link copied to clipboard.", { position: "top-center" });
      return;
    } catch (err) {
      console.warn("Clipboard API failed:", err);
    }
  }

  // 3. Document execCommand fallback
  try {
    const tempInput = document.createElement("input");
    tempInput.value = shareUrl;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    toast.success("Property link copied to clipboard.", { position: "top-center" });
  } catch (err) {
    toast.error("Unable to copy link. Please copy the URL from your browser address bar.");
  }
};
