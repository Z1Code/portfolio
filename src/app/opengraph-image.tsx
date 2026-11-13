import { ImageResponse } from "next/og";

export const alt = "Juan Fernandez — AI Pipeline Engineer in Santiago, Chile";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(circle at 85% 15%, #0c4a6e 0%, #020617 55%, #000 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 6, color: "#38bdf8", textTransform: "uppercase" }}>
          7uanf.com
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 700, lineHeight: 1.05 }}>Juan Fernandez</div>
          <div style={{ display: "flex", fontSize: 48, marginTop: 20, color: "rgba(255,255,255,0.85)" }}>
            AI Pipeline Engineer · Santiago, Chile
          </div>
          <div style={{ display: "flex", fontSize: 30, marginTop: 28, color: "rgba(255,255,255,0.55)" }}>
            Production AI agents · Multi-agent systems · LLM pipelines · MCP
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "rgba(255,255,255,0.5)" }}>
          @7uanF · github.com/Z1Code · linkedin.com/in/juan-fernandez7
        </div>
      </div>
    ),
    size,
  );
}
