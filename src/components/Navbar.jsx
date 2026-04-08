import { Show, For, createSignal } from 'solid-js';
import { APP_CONFIG, STRINGS } from '../lib/constants';
import { api } from '../lib/api';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Leaderboard', href: '/leaderboard' },
  // { label: 'SMP', href: '/smp' },
];

// All of this code is kind of ass, I hate the navbar.
export default function Navbar(props) {
  const [isOpen, setIsOpen] = createSignal(false);
  const [isLoggingIn, setIsLoggingIn] = createSignal(false);

  const handleDiscordLogin = (e) => {
    e.preventDefault();
    if (isLoggingIn()) return;

    setIsLoggingIn(true);
    const popup = api.loginWithDiscord();

    const checkPopup = setInterval(async () => {
      if (!popup || popup.closed) {
        clearInterval(checkPopup);
        setIsLoggingIn(false);

        const userData = await api.getMe();
        if (userData) {
          props.setUser(userData);
        }
      }
    }, 1000);
  };

  return (
    <>
      <nav class="fixed inset-x-0 top-0 z-[60] h-20 border-b border-white/5 bg-[#020617]/70 backdrop-blur-2xl">
        <div class="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
          <div
            class="flex cursor-pointer items-center gap-2 text-2xl font-black tracking-tighter text-white uppercase italic transition-opacity hover:opacity-80"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {APP_CONFIG.name}
          </div>

          <div class="flex items-center gap-6">
            <div class="hidden items-center gap-2 md:flex">
              <For each={NAV_LINKS}>
                {(link) => (
                  <a
                    href={link.href}
                    class="rounded-lg px-4 py-2 text-sm font-bold tracking-wide text-slate-400 transition-all hover:text-white">
                    {link.label}
                  </a>
                )}
              </For>
            </div>

            <div class="flex items-center gap-4">
              <Show
                when={props.user()}
                fallback={
                  <button
                    onClick={handleDiscordLogin}
                    class="group relative flex items-center gap-3 overflow-hidden rounded-xl bg-[#5865F2] px-6 py-2.5 text-sm font-black text-white shadow-[0_0_20px_rgba(88,101,242,0.4)] transition-all hover:scale-[1.03] hover:shadow-[#5865F2]/60 active:scale-95">
                    <div class="absolute inset-0 flex h-full w-full [transform:skew(-20deg)_translateX(-120%)] justify-center group-hover:[transform:skew(-20deg)_translateX(120%)] group-hover:duration-[1.5s]">
                      <div class="relative h-full w-12 bg-white/30 blur-sm" />
                    </div>
                    <i class="bx bxl-discord-alt text-xl"></i>
                    <span class="tracking-tight">Login with Discord</span>
                  </button>
                }>
                <div class="flex items-center gap-4 border-l border-white/10 pl-6">
                  <div class="hidden text-right sm:block">
                    <p class="mb-1 text-sm leading-none font-black text-white">
                      {props.user().username}
                    </p>
                    <a
                      href="https://api.softboy.site/auth/logout"
                      class="flex items-center justify-end gap-1 text-[10px] font-black tracking-widest text-red-500/80 uppercase transition-colors hover:text-red-400">
                      {STRINGS.nav.logoutBtn}
                    </a>
                  </div>
                  <img
                    class="h-10 w-10 rounded-full border-2 border-indigo-500/40 object-cover p-0.5 transition-transform hover:scale-110"
                    src={`https://cdn.discordapp.com/avatars/${props.user().discord_id}/${props.user().avatar}.png`}
                    alt="Avatar"
                  />
                </div>
              </Show>

              <button
                onClick={() => setIsOpen(!isOpen())}
                class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-2xl text-white transition-colors hover:bg-white/10 md:hidden">
                <i class={isOpen() ? 'bx bx-x' : 'bx bx-menu-alt-right'}></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        onClick={() => setIsOpen(false)}
        class="fixed inset-0 z-[54] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden"
        classList={{
          'opacity-100 pointer-events-auto': isOpen(),
          'opacity-0 pointer-events-none': !isOpen(),
        }}
      />

      <div
        class="fixed top-0 right-0 bottom-0 z-[55] w-64 transform border-l border-white/10 bg-[#020617] p-8 pt-24 transition-transform duration-500 ease-out md:hidden"
        classList={{
          'translate-x-0': isOpen(),
          'translate-x-full': !isOpen(),
        }}>
        <div class="flex h-full flex-col gap-8">
          <div>
            <p class="mb-4 text-[10px] font-black tracking-[0.3em] text-slate-600 uppercase">
              Navigation
            </p>
            <div class="flex flex-col gap-6">
              <For each={NAV_LINKS}>
                {(link) => (
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    class="text-2xl font-black tracking-tighter text-white uppercase transition-colors hover:text-indigo-400">
                    {link.label}
                  </a>
                )}
              </For>
            </div>
          </div>

          <div class="mt-auto">
            <Show when={props.user()}>
              <a
                href="https://api.softboy.site/auth/logout"
                class="flex items-center gap-2 text-xs font-black tracking-widest text-red-500 uppercase transition-colors hover:text-red-400">
                <i class="bx bx-log-out-circle text-lg"></i>
                {STRINGS.nav.logoutBtn}
              </a>
            </Show>
          </div>
        </div>
      </div>
    </>
  );
}
