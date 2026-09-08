import * as React from 'react';
import { cn } from '@/lib/utils';

interface MarqueeProps extends React.ComponentProps<'div'> {
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  repeat?: number;
}

/**
 * The Marquee primitive.
 *
 * The component prompt this came from imported `@/components/ui/marquee-01-utils/marquee`
 * but never included its source, so it could not be built as supplied. This
 * is that missing piece, written to the same API: `reverse`, `pauseOnHover`,
 * `vertical`, `repeat`, and a `--duration` set through a class.
 *
 * It duplicates its children `repeat` times so the strip can translate a full
 * child-width and land seamlessly where it started.
 *
 * `prefers-reduced-motion` stops the animation outright rather than slowing
 * it. A continuously moving strip is exactly the kind of thing that setting
 * exists for, and a paused marquee still shows its first screenful, so
 * nothing is lost by stopping it.
 */
export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  repeat = 4,
  children,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        'group flex overflow-hidden p-2 [--duration:40s] [--gap:2rem] [gap:var(--gap)]',
        vertical ? 'flex-col' : 'flex-row',
        className,
      )}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={cn('flex shrink-0 justify-around [gap:var(--gap)]', {
            'animate-marquee flex-row': !vertical,
            'animate-marquee-vertical flex-col': vertical,
            'group-hover:[animation-play-state:paused]': pauseOnHover,
            '[animation-direction:reverse]': reverse,
          })}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
