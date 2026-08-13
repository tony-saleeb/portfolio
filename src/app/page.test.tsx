import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { DeepFractFeature } from "@/components/sections/DeepFractFeature";
import Home from "@/app/page";

describe("DeepFractFeature", () => {
  it("is the work section and links to the write-up", () => {
    render(<DeepFractFeature />);
    expect(document.getElementById("work")).toBeTruthy();
    expect(screen.getByRole("link", { name: /Full write-up/i })).toHaveAttribute(
      "href",
      "/projects/deepfract"
    );
    expect(screen.getByText(/orchestrates several specialized networks/i)).toBeInTheDocument();
  });
});

describe("Home page", () => {
  it("composes the flagship sections", () => {
    render(<Home />);
    expect(document.getElementById("home")).toBeTruthy();
    expect(document.getElementById("work")).toBeTruthy();
    expect(document.getElementById("background")).toBeTruthy();
    expect(document.getElementById("stack")).toBeTruthy();
    expect(document.getElementById("contact")).toBeTruthy();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Antony\s*Saleeb/);
  });
});
