"use client";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useScrollTarget } from "@/hooks/useScrollTarget";
import { useScrollMotion } from "@/hooks/useScrollMotion";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { DeepFractLogoAssemble } from "@/components/sections/DeepFractLogoAssemble";

const STAGES = [
  { id: "input", label: "Input" },
  { id: "attention", label: "Attention" },
  { id: "residual", label: "Residual" },
  { id: "quadtree", label: "Quad-tree" },
  { id: "encoded", label: "Encoded" },
] as const;

/**
 * Scroll-pinned DeepFract beat:
 * settle on a laptop → lid opens → encode plays on the screen.
 * Same sequence on mobile and desktop (FitScale keeps the chassis in view).
 * No camera dive / overzoom. No invented ratios.
 */
export function DeepFractLaptop() {
  const reduced = useReducedMotion();
  if (reduced) return <StaticBeat />;
  return <PinnedBeat />;
}

/* ========================================================================== */
/* Pinned beat — desktop + mobile                                             */
/* ========================================================================== */

function PinnedBeat() {
  const trackRef = useRef<HTMLDivElement>(null);
  const mobile = useIsMobile();
  const { scrollYProgress } = useScrollTarget(trackRef, ["start start", "end end"]);
  const p = useScrollMotion(scrollYProgress);
  const [stage, setStage] = useState(0);

  useMotionValueEvent(p, "change", (v) => {
    const t = Math.min(1, Math.max(0, (v - 0.58) / 0.36));
    setStage(Math.min(STAGES.length - 1, Math.floor(t * STAGES.length)));
  });

  const titleY = useTransform(p, [0, 0.08], [14, 0]);
  const titleOpacity = useTransform(p, [0, 0.06], [0, 1]);

  const laptopY = useTransform(p, [0, 0.1], mobile ? [18, 0] : [36, 0]);

  // Desktop: closed → open, passing edge-on. Mobile stays on the screen side of
  // -90° so WebKit doesn't flicker the lid at the silhouette frame, and the
  // swing is spread over more scroll so touch momentum doesn't stutter it.
  const lid = useTransform(
    p,
    mobile ? [0.04, 0.3] : [0.06, 0.18],
    mobile ? [-58, 0] : [-102, -12]
  );
  // Screen glass is always on; content fades in as the lid clears the base
  const screenOn = useTransform(p, [0.07, 0.12], [0, 1]);
  // Long assemble + hold so the shard fly-in can be savored
  const logoOpacity = useTransform(p, [0.1, 0.16, 0.52, 0.58], [0, 1, 1, 0]);
  const logoAssemble = useTransform(p, [0.1, 0.48], [0, 1]);
  const encodeOpacity = useTransform(p, [0.54, 0.6], [0, 1]);
  const hudOpacity = useTransform(p, [0.56, 0.64], [0, 1]);
  const markX = useTransform(p, [0, 1], ["-8%", "10%"]);

  return (
    <div ref={trackRef} className="relative h-[280vh]">
      <div className="sticky top-0 flex h-svh flex-col overflow-x-clip bg-background px-5 pt-[max(5.25rem,calc(env(safe-area-inset-top)+4.25rem))] pb-4">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 light-wash opacity-35" />

        {/* Watermark — inside sticky (opaque bg would hide a section-level GhostMark) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[max(5.5rem,calc(env(safe-area-inset-top)+4.5rem))] z-0 overflow-hidden"
        >
          <motion.span
            style={{ x: markX }}
            className="block whitespace-nowrap text-[20vw] font-medium leading-none tracking-tighter text-foreground/10 md:text-[18vw] md:text-foreground/8.5"
          >
            DEEPFRACT
          </motion.span>
        </div>

        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="relative z-1 mx-auto w-full max-w-120 shrink-0"
        >
          <p className="eyebrow mb-1">Fig. 01 — Flagship</p>
          <h2 className="text-[clamp(1.5rem,3.8vw,2.25rem)] font-medium leading-[0.95] tracking-tight">
            DeepFract
          </h2>
          <p className="mt-1 max-w-md text-sm leading-snug text-foreground/55">
            Crush a full bitmap into a tiny encode — without waiting.
          </p>
        </motion.div>

        {/* Scales the whole laptop stack so the chin/trackpad never clips */}
        <div className="relative z-1 mx-auto flex min-h-0 w-full max-w-120 flex-1 flex-col">
          <FitScale
            mode={mobile ? "width" : "transform"}
            className="flex w-full flex-col items-center gap-3 pt-3"
          >
            <motion.div
              style={{
                y: laptopY,
                transformStyle: "preserve-3d",
              }}
              className="w-full"
            >
              <Laptop
                lidAngle={lid}
                simple={mobile}
                screen={
                  <>
                    {/* Panel fill — charcoal, not page-black, or the lid reads as a hole */}
                    <div className="absolute inset-0 bg-[#1a1d24]" />
                    {/* Soft power bloom while the lid swings open */}
                    <motion.div
                      aria-hidden
                      style={{ opacity: screenOn }}
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(34,211,238,0.22),transparent_58%)]"
                    />
                    <motion.div
                      style={{ opacity: logoOpacity }}
                      className="absolute inset-0 z-10"
                    >
                      <DeepFractLogoAssemble assemble={logoAssemble} />
                    </motion.div>
                    <motion.div style={{ opacity: encodeOpacity }} className="absolute inset-0 z-10">
                      <CompressionScene progress={p} stage={stage} mapStart={0.58} mapEnd={0.94} />
                    </motion.div>
                  </>
                }
              />
            </motion.div>

            <motion.div
              style={{ opacity: hudOpacity }}
              className="w-full rounded-full border border-border-subtle bg-background/90 px-4 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.08)] md:backdrop-blur-md"
            >
              <StageList stage={stage} />
            </motion.div>
          </FitScale>
        </div>
      </div>
    </div>
  );
}

