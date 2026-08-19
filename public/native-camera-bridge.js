(() => {
  const CAMERA_SELECTOR = 'input[type="file"][capture="environment"]';
  const MAX_NATIVE_EDGE = 2200;
  const CAMERA_QUALITY = 82;

  function getCapacitor() {
    const capacitor = window.Capacitor;
    if (!capacitor) return null;

    const native =
      typeof capacitor.isNativePlatform === "function"
        ? capacitor.isNativePlatform()
        : capacitor.getPlatform?.() === "android" || capacitor.getPlatform?.() === "ios";

    return native ? capacitor : null;
  }

  function getNativeCamera() {
    return getCapacitor()?.Plugins?.Camera || null;
  }

  function formatInfo(format) {
    const value = String(format || "jpeg").toLowerCase();
    if (value.includes("png") || value === "1") {
      return { mime: "image/png", extension: "png" };
    }
    return { mime: "image/jpeg", extension: "jpg" };
  }

  function base64ToFile(base64, format) {
    const { mime, extension } = formatInfo(format);
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

  async function mediaResultToFile(result) {
    const capacitor = getCapacitor();
    const Filesystem = capacitor?.Plugins?.Filesystem;
    const format = result?.metadata?.format || result?.format || "jpeg";

    if (result?.uri && Filesystem?.readFile) {
      try {
        const contents = await Filesystem.readFile({ path: result.uri });
        if (typeof contents?.data === "string" && contents.data) {
          return base64ToFile(contents.data, format);
        }
      } catch (error) {
        console.warn("Could not read native camera file directly", error);
      }
    }

    if (result?.webPath) {
      try {
        const response = await fetch(result.webPath);
        if (response.ok) {
          const blob = await response.blob();
          const { mime, extension } = formatInfo(blob.type || format);
          return new File([blob], `invoice-${Date.now()}.${extension}`, {
            type: blob.type || mime,
            lastModified: Date.now(),
          });
        }
      } catch (error) {
        console.warn("Could not read camera web path", error);
      }
    }

    if (result?.thumbnail) {
      return base64ToFile(result.thumbnail, format);
    }

    if (result?.base64String) {
      return base64ToFile(result.base64String, format);
    }

    throw new Error("The camera did not return an invoice photo.");
  }

  function isCancellation(error) {
    const code = String(error?.code || "");
    const message = String(error?.message || error || "");
    return code === "OS-PLUG-CAMR-0006" || /cancel|cancelled|canceled/i.test(message);
  }

  async function capturePhoto(Camera) {
    if (typeof Camera.takePhoto === "function") {
      return Camera.takePhoto({
        quality: CAMERA_QUALITY,
        targetWidth: MAX_NATIVE_EDGE,
        targetHeight: MAX_NATIVE_EDGE,
        correctOrientation: true,
        saveToGallery: false,
        editable: "no",
        includeMetadata: true,
      });
    }

    return Camera.getPhoto({
      quality: CAMERA_QUALITY,
      width: MAX_NATIVE_EDGE,
      height: MAX_NATIVE_EDGE,
      allowEditing: false,
      correctOrientation: true,
      saveToGallery: false,
      resultType: "base64",
      source: "CAMERA",
      direction: "REAR",
    });
  }

  async function takeInvoicePhoto(input) {
    const Camera = getNativeCamera();
    if (!Camera) return false;

    try {
      const result = await capturePhoto(Camera);
      const file = await mediaResultToFile(result);
      const transfer = new DataTransfer();
      transfer.items.add(file);
      input.files = transfer.files;
      input.dispatchEvent(new Event("change", { bubbles: true }));
      return true;
    } catch (error) {
      if (!isCancellation(error)) {
        console.error("Kitchen Insights native camera error", error);
        window.alert(
          "Kitchen Insights could not capture that invoice photo. Try again, or check Camera permission in Android Settings."
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
