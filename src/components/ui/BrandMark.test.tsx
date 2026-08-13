import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrandMark } from "@/components/ui/BrandMark";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";

describe("BrandMark", () => {
  it("exposes an AS label", () => {
    render(<BrandMark />);
    expect(screen.getByLabelText("AS")).toBeInTheDocument();
  });
});

describe("brand icons", () => {
  it("renders github and linkedin as decorative svgs", () => {
    const { container } = render(
      <>
        <GithubIcon />
        <LinkedinIcon />
      </>
    );
    const svgs = container.querySelectorAll("svg");
    expect(svgs).toHaveLength(2);
    svgs.forEach((svg) => expect(svg).toHaveAttribute("aria-hidden", "true"));
  });
});
