function openInvitation() {
  document.querySelector(".cover").style.display = "none";

  const invitation = document.getElementById("invitation");
  invitation.style.display = "block";

  window.scrollTo(0, 0);
}

function updateCountdown() {
  const weddingDate = new Date("2026-12-06T08:00:00+07:00").getTime();
  const now = Date.now();
  const distance = weddingDate - now;

  const days = document.getElementById("days");
  const hours = document.getElementById("hours");
  const minutes = document.getElementById("minutes");
  const seconds = document.getElementById("seconds");

  if (!days || !hours || !minutes || !seconds) return;

  if (distance <= 0) {
    days.textContent = "0";
    hours.textContent = "0";
    minutes.textContent = "0";
    seconds.textContent = "0";
    return;
  }

  days.textContent = Math.floor(distance / 86400000);
  hours.textContent = Math.floor((distance % 86400000) / 3600000);
  minutes.textContent = Math.floor((distance % 3600000) / 60000);
  seconds.textContent = Math.floor((distance % 60000) / 1000);
}

updateCountdown();
setInterval(updateCountdown, 1000);
// MENGIRIM RSVP KE GOOGLE SHEETS
const rsvpForm = document.getElementById("rsvpForm");

if (rsvpForm) {
  rsvpForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const button = document.getElementById("rsvpButton");
    const message = document.getElementById("rsvpMessage");

    const data = {
      nama: document.getElementById("nama").value,
      kehadiran: document.getElementById("kehadiran").value,
      jumlah: document.getElementById("jumlah").value
    };

    const url = "https://script.google.com/macros/s/AKfycbxzf8c6EKsrHeKIqso9npgeweNHuFNObKf2ZZGKeDYV18z44TUgTOAtdbYPbF9iYk_m/exec";

    button.disabled = true;
    button.textContent = "MENGIRIM...";
    message.textContent = "";

    try {
      await fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(data)
      });

      message.textContent =
        "Permintaan telah dikirim. Terima kasih!";
      rsvpForm.reset();

    } catch (error) {
      message.textContent =
        "Pengiriman gagal. Silakan coba kembali.";
    }

    button.disabled = false;
    button.textContent = "KIRIM KONFIRMASI";
  });
}
