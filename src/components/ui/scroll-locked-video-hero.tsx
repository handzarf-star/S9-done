import * as React from 'react';
import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Full-bleed video hero that pins while you scroll past it, then releases
 * into the page.
 *
 * ── What this takes from the reference component ────────────────────────
 * The dual-video crossfade (`SeamlessLoopVideo`) is the good idea in it and
 * is kept almost verbatim: two stacked <video> elements, the idle one is
 * started and faded up during the last second of the active one, then they
 * swap roles. The native `loop` attribute does a hard seek-and-restart at
 * the loop point and you see the hitch no matter how well the file itself
 * loops. Crossfading hides it.
 *
 * The cursor tilt, the coarse-pointer split, the vignette and the gradient
 * stack over the video are kept too.
 *
 * ── What is deliberately not taken, and why ─────────────────────────────
 * The reference registers a global `wheel` listener with `passive: false`
 * that calls `preventDefault()` on every event and never releases it, plus
 * the same on `touchmove`. It exists to drive a track list. Dropped onto a
 * product page it means the visitor lands, scrolls, and the page never
 * moves: none of the copy below is reachable, on desktop or on a phone.
 * The brief asked for a pinned hero AND for the existing text to follow,
 * and those two cannot both survive that handler.
 *
 * So the pin here is `position: sticky` inside a taller parent. The page
 * scrolls normally the whole time; the hero simply stays put until its
 * parent has passed, then lets go. Nothing is captured, nothing has to be
 * released, and Escape is not needed because the visitor was never trapped.
 *
 * Also not taken: the track list and its momentum physics (there are no
 * tracks), the synthesized wheel-click and volume slider (a B2B page that
 * clicks at you is the opposite of the restraint the rest of this site is
 * built on), and the signature credit link, which points at the reference
 * author's own site and would be crediting them on a Shape9 client page.
 *
 * Colours come from the product, passed in as `accent`. The reference reads
 * `hsl(var(--background, ...))`, which would silently break here: this
 * site's tokens are hex, and `hsl(#010D13)` is invalid, so every one of
 * those would quietly fall through to the reference's own dark palette
 * rather than ours. Tokens are read directly instead.
 */

export interface VideoHeroProps {
  /** 16:9 source, used from 768px up. */
  srcLandscape: string;
  /** 1080x2340 source, used below 768px. Same cut, rendered to phone aspect. */
  srcPortrait: string;
  /** First frame of the wide cut. Paints before any video byte arrives. */
  posterLandscape?: string;
  /** First frame of the tall cut. */
  posterPortrait?: string;
  /** Product accent as a literal hex. */
  accent: string;
  /** Same accent as "r, g, b" for alpha compositing. */
  accentRgb: string;
  /** Sits over the video. Keep it to a few words. */
  eyebrow?: React.ReactNode;
  /** How far you scroll before the hero lets go. 1 = one viewport. */
  holdViewports?: number;
  children?: React.ReactNode;
}

const HOLD_DEFAULT = 1.6;

