const LIFF_ID = "1654580271-JaKdn2qr";

async function initializeLiff() {
  try {
    await liff.init({ liffId: LIFF_ID });
    const profile = await liff.getProfile();
    alert(`displayName: ${profile.displayName}`);
  } catch (error) {
    console.error("Error initializing LIFF:", error);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  console.log("start");
  initializeLiff();
});
