import { createResource, Show } from 'solid-js';

// Fetch cached stats from API (updates every ~10 minutes)
const fetchStats = async () => {
  try {
    const res = await fetch('https://api.softboy.site/api/stats');
    return res.json();
  } catch (e) {
    console.error('Stats fetch failed', e);
    return null;
  }
};

// The fancy shit that actually displays it
export default function Stats() {
  const [stats] = createResource(fetchStats);

  return (
    <div class="mb-12 flex w-full flex-col items-center gap-6">
      <div class="flex w-full flex-row flex-wrap justify-center gap-4">
        <StatBox
          label="Members"
          value={stats()?.totalMembers}
          icon="bx-group"
        />
        <StatBox
          label="Online"
          value={stats()?.onlineMembers}
          icon="bx-zap"
          pulse={true}
        />
        <StatBox
          label="Boosts"
          value={stats()?.boosts}
          icon="bxs-rocket"
          color="text-pink-400"
        />
        <StatBox
          label="Bans"
          value={stats()?.totalBans}
          icon="bx-shield-quarter"
        />
      </div>
      {/* Only displays when we have a vanity, cause.. yes? future proof'ing!!! */}
      <Show when={stats()?.vanityUrl}>
        <a
          href={`https://${stats()?.vanityUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          class="group flex items-center gap-3 rounded-full border border-white/5 bg-white/5 px-5 py-2 transition-all hover:border-indigo-500/30 hover:bg-indigo-500/10 active:scale-95">
          <i class="bx bx-link text-indigo-400"></i>
          <span class="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase">
            Vanity Invite:
            <span class="ml-2 text-white transition-colors group-hover:text-indigo-300">
              {stats()?.vanityUrl}
            </span>
          </span>
        </a>
      </Show>
    </div>
  );
}

function StatBox(props) {
  return (
    <div class="group flex min-w-[150px] flex-col items-center rounded-2xl border border-white/10 bg-white/5 px-6 py-4 shadow-xl backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10">
      <div class="mb-1 flex items-center gap-2">
        <Show when={props.pulse}>
          <span class="relative flex h-2 w-2">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
        </Show>

        <i
          class={`bx ${props.icon} text-lg ${props.color || 'text-slate-400'} opacity-70 transition-transform group-hover:scale-110`}></i>

        <span class="text-3xl font-black tracking-tight text-white">
          {props.value ?? '--'}
        </span>
      </div>

      <span class="text-[10px] leading-none font-bold tracking-[0.25em] text-slate-500 uppercase">
        {props.label}
      </span>
    </div>
  );
}
