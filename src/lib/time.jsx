import { createMemo, createSignal } from 'solid-js';
import { Temporal, Intl } from 'temporal-polyfill';

// Simple signal controlling whether time should display in 12hr or 24hr format
const [timeFormat, setTimeFormat] = createSignal('24hr');

export const formatters = createMemo(() => {
  // Use the browser's locale, fallback to en-GB for consistency
  const lang = navigator.language || 'en-US';
  const options = [lang, 'en-GB'];
  const is12hr = timeFormat() === '12hr';

  return {
    duration: {
      narrow: new Intl.DurationFormat(options, { style: 'narrow' }),
      digital: new Intl.DurationFormat(options, {
        style: 'narrow',
        hoursDisplay: 'auto',
        hours: 'numeric',
        minutes: '2-digit',
        seconds: '2-digit',
      }),
    },
    datetime: {
      mediumDate: new Intl.DateTimeFormat(options, {
        dateStyle: 'medium',
        timeStyle: 'short',
        hour12: is12hr,
      }),
      seconds: new Intl.DateTimeFormat(options, {
        timeStyle: 'medium',
        hour12: is12hr,
      }),
    },
    relative: new Intl.RelativeTimeFormat(options, { numeric: 'auto' }),
  };
});

/**
 * Rounds a Temporal.Duration to the most meaningful unit
 * so relative time strings like "5 minutes ago" look natural.
 */
function roundDuration(duration, start) {
  const baseDuration = duration;
  const absDuration = duration.sign === -1 ? duration.negated() : duration;

  let smallestUnit = 'seconds';
  let secondsOnly = false;

  if (absDuration.years > 0) smallestUnit = 'months';
  else if (absDuration.months > 0) smallestUnit = 'days';
  else if (absDuration.weeks > 0) smallestUnit = 'days';
  else if (absDuration.days > 0) smallestUnit = 'hours';
  else if (absDuration.hours > 0) smallestUnit = 'minutes';
  else if (absDuration.minutes > 0) smallestUnit = 'seconds';
  else {
    secondsOnly = true;
    smallestUnit = 'seconds';
  }

  const rounded = baseDuration.round({
    relativeTo: start,
    smallestUnit,
    roundingMode: 'halfExpand',
  });

  return { duration: rounded, secondsOnly, smallestUnit };
}

/**
 * Generates human-readable relative timestamps:
 * "5 minutes ago", "Yesterday at 4:12 PM", or a formatted date.
 */
export function timeAgo(timestampMs) {
  try {
    const now = Temporal.Now.zonedDateTimeISO();
    const start = Temporal.Instant.fromEpochMilliseconds(
      Math.round(timestampMs)
    ).toZonedDateTimeISO(now.timeZoneId);

    const elapsed = start.until(now, { largestUnit: 'years' });

    // If less than a minute has passed
    if (Math.abs(elapsed.total({ unit: 'minutes' })) < 1) {
      return 'Just now';
    }

    // If more than 24 hours ago, switch to formatted date
    if (Math.abs(elapsed.total({ unit: 'hours' })) >= 24) {
      const yesterday = now.subtract({ days: 1 });

      // Special case: show "Yesterday at ..."
      if (start.toPlainDate().equals(yesterday.toPlainDate())) {
        const timePart = start.toLocaleString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit', 
          hour12: true 
        });
        return `Yesterday at ${timePart}`;
      }

      return start.toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    }

    // Otherwise use RelativeTimeFormat ("X minutes ago")
    const relativeFormatter = new Intl.RelativeTimeFormat('en-US', { numeric: 'always' });
    const totalHours = Math.floor(Math.abs(elapsed.total({ unit: 'hours' })));
    const totalMinutes = Math.floor(Math.abs(elapsed.total({ unit: 'minutes' })));

    if (totalHours >= 1) {
      return relativeFormatter.format(-totalHours, 'hour');
    }

    return relativeFormatter.format(-totalMinutes, 'minute');
  } catch (e) {
    console.error('TimeAgo Error:', e);
    return 'Unknown time';
  }
}
