import { createSignal, onMount, onCleanup, For, createEffect } from 'solid-js';
import { Title, Meta } from '@solidjs/meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { api } from '../lib/api';

export default function Leaderboard() {
  const [user, setUser] = createSignal(null);
  const [scrollY, setScrollY] = createSignal(0);
  const [allPlayers, setAllPlayers] = createSignal([]);
  const [displayPlayers, setDisplayPlayers] = createSignal([]);
  const [page, setPage] = createSignal(1);
  const [loading, setLoading] = createSignal(false);

  const ITEMS_PER_PAGE = 10;
  const handleScroll = () => setScrollY(window.scrollY);

  const fetchLeaderboardBatch = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.softboy.site/api/leaderboard?page=1`
      );
      const data = await res.json();
      setAllPlayers(data);
    } catch (err) {
      console.error('Failed to load leaderboard', err);
    } finally {
      setLoading(false);
    }
  };

  createEffect(() => {
    const start = (page() - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    setDisplayPlayers(allPlayers().slice(start, end));
  });

  onMount(async () => {
    const data = await api.getMe();
    if (data?.discord_id) {
      setUser(data);
    }

    window.addEventListener('scroll', handleScroll);
    fetchLeaderboardBatch();
  });

  onCleanup(() => window.removeEventListener('scroll', handleScroll));

  // Basically no reason for the space shit, besides I think it looked cool... so, yeah?
  return (
    <>
      <Title>Softboy Sanctuary | Leaderboard</Title>
      <Meta
        name="description"
        content="View the Softboy Sanctuary leaderboard and see the most active community members ranked by level."
      />
      <Meta property="og:title" content="Softboy Sanctuary | Leaderboard" />
      <Meta
        property="og:description"
        content="See the top chatters and highest level members in the Softboy Sanctuary community."
      />
      <Meta property="og:url" content="https://softboy.site/leaderboard" />
      <Meta name="robots" content="index,follow" />
      <Meta
        name="keywords"
        content="discord leaderboard, softboy sanctuary leaderboard, discord levels, chat leaderboard"
      />
      <Meta property="og:type" content="website" />
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

        <Navbar user={user} setUser={setUser} />

        <main class="relative z-10 mx-auto max-w-4xl px-6 pt-32 pb-20 md:pt-56">
          <header class="mb-24 text-center md:mb-32">
            <h1 class="mb-6 text-5xl leading-[0.9] font-black tracking-tighter whitespace-pre-line uppercase sm:text-7xl md:text-9xl md:leading-[0.8]">
              Server <br />
              <span class="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Leaderboard
              </span>
            </h1>
            <p class="mx-auto max-w-2xl text-base leading-relaxed font-medium text-slate-400 sm:text-lg md:text-xl">
              The top chatters of the community.
            </p>
          </header>

          <section class="relative overflow-hidden rounded-[3rem] border border-white/5 bg-white/[0.01] p-6 backdrop-blur-3xl md:p-12">
            <div class="flex flex-col gap-4">
              <For each={displayPlayers()}>
                {(player) => (
                  <div class="group flex items-center justify-between rounded-[2rem] border border-white/5 bg-white/[0.02] p-5 transition-all hover:border-white/10 hover:bg-white/[0.05]">
                    <div class="flex items-center gap-5">
                      <span class="w-12 text-3xl font-black text-slate-800 italic transition-colors group-hover:text-indigo-500/30">
                        #{player.rank}
                      </span>
                      <div class="relative h-14 w-14 overflow-hidden rounded-2xl">
                        <img
                          src={
                            player.id
                              ? `https://cdn.discordapp.com/avatars/${player.id}/${player.avatar}.png`
                              : ''
                          }
                          class="h-full w-full object-cover"
                        />
                        <div class="absolute inset-0 shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]" />
                      </div>
                      <div>
                        <h4 class="text-lg leading-tight font-bold tracking-tight text-white uppercase">
                          {player.globalName || player.username}
                        </h4>
                        <p class="text-[10px] font-black tracking-widest text-indigo-400/60 uppercase">
                          @{player.username}
                        </p>
                      </div>
                    </div>

                    <div class="flex flex-col items-end gap-2">
                      <span class="text-xs font-black tracking-tighter text-white uppercase">
                        Level{' '}
                        <span class="text-lg text-indigo-400">
                          {player.level}
                        </span>
                      </span>
                      <div class="h-2 w-24 overflow-hidden rounded-full bg-slate-900 shadow-inner md:w-40">
                        <div
                          class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000"
                          style={{ width: `${player.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </For>
            </div>

            <div class="mt-12 flex items-center justify-center gap-4">
              <button
                onClick={() => {
                  setPage((p) => Math.max(1, p - 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={page() === 1}
                class="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/5 bg-white/5 text-xl transition-all hover:bg-white/10 disabled:opacity-10">
                <i class="bx bx-chevron-left"></i>
              </button>

              <div class="flex h-14 items-center rounded-2xl border border-white/5 bg-white/5 px-8 font-black tracking-widest text-indigo-400 uppercase">
                Page {page()} <span class="mx-2 text-slate-600">/</span> 10
              </div>

              <button
                onClick={() => {
                  setPage((p) => Math.min(10, p + 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={page() === 10}
                class="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/5 bg-white/5 text-xl transition-all hover:bg-white/10 disabled:opacity-10">
                <i class="bx bx-chevron-right"></i>
              </button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
