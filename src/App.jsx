import { createSignal, onMount, onCleanup, For } from 'solid-js';
import Navbar from './components/Navbar';
import Stats from './components/Stats';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import Background from './components/Background';
import { api } from './lib/api';
import { FEATURES, STRINGS } from './lib/constants';

export default function App() {
  const [user, setUser] = createSignal(null);

  onMount(async () => {
    const data = await api.getMe();
    if (data?.discord_id) {
      setUser(data);
    }
  });

  onCleanup(() => window.removeEventListener('scroll', handleScroll));

  // Basically no reason for the space shit, besides I think it looked cool... so, yeah?
  return (
    <div class="relative min-h-screen overflow-x-hidden bg-[#020617] font-sans text-slate-200 selection:bg-indigo-500/30">
      <Background />
      <Navbar user={user} setUser={setUser} />

      <main class="relative z-10 mx-auto max-w-6xl px-6 pt-32 pb-20 md:pt-56">
        <header class="mb-24 flex flex-col items-center text-center md:mb-32">
          <h1 class="mb-6 text-5xl leading-[0.9] font-black tracking-tighter whitespace-pre-line uppercase sm:text-7xl md:text-9xl md:leading-[0.8]">
            {STRINGS.hero.title} <br />
            <span class="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {STRINGS.hero.titleGradient}
            </span>
          </h1>
          <p class="mx-auto mb-10 max-w-2xl text-base leading-relaxed font-medium text-slate-400 sm:text-lg md:text-xl">
            {STRINGS.hero.description}
          </p>
          <Stats />
          <Reviews user={user} />
        </header>
        {/* Info*/}
        <section class="mb-32 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mb-40 md:grid-cols-4">
          <div class="col-span-1 flex flex-col justify-end rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-indigo-600 to-violet-700 p-8 shadow-2xl shadow-indigo-500/20 backdrop-blur-md sm:col-span-2 md:row-span-2 md:p-10">
            <i class="bx bxl-discord-alt mb-6 text-6xl text-white"></i>
            <h3 class="mb-3 text-3xl font-black tracking-tighter text-white uppercase md:text-4xl">
              What Is This?
            </h3>
            <p class="text-base leading-snug text-indigo-100/80 md:text-lg">
              Simply, an adult community where you can be yourself - without
              judgement, and toxicity.
            </p>
          </div>
          {/* "Features" */}
          <For each={FEATURES}>
            {(item) => (
              <div class="group rounded-[2rem] border border-white/5 bg-white/[0.02] p-6 backdrop-blur-md transition-all hover:border-white/10 hover:bg-white/[0.05] md:p-8">
                <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-2xl text-indigo-400 group-hover:text-indigo-300">
                  <i class={`bx ${item.icon}`}></i>
                </div>
                <h4 class="mb-1 font-bold tracking-tight text-white uppercase">
                  {item.title}
                </h4>
                <p class="text-xs leading-relaxed font-medium text-slate-500 md:text-sm">
                  {item.desc}
                </p>
              </div>
            )}
          </For>
        </section>
        {/* Marketing shit bassssically */}
        <section class="relative mb-32 overflow-hidden rounded-[3rem] border border-white/5 bg-white/[0.01] p-8 backdrop-blur-3xl md:mb-40 md:p-20">
          <div class="max-w-xl">
            <h2 class="mb-6 text-4xl leading-none font-black tracking-tighter text-white uppercase md:text-5xl">
              A Higher <span class="text-indigo-500">Standard</span>
            </h2>
            <p class="text-lg leading-relaxed font-medium text-slate-400">
              We ditched the noise of unmoderated servers for something better.
            </p>
          </div>
        </section>
        {/* Call to action (uwu) */}
        <section class="relative overflow-hidden rounded-[3.5rem] bg-indigo-600 px-6 py-20 text-center shadow-2xl">
          <div class="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <h2 class="mb-6 text-5xl leading-none font-black tracking-tighter text-white uppercase md:text-8xl">
            Don't be a <br /> stranger.
          </h2>
          <a
            href="https://api.softboy.site/auth/discord/callback"
            class="inline-flex items-center gap-4 rounded-3xl bg-white px-12 py-6 text-2xl font-black text-indigo-600 shadow-xl transition-all hover:scale-105">
            <i class="bx bxl-discord-alt text-3xl"></i>
            {STRINGS.nav.joinBtn}
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
