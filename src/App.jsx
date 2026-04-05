import { createSignal, onMount, onCleanup, For } from 'solid-js';
import Navbar from './components/Navbar';
import Stats from './components/Stats';
import Footer from './components/Footer';
import { FEATURES, STRINGS } from './lib/constants';

export default function App() {
  const [user, setUser] = createSignal(null);
  const [scrollY, setScrollY] = createSignal(0);

  const handleScroll = () => setScrollY(window.scrollY);

  onMount(async () => {
    try {
      const res = await fetch('/auth/me');
      const data = await res.json();
      if (data?.discord_id) setUser(data);
    } catch (e) {}
    window.addEventListener('scroll', handleScroll);
  });

  onCleanup(() => window.removeEventListener('scroll', handleScroll));

  // Basically no reason for the space shit, besides I think it looked cool... so, yeah?
  return (
    <div class="relative min-h-screen overflow-x-hidden bg-[#020617] font-sans text-slate-200 selection:bg-indigo-500/30">
      <style>{`
        @keyframes shooting-star {
          0% { transform: translateX(0) translateY(0) rotate(-45deg); opacity: 0; }
          10% { opacity: 1; }
          40% { transform: translateX(-600px) translateY(600px) rotate(-45deg); opacity: 0; }
          100% { opacity: 0; }
        }
        .shooting-star {
          position: absolute;
          height: 1.5px;
          background: linear-gradient(-45deg, #6366f1, rgba(99, 102, 241, 0));
          border-radius: 999px;
          filter: drop-shadow(0 0 6px #818cf8);
          animation: shooting-star 10s ease-out infinite;
          opacity: 0;
          pointer-events: none;
          z-index: 2;
        }
        .planet-texture {
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 12px,
            rgba(99, 102, 241, 0.03) 12px,
            rgba(99, 102, 241, 0.03) 14px
          );
        }
      `}</style>

      <div class="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          class="absolute inset-0 opacity-30 transition-transform duration-75 ease-out"
          style={{
            transform: `translateY(${scrollY() * -0.05}px)`,
            'background-image': `radial-gradient(1px 1px at 20px 30px, #fff, transparent), 
                                 radial-gradient(1px 1px at 150px 150px, #fff, transparent)`,
            'background-size': '250px 250px',
          }}
        />

        <div
          class="absolute inset-0 opacity-30 transition-transform duration-75 ease-out"
          style={{
            transform: `translateY(${scrollY() * -0.05}px)`,
            'background-image': `radial-gradient(1px 1px at 20px 30px, #fff, rgba(0,0,0,0)), 
                                 radial-gradient(1px 1px at 40px 70px, #fff, rgba(0,0,0,0)), 
                                 radial-gradient(2px 2px at 50px 160px, #fff, rgba(0,0,0,0)), 
                                 radial-gradient(1px 1px at 90px 40px, #fff, rgba(0,0,0,0)), 
                                 radial-gradient(1px 1px at 130px 80px, #fff, rgba(0,0,0,0)), 
                                 radial-gradient(1.5px 1.5px at 160px 120px, #fff, rgba(0,0,0,0))`,
            'background-size': '200px 200px',
          }}
        />

        <div
          class="absolute inset-0"
          style={{ transform: `translateY(${scrollY() * -0.12}px)` }}>
          {/* Right Side */}
          <div
            class="shooting-star"
            style={{
              top: '5%',
              right: '10%',
              width: '160px',
              'animation-delay': '0s',
            }}
          />
          <div
            class="shooting-star"
            style={{
              top: '40%',
              right: '-5%',
              width: '100px',
              'animation-delay': '4s',
            }}
          />
          <div
            class="shooting-star"
            style={{
              top: '80%',
              right: '20%',
              width: '180px',
              'animation-delay': '7s',
            }}
          />
          {/* Left Side */}
          <div
            class="shooting-star"
            style={{
              top: '15%',
              left: '15%',
              width: '130px',
              'animation-delay': '2.5s',
            }}
          />
          <div
            class="shooting-star"
            style={{
              top: '50%',
              left: '5%',
              width: '150px',
              'animation-delay': '6s',
            }}
          />
          <div
            class="shooting-star"
            style={{
              top: '90%',
              left: '25%',
              width: '110px',
              'animation-delay': '9s',
            }}
          />
          {/* Center-ish */}
          <div
            class="shooting-star hidden md:block"
            style={{
              top: '30%',
              left: '45%',
              width: '140px',
              'animation-delay': '1.5s',
            }}
          />
          <div
            class="shooting-star hidden md:block"
            style={{
              top: '65%',
              right: '45%',
              width: '120px',
              'animation-delay': '5.5s',
            }}
          />
        </div>

        <div
          class="absolute top-[15%] right-[5%] transition-transform duration-700 ease-out md:right-[15%]"
          style={{
            transform: `translate(calc(${scrollY() * -0.15}px), calc(${scrollY() * 0.05}px))`,
          }}>
          <div class="relative h-24 w-24 md:h-44 md:w-44">
            <div class="absolute -inset-8 rounded-full bg-indigo-500/10 blur-3xl" />
            <div class="absolute inset-0 overflow-hidden rounded-full bg-[#0f172a] shadow-[0_0_50px_rgba(79,70,229,0.1)]">
              <div class="planet-texture absolute inset-0 opacity-40" />
              <div class="absolute inset-0 rounded-full shadow-[inset_-15px_15px_30px_rgba(255,255,255,0.04),inset_10px_-10px_40px_rgba(0,0,0,0.8)]" />
            </div>
            <div class="absolute top-1/2 left-1/2 h-[10%] w-[180%] -translate-x-1/2 -translate-y-1/2 -rotate-[15deg] rounded-[100%] border-[0.5px] border-indigo-400/20" />
          </div>
        </div>

        <div
          class="absolute top-[60%] left-[5%] opacity-60 transition-transform duration-1000 ease-out md:left-[10%]"
          style={{
            transform: `translate(calc(${scrollY() * 0.1}px), calc(${scrollY() * -0.05}px))`,
          }}>
          <div class="relative h-12 w-12 md:h-20 md:w-20">
            <div class="absolute inset-0 rounded-full border border-white/5 bg-slate-900 shadow-2xl">
              <div class="absolute top-2 left-3 h-3 w-3 rounded-full bg-black/20" />
              <div class="absolute right-4 bottom-4 h-2 w-2 rounded-full bg-black/30" />
              <div class="absolute inset-0 rounded-full shadow-[inset_4px_-4px_10px_rgba(0,0,0,0.7),inset_-2px_2px_4px_rgba(255,255,255,0.1)]" />
            </div>
          </div>
        </div>

        <div class="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5" />
      </div>

      <Navbar user={user} />

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
            href="/auth/discord"
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
