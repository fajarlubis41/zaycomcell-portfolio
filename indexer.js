const { google } = require("googleapis");
const path = require("path");

const keyPath = path.join(__dirname, "service-account.json");

const jwtClient = new google.auth.JWT({
  keyFile: keyPath,
  scopes: ["https://googleapis.com"]
});

const urls = [
  "https://zaycomcell.my.id",
  "https://zaycomcell.my.id",
  "https://zaycomcell.my.id",
  "https://zaycomcell.my.idsamsung-a10s-layar-mati/",
  "https://zaycomcell.my.iduji-coba-skor-digital-pencak-silat/",
  "https://zaycomcell.my.idganti-lcd-redmi-note-13-5g-oled/",
  "https://zaycomcell.my.iddownload-windows-10-resmi/",
  "https://zaycomcell.my.idcara-membuat-bootable-windows-10-dengan-rufus/",
  "https://zaycomcell.my.idtutorial-kasir-python/",
  "https://zaycomcell.my.idcara-download-driver-laptop/""https://zaycomcell.my.id",
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
    console.error("Gagal Autentikasi ke Google:", err.message);
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
