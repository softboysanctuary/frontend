import { Show, For, createSignal } from 'solid-js';
import { APP_CONFIG, STRINGS } from '../lib/constants';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  // { label: 'SMP', href: '/smp' },
];

// All of this code is kind of ass, I hate the navbar.
export default function Navbar(props) {
  const [isOpen, setIsOpen] = createSignal(false);

  const handleDiscordLogin = (e) => {
    e.preventDefault();
    const width = 500;
    const height = 750;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      'https://api.softboy.site/auth/discord',
      'discord-auth',
      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,status=no`
    );

    const checkPopup = setInterval(() => {
      if (!popup || popup.closed) {
        clearInterval(checkPopup);
        window.location.reload();
      }
    }, 1000);
  };

  return (
    <>
      <nav class="fixed top-0 right-0 left-0 z-[60] h-20 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl">
        <div class="mx-auto flex h-full max-w-7xl flex-row items-center justify-between px-6">
          <div
            class="group flex cursor-pointer items-center gap-3 text-xl font-extrabold tracking-tighter uppercase"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span class="text-white">{APP_CONFIG.name}</span>
          </div>

          <div class="flex items-center gap-4 md:gap-8">
            <div class="hidden items-center gap-1 md:flex">
              <For each={NAV_LINKS}>
                {(link) => (
                  <a
                    href={link.href}
                    class="rounded-lg px-4 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white">
                    {link.label}
                  </a>
                )}
              </For>
            </div>

            <div class="flex items-center gap-3 md:gap-6">
              <Show
                when={props.user()}
                fallback={
                  <button
                    onClick={handleDiscordLogin}
                    class="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-500 active:scale-95 md:px-6 md:py-2.5 md:text-sm">
                    <i class="bx bxl-discord-alt text-lg"></i>
                    <span class="xs:block hidden">{STRINGS.nav.joinBtn}</span>
                  </button>
                }>
                <div class="flex items-center gap-3 border-l border-white/10 pl-4 md:gap-4 md:pl-6">
                  <div class="hidden text-right leading-tight sm:block">
                    <p class="text-sm font-bold text-white">
                      {props.user().username}
                    </p>
                    <a
                      href="https://api.softboy.site/auth/logout"
                      class="flex items-center justify-end gap-1 text-[10px] font-bold tracking-widest text-slate-500 uppercase transition-colors hover:text-red-400">
                      <i class="bx bx-log-out-circle icon-sm"></i>
                      {STRINGS.nav.logoutBtn}
                    </a>
                  </div>
                  <img
                    class="h-9 w-9 rounded-xl border border-indigo-500/30 object-cover p-0.5 ring-2 ring-transparent transition-all hover:ring-indigo-500/50 md:h-10 md:w-10"
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
        class={`fixed inset-0 z-[54] bg-black/60 transition-opacity duration-300 md:hidden ${
          isOpen()
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      />

      <div
        class={`fixed top-0 right-0 bottom-0 z-[55] w-64 transform border-l border-white/5 bg-[#020617] transition-transform duration-300 ease-in-out md:hidden ${
          isOpen() ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div class="flex h-full flex-col p-8 pt-24">
          <Show when={isOpen()}>
            <img
              src="/sbs.png"
              alt="Logo"
              class="mb-8 h-10 w-10 rounded-lg shadow-lg shadow-indigo-500/10"
            />
          </Show>

          <div class="flex flex-col gap-4">
            <p class="mb-2 text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
              Navigation
            </p>
            <For each={NAV_LINKS}>
              {(link) => (
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  class="text-xl font-bold tracking-tight text-white uppercase transition-colors hover:text-indigo-400">
                  {link.label}
                </a>
              )}
            </For>
          </div>

          <div class="mt-auto">
            <Show when={props.user()}>
              <a
                href="https://api.softboy.site/auth/logout"
                class="flex items-center gap-2 text-xs font-bold tracking-widest text-red-400 uppercase transition-colors hover:text-red-300">
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
