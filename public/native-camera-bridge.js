(() => {
  const CAMERA_TRIGGER = '[data-ki-camera-trigger="true"]';
  const MAX_NATIVE_EDGE = 2200;
  const CAMERA_QUALITY = 82;
  const WEB_CAMERA_QUALITY = 0.88;

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

  function supportsBrowserCamera() {
    return Boolean(
      window.isSecureContext &&
        navigator.mediaDevices &&
        typeof navigator.mediaDevices.getUserMedia === "function"
    );
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

  function dispatchInvoiceFile(file) {
    window.dispatchEvent(
      new CustomEvent("ki:invoice-camera-file", {
        detail: { file },
      })
    );
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

    if (result?.base64String) {
      return base64ToFile(result.base64String, format);
    }

    if (result?.thumbnail) {
      return base64ToFile(result.thumbnail, format);
    }

    throw new Error("The camera did not return an invoice photo.");
  }

  function isCancellation(error) {
    const code = String(error?.code || "");
    const message = String(error?.message || error || "");
    return code === "OS-PLUG-CAMR-0006" || /cancel|cancelled|canceled/i.test(message);
  }

  async function captureNativePhoto(Camera) {
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

  async function takeNativeInvoicePhoto(Camera) {
    try {
      const permissions =
        typeof Camera.checkPermissions === "function"
          ? await Camera.checkPermissions()
          : null;

      if (
        permissions?.camera !== "granted" &&
        typeof Camera.requestPermissions === "function"
      ) {
        const requested = await Camera.requestPermissions({ permissions: ["camera"] });
        if (requested?.camera !== "granted") {
          window.alert(
            "Camera permission is blocked. Allow Camera for Kitchen Insights in your phone settings, then try again."
          );
          return;
        }
      }

      const result = await captureNativePhoto(Camera);
      const file = await mediaResultToFile(result);
      dispatchInvoiceFile(file);
    } catch (error) {
      if (isCancellation(error)) return;

      console.error("Kitchen Insights native camera error", error);
      window.alert(
        "Kitchen Insights could not take that invoice photo. Please check Camera permission, or use Choose photos or PDF instead."
      );
    }
  }

  function stopStream(stream) {
    try {
      stream?.getTracks?.().forEach((track) => track.stop());
    } catch (error) {
      console.warn("Could not stop camera stream", error);
    }
  }

  function createBrowserCameraOverlay(stream) {
    return new Promise((resolve) => {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const overlay = document.createElement("div");
      overlay.setAttribute("role", "dialog");
      overlay.setAttribute("aria-label", "Take invoice photo");
      overlay.style.cssText = [
        "position:fixed",
        "inset:0",
        "z-index:2147483647",
        "background:#111",
        "display:flex",
        "flex-direction:column",
        "align-items:stretch",
        "justify-content:space-between",
        "padding:env(safe-area-inset-top) 0 env(safe-area-inset-bottom)",
      ].join(";");

      const header = document.createElement("div");
      header.style.cssText =
        "display:flex;align-items:center;justify-content:space-between;padding:14px 16px;color:#fff;gap:12px";

      const title = document.createElement("strong");
      title.textContent = "Photograph invoice";
      title.style.fontSize = "16px";

      const cancel = document.createElement("button");
      cancel.type = "button";
      cancel.textContent = "Cancel";
      cancel.style.cssText =
        "border:0;background:rgba(255,255,255,.14);color:#fff;border-radius:999px;padding:10px 14px;font-weight:700";

      header.append(title, cancel);

      const viewport = document.createElement("div");
      viewport.style.cssText =
        "position:relative;flex:1;min-height:0;display:flex;align-items:center;justify-content:center;overflow:hidden;background:#000";

      const video = document.createElement("video");
      video.autoplay = true;
      video.muted = true;
      video.playsInline = true;
      video.style.cssText = "width:100%;height:100%;object-fit:contain;background:#000";
      video.srcObject = stream;

      const guide = document.createElement("div");
      guide.style.cssText =
        "position:absolute;left:7%;right:7%;top:9%;bottom:9%;border:2px solid rgba(255,255,255,.8);border-radius:12px;box-shadow:0 0 0 9999px rgba(0,0,0,.12);pointer-events:none";

      viewport.append(video, guide);

      const footer = document.createElement("div");
      footer.style.cssText =
        "padding:14px 16px 18px;background:#111;color:#fff;display:flex;flex-direction:column;gap:10px";

      const hint = document.createElement("div");
      hint.textContent = "Keep all four corners visible and avoid glare.";
      hint.style.cssText = "text-align:center;font-size:13px;opacity:.78";

      const capture = document.createElement("button");
      capture.type = "button";
      capture.textContent = "Take photo";
      capture.style.cssText =
        "width:100%;min-height:54px;border:0;border-radius:14px;background:#fff;color:#173d31;font-weight:800;font-size:16px";

      footer.append(hint, capture);
      overlay.append(header, viewport, footer);
      document.body.appendChild(overlay);

      let finished = false;

      function cleanup() {
        if (finished) return;
        finished = true;
        stopStream(stream);
        overlay.remove();
        document.body.style.overflow = previousOverflow;
      }

      function finish(value) {
        cleanup();
        resolve(value);
      }

      cancel.addEventListener("click", () => finish(null));

      capture.addEventListener("click", async () => {
        try {
          capture.disabled = true;
          capture.textContent = "Capturing…";

          const sourceWidth = video.videoWidth || 1920;
          const sourceHeight = video.videoHeight || 1080;
          const scale = Math.min(1, MAX_NATIVE_EDGE / Math.max(sourceWidth, sourceHeight));
          const width = Math.max(1, Math.round(sourceWidth * scale));
          const height = Math.max(1, Math.round(sourceHeight * scale));

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const context = canvas.getContext("2d");
          if (!context) throw new Error("Could not prepare camera image.");
          context.drawImage(video, 0, 0, width, height);

          const blob = await new Promise((resolveBlob) =>
            canvas.toBlob(resolveBlob, "image/jpeg", WEB_CAMERA_QUALITY)
          );

          if (!(blob instanceof Blob)) {
            throw new Error("The camera did not return a photo.");
          }

          const file = new File([blob], `invoice-${Date.now()}.jpg`, {
            type: "image/jpeg",
            lastModified: Date.now(),
          });

          finish(file);
        } catch (error) {
          console.error("Kitchen Insights browser camera capture error", error);
          capture.disabled = false;
          capture.textContent = "Take photo";
          window.alert("Could not capture that photo. Please try again.");
        }
      });

      video.play().catch(() => {});
    });
  }

  async function takeBrowserInvoicePhoto() {
    if (!supportsBrowserCamera()) return false;

    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });

      const file = await createBrowserCameraOverlay(stream);
      if (file instanceof File) dispatchInvoiceFile(file);
      return true;
    } catch (error) {
      stopStream(stream);
      const name = String(error?.name || "");
      const message = String(error?.message || error || "");

      if (name === "NotAllowedError" || /permission|denied/i.test(message)) {
        window.alert(
          "Camera access is blocked. Allow Camera permission for Kitchen Insights, then tap Take photo again. You can still use Choose photos or PDF instead."
        );
        return true;
      }

      if (name === "NotFoundError" || /not found|no camera/i.test(message)) {
        window.alert("No camera was found on this device. Use Choose photos or PDF instead.");
        return true;
      }

      console.error("Kitchen Insights browser camera error", error);
      window.alert("Kitchen Insights could not open the camera. Use Choose photos or PDF instead.");
      return true;
    }
  }

  function isChooseFilesButton(target) {
    if (!(target instanceof Element)) return false;
    const button = target.closest("button");
    if (!(button instanceof HTMLButtonElement)) return false;
    if (button.disabled) return false;
    if (location.pathname !== "/invoices/upload") return false;
    return /choose photos or pdf/i.test(button.textContent || "");
  }

  function openInvoiceFilePicker() {
    const input = document.querySelector('input[type="file"][multiple]');
    if (!(input instanceof HTMLInputElement) || input.disabled) return false;

    try {
      if (typeof input.showPicker === "function") {
        input.showPicker();
      } else {
        input.click();
      }
      return true;
    } catch (error) {
      console.warn("Could not open invoice file picker", error);
      try {
        input.click();
        return true;
      } catch {
        return false;
      }
    }
  }

  document.addEventListener(
    "click",
    (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      if (isChooseFilesButton(target)) {
        if (openInvoiceFilePicker()) {
          event.preventDefault();
          event.stopPropagation();
        }
        return;
      }

      const trigger = target.closest(CAMERA_TRIGGER);
      if (!(trigger instanceof HTMLElement)) return;
      if (trigger.matches(":disabled")) return;

      const Camera = getNativeCamera();
      if (Camera) {
        event.preventDefault();
        event.stopPropagation();
        void takeNativeInvoicePhoto(Camera);
        return;
      }

      if (supportsBrowserCamera()) {
        event.preventDefault();
        event.stopPropagation();
        void takeBrowserInvoicePhoto();
      }
    },
    true
  );
})();
