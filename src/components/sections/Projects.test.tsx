import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Projects } from "@/components/sections/Projects";
import { projectsData } from "@/data/projects";

describe("Projects", () => {
  it("lists every project except the DeepFract flagship", () => {
    render(<Projects />);
    const rest = projectsData.filter((p) => p.slug !== "deepfract");
    expect(screen.getByRole("heading", { name: "Also built" })).toBeInTheDocument();
    for (const project of rest) {
      expect(screen.getByRole("heading", { name: project.title })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: new RegExp(project.title) })).toHaveAttribute(
        "href",
        `/projects/${project.slug}`
      );
    }
    expect(screen.queryByRole("heading", { name: "DeepFract" })).not.toBeInTheDocument();
  });
});
