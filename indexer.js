const { google } = require("googleapis");

// 1. TEMPELKAN EMAIL AKUN LAYANAN ANDA DI SINI
const CLIENT_EMAIL = "github-indexer@zaycomcell-indexing.iam.gserviceaccount.com";

// 2. TEMPELKAN PRIVATE KEY PANJANG ANDA DI SINI (Pastikan berada di antara tanda petik)
const PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCwbyKg8AJq3wdX\njxAF1f/P7YJ7rku477FVSNTazmwe4l7I4SwJY7w/VQk6stiCSYwX//2Yx7xt7WOT\nlsi8KpYRxrPyOQh40RyMVf3BpVjnhRKfpKdX7g9DgKPtBKv2nhY101cQbtYOaujS\nztRfw7Tg+Z8c02Y/MxI5UVChdc8dodiFSnpWtoLPbadk65dyc1nk/8WommFXCfca\nCs9Hre0CBqH2gXVnTa9QStN3BeKZTD3rzhQROEkfsgGdqmoOSjWICLz9BYxAC+Mo\n6FlhWWMUpsS7E+hzw1wCT516dem26sSCG9U0QQJsHLemJ7Asd3GbX2VsRS1gkouI\nr6qHzHpJAgMBAAECggEAGmqhaDBXZFH9Yu5AK2eFtEeu/D62BrwYtJjBiftTM/KX\n14LjWYqN0nu0dI33ndZOO/+vpDLvsxPSj3QJnSbRLlsucSt56cEBgb+UTWyo2Y1S\nowV/qsoxjd1Sbff/mV7FG40HoaW+tgzqzDl8kdQXHoIxgRrj2b2XUm6q4Gnnt1tX\nECD3kLh1o+mx4uaPFJq7fVnvLIxL+Y1Nsxic7wdmitIM0Vpbe/TSeP3Pj1MeI5cx\nvdgEz751gfRXrBAFfjfF/XhQ1MWAmowuoEYtbTDxxzCirqLbdbS6IEKXPjxLaPws\n5jIvT5DKhxj1tceEtlPS+FG4QD6ybGBFYIDYJmjUswKBgQDU/UeyKRNi8u5ME8EV\nAahbx37rvDGZ1VoI0rTtcGUjg1qGVYT3nxQGBh9IsRwHdqX7LyX/egjSN/AJwOca\nudL6T5LxciD6r6EA3T21STqUHBComT95F8/Ev7bcUutkRIjiZ+ZqKvV/V/E+mpVI\neS8TWjzLit4mt6WeDf/dcPNIKwKBgQDUEBdZI0rNnlgmYS+s+Yf66sm3uJV7hpxe\n0SFdKSgObf+4WVqZZwJNSocnIpCHEhL6iL7QJt1NmGlQW/tSZvgUkCah95kEgwAO\nrKUoMz5P3HA7U+TXs4B9ZJ/Wb0kL9I1TH8Abo/LsfrfjyGY8gCxNMDl0EK1pA56T\nRM6LEGD5WwKBgQCQUm/akWrJicNfWaNkEJN8XVnrcsJJcwBnKh/fJGHkBoW4sQpA\noFJ5InzgTOKpTAR8iB4/VvnTOIQ2l7gBrBkB9Bml8afXNlrqsv+1b8F5yuqe0/jm\nnPP0ZdQKx0Up1CbNA4pmNmXTvEuEGEs/qJ31hxfa9GZD5f0bdHEEJB01sQKBgQCc\niXhCs1uPZrhZNFpWDCiFXvUiKh4l/drF3wgK1cucwzQF5+eJ31ECruYPTGN1YTEj\nQPfhfR7VHZF34T4muJ2dyD7MRpHsk6riKi0L/K+dkfJCyQ3e78EETtfyGVnJem8s\nEf7kKGS0kGG7wf094btSCywN8hWftC1FNoBkhOWgiwKBgQDPgf5OGi+zwQxUNb5h\nJkUvSuYwDaAKSm/6yFJl2sf+i9WgN5gfuOkqVp0MmbrSocj1XGEg3qV47CanbpTA\nLgR1UzYMmZs5iNMO7k0SWf6JtnOC6KXYWk7Lj6fBy+dbb7kLCCW12S2ozL8z8IQJ\n/+d7WR6Tex1uWOFDNpncijBKPg==\n-----END PRIVATE KEY-----\n`;

const jwtClient = new google.auth.JWT(
  CLIENT_EMAIL,
  null,
  PRIVATE_KEY.replace(/\\n/g, '\n'),
  ["https://googleapis.com"],
  null
);

// DAFTAR URL BERSIH ZAYCOMCELL ANDA
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
