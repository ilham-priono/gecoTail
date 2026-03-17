document.addEventListener("DOMContentLoaded", function () {
  renderIframe();
});

let iframeTimeout;

function renderIframe() {
  const iframe = document.getElementById("gecoIframe");
  const submissionTextOverlayId = document.getElementById(
    "submissionTextOverlay",
  );
  const overlayCloseButtonId = document.getElementById("overlayCloseButton");

  const url =
    "https://script.google.com/macros/s/AKfycbw3q5qq1kbmqV5lHRIHPLDJEu1v8mI2tAszt1fMzpWGyKHAY2ZiS2ZytdJ_1V5yIt2YMA/exec";

  // const url =
  //   "file:///D:/103.%20APPSCRIPT/Geco/gecoTailRPCv1/gas/gecoMailApp/gecoMailApp_v1_Build_13032026.0032/gecoMailApp.html";

  showSubmissionOverlay();
  // submissionTextOverlayId.textContent = "Sedang memuat...";

  iframe.src = "";

  // Timeout 15 detik
  iframeTimeout = setTimeout(() => {
    submissionTextOverlayId.textContent =
      "Waktu memuat terlalu lama. Silakan coba lagi.";
    overlayCloseButtonId.classList.remove("d-none");
  }, 15000);

  iframe.onload = function () {
    clearTimeout(iframeTimeout);
    hideSubmissionOverlay();
  };

  iframe.onerror = function () {
    clearTimeout(iframeTimeout);
    submissionTextOverlayId.textContent = "Gagal memuat halaman.";
    overlayCloseButtonId.classList.remove("d-none");
  };

  iframe.src = url;
}

let loadingInterval;

function showSubmissionOverlay() {
  const submissionOverlayId = document.getElementById("submissionOverlay");
  submissionOverlayId.classList.remove("d-none");
  submissionOverlayId.classList.add("d-flex"); // tambahkan flex saat tampil

  // menampilkan spinner overlay
  const spinnerOverlayId = document.getElementById("spinnerOverlay");
  spinnerOverlayId.className = "spinner-border text-primary mb-2";

  const submissionTextOverlayId = document.getElementById(
    "submissionTextOverlay",
  );
  submissionTextOverlayId.classList.remove("d-none");

  startLoadingTextAnimation();
}

function hideSubmissionOverlay() {
  clearInterval(loadingInterval); // stop animasi teks

  // membersihkan teks konten dan class name
  clearAlerts();

  // sembunyikan section overlay
  const submissionOverlayId = document.getElementById("submissionOverlay");
  submissionOverlayId.classList.add("d-none");
  submissionOverlayId.classList.remove("d-flex");

  // sembunyikan spinner overlay
  const spinnerOverlayId = document.getElementById("spinnerOverlay");
  spinnerOverlayId.className = "";

  // sembunyikan overlay close button
  const overlayCloseButtonId = document.getElementById("overlayCloseButton");
  overlayCloseButtonId.classList.add("d-none");
}

function clearAlerts() {
  const ids = [
    "spinnerOverlay",
    "loadingTextOverlay",
    "submissionTextOverlay",
    "emailAlert",
    "subjectAlert",
    "coverLetterAlert",
    "submissionFeedbackAlert",
    "onloadCoverLetterTemplateListAlert",
    "onloadAttachmentTemplateListAlert",
  ];

  ids.forEach((id) => {
    const el = document.getElementById(id);
    el.textContent = "";
    el.className = "";
  });
}

function startLoadingTextAnimation() {
  const textEl = document.getElementById("submissionTextOverlay");
  const bar = document.getElementById("loadingBar");

  const steps = [
    "🔄 Sedang memuat",
    "⚙️ Menyiapkan konfigurasi",
    "🌐 Menghubungkan server",
    "✨ Hampir selesai",
  ];

  let progress = 0;
  let step = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 15;

    if (progress > 100) progress = 100;

    bar.style.width = progress + "%";

    textEl.innerHTML = `
      ${steps[step]}
    `;

    if (progress > (step + 1) * 20 && step < steps.length - 1) {
      step++;
    }

    if (progress === 100) {
      clearInterval(interval);
    }
  }, 700);
}
