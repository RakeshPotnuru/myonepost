import { formatDistanceToNow } from "date-fns";

export function getRelativeTime(date: Date) {
  const distance = formatDistanceToNow(new Date(date), {
    includeSeconds: true,
  });

  return distance
    .replace("about ", "")
    .replace("less than ", "")
    .replace(" minutes", "m")
    .replace("a minute", "1m")
    .replace(" minute", "m")
    .replace(" hours", "h")
    .replace(" hour", "h")
    .replace(" days", "d")
    .replace(" day", "d")
    .replace(" weeks", "w")
    .replace(" week", "w")
    .replace(" months", "mo")
    .replace(" month", "mo")
    .replace(" years", "y")
    .replace(" year", "y")
    .replace(" seconds", "s")
    .replace(" second", "s");
}
