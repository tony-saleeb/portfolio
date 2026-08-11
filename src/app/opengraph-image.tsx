import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#06080D",
          color: "#E9EDF5",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Accent bloom, mirroring the hero spotlight */}
        <div
          style={{
            position: "absolute",
            top: -260,
            left: 220,
            width: 760,
            height: 520,
            background:
              "radial-gradient(ellipse at center, rgba(59,157,255,0.35), rgba(6,8,13,0) 70%)",
            display: "flex",
          }}
        />

        <div
          style={{
            fontSize: 24,
            color: "#3B9DFF",
            fontWeight: 600,
            letterSpacing: 4,
            fontFamily: "monospace",
            borderTop: "2px solid rgba(233,237,245,0.25)",
            paddingTop: 24,
            display: "flex",
          }}
        >
          ANTONY SALEEB
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 66,
            fontWeight: 500,
            marginTop: 28,
            lineHeight: 1.1,
          }}
        >
          <div>Full-Stack &amp; Applied-AI</div>
          <div style={{ color: "#22D3EE", display: "flex" }}>Engineer</div>
        </div>

        <div
          style={{
            fontSize: 23,
            color: "rgba(233,237,245,0.55)",
            marginTop: 34,
            fontFamily: "monospace",
            display: "flex",
          }}
        >
          Real-time systems · Orchestrated AI · Mobile
        </div>
      </div>
    ),
    { ...size }
  );
}
