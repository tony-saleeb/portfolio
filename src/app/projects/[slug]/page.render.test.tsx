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

  it("shows a preview placeholder when a project has no image", async () => {
    const ui = await ProjectPage({
      params: Promise.resolve({ slug: "real-time-quiz-platform" }),
    });
    render(ui);
    expect(screen.getByText("Preview coming soon")).toBeInTheDocument();
  });
});
