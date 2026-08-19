(() => {
  const CAMERA_SELECTOR = 'input[type="file"][capture="environment"]';
  const MAX_NATIVE_EDGE = 2200;
  const CAMERA_QUALITY = 82;

  function getNativeCamera() {
    const capacitor = window.Capacitor;
    if (!capacitor) return null;

    const native =
      typeof capacitor.isNativePlatform === "function"
        ? capacitor.isNativePlatform()
        : capacitor.getPlatform?.() === "android" || capacitor.getPlatform?.() === "ios";

    if (!native) return null;
    return capacitor.Plugins?.Camera || null;
  }

  function base64ToFile(base64, format) {
    const mime = format === "png" ? "image/png" : "image/jpeg";
    const extension = format === "png" ? "png" : "jpg";
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);

    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }

    return new File([bytes], `invoice-${Date.now()}.${extension}`, {
      type: mime,
      lastModified: Date.now(),
    });
  }

  function isCancellation(error) {
    const message = String(error?.message || error || "");
    return /cancel|cancelled|canceled/i.test(message);
  }

  async function takeInvoicePhoto(input) {
    const Camera = getNativeCamera();
    if (!Camera) return false;

    try {
      const photo = await Camera.getPhoto({
        quality: CAMERA_QUALITY,
        width: MAX_NATIVE_EDGE,
        height: MAX_NATIVE_EDGE,
        allowEditing: false,
        correctOrientation: true,
        saveToGallery: false,
        resultType: "base64",
        source: "CAMERA",
      });

      if (!photo?.base64String) {
        throw new Error("The camera did not return an invoice photo.");
      }

      const file = base64ToFile(photo.base64String, String(photo.format || "jpeg").toLowerCase());
      const transfer = new DataTransfer();
      transfer.items.add(file);
      input.files = transfer.files;
      input.dispatchEvent(new Event("change", { bubbles: true }));
      return true;
    } catch (error) {
      if (!isCancellation(error)) {
        console.error("Kitchen Insights native camera error", error);
        window.alert(
          "Kitchen Insights could not open the camera. Check Camera permission in Android Settings and try again."
        );
      }
      return true;
    }
  }

  document.addEventListener(
    "click",
    (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const label = target.closest("label");
      const directInput = target.matches?.(CAMERA_SELECTOR) ? target : null;
      const input = directInput || label?.querySelector?.(CAMERA_SELECTOR);
      if (!(input instanceof HTMLInputElement) || input.disabled) return;

      if (!getNativeCamera()) return;

      event.preventDefault();
      event.stopPropagation();
      void takeInvoicePhoto(input);
    },
    true
  );
})();
