import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Footer } from "@/components/layout/Footer";

describe("Footer", () => {
  it("credits Antony Saleeb and links socials", () => {
    render(<Footer />);
    expect(screen.getByText(/Antony Saleeb/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/tony-saleeb"
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://linkedin.com/in/antony-saleeb-2588a625a"
    );
    expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute(
      "href",
      "mailto:tonysaleeb23@gmail.com"
    );
  });

  it("has no obvious accessibility violations", async () => {
    const { container } = render(<Footer />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
