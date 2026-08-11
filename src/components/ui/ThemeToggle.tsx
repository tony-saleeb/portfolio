"use client";
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";

/**
 * Cycles system → light → dark → system so the site can track the device
 * preference by default, while still letting the visitor override it.
 */
export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const mounted = useIsMounted();

  if (!mounted) {
    return <div className="h-[18px] w-[18px]" aria-hidden="true" />;
  }

  const mode = theme ?? "system";
  const next =
    mode === "system" ? "light" : mode === "light" ? "dark" : "system";

  const label =
    mode === "system"
      ? "Theme: system. Switch to light"
      : mode === "light"
        ? "Theme: light. Switch to dark"
        : "Theme: dark. Switch to system";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      className="flex items-center justify-center text-foreground/60 transition-colors hover:text-accent"
      aria-label={label}
      title={label}
    >
      {mode === "system" ? (
        <Monitor size={18} />
      ) : resolvedTheme === "dark" ? (
        <Moon size={18} />
      ) : (
        <Sun size={18} />
      )}
    </button>
  );
}
