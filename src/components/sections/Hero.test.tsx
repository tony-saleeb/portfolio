import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/sections/Hero";

describe("Hero", () => {
  it("introduces Antony Saleeb and links into the page", () => {
    render(<Hero />);
    expect(document.getElementById("home")).toBeTruthy();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Antony\s*Saleeb/);
    expect(screen.getByRole("link", { name: /See the work/i })).toHaveAttribute("href", "#work");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "#contact");
    expect(screen.getByRole("link", { name: "Scroll to work" })).toHaveAttribute("href", "#work");
  });
});
