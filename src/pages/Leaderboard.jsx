import { createSignal, onMount, onCleanup, For, createEffect } from 'solid-js';
import { Title, Meta } from '@solidjs/meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Background from '../components/Background';
import { api } from '../lib/api';

export default function Leaderboard() {
  const [user, setUser] = createSignal(null);
  const [allPlayers, setAllPlayers] = createSignal([]);
  const [displayPlayers, setDisplayPlayers] = createSignal([]);
  const [page, setPage] = createSignal(1);
  const [loading, setLoading] = createSignal(false);

  const ITEMS_PER_PAGE = 10;

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

    fetchLeaderboardBatch();
  });

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
        <Background />

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