export const VideoHero: React.FC<VideoHeroProps> = ({
  srcLandscape,
  srcPortrait,
  posterLandscape,
  posterPortrait,
  accent,
  accentRgb,
  eyebrow,
  holdViewports = HOLD_DEFAULT,
  children,
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  // Decided during the first render, not in an effect afterwards.
  //
  // Starting at `false` and correcting in `useEffect` meant a phone rendered
  // the wide source once, the browser began fetching it, and only then did
  // the effect swap to the tall one. Both requests went out and the losing
  // one was measured pulling 3.7 MB before it was abandoned, which is worse
  // than having no orientation switch at all. Reading the media query in the
  // initialiser means the first render already has the right file.
  const [isNarrow, setIsNarrow] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return (
      Boolean(window.matchMedia?.('(pointer: coarse)').matches) ||
      window.innerWidth < 768
    );
  });
  const [reduced, setReduced] = useState(false);
  const [progress, setProgress] = useState(0);

  // A real touch device and a narrow window both count. Testing responsive
  // behaviour by shrinking a desktop browser does not change pointer type,
  // so keying off pointer alone leaves the desktop composition active on a
  // narrow window, which is exactly what reads as "too zoomed in".
  useEffect(() => {
    const check = () => {
      const coarse = window.matchMedia?.('(pointer: coarse)').matches;
      setIsNarrow(Boolean(coarse) || window.innerWidth < 768);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // Scroll progress across the pinned stretch, 0 to 1. Read in rAF off the
  // scroll event rather than in it, so a slow frame cannot stall scrolling.
  useEffect(() => {
    let raf = 0;
    let queued = false;
    const read = () => {
      queued = false;
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      setProgress(total <= 0 ? 0 : Math.min(1, Math.max(0, -r.top / total)));
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (isNarrow || reduced) return;
      const el = frameRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transition = 'transform 0.05s linear';
      el.style.transform = `scale(1.06) rotateY(${px * 4}deg) rotateX(${-py * 3}deg)`;
    },
    [isNarrow, reduced],
  );

  const onLeave = useCallback(() => {
    const el = frameRef.current;
    if (!el) return;
    el.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    el.style.transform = 'scale(1.06) rotateY(0deg) rotateX(0deg)';
  }, []);

  // The hero fades out over the last third of the hold rather than cutting,
  // so the handoff to the copy below reads as one movement.
  const fade = Math.min(1, Math.max(0, (progress - 0.66) / 0.34));

  return (
    <div
      ref={wrapRef}
      style={{ height: `calc(100dvh * ${1 + holdViewports})` }}
      className="relative w-full"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-[var(--ground)]">
        {/* Both cases fill the frame. The wide one is overscanned by 6% so the
            cursor tilt has somewhere to move without exposing an edge; the
            narrow one sits at scale 1 because there is no tilt on a phone.

            The tall cut is rendered at 1080x2340, not 9:16, and that is what
            makes filling safe. Measured: content in these compositions comes
            no closer than 11.3% to the frame edge, and cropping a 9:16 source
            to fit a phone eats 9% a side on an iPhone and 11.9% on the tallest
            Android, which clipped the longest headlines. Matching the render
            to the phone's own 19.5:9 drops that to 0%, 1.3% and 3.6% across
            the same range, so the whole frame is used and nothing is lost.

            An earlier pass used `contain` here to avoid the clipping. It was
            safe but it letterboxed, and a letterboxed hero is not a full
            screen hero. */}
        <div
          ref={frameRef}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          className="absolute inset-0"
          style={{
            transform: isNarrow ? 'none' : 'scale(1.06)',
            opacity: 1 - fade * 0.85,
            transformStyle: 'preserve-3d',
          }}
        >
          <SeamlessLoopVideo
            src={isNarrow ? srcPortrait : srcLandscape}
            poster={isNarrow ? posterPortrait : posterLandscape}
            paused={reduced}
            fit="cover"
          />
        </div>

        {/* Vignette, then a bottom ramp into the page ground so the video
            does not end on a hard edge where the copy starts. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 85% 85% at 50% 45%, transparent 55%, rgba(1,13,19,0.55) 100%)',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
          style={{
            background:
              'linear-gradient(180deg, rgba(1,13,19,0) 0%, rgba(1,13,19,0.72) 62%, var(--ground) 100%)',
          }}
        />

        {(eyebrow || children) && (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 px-4 pb-16 sm:px-6 sm:pb-20"
            style={{ opacity: 1 - fade }}
          >
            <div className="mx-auto max-w-5xl">
              {eyebrow && (
                <div
                  className="mb-3 font-mono text-[11px] uppercase tracking-[0.13em]"
                  style={{ color: accent }}
                >
                  {eyebrow}
                </div>
              )}
              <div className="pointer-events-auto">{children}</div>
            </div>
          </div>
        )}

        {/* Progress hairline in the product's own colour. It is the only
            indication that the hero is holding, and it disappears with it. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
          style={{ background: `rgba(${accentRgb}, 0.16)` }}
        >
          <div
            className="h-full"
            style={{
              width: `${progress * 100}%`,
              background: accent,
              opacity: 1 - fade,
            }}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Two stacked videos crossfading into each other just before the loop point,
 * instead of the native `loop` attribute's hard seek-and-restart. Taken from
 * the reference component; the timing constant and the swap logic are its
 * design, not a reimplementation.
 *
 * ── Loading, which the reference did not think about ────────────────────
 * A poster is set on both. Current guidance is blunt about this: the poster
 * is the LCP element and the video is progressive enhancement, and an
 * autoplaying hero video with no poster is among the most common causes of a
 * failing LCP on a visually rich page. The posters here are the first frame
 * of each cut, so the handover from still to moving image is invisible, and
 * they weigh about a kilobyte each because that frame is nearly flat ground.
 *
 * The second video is not loaded until the first is halfway through. Both
 * were previously `preload="auto"`, which fetched the same file twice before
 * anything played: 8.8 MB on the Pulse page, against a roughly 5 MB median
 * for an entire mobile page. Now the first loads eagerly because it has to
 * play immediately, and the second is given its src around the 50% mark,
 * leaving roughly eighteen seconds of headroom before the crossfade needs
 * it. Initial bytes halve and the seamless loop survives.
 */
const CROSSFADE_S = 1;
/** Fraction of the first pass after which the second copy starts loading. */
const PRELOAD_SECOND_AT = 0.5;

const SeamlessLoopVideo: React.FC<{
  src: string;
  poster?: string;
  paused?: boolean;
  fit?: 'cover' | 'contain';
}> = ({ src, poster, paused = false, fit = 'cover' }) => {
  const aRef = useRef<HTMLVideoElement>(null);
  const bRef = useRef<HTMLVideoElement>(null);
  const active = useRef<'a' | 'b'>('a');
  const fading = useRef(false);
  const [aOpacity, setAOpacity] = useState(1);
  const [bOpacity, setBOpacity] = useState(0);
  // The second copy has no src until the first is well underway.
  const [secondReady, setSecondReady] = useState(false);

  useEffect(() => {
    const a = aRef.current;
    const b = bRef.current;
    if (!a || !b) return;
    if (paused) {
      a.pause();
      b.pause();
      return;
    }
    a.play().catch(() => {});
    let raf = 0;
    const tick = () => {
      const cur = active.current === 'a' ? a : b;
      const idle = active.current === 'a' ? b : a;
      if (cur.duration) {
        const remaining = cur.duration - cur.currentTime;
        if (!fading.current && remaining <= CROSSFADE_S) {
          fading.current = true;
          idle.currentTime = 0;
          idle.play().catch(() => {});
        }
        if (fading.current) {
          const t = Math.min(1, Math.max(0, 1 - remaining / CROSSFADE_S));
          if (active.current === 'a') {
            setAOpacity(1 - t);
            setBOpacity(t);
          } else {
            setBOpacity(1 - t);
            setAOpacity(t);
          }
          if (remaining <= 0.03) {
            cur.pause();
            fading.current = false;
            active.current = active.current === 'a' ? 'b' : 'a';
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, src]);

  // The second copy's load is triggered from `timeupdate`, not from the
  // animation loop above.
  //
  // requestAnimationFrame does not run at all while the tab is hidden, so a
  // page opened in a background tab would reach the loop point with the
  // second file never requested. `timeupdate` is tied to playback rather
  // than to painting, which is the right signal for "far enough through to
  // start fetching the next one".
  useEffect(() => {
    const a = aRef.current;
    if (!a || secondReady) return;
    const onTime = () => {
      if (a.duration && a.currentTime / a.duration >= PRELOAD_SECOND_AT) {
        setSecondReady(true);
      }
    };
    a.addEventListener('timeupdate', onTime);
    return () => a.removeEventListener('timeupdate', onTime);
  }, [secondReady, src]);

  // Both class names are written out in full on purpose. Tailwind finds
  // classes by scanning source text, so a name built at runtime like
  // `object-${fit}` is never seen and never generated: the desktop hero
  // silently fell back to whatever `object-*` happened to exist elsewhere in
  // the bundle, which was `contain`, and the wide video stopped filling.
  const base =
    fit === 'contain'
      ? 'absolute inset-0 h-full w-full object-contain'
      : 'absolute inset-0 h-full w-full object-cover';
  return (
    <>
      <video
        ref={aRef}
        src={src}
        poster={poster}
        muted
        playsInline
        preload="auto"
        aria-hidden
        className={base}
        style={{ opacity: aOpacity }}
      />
      <video
        ref={bRef}
        src={secondReady ? src : undefined}
        poster={poster}
        muted
        playsInline
        preload={secondReady ? 'auto' : 'none'}
        aria-hidden
        className={base}
        style={{ opacity: bOpacity }}
      />
    </>
  );
};

export default VideoHero;
