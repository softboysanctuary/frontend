import {
  createResource,
  For,
  Show,
  createSignal,
  batch,
  useTransition,
  onCleanup,
  createEffect
} from 'solid-js';
import { useLocation } from '@solidjs/router';
import { api } from '../lib/api';
import { Modal } from '../lib/modal';
import { timeAgo } from '../lib/time';

export default function Reviews(props) {
  const [reviews, { refetch }] = createResource(api.getReviews);
  const [isWriting, setIsWriting] = createSignal(false);
  const [content, setContent] = createSignal('');
  const [rating, setRating] = createSignal(5);
  const [anonymous, setAnonymous] = createSignal(false);
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [errorMessage, setErrorMessage] = createSignal('');
  const [deleteTarget, setDeleteTarget] = createSignal(null);
  const [editTarget, setEditTarget] = createSignal(null);
  const [pending, start] = useTransition();
  const location = useLocation();

  const [tick, setTick] = createSignal(Date.now());
  const timer = setInterval(() => setTick(Date.now()), 60000);
  onCleanup(() => clearInterval(timer));

  const handleEdit = (review) => {
    batch(() => {
      setEditTarget(review.id);
      setContent(review.content);
      setRating(review.rating);
      setAnonymous(!!review.is_anonymous);
      setIsWriting(true);
    });
  };
  // Easy way to make people do reviews, kekw
  createEffect(() => {
    const isReviewRoute = location.hash === '#review';
    
    if (isReviewRoute && props.user()) {
      setIsWriting(true);
      
      const el = document.getElementById('review-form');
      el?.scrollIntoView({ behavior: 'smooth' });
      } else {
       api.loginWithDiscord();
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content().trim().length < 3) return;

    setIsSubmitting(true);
    setErrorMessage('');

    const payload = {
      content: content(),
      rating: rating(),
      anonymous: anonymous(),
    };

    const res = editTarget()
      ? await api.putReview(editTarget(), payload)
      : await api.postReview(payload);

    if (res?.success) {
      batch(() => {
        setIsWriting(false);
        setEditTarget(null);
        setContent('');
        setRating(5);
        setAnonymous(false);
        setIsSubmitting(false);
      });
      start(() => refetch());
    } else {
      setErrorMessage(res?.error || 'An unexpected error occurred.');
      setIsSubmitting(false);
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  const confirmDelete = async () => {
    const review = deleteTarget();
    if (!review) return;

    const res = await api.deleteReview(review.id);
    if (res?.error) {
      setErrorMessage(res.error);
    } else {
      start(() => refetch());
    }
    setDeleteTarget(null);
  };

  return (
    <section class="mt-20 w-full max-w-4xl px-4">
      <Show when={!!deleteTarget()}>
        <Modal
          isOpen={!!deleteTarget()}
          type="danger" // For the longest time, I had this spelt as "daner", don't be like me.
          title="Delete Review"
          message="This will remove your review from the database, you can always make a new one, though!"
          confirmText="Delete Review"
          data={deleteTarget()}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      </Show>

      <div class="mb-16 flex flex-col items-center text-center">
        <h2 class="text-4xl font-black tracking-tighter text-white uppercase italic md:text-6xl">
          Community <span class="text-indigo-500 not-italic">Reviews</span>
        </h2>
        <div class="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-transparent" />
      </div>

      <Show when={props.user()}>
        <div
          class={`mb-12 overflow-hidden rounded-[2.5rem] border shadow-2xl transition-all duration-500 ${
            isWriting()
              ? 'border-indigo-500/30 bg-indigo-500/[0.03]'
              : 'border-white/5 bg-white/[0.02]'
          } backdrop-blur-3xl`}>
          <Show
            when={!isWriting()}
            fallback={
              <form
                onSubmit={handleSubmit}
                class={`p-8 transition-opacity md:p-12 ${isSubmitting() ? 'pointer-events-none opacity-50' : 'opacity-100'}`}>
                <Show when={errorMessage()}>
                  <div class="animate-shake mb-6 flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
                    <i class="bx bx-error-circle text-xl"></i>
                    <span class="text-[10px] font-black tracking-widest uppercase">
                      {errorMessage()}
                    </span>
                  </div>
                </Show>

                <div class="mb-8 flex flex-wrap items-center justify-between gap-6">
                  <div class="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/5 px-4 py-2">
                    <span class="text-[10px] font-black tracking-[0.3em] text-indigo-400 uppercase">
                      Rating
                    </span>
                    <div class="flex gap-1">
                      <For each={[1, 2, 3, 4, 5]}>
                        {(star) => (
                          <button
                            type="button"
                            onClick={() => setRating(star)}
                            class={`text-2xl transition-all duration-300 hover:scale-125 active:scale-90 ${rating() >= star ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]' : 'text-white/10'}`}>
                            <i
                              class={`bx ${rating() >= star ? 'bxs-star' : 'bx-star'}`}></i>
                          </button>
                        )}
                      </For>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      batch(() => {
                        setIsWriting(false);
                        setEditTarget(null);
                        setContent('');
                        setErrorMessage('');
                      });
                    }}
                    class="text-[10px] font-black tracking-widest text-slate-500 uppercase transition-colors hover:text-white">
                    [ Cancel ]
                  </button>
                </div>

                <textarea
                  onInput={(e) => setContent(e.target.value)}
                  value={content()}
                  placeholder="The community is..."
                  class="min-h-[100px] w-full bg-transparent text-2xl font-semibold text-white placeholder:text-slate-800 focus:outline-none"
                  autoFocus
                />

                <div class="mt-8 flex items-center justify-between border-t border-white/5 pt-8">
                  <label class="group flex cursor-pointer items-center gap-3">
                    <div
                      class={`flex h-5 w-5 items-center justify-center rounded border transition-all ${anonymous() ? 'border-indigo-500 bg-indigo-500' : 'border-white/20 bg-white/5'}`}>
                      <input
                        type="checkbox"
                        checked={anonymous()}
                        onChange={(e) => setAnonymous(e.target.checked)}
                        class="hidden"
                      />
                      <Show when={anonymous()}>
                        <i class="bx bx-check text-sm text-white"></i>
                      </Show>
                    </div>
                    <span class="text-[10px] font-black tracking-widest text-slate-500 uppercase group-hover:text-slate-300">
                      Stay Anonymous
                    </span>
                  </label>

                  <button
                    disabled={isSubmitting() || content().length < 3}
                    class="group relative flex items-center gap-3 rounded-2xl bg-indigo-600 px-8 py-4 text-xs font-black tracking-widest text-white uppercase shadow-xl shadow-indigo-500/20 transition-all hover:bg-indigo-500 active:scale-95 disabled:opacity-20 disabled:grayscale">
                    {isSubmitting()
                      ? 'Sending...'
                      : editTarget()
                        ? 'Update Review'
                        : 'Post Review'}
                    <i class="bx bx-right-arrow-alt text-lg transition-transform group-hover:translate-x-1"></i>
                  </button>
                </div>
              </form>
            }>
            <button
              onClick={() => setIsWriting(true)}
              class="group flex w-full items-center justify-between px-10 py-8 transition-all hover:bg-indigo-500/[0.05]">
              <div class="flex items-center gap-4">
                <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-indigo-400 transition-transform group-hover:scale-110">
                  <i class="bx bx-message-square-edit text-2xl"></i>
                </div>
                <span class="text-sm font-black tracking-[0.2em] text-slate-400 uppercase transition-colors group-hover:text-white">
                  Write a review
                </span>
              </div>
              <i class="bx bx-chevron-right text-2xl text-slate-600 transition-all group-hover:translate-x-1 group-hover:text-indigo-400"></i>
            </button>
          </Show>
        </div>
      </Show>

      {/* Review Feed */}
      <div
        class={`grid grid-cols-1 gap-6 transition-opacity duration-500 md:grid-cols-2 ${pending() ? 'opacity-50' : 'opacity-100'}`}>
        <Show
          when={!reviews.loading}
          fallback={
            <For each={Array(4)}>
              {() => (
                <div class="h-48 animate-pulse rounded-[2rem] border border-white/5 bg-white/5" />
              )}
            </For>
          }>
          <For each={reviews()}>
            {(review) => (
              <div class="group relative flex flex-col rounded-[2.5rem] border border-white/5 bg-white/[0.01] p-8 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-indigo-500/20 hover:bg-white/[0.03]">
                <div class="mb-6 flex items-center justify-between">
                  <div class="flex items-center gap-4">
                    <div class="relative h-12 w-12 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-inner">
                      <Show
                        when={review.avatar}
                        fallback={
                          <div class="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-400">
                            <i class="bx bxs-ghost text-2xl"></i>
                          </div>
                        }>
                        <img
                          src={`https://cdn.discordapp.com/avatars/${review.user_id}/${review.avatar}.png`}
                          class="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </Show>
                    </div>
                    <div>
                      <h4 class="flex items-center gap-2 text-xs font-black tracking-widest text-white uppercase">
                        {review.username}
                        <Show when={review.is_anonymous}>
                          <span class="rounded-full bg-white/5 px-1.5 py-0.5 text-[8px] tracking-tighter text-slate-500">
                            ANON
                          </span>
                        </Show>
                      </h4>
                      <div class="mt-1 flex text-[10px] text-yellow-500/40">
                        <For each={Array(5)}>
                          {(_, i) => (
                            <i
                              class={`bx bxs-star ${i() < review.rating ? 'text-yellow-400 opacity-100' : 'opacity-20'}`}></i>
                          )}
                        </For>
                      </div>
                    </div>
                  </div>
                  <Show when={review.is_owner}>
                    <div class="flex gap-1 opacity-0 transition-all group-hover:opacity-100">
                      <button
                        onClick={() => handleEdit(review)}
                        class="flex h-8 w-8 items-center justify-center rounded-xl text-slate-600 transition-all hover:bg-indigo-500/10 hover:text-indigo-400">
                        <i class="bx bx-edit-alt"></i>
                      </button>
                      <button
                        onClick={() => setDeleteTarget(review)}
                        class="flex h-8 w-8 items-center justify-center rounded-xl text-slate-600 transition-all hover:bg-red-500/10 hover:text-red-500">
                        <i class="bx bx-trash-alt"></i>
                      </button>
                    </div>
                  </Show>
                </div>
                <p class="text-sm leading-relaxed font-medium text-slate-400 italic">
                  “{review.content}” {/* OHhHh FanCyyy QuotEs!!! */}
                </p>
                <div class="mt-auto pt-6 text-[9px] font-black tracking-widest text-slate-700 uppercase">
                  <span title={new Date(review.created_at).toLocaleString()}>
                    {tick() && timeAgo(new Date(review.created_at).getTime())}
                  </span>
                </div>
              </div>
            )}
          </For>
        </Show>
      </div>
    </section>
  );
}
