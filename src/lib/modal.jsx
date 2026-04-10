import { Show } from 'solid-js';
import { Portal } from 'solid-js/web';

export const Modal = (props) => {
  // Mapping of visual styles for each modal type
  const typeConfigs = {
    danger: {
      glow: 'bg-red-500',
      icon: 'bx-trash text-red-400',
      accent: 'bg-red-500/40',
      button: 'bg-red-500/80 hover:bg-red-500 shadow-red-900/20',
    },
    warning: {
      glow: 'bg-amber-500',
      icon: 'bx-error text-amber-400',
      accent: 'bg-amber-500/40',
      button: 'bg-amber-600/80 hover:bg-amber-500 shadow-amber-900/20',
    },
    success: {
      glow: 'bg-emerald-500',
      icon: 'bx-check-circle text-emerald-400',
      accent: 'bg-emerald-500/40',
      button: 'bg-emerald-600/80 hover:bg-emerald-500 shadow-emerald-900/20',
    },
    info: {
      glow: 'bg-indigo-500',
      icon: 'bx-info-circle text-indigo-400',
      accent: 'bg-indigo-500/40',
      button: 'bg-indigo-600/80 hover:bg-indigo-600 shadow-indigo-900/20',
    },
  };

  // Select config based on props.type, fallback to "info"
  const config = () => typeConfigs[props.type] || typeConfigs.info;

  return (
    // Only render modal when open
    <Show when={props.isOpen}>
      {/* Render outside normal DOM hierarchy */}
      <Portal>
        <div class="fixed inset-0 z-[999] flex items-end justify-center bg-black/60 p-0 backdrop-blur-md transition-all md:items-center md:p-6">
          {/* Clicking the backdrop closes modal (unless loading) */}
          <div
            class="absolute inset-0"
            onClick={() => !props.isLoading && props.onCancel()}
          />

          {/* Modal container with configurable width */}
          <div
            style={{ 'max-width': props.maxWidth || '440px' }}
            class="animate-in slide-in-from-bottom-full md:slide-in-from-bottom-0 md:zoom-in relative w-full overflow-hidden rounded-t-[2rem] border-t border-white/10 bg-[#0F172A] shadow-2xl duration-300 md:rounded-[2rem] md:border">
            {/* Ambient glow colored based on modal type */}
            <div
              class={`pointer-events-none absolute -top-12 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full opacity-20 blur-[60px] transition-colors duration-500 ${config().glow}`}
            />

            {/* Header section */}
            <header class="relative flex items-center justify-between border-b border-white/5 px-6 py-4">
              <div class="flex items-center gap-3">
                {/* Icon defaults to config unless overridden */}
                <i class={`bx ${props.icon || config().icon} text-lg`}></i>
                <h3 class="text-sm leading-none font-black tracking-widest text-white uppercase">
                  {props.title || 'Are you sure?'}
                </h3>
              </div>

              {/* Hide close button while loading */}
              <Show when={!props.isLoading}>
                <button
                  onClick={props.onCancel}
                  class="text-slate-500 transition-colors hover:text-white">
                  <i class="bx bx-x text-2xl"></i>
                </button>
              </Show>
            </header>

            <div class="relative p-6">
              {/* Modal message */}
              <p
                class="mb-6 text-[13px] leading-relaxed font-medium text-slate-400"
                classList={{ 'text-center': props.align === 'center' }}>
                {props.message}
              </p>

              {/* Optional data preview block */}
              <Show when={props.data}>
                <div class="relative mb-6 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all">
                  {/* Colored accent bar based on modal type */}
                  <div
                    class={`absolute top-3 bottom-3 left-0 w-[2px] rounded-r-full ${config().accent}`}
                  />

                  <div class="ml-2">
                    {/* Content preview */}
                    <p class="line-clamp-3 text-xs leading-snug text-slate-300 italic">
                      “{props.data.content}”
                    </p>

                    {/* Optional user information */}
                    <Show when={props.data.username}>
                      <div class="mt-3 flex items-center gap-2">
                        {/* Avatar container */}
                        <div class="h-5 w-5 overflow-hidden rounded-md border border-white/10 bg-slate-900 shadow-inner">
                          <Show
                            when={props.data.avatar}
                            fallback={
                              <div class="flex h-full w-full items-center justify-center bg-white/5 text-slate-400">
                                <i class="bx bxs-ghost text-[8px]"></i>
                              </div>
                            }>
                            <img
                              src={`https://cdn.discordapp.com/avatars/${props.data.user_id}/${props.data.avatar}.png`}
                              class="h-full w-full object-cover"
                            />
                          </Show>
                        </div>

                        {/* Username */}
                        <span class="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                          {props.data.username}
                        </span>
                      </div>
                    </Show>
                  </div>
                </div>
              </Show>

              {/* Footer action buttons */}
              <div class="flex flex-row items-center justify-end gap-2 pt-2">
                <button
                  disabled={props.isLoading}
                  onClick={props.onCancel}
                  class="flex-1 px-4 py-3 text-[10px] font-black tracking-widest text-slate-500 uppercase transition-all hover:text-white disabled:opacity-30 md:flex-none">
                  {props.cancelText || 'Cancel'}
                </button>

                <button
                  disabled={props.isLoading}
                  onClick={props.onConfirm}
                  class={`flex flex-[2] items-center justify-center gap-2 rounded-xl px-8 py-3 text-[10px] font-black tracking-widest text-white uppercase shadow-lg transition-all active:scale-95 md:flex-none ${config().button} ${props.isLoading ? 'cursor-wait opacity-70' : ''}`}>
                  {/* Spinner while loading */}
                  <Show when={props.isLoading}>
                    <i class="bx bx-loader-alt animate-spin text-sm"></i>
                  </Show>

                  {/* Button text switches during loading */}
                  {props.isLoading
                    ? props.loadingText || 'Processing...'
                    : props.confirmText || 'Confirm'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Portal>
    </Show>
  );
};
