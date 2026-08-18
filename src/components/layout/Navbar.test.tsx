import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Navbar } from "@/components/layout/Navbar";

const navigation = vi.hoisted(() => ({ pathname: "/" }));

vi.mock("next/navigation", () => ({
  usePathname: () => navigation.pathname,
}));

vi.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "dark",
    resolvedTheme: "dark",
    setTheme: vi.fn(),
  }),
}));

describe("Navbar", () => {
  beforeEach(() => {
    navigation.pathname = "/";
    vi.clearAllMocks();
  });

  it("points section links at the homepage hashes", () => {
    render(<Navbar />);
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute("href", "/#work");
    expect(screen.getByRole("link", { name: "Background" })).toHaveAttribute(
      "href",
      "/#background"
    );
    expect(screen.getByRole("link", { name: "Stack" })).toHaveAttribute("href", "/#stack");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/#contact");
  });

  it("links the brand mark home", () => {
    render(<Navbar />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/#home");
  });

  it("opens the résumé in a new tab", () => {
    render(<Navbar />);
    const resume = screen.getByRole("link", { name: "Résumé" });
    expect(resume).toHaveAttribute("target", "_blank");
    expect(resume).toHaveAttribute("href", "/Antony_Saleeb_Fakhry_CV.pdf");
  });

  it("scrolls to the section when already on the home page", async () => {
    const user = userEvent.setup();
    const work = document.createElement("section");
    work.id = "work";
    document.body.appendChild(work);
    const scroll = vi.spyOn(work, "scrollIntoView");

    render(<Navbar />);
    await user.click(screen.getByRole("link", { name: "Work" }));

    expect(scroll).toHaveBeenCalled();
    work.remove();
  });

  it("does not intercept hash clicks on a project page", async () => {
    navigation.pathname = "/projects/techtips";
    const user = userEvent.setup();
    vi.mocked(HTMLElement.prototype.scrollIntoView).mockClear();

    render(<Navbar />);
    await user.click(screen.getByRole("link", { name: "Work" }));

    expect(HTMLElement.prototype.scrollIntoView).not.toHaveBeenCalled();
  });

  it("toggles the mobile menu", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(document.getElementById("mobile-menu")).toBeTruthy();

    await user.keyboard("{Escape}");
    expect(document.getElementById("mobile-menu")).toBeNull();
  });
});
