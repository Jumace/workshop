import { ImageResponse } from "next/og";

export const ogImageSize = {
  width: 1200,
  height: 630,
};

type OgImageOptions = {
  title: string;
  description?: string;
  eyebrow?: string;
  siteName?: string;
};

function splitTitle(title: string) {
  const maxCharsPerLine = title.length > 72 ? 24 : title.length > 48 ? 28 : 34;
  const maxLines = 4;
  const words = title.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const nextLine = currentLine ? `${currentLine} ${word}` : word;

    if (nextLine.length <= maxCharsPerLine) {
      currentLine = nextLine;
      continue;
    }

    if (currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      lines.push(word);
    }

    if (lines.length === maxLines) {
      break;
    }
  }

  if (currentLine && lines.length < maxLines) {
    lines.push(currentLine);
  }

  if (lines.length === maxLines && words.join(" ").length > lines.join(" ").length) {
    lines[maxLines - 1] = `${lines[maxLines - 1].replace(/[.,:;!?-]+$/, "")}...`;
  }

  return lines;
}

function Spark({ size = 118 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <g stroke="#92c7a3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15.5 15.3 C15.2 11.3 14.8 7.1 14.2 2.5" strokeWidth="2.1" />
        <path d="M16.4 15.2 C18.7 11.9 21.4 8.8 24.6 5.7" strokeWidth="2" />
        <path d="M16.8 16 C20.8 15.5 25 14.8 29.5 13.8" strokeWidth="2.1" />
        <path d="M16.4 16.8 C18 20.8 19.4 24.8 20.5 29.5" strokeWidth="2.1" />
        <path d="M15.5 16.9 C12.9 20.2 10 23.6 6.4 27" strokeWidth="2" />
        <path d="M15.1 16.2 C11.1 16.6 7 16.8 2.7 16.7" strokeWidth="2.1" />
        <path d="M15.2 15.6 C11.8 13.6 8.5 11.2 5.2 8.5" strokeWidth="2" />
        <path d="M16 15.2 C16.8 12.6 17.7 10.2 18.8 7.8" strokeWidth="1.35" />
        <path d="M16.7 15.6 C19.4 13.9 21.6 12.7 23.7 11.8" strokeWidth="1.3" />
        <path d="M16.8 16.4 C19.2 17.3 21.7 18.3 24.2 19.8" strokeWidth="1.3" />
        <path d="M16 16.9 C15.4 19.4 14.7 21.8 13.7 24.2" strokeWidth="1.3" />
        <path d="M15.2 16.6 C12.8 18.2 10.5 19.7 8.2 20.8" strokeWidth="1.3" />
        <path d="M15.3 15.6 C13.1 13.3 11.5 11.2 10.1 9" strokeWidth="1.25" opacity=".78" />
        <path
          d="M13.8 15.8 C14.5 14.3 16.5 13.8 18 14.8 C18.2 16.5 16.9 18 15.2 18 C13.9 17.8 13.3 16.8 13.8 15.8Z"
          strokeWidth="1.45"
        />
        <path d="M14.2 14.8 C15.2 15.6 16.5 16.5 17.8 17" strokeWidth="1" />
        <path d="M14.3 17.3 C15.4 16.4 16.5 15.4 17.6 14.7" strokeWidth="1" />
      </g>
    </svg>
  );
}

export function createOgImage({
  title,
  description,
  eyebrow,
  siteName = "cebulla.dev",
}: OgImageOptions) {
  const titleLines = splitTitle(title);
  const titleSize = titleLines.length >= 4 ? 70 : titleLines.length === 3 ? 78 : 92;

  return new ImageResponse(
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        color: "#e9e1cf",
        background:
          "radial-gradient(circle at 78% 18%, rgba(146,199,163,0.18) 0, transparent 24%), radial-gradient(circle at 14% 86%, rgba(227,218,198,0.08) 0, transparent 30%), repeating-linear-gradient(90deg, rgba(255,255,255,0.022) 0 1px, transparent 1px 7px), linear-gradient(135deg, #10140f 0%, #080c0a 58%, #050807 100%)",
        fontFamily: "Noto Serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 22% 24%, rgba(255,255,255,0.035) 0 1px, transparent 1.7px), radial-gradient(circle at 64% 58%, rgba(255,255,255,0.028) 0 1px, transparent 1.6px)",
          backgroundSize: "23px 29px, 31px 37px",
          opacity: 0.72,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 86,
          top: 70,
          display: "flex",
          color: "#92c7a3",
          opacity: 0.92,
        }}
      >
        <Spark />
      </div>
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "76px 88px 64px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#92c7a3",
            fontFamily: "monospace",
            fontSize: 25,
            fontWeight: 700,
            letterSpacing: "0.13em",
            textTransform: "uppercase",
          }}
        >
          {eyebrow ? <div style={{ width: 4, height: 24, background: "#92c7a3" }} /> : null}
          <span>{eyebrow ?? "Following the spark."}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 900 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#f0eadc",
              fontSize: titleSize,
              fontWeight: 600,
              letterSpacing: "-0.055em",
              lineHeight: 0.93,
            }}
          >
            {titleLines.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
          {description ? (
            <div
              style={{
                maxWidth: 800,
                color: "rgba(233,225,207,0.76)",
                fontFamily: "Arial, sans-serif",
                fontSize: 31,
                lineHeight: 1.34,
              }}
            >
              {description}
            </div>
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(233,225,207,0.18)",
            paddingTop: 24,
            color: "rgba(233,225,207,0.72)",
            fontFamily: "monospace",
            fontSize: 24,
          }}
        >
          <span>{siteName}</span>
          <span style={{ color: "#92c7a3" }}>Notes · Reflections · Experiments</span>
        </div>
      </div>
    </div>,
    ogImageSize,
  );
}
