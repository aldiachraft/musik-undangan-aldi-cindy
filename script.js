function openInvitation() {
  document.querySelector(".cover").style.display = "none";

  const invitation = document.getElementById("invitation");
  invitation.style.display = "block";

  const music = document.getElementById("weddingMusic");

  if (music) {
    music.play().catch(function(error) {
      console.log("Musik belum dapat diputar:", error);
    });
  }

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
// RSVP GOOGLE SHEETS
document.addEventListener("DOMContentLoaded", function () {

  const rsvpForm = document.getElementById("rsvpForm");

  if (!rsvpForm) return;

  rsvpForm.addEventListener("submit", function (event) {
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
    message.textContent = "Sedang mengirim konfirmasi...";

    fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(data)
    })
    .then(function () {
      message.textContent = "Terima kasih, konfirmasi telah dikirim.";
      rsvpForm.reset();
    })
    .catch(function (error) {
      console.error(error);
      message.textContent = "Gagal mengirim. Silakan coba kembali.";
    })
    .finally(function () {
      button.disabled = false;
      button.textContent = "KIRIM KONFIRMASI";
    });

  });

});
function copyAccount() {
  const account = "2004446426";

  navigator.clipboard.writeText(account)
    .then(function() {
      alert("Nomor rekening berhasil disalin!");
    })
    .catch(function() {
      alert("Tidak dapat menyalin nomor rekening.");
    });
}
// NAMA TAMU OTOMATIS DARI LINK
const urlParams = new URLSearchParams(window.location.search);
const guest = urlParams.get("to");

if (guest) {
  document.getElementById("guestName").textContent =
    guest.replace(/\+/g, " ");
}
// ANIMASI SCROLL REVEAL

document.addEventListener("DOMContentLoaded", function () {

  const sections = document.querySelectorAll(
    ".invitation > section"
  );

  sections.forEach(function(section) {
    section.classList.add("reveal");
  });

  const observer = new IntersectionObserver(function(entries) {

    entries.forEach(function(entry) {

      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }

    });

  }, {
    threshold: 0.15
  });

  sections.forEach(function(section) {
    observer.observe(section);
  });

});
