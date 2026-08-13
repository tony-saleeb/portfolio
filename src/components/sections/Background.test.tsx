import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Background } from "@/components/sections/Background";
import { Skills } from "@/components/sections/Skills";

describe("Background", () => {
  it("renders the background section and timeline", () => {
    render(<Background />);
    expect(document.getElementById("background")).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Background" })).toBeInTheDocument();
    expect(screen.getByText("B.Sc. Computer Science")).toBeInTheDocument();
    expect(screen.getByText("Freelance Full-Stack Developer")).toBeInTheDocument();
  });
});

describe("Skills", () => {
  it("renders the stack section with core skills", () => {
    render(<Skills />);
    expect(document.getElementById("stack")).toBeTruthy();
    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getAllByText("Next.js").length).toBeGreaterThan(0);
    expect(screen.getAllByText("PyTorch").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Flutter").length).toBeGreaterThan(0);
  });
});
