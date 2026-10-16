
const projects = [
  {
    id: "skor-pencak-silat",
    title: "Aplikasi Skor Digital Pencak Silat",
    technologies: ["Node.js", "Socket.io", "JavaScript"],
    description:
      "Konsep aplikasi penilaian pertandingan pencak silat dengan input dari perangkat juri dan tampilan skor pada komputer operator. Node.js dan Socket.io direncanakan untuk mendukung pertukaran data secara real-time.",
    availability:
      "Tersedia untuk pembelian atau kerja sama. Hubungi Zaycomcell untuk informasi lisensi, kebutuhan perangkat, dan demo lebih lanjut.",
    focus:
      "Fokus: sinkronisasi skor, komunikasi antarperangkat, dan antarmuka operator pertandingan.",
    demoUrl:
      "https://www.tiktok.com/@zaycomcell/video/7689767013476060423",
    contactUrl: "#contact"
  }
];

function renderProjects() {
  const container = document.getElementById("projects-container");

  if (!container) return;

  container.innerHTML = projects.map((project) => {
    const technologies = project.technologies.map((technology) => `
      <span class="rounded-md border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-xs text-cyan-300">
        ${technology}
      </span>
    `).join("");

    return `
      <article class="project-card glass reveal overflow-hidden rounded-2xl">
        <div class="relative overflow-hidden border-b border-white/5 bg-gradient-to-br from-cyan-950/60 via-zinc-900 to-zinc-950 p-7 sm:p-9">
          <div class="absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl"></div>

          <div class="relative rounded-xl border border-cyan-400/20 bg-zinc-950/70 p-5">
            <div class="mb-5 flex items-center justify-between">
              <span class="font-mono text-xs text-cyan-300">LIVE SCORING SYSTEM</span>
              <span class="flex items-center gap-2 text-xs text-emerald-300">
                <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
                Real-time concept
              </span>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="rounded-lg border border-cyan-400/20 bg-cyan-400/5 p-4">
                <p class="text-xs text-zinc-400">SUDUT BIRU</p>
                <p class="mt-2 text-4xl font-bold text-cyan-300">--</p>
              </div>
              <div class="rounded-lg border border-red-400/20 bg-red-400/5 p-4">
                <p class="text-xs text-zinc-400">SUDUT MERAH</p>
                <p class="mt-2 text-4xl font-bold text-red-300">--</p>
              </div>
            </div>

            <div class="mt-4 flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] p-3">
              <span class="text-xs text-zinc-400">Score display preview</span>
              <span class="font-mono text-xs text-cyan-300">Socket.io</span>
            </div>
          </div>
        </div>

        <div class="p-7 sm:p-8">
          <div class="mb-4 flex flex-wrap gap-2">
            ${technologies}
          </div>

          <h3 class="text-xl font-semibold text-white sm:text-2xl">
            ${project.title}
          </h3>

          <p class="mt-4 leading-7 text-zinc-400">
            ${project.description}
          </p>

          <p class="mt-4 text-sm leading-6 text-emerald-300">
            ${project.availability}
          </p>

          <p class="mt-4 text-xs leading-6 text-zinc-500">
            ${project.focus}
          </p>

          <a href="${project.demoUrl}"
             target="_blank"
             rel="noopener noreferrer"
             class="mt-7 inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-300">
            <span>▶ Tonton Demo di TikTok</span>
            <span>↗</span>
          </a>

          <a href="${project.contactUrl}"
             class="mt-3 inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-white transition hover:border-emerald-400/40 hover:text-emerald-300">
            <span>Minat Membeli?</span>
            <span>→</span>
          </a>
        </div>
      </article>
    `;
  }).join("");
}

document.addEventListener("DOMContentLoaded", renderProjects);
