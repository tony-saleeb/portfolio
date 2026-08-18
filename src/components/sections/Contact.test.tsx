import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Contact } from "@/components/sections/Contact";

describe("Contact", () => {
  it("anchors the contact section and exposes direct links", () => {
    render(<Contact />);
    expect(document.getElementById("contact")).toBeTruthy();
    expect(screen.getByRole("link", { name: /Start a conversation/i })).toHaveAttribute(
      "href",
      "mailto:tonysaleeb23@gmail.com"
    );
    expect(screen.getByText("tonysaleeb23@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("github.com/tony-saleeb")).toBeInTheDocument();
    expect(screen.getByText(/Cairo/)).toBeInTheDocument();
    expect(screen.getByText(/Available for roles/)).toBeInTheDocument();
  });

  it("has no obvious accessibility violations", async () => {
    const { container } = render(<Contact />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
