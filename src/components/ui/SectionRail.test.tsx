import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionRail } from "@/components/ui/SectionRail";

const navigation = vi.hoisted(() => ({ pathname: "/" }));

vi.mock("next/navigation", () => ({
  usePathname: () => navigation.pathname,
}));

function mountSections() {
  for (const id of ["home", "work", "background", "stack", "contact"]) {
    const el = document.createElement("section");
    el.id = id;
    document.body.appendChild(el);
  }
}

describe("SectionRail", () => {
  beforeEach(() => {
    navigation.pathname = "/";
    mountSections();
  });

  it("renders the section index on the homepage", () => {
    render(<SectionRail />);
    expect(screen.getByRole("navigation", { name: "Section index" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Work/ })).toHaveAttribute("href", "#work");
    expect(screen.getByRole("link", { name: /Contact/ })).toHaveAttribute("href", "#contact");
  });

  it("hides on project pages", () => {
    navigation.pathname = "/projects/techtips";
    const { container } = render(<SectionRail />);
    expect(container).toBeEmptyDOMElement();
  });
});
