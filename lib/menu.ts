import type { MenuItem } from "./types";

// Client-safe helpers only. The data fetch (which uses the secret) lives in
// lib/fetch-menu.ts and is marked "server-only" so it never reaches the browser.

export function getCategories(items: MenuItem[]): string[] {
  return ["All", ...Array.from(new Set(items.map((i) => i.category)))];
}