/** Shrink children uniformly when they exceed the parent height. */
function FitScale({
  children,
  className = "",
  mode = "transform",
}: {
  children: ReactNode;
  className?: string;
  /** `transform` is precise but flattens nested 3D on WebKit. `width` reflows. */
  mode?: "transform" | "width";
}) {
  const parentRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState({ scale: 1, height: 0 });

  useEffect(() => {
    const parent = parentRef.current;
    const content = contentRef.current;
    if (!parent || !content) return;

    const measure = () => {
      const available = parent.clientHeight;
      if (available <= 0) return;

      if (mode === "width") {
        const currentWidth = content.getBoundingClientRect().width;
        const currentHeight = content.scrollHeight;
        if (currentWidth <= 0 || currentHeight <= 0) return;
        const parentWidth = parent.clientWidth || currentWidth;
        const naturalHeight = currentHeight * (parentWidth / currentWidth);
        const scale = Math.min(1, available / naturalHeight);
        setFit((prev) =>
          Math.abs(prev.scale - scale) < 0.01 && Math.abs(prev.height - naturalHeight * scale) < 2
            ? prev
            : { scale, height: naturalHeight * scale }
        );
        return;
      }

      const needed = content.scrollHeight;
      if (needed <= 0) return;
      const scale = Math.min(1, available / needed);
      setFit({ scale, height: needed * scale });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(parent);
    ro.observe(content);
    return () => ro.disconnect();
  }, [mode]);

  if (mode === "width") {
    return (
      <div
        ref={parentRef}
        className="flex min-h-0 w-full flex-1 items-start justify-center"
      >
        <div
          ref={contentRef}
          className={className}
          style={{
            width: `${fit.scale * 100}%`,
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={parentRef}
      className="flex min-h-0 w-full flex-1 items-start justify-center"
    >
      <div className="w-full" style={{ height: fit.height || undefined }}>
        <div
          ref={contentRef}
          className={className}
          style={{
            transform: `scale(${fit.scale})`,
            transformOrigin: "top center",
            transformStyle: "preserve-3d",
            width: "100%",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* Reduced motion                                                             */
/* ========================================================================== */

function StaticBeat() {
  return (
    <div className="relative px-5 py-12 sm:px-6 md:px-12 md:py-16">
      <div className="mb-8">
        <p className="eyebrow mb-2">Fig. 01 — Flagship</p>
        <h2 className="text-[clamp(2rem,6vw,3.25rem)] font-medium leading-[0.95] tracking-tight">
          DeepFract
        </h2>
        <p className="mt-3 max-w-md text-sm text-foreground/55 md:text-base">
          Crush a full bitmap into a tiny encode — without waiting.
        </p>
      </div>
      <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-border-subtle bg-background-elevated">
          <div className="relative aspect-4/3">
            <SourcePhoto />
          </div>
          <div className="border-t border-border-subtle px-4 py-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
              Full bitmap
            </p>
            <p className="mt-1 text-sm text-foreground/55">Raw pixels · heavy · slow to move</p>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-accent/40 bg-background-elevated">
          <div className="relative flex aspect-4/3 items-center justify-center bg-[#05070c] p-8">
            <EncodedResult />
          </div>
          <div className="border-t border-border-subtle px-4 py-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
              Encoded output
            </p>
            <p className="mt-1 text-sm text-foreground/55">
              Same image · tiny payload · short encode time
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* MacBook Pro–style chassis                                                  */
/* ========================================================================== */

function Laptop({
  lidAngle,
  screen,
  simple = false,
}: {
  lidAngle: MotionValue<number>;
  screen: ReactNode;
  simple?: boolean;
}) {
  return (
    <div
      className="relative mx-auto"
      style={{
        perspective: simple ? "900px" : "2000px",
        perspectiveOrigin: "50% 100%",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Lid */}
      <div style={{ transformStyle: "preserve-3d" }}>
        <motion.div
          style={{
            rotateX: lidAngle,
            transformOrigin: "center bottom",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transformPerspective: simple ? 900 : 2000,
          }}
          className="relative rounded-[14px] bg-[#c8c8cc]"
        >
          {/* Lid back — desktop only. On mobile we never close past edge-on,
              so the back face only causes z-fighting flicker. */}
          {simple ? null : (
            <div
              aria-hidden
              className="absolute inset-0 rounded-[14px] border border-[#9a9a9e]"
              style={{
                transform: "rotateX(180deg) translateZ(2px)",
                backfaceVisibility: "hidden",
                background:
                  "linear-gradient(165deg, #e4e4e8 0%, #c8c8cc 32%, #b0b0b4 68%, #9a9a9e 100%)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55)",
              }}
            >
              <div
                className="absolute inset-[12%] rounded-xs"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(255,255,255,0.28), rgba(180,180,184,0.4) 65%)",
                }}
              />
            </div>
          )}

          {/* Display face — aluminum lip, image fills the panel */}
          <div
            style={{
              transform: "translateZ(2px)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
            className="relative overflow-hidden rounded-[12px_12px_6px_6px] border border-[#5c5c62] bg-[#3a3a40] p-[0.5%]"
          >
            <div className="relative aspect-[16/10.2] overflow-hidden rounded-sm bg-[#1a1d24] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
              {screen}

              {/* Glass sheen — under the notch */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-5 bg-[linear-gradient(120deg,rgba(255,255,255,0.14)_0%,transparent_32%,transparent_68%,rgba(255,255,255,0.06)_100%)]"
              />

              {/* Notch sits above all screen UI */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-0 z-50 h-[7%] w-[17%] max-w-28 -translate-x-1/2 rounded-b-[10px] bg-[#0e1014] shadow-[0_1px_0_rgba(255,255,255,0.08)]"
              >
                <span className="absolute left-1/2 top-[36%] h-[30%] w-[11%] -translate-x-1/2 rounded-full bg-[#2a2a2e] ring-1 ring-[#3a3a3e]" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Base — silver deck, Touch Bar, chiclet keys, chin + trackpad */}
      <div className="relative z-1" style={{ transform: "translateZ(0)" }}>
        {/* Hinge */}
        <div className="relative z-2 mx-auto h-1.5 w-[96%] -translate-y-px rounded-full bg-[linear-gradient(180deg,#c8c8cc,#8e8e93_45%,#5c5c62)] shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]" />

        <div className="relative -mt-0.5 overflow-hidden rounded-[8px_8px_16px_16px] border border-[#9a9a9e]/70 bg-[linear-gradient(180deg,#d4d4d8_0%,#b8b8bc_22%,#9c9ca0_70%,#7e7e82_100%)] px-[3.2%] pb-0 pt-[1.6%]">
          <SpeakerGrill className="absolute left-[0.9%] top-[18%] hidden h-[38%] w-[1.2%] sm:block" />
          <SpeakerGrill className="absolute right-[0.9%] top-[18%] hidden h-[38%] w-[1.2%] sm:block" />

          <TouchBar />
          {simple ? <SimpleKeyboard /> : <MacKeyboard />}

          {/* Chin + large glass trackpad */}
          <div className="relative mt-[2%] flex flex-col items-center pb-[3.2%] pt-[1.2%]">
            <div className="relative aspect-[1.6/1] w-[50%] overflow-hidden rounded-md border border-[#6a6a6e]/55 bg-[linear-gradient(180deg,#cfcfd3,#b4b4b8)] shadow-[inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-1px_1px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.18)]">
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.35)_0%,transparent_38%,transparent_68%,rgba(0,0,0,0.08)_100%)]"
              />
            </div>
          </div>

          {/* Integrated front chin edge */}
          <div
            aria-hidden
            className="h-1.25 w-full bg-[linear-gradient(180deg,#8a8a8e,#5a5a5e)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
          />
        </div>
      </div>
    </div>
  );
}

function SpeakerGrill({ className }: { className?: string }) {
  return (
    <div aria-hidden className={`flex flex-col justify-between opacity-35 ${className ?? ""}`}>
      {Array.from({ length: 14 }).map((_, i) => (
        <span key={i} className="mx-auto h-[4%] w-[70%] rounded-full bg-[#4a4a4e]" />
      ))}
    </div>
  );
}

/** OLED Touch Bar — esc · icons · deepfract · system · Touch ID */
function TouchBar() {
  return (
    <div
      aria-hidden
      className="mb-[2%] flex h-3 items-stretch gap-0.75 rounded-[3px] bg-black p-0.5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] sm:h-3.5 md:h-4"
    >
      <div className="flex items-center rounded-xs bg-[#2c2c30] px-1.5 sm:px-2">
        <span className="text-[5px] uppercase tracking-wide text-white/70 sm:text-[6px]">esc</span>
      </div>
      <div className="flex items-center gap-0.75 px-0.5">
        <span className="size-1.25 rounded-[1px] bg-[#ff453a] sm:size-1.5" />
        <span className="size-1.25 rounded-full border border-white/50 sm:size-1.5" />
        <span className="size-1.25 rounded-[1px] border border-white/40 sm:size-1.5" />
      </div>
      <div className="flex min-w-0 flex-1 items-center justify-center">
        <span className="bg-[linear-gradient(90deg,#64d2ff,#70f0c0,#ffd60a,#ff9f0a,#bf5af2)] bg-clip-text text-[6px] font-semibold lowercase tracking-[0.2em] text-transparent sm:text-[7px] md:text-[8px]">
          deepfract
        </span>
      </div>
      <div className="hidden items-center gap-1 sm:flex">
        <span className="h-0.5 w-4 overflow-hidden rounded-full bg-white/20">
          <span className="block h-full w-1/2 bg-white/80" />
        </span>
        <span className="h-0.5 w-4 overflow-hidden rounded-full bg-white/20">
          <span className="block h-full w-2/3 bg-white/80" />
        </span>
        <span className="size-1.5 rounded-full bg-[conic-gradient(from_200deg,#64d2ff,#ff9f0a,#ffd60a,#70f0c0,#bf5af2,#64d2ff)]" />
      </div>
      <div className="aspect-square h-full rounded-xs bg-[#1c1c1e] ring-1 ring-white/10">
        <span className="m-[22%] block size-[56%] rounded-[1.5px] bg-[radial-gradient(circle_at_35%_30%,#5a5a5e,#18181a)] ring-1 ring-white/15" />
      </div>
    </div>
  );
}

type KeySpec = { u: number; label?: string };

const KEY_ROWS: KeySpec[][] = [
  [
    { u: 1, label: "`" },
    { u: 1, label: "1" },
    { u: 1, label: "2" },
    { u: 1, label: "3" },
    { u: 1, label: "4" },
    { u: 1, label: "5" },
    { u: 1, label: "6" },
    { u: 1, label: "7" },
    { u: 1, label: "8" },
    { u: 1, label: "9" },
    { u: 1, label: "0" },
    { u: 1, label: "-" },
    { u: 1, label: "=" },
    { u: 1.5, label: "delete" },
  ],
  [
    { u: 1.5, label: "tab" },
    { u: 1, label: "Q" },
    { u: 1, label: "W" },
    { u: 1, label: "E" },
    { u: 1, label: "R" },
    { u: 1, label: "T" },
    { u: 1, label: "Y" },
    { u: 1, label: "U" },
    { u: 1, label: "I" },
    { u: 1, label: "O" },
    { u: 1, label: "P" },
    { u: 1, label: "[" },
    { u: 1, label: "]" },
    { u: 1, label: "\\" },
  ],
  [
    { u: 1.75, label: "caps" },
    { u: 1, label: "A" },
    { u: 1, label: "S" },
    { u: 1, label: "D" },
    { u: 1, label: "F" },
    { u: 1, label: "G" },
    { u: 1, label: "H" },
    { u: 1, label: "J" },
    { u: 1, label: "K" },
    { u: 1, label: "L" },
    { u: 1, label: ";" },
    { u: 1, label: "'" },
    { u: 1.75, label: "return" },
  ],
  [
    { u: 2.25, label: "shift" },
    { u: 1, label: "Z" },
    { u: 1, label: "X" },
    { u: 1, label: "C" },
    { u: 1, label: "V" },
    { u: 1, label: "B" },
    { u: 1, label: "N" },
    { u: 1, label: "M" },
    { u: 1, label: "," },
    { u: 1, label: "." },
    { u: 1, label: "/" },
    { u: 2.25, label: "shift" },
  ],
  [
    { u: 1, label: "fn" },
    { u: 1, label: "control" },
    { u: 1, label: "option" },
    { u: 1.25, label: "command" },
    { u: 5, label: "" },
    { u: 1.25, label: "command" },
    { u: 1, label: "option" },
  ],
];

/** Five painted rows — same silhouette as the chiclet deck, ~70 fewer DOM nodes. */
function SimpleKeyboard() {
  return (
    <div
      aria-hidden
      className="flex w-full flex-col gap-0.5 rounded-sm bg-[linear-gradient(180deg,rgba(0,0,0,0.14),rgba(0,0,0,0.05))] p-[1%] shadow-[inset_0_1px_1px_rgba(0,0,0,0.2)]"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="w-full rounded-xs border border-black/50 bg-[linear-gradient(180deg,#3f3f43_0%,#2c2c30_52%,#1d1d21_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]"
          style={{ height: 11, opacity: 0.92 - i * 0.04 }}
        />
      ))}
    </div>
  );
}

/** Measure deck width → set a real px --key so width and height stay equal. */
function MacKeyboard() {
  const ref = useRef<HTMLDivElement>(null);
  const [keyPx, setKeyPx] = useState(18);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const gap = 2;
      const cs = getComputedStyle(el);
      const padX =
        (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0);
      const inner = Math.max(0, el.clientWidth - padX);
      // Fill the deck: number row = 14.5 units + 13 gaps
      setKeyPx(Math.max(9, (inner - 13 * gap) / 14.5));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const gap = 2;

  return (
    <div
      ref={ref}
      aria-hidden
      className="w-full rounded-sm bg-[linear-gradient(180deg,rgba(0,0,0,0.14),rgba(0,0,0,0.05))] p-[1%] shadow-[inset_0_1px_1px_rgba(0,0,0,0.2)]"
    >
      <div className="flex flex-col" style={{ gap }}>
        {KEY_ROWS.map((row, ri) => (
          <div key={ri} className="flex" style={{ gap }}>
            {row.map((key, ki) => (
              <KeyCap key={`${ri}-${ki}`} u={key.u} label={key.label} size={keyPx} />
            ))}
            {ri === 4 ? <ArrowCluster size={keyPx} gap={gap} /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function KeyCap({
  u,
  label,
  size,
}: {
  u: number;
  label?: string;
  size: number;
}) {
  const mod = Boolean(label && label.length > 1);
  const w = size * u;
  // Real chiclet corners are slight — keep them boxy
  const r = Math.min(2.75, Math.max(1.5, size * 0.09));

  return (
    <div
      className="relative flex shrink-0 items-start justify-start overflow-hidden border border-black/75 bg-[linear-gradient(180deg,#3f3f43_0%,#2c2c30_52%,#1d1d21_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_1px_1px_rgba(0,0,0,0.35)]"
      style={{
        width: w,
        height: size,
        borderRadius: r,
        padding: `${Math.max(1, size * 0.08)}px ${Math.max(1, size * 0.1)}px 0`,
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-[14%] top-[8%] h-[26%] rounded-full bg-white/12"
      />
      {label ? (
        <span
          className="relative font-sans leading-none text-white/85"
          style={{ fontSize: Math.max(4, size * (mod ? 0.22 : 0.34)) }}
        >
          {label}
        </span>
      ) : null}
    </div>
  );
}

function ArrowCluster({ size, gap }: { size: number; gap: number }) {
  const half = (size - gap) / 2;
  const r = Math.min(2.75, Math.max(1.5, size * 0.09));
  const cell = (glyph: string) => (
    <div
      className="relative flex items-center justify-center border border-black/75 bg-[linear-gradient(180deg,#3f3f43,#1d1d21)] shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]"
      style={{ width: size, height: half, borderRadius: r }}
    >
      <span className="text-[5px] leading-none text-white/75">{glyph}</span>
    </div>
  );

  return (
    <div className="flex shrink-0 flex-col" style={{ gap, width: size * 3 + gap * 2 }}>
      <div className="flex justify-center">{cell("▲")}</div>
      <div className="flex" style={{ gap }}>
        {cell("◀")}
        {cell("▼")}
        {cell("▶")}
      </div>
    </div>
  );
}

/* ========================================================================== */
/* Media                                                                      */
/* ========================================================================== */

function SourcePhoto() {
  return (
    <Image
      src="/deepfract/source.jpg"
      alt="Sample photograph being encoded"
      fill
      sizes="(max-width: 768px) 100vw, 640px"
      className="object-cover"
    />
  );
}

function EncodedResult() {
  return (
    <div className="relative w-full max-w-50">
      <div className="overflow-hidden rounded-lg border border-accent/55 bg-[#0b1018] shadow-[0_0_32px_color-mix(in_oklab,var(--accent-glow)_35%,transparent)]">
        <div className="relative aspect-video">
          <SourcePhoto />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(0,0,0,0.55))]" />
          <span className="absolute bottom-1.5 left-2 font-mono text-[8px] uppercase tracking-[0.16em] text-accent">
            .dfc · ready
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 border-t border-white/10 px-2.5 py-1.5">
          <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-foreground/50">
            encoded
          </span>
          <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-accent-glow">
            detail kept
          </span>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* On-screen encode — restrained                                              */
/* ========================================================================== */

function CompressionScene({
  progress,
  stage,
  mapStart,
  mapEnd,
}: {
  progress: MotionValue<number>;
  stage: number;
  mapStart: number;
  mapEnd: number;
}) {
  const t = useTransform(progress, [mapStart, mapEnd], [0, 1], { clamp: true });

  // Full-bleed source → modest encoded card (no dark inset margin at start)
  const inset = useTransform(t, [0, 0.35, 0.75, 1], [0, 0, 12, 14]);
  const radius = useTransform(t, [0, 0.55, 1], [0, 4, 8]);
  const border = useTransform(
    t,
    [0, 0.45, 0.55, 0.85],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0)", "rgba(255,255,255,0.18)", "rgba(59,157,255,0.55)"]
  );

  const scanX = useTransform(t, [0.05, 0.4], ["-8%", "108%"]);
  const scanOpacity = useTransform(t, [0.05, 0.12, 0.35, 0.45], [0, 1, 1, 0]);
  const attention = useTransform(t, [0.12, 0.28, 0.5], [0, 0.85, 0.15]);
  const quad = useTransform(t, [0.28, 0.48, 0.7], [0, 0.9, 0.2]);

  const metaOpacity = useTransform(t, [0.65, 0.8, 1], [0, 1, 1]);
  const sourceTag = useTransform(t, [0, 0.5, 0.65], [1, 0.7, 0]);

  const rawWidth = useTransform(t, [0, 0.35, 0.8, 1], ["88%", "65%", "22%", "14%"]);
  const encWidth = useTransform(t, [0, 0.4, 0.8, 1], ["10%", "18%", "52%", "68%"]);

  const insetPct = useTransform(inset, (v) => `${v}%`);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#05070c]">
      <motion.div
        style={{
          top: insetPct,
          right: insetPct,
          bottom: insetPct,
          left: insetPct,
          borderRadius: radius,
          borderColor: border,
        }}
        className="absolute overflow-hidden border"
      >
        <SourcePhoto />

        <motion.div
          style={{ opacity: attention }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_55%_35%,rgba(34,211,238,0.35),transparent_45%)] mix-blend-screen"
        />
        <motion.div style={{ opacity: quad }} className="pointer-events-none absolute inset-0">
          <QuadTree />
        </motion.div>
        <motion.div
          style={{ left: scanX, opacity: scanOpacity }}
          className="pointer-events-none absolute top-0 h-full w-[12%] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(34,211,238,0.45),transparent)] mix-blend-screen"
        />

        <motion.div
          style={{ opacity: sourceTag }}
          className="absolute left-2 top-[9%] rounded bg-black/55 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.14em] text-white/80"
        >
          source · full bitmap
        </motion.div>

        <motion.div
          style={{ opacity: metaOpacity }}
          className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-linear-to-t from-black/75 to-transparent px-2.5 pb-2 pt-5"
        >
          <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-accent">
            .dfc · ready
          </span>
          <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-accent-glow">
            detail kept
          </span>
        </motion.div>
      </motion.div>

      <div className="absolute inset-x-3 top-[9%] z-20 space-y-1 sm:inset-x-4">
        <div className="flex items-center gap-2">
          <span className="w-9 shrink-0 font-mono text-[8px] uppercase tracking-[0.12em] text-foreground/40">
            raw
          </span>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
            <motion.div style={{ width: rawWidth }} className="h-full rounded-full bg-foreground/30" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-9 shrink-0 font-mono text-[8px] uppercase tracking-[0.12em] text-accent">
            enc
          </span>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
            <motion.div style={{ width: encWidth }} className="h-full rounded-full bg-accent-glow" />
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-30 flex items-center justify-between gap-3 border-t border-white/10 bg-black/55 px-3 py-1.5">
        <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-foreground/55">
          {STAGES[stage]?.label ?? "Input"} · detail retained
        </p>
        <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-accent">
          encode · fast
        </span>
      </div>
    </div>
  );
}

function QuadTree() {
  return (
    <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
      <g stroke="rgba(34,211,238,0.75)" strokeWidth="0.4" fill="none">
        <rect x="3" y="3" width="94" height="94" />
        <path d="M50 3 V97 M3 50 H97" />
        <path d="M26 3 V50 M3 26 H50 M74 50 V97 M50 74 H97" />
        <rect x="58" y="8" width="24" height="24" />
        <rect x="14" y="54" width="18" height="18" />
      </g>
    </svg>
  );
}

function StageList({ stage }: { stage: number }) {
  return (
    <ol className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 font-mono text-[9px] uppercase tracking-[0.14em] sm:text-[10px]">
      {STAGES.map((s, i) => {
        const active = i === stage;
        const done = i < stage;
        return (
          <li
            key={s.id}
            className={`flex items-center gap-1.5 transition-colors duration-300 ${
              active ? "text-accent" : done ? "text-foreground/50" : "text-foreground/25"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                active
                  ? "bg-accent-glow shadow-[0_0_8px_var(--accent-glow)]"
                  : done
                    ? "bg-accent/55"
                    : "bg-border-strong"
              }`}
            />
            {s.label}
          </li>
        );
      })}
    </ol>
  );
}
