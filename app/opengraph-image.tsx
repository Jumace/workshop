import { ImageResponse } from "next/og";

export const alt = "Julian Cebulla";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        padding: 72,
        color: "#edf3ff",
        background: "linear-gradient(135deg, #05070d 0%, #0c1322 54%, #11142c 100%)",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          border: "1px solid rgba(148, 163, 184, 0.28)",
          borderRadius: 36,
          padding: 56,
          background: "rgba(255, 255, 255, 0.04)",
        }}
      >
        <div style={{ display: "flex", gap: 18, color: "#37d5ff", fontSize: 28 }}>
          <span>Blog</span>
          <span>Lab</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 92, fontWeight: 800, letterSpacing: "-0.07em" }}>
            Julian Cebulla
          </div>
          <div style={{ maxWidth: 760, color: "#9aa8bd", fontSize: 34 }}>
            Personal writing, technical notes, and experiments.
          </div>
        </div>
        <div style={{ color: "#9b7cff", fontSize: 30 }}>@Jumace</div>
      </div>
    </div>,
    size,
  );
}
