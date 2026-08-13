import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectGallery } from "@/components/sections/ProjectGallery";

const images = ["/techtips/1.png", "/techtips/2.png", "/techtips/3.png"];

describe("ProjectGallery", () => {
  it("renders labeled screenshots and arrow controls", () => {
    render(<ProjectGallery title="TechTips" images={images} />);
    expect(screen.getByRole("heading", { name: "Gallery" })).toBeInTheDocument();
    expect(screen.getByAltText("TechTips screenshot 1")).toBeInTheDocument();
    expect(screen.getByAltText("TechTips screenshot 3")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Previous screenshot" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next screenshot" })).toBeInTheDocument();
  });

  it("scrolls the strip when next is enabled", async () => {
    const user = userEvent.setup();
    render(<ProjectGallery title="TechTips" images={images} />);

    const scroller = screen.getByAltText("TechTips screenshot 1").closest(".hide-scrollbar");
    expect(scroller).toBeTruthy();
    Object.defineProperty(scroller, "scrollWidth", { configurable: true, value: 1200 });
    Object.defineProperty(scroller, "clientWidth", { configurable: true, value: 400 });
    scroller?.dispatchEvent(new Event("scroll"));

    const next = screen.getByRole("button", { name: "Next screenshot" });
    await user.click(next);
    expect(HTMLElement.prototype.scrollBy).toHaveBeenCalled();
  });
});
