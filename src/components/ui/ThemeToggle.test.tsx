import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const setTheme = vi.fn();

vi.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "system",
    resolvedTheme: "dark",
    setTheme,
  }),
}));

describe("ThemeToggle", () => {
  it("cycles from system to light", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const button = screen.getByRole("button", { name: /Theme: system/i });
    await user.click(button);
    expect(setTheme).toHaveBeenCalledWith("light");
  });
});
