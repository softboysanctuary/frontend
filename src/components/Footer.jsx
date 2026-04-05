import { APP_CONFIG } from '../lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-white/5 bg-[#020617]/50 py-10 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-[10px] font-bold tracking-[0.2em] text-slate-600 uppercase">
            © {currentYear} {APP_CONFIG.footerCopyright}
          </p>

          <div className="flex items-center gap-4">
            {/* GitHub Link */}
            <a
              href={APP_CONFIG.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all hover:border-white/40 hover:bg-white/10 hover:shadow-lg active:scale-95"
              title="View on GitHub">
              <i className="bx bxl-github text-xl text-slate-400 group-hover:text-white"></i>
            </a>

            {/* Discord Link */}
            <a
              href={APP_CONFIG.discordInvite}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all hover:border-[#5865F2] hover:bg-[#5865F2] hover:shadow-lg hover:shadow-[#5865F2]/20 active:scale-95"
              title="Join our Discord">
              <i className="bx bxl-discord-alt text-xl text-slate-400 group-hover:text-white"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
