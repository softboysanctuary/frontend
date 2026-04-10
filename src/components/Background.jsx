// Basically no reason for the space shit, besides I think it looked cool... so, yeah?
import { createSignal, onMount, onCleanup } from 'solid-js';

export default function Background() {
  const [scrollY, setScrollY] = createSignal(0);
  const handleScroll = () => setScrollY(window.scrollY);

  onMount(() => {
    window.addEventListener('scroll', handleScroll);
  });

  onCleanup(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  return (
    <>
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
    </>
  );
}
