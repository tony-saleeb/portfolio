import { Hero } from "@/components/sections/Hero";
import { DeepFractFeature } from "@/components/sections/DeepFractFeature";
import { Projects } from "@/components/sections/Projects";
import { Showcase } from "@/components/sections/Showcase";
import { Background } from "@/components/sections/Background";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { ScrollSkew } from "@/components/motion/ScrollSkew";

export default function Home() {
  return (
    <>
      <Hero />
      <DeepFractFeature />
      {/*
        Velocity skew is scoped to these sections deliberately. The hero has its
        own layered parallax, and the DeepFract section pins a sticky panel —
        wrapping either in a transform would fight choreography that already
        works.
      */}
      <ScrollSkew>
        <Projects />
        <Showcase
          slug="techtips"
          eyebrow="Fig. 02 — In the app"
          title="TechTips — OS shortcuts, organised"
          variant="cascade"
        />
        <Showcase
          slug="bt2"
          eyebrow="Fig. 03 — In the app"
          title="BT2 — numerical methods, visualised"
          variant="filmstrip"
        />
        <Background />
        <Skills />
        <Contact />
      </ScrollSkew>
    </>
  );
}
