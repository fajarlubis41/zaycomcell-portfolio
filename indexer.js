const { google } = require("googleapis");

if (!process.env.GOOGLE_CREDS) {
  console.error("Error: Variabel GOOGLE_CREDS tidak ditemukan!");
  process.exit(1);
}

const creds = JSON.parse(process.env.GOOGLE_CREDS);

const jwtClient = new google.auth.JWT(
  creds.client_email,
  null,
  creds.private_key,
  ["https://googleapis.com"],
  null
);

// DAFTAR 12 URL BERSIH ANDA (Sesuaikan nama artikel/proyek Anda)
const urls = [
  "https://zaycomcell.my.id",
  "https://zaycomcell.my.id/blog/",
  "https://zaycomcell.my.id/proyek/",
  "https://zaycomcell.my.id/blog/samsung-a10s-layar-mati/",
  "https://zaycomcell.my.id/blog/uji-coba-skor-digital-pencak-silat/",
  "https://zaycomcell.my.id/blog/ganti-lcd-redmi-note-13-5g-oled/",
  "https://zaycomcell.my.id/blog/download-windows-10-resmi/",
  "https://zaycomcell.my.id/blog/cara-membuat-bootable-windows-10-dengan-rufus/",
  "https://zaycomcell.my.idblog/tutorial-kasir-python/",
  "https://zaycomcell.my.id/blog/cara-download-driver-laptop/"
];

jwtClient.authorize(function (err, tokens) {
  if (err) {
    console.error("Gagal Autentikasi ke Google:", err);
    process.exit(1);
  }
  
  const indexing = google.indexing({ version: "v3", auth: jwtClient });
  
  urls.forEach(url => {
    indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: "URL_UPDATED"
      }
    }, (err, res) => {
      if (err) {
        console.error(`Gagal mengirim indeks untuk ${url}:`, err.message);
      } else {
        console.log(`Sukses! ${url} masuk antrean prioritas Google.`);
      }
    });
  });
});
