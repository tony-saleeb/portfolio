import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(),
}));

const { default: ProjectPage } = await import("@/app/projects/[slug]/page");

describe("ProjectPage render", () => {
  it("renders TechTips case-study content and gallery", async () => {
    const ui = await ProjectPage({ params: Promise.resolve({ slug: "techtips" }) });
    render(ui);

    expect(screen.getByRole("heading", { level: 1, name: "TechTips" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Back to work/i })).toHaveAttribute("href", "/#work");
    expect(screen.getByRole("link", { name: /Source/i })).toHaveAttribute(
      "href",
      "https://github.com/tony-saleeb/TechTips"
    );
    expect(screen.getByRole("heading", { name: "Gallery" })).toBeInTheDocument();
    expect(screen.getByText("State Management: Provider")).toBeInTheDocument();
  });

  it("renders Qlash with a live demo and screenshot gallery", async () => {
    const ui = await ProjectPage({
      params: Promise.resolve({ slug: "qlash" }),
    });
    render(ui);
    expect(screen.getByRole("heading", { level: 1, name: "Qlash" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Live demo/i })).toHaveAttribute(
      "href",
      "https://qlash.vercel.app/"
    );
    expect(screen.getByRole("heading", { name: "Gallery" })).toBeInTheDocument();
    expect(screen.queryByText("Preview coming soon")).not.toBeInTheDocument();
  });
});
