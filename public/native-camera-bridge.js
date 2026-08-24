(() => {
  const MAX_NATIVE_EDGE = 2200;
  const CAMERA_QUALITY = 82;
  let openingNativeCamera = false;

  function getCapacitor() {
    const capacitor = window.Capacitor;
    if (!capacitor) return null;

    const native =
      typeof capacitor.isNativePlatform === "function"
        ? capacitor.isNativePlatform()
        : ["android", "ios"].includes(String(capacitor.getPlatform?.() || "").toLowerCase());

    return native ? capacitor : null;
  }

  function getNativeCamera() {
    return getCapacitor()?.Plugins?.Camera || null;
  }

  function extensionOf(name) {
    return String(name || "").split(".").pop()?.toLowerCase() || "";
  }

  function mimeForFile(file) {
    const current = String(file?.type || "").toLowerCase();
    if (["application/pdf", "image/jpeg", "image/png", "image/webp"].includes(current)) {
      return current;
    }

    const extension = extensionOf(file?.name);
    if (extension === "pdf") return "application/pdf";
    if (extension === "jpg" || extension === "jpeg") return "image/jpeg";
    if (extension === "png") return "image/png";
    if (extension === "webp") return "image/webp";
    return current;
  }

  function normaliseInputFiles(input) {
    if (!(input instanceof HTMLInputElement) || input.type !== "file" || !input.files?.length) {
      return;
    }

    const original = Array.from(input.files);
    let changed = false;
    const transfer = new DataTransfer();

    for (const file of original) {
      const mime = mimeForFile(file);
      const current = String(file.type || "").toLowerCase();
      const needsFix = mime && mime !== current;

      if (needsFix) {
        transfer.items.add(
          new File([file], file.name, {
            type: mime,
            lastModified: file.lastModified || Date.now(),
          })
        );
        changed = true;
      } else {
        transfer.items.add(file);
      }
    }

    if (changed) input.files = transfer.files;
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

  async function cameraResultToFile(result) {
    const format = result?.format || result?.metadata?.format || "jpeg";

    if (result?.base64String) {
      return base64ToFile(result.base64String, format);
    }

    if (result?.webPath) {
      const response = await fetch(result.webPath);
      if (!response.ok) throw new Error("Could not read the camera photo.");
      const blob = await response.blob();
      const { mime, extension } = formatInfo(blob.type || format);
      return new File([blob], `invoice-${Date.now()}.${extension}`, {
        type: blob.type || mime,
        lastModified: Date.now(),
      });
    }

    const Filesystem = getCapacitor()?.Plugins?.Filesystem;
    if (result?.path && Filesystem?.readFile) {
      const contents = await Filesystem.readFile({ path: result.path });
      if (typeof contents?.data === "string" && contents.data) {
        return base64ToFile(contents.data, format);
      }
    }

    throw new Error("The camera did not return an invoice photo.");
  }

  function feedCameraFileIntoPage(file) {
    const input = document.querySelector('input[type="file"][capture]');

    if (input instanceof HTMLInputElement) {
      try {
        const transfer = new DataTransfer();
        transfer.items.add(file);
        input.files = transfer.files;
        input.dispatchEvent(new Event("change", { bubbles: true }));
        return true;
      } catch (error) {
        console.warn("Could not feed camera photo into invoice input", error);
      }
    }

    window.dispatchEvent(
      new CustomEvent("ki:invoice-camera-file", {
        detail: { file },
      })
    );
    return false;
  }

  function isCancellation(error) {
    const code = String(error?.code || "");
    const message = String(error?.message || error || "");
    return code === "OS-PLUG-CAMR-0006" || /cancel|cancelled|canceled/i.test(message);
  }

  async function ensureCameraPermission(Camera) {
    if (typeof Camera.checkPermissions !== "function") return true;

    const current = await Camera.checkPermissions();
    if (current?.camera === "granted" || current?.camera === "limited") return true;

    if (typeof Camera.requestPermissions !== "function") return false;
    const requested = await Camera.requestPermissions({ permissions: ["camera"] });
    return requested?.camera === "granted" || requested?.camera === "limited";
  }

  async function takeNativeInvoicePhoto() {
    const Camera = getNativeCamera();
    if (!Camera || openingNativeCamera) return false;

    openingNativeCamera = true;

    try {
      const granted = await ensureCameraPermission(Camera);
      if (!granted) {
        window.alert(
          "Camera permission is not allowed. Open Android Settings → Apps → Kitchen Insights → Permissions → Camera, allow it, then try again."
        );
        return true;
      }

      const result = await Camera.getPhoto({
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

      const file = await cameraResultToFile(result);
      feedCameraFileIntoPage(file);
      return true;
    } catch (error) {
      if (!isCancellation(error)) {
        console.error("Kitchen Insights native camera error", error);
        window.alert(
          "Kitchen Insights could not open the native camera. Check Camera permission in Android Settings, then try again."
        );
      }
      return true;
    } finally {
      openingNativeCamera = false;
    }
  }

  function invoiceUploadButton(target, pattern) {
    if (!(target instanceof Element) || location.pathname !== "/invoices/upload") return null;
    const button = target.closest("button");
    if (!(button instanceof HTMLButtonElement) || button.disabled) return null;
    return pattern.test(button.textContent || "") ? button : null;
  }

  function nativeCameraButton(target) {
    if (!(target instanceof Element) || location.pathname !== "/invoices/upload") return null;

    const explicit = target.closest('[data-ki-camera-trigger="true"]');
    if (explicit instanceof HTMLElement && !explicit.matches(":disabled")) return explicit;

    return invoiceUploadButton(target, /take photo|add another photo|opening camera/i);
  }

  function nativeUploadButton(target) {
    return invoiceUploadButton(target, /upload from device|choose photos or pdf|choose files/i);
  }

  function openNativeFilePicker() {
    const input = document.querySelector('input[type="file"][multiple]');
    if (!(input instanceof HTMLInputElement) || input.disabled) return false;

    try {
      if (typeof input.showPicker === "function") input.showPicker();
      else input.click();
      return true;
    } catch (error) {
      console.warn("Could not open Android invoice picker", error);
      try {
        input.click();
        return true;
      } catch {
        return false;
      }
    }
  }

  document.addEventListener(
    "change",
    (event) => {
      const target = event.target;
      if (target instanceof HTMLInputElement && target.type === "file") {
        normaliseInputFiles(target);
      }
    },
    true
  );

  document.addEventListener(
    "click",
    (event) => {
      if (!getCapacitor()) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      if (nativeCameraButton(target)) {
        // Only swallow the click when the native Camera plugin is actually
        // available. Older Android wrappers expose Capacitor but not Camera;
        // in that case let the page use getUserMedia instead of silently
        // blocking the camera button.
        if (getNativeCamera()) {
          event.preventDefault();
          event.stopPropagation();
          void takeNativeInvoicePhoto();
          return;
        }
      }

      if (nativeUploadButton(target) && openNativeFilePicker()) {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    true
  );
})();
