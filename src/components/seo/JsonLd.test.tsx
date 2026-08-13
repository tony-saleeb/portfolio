import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { JsonLd } from "@/components/seo/JsonLd";
import { DEFAULT_SITE_URL, SITE_NAME } from "@/lib/site";

describe("JsonLd", () => {
  it("emits Person and WebSite schema for the live origin", () => {
    const { container } = render(<JsonLd />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeTruthy();
    const data = JSON.parse(script?.textContent ?? "{}");
    const types = data["@graph"].map((node: { "@type": string }) => node["@type"]);
    expect(types).toEqual(expect.arrayContaining(["WebSite", "Person", "ProfilePage"]));
    expect(data["@graph"][1].name).toBe(SITE_NAME);
    expect(data["@graph"][0].url).toBe(DEFAULT_SITE_URL);
  });
});
