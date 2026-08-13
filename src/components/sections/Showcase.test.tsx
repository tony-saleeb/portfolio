import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Showcase } from "@/components/sections/Showcase";

describe("Showcase", () => {
  it("renders nothing for an unknown slug", () => {
    const { container } = render(
      <Showcase slug="missing" eyebrow="Fig" title="Nope" />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders a TechTips gallery heading and case-study link", () => {
    render(
      <Showcase
        slug="techtips"
        eyebrow="Fig. 02 — In the app"
        title="TechTips — OS shortcuts, organised"
        variant="cascade"
      />
    );
    expect(screen.getByRole("heading", { name: /TechTips/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Open case study/i })).toHaveAttribute(
      "href",
      "/projects/techtips"
    );
  });
});
