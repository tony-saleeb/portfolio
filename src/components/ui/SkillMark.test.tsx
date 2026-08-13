import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { skillGroups } from "@/components/sections/Skills";
import { SkillMark, SKILL_MARK_NAMES } from "@/components/ui/SkillMark";

describe("SkillMark", () => {
  it("covers every stack skill", () => {
    const skills = skillGroups.flatMap((group) => group.skills);
    expect(skills.length).toBeGreaterThan(0);
    for (const skill of skills) {
      expect(SKILL_MARK_NAMES).toContain(skill);
    }
  });

  it("renders a decorative svg for a known skill", () => {
    const { container } = render(<SkillMark name="Next.js" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeTruthy();
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg?.querySelector("path")).toBeTruthy();
  });

  it("renders nothing for an unknown skill", () => {
    const { container } = render(<SkillMark name="NotASkill" />);
    expect(container.querySelector("svg")).toBeNull();
  });
});
