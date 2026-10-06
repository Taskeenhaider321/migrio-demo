import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social card. Route-level cards can override this file. */
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
          padding: "72px",
          background: "linear-gradient(135deg, #2F2A80 0%, #4E46B4 60%, #3A3396 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              width: 56,
              height: 56,
              borderRadius: 999,
              background: "#FF532F",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 44,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: -1,
            }}
          >
            migrio
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: -2,
            }}
          >
            Verified immigration experts
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              fontWeight: 700,
              color: "#C9C2FF",
              lineHeight: 1.1,
              letterSpacing: -2,
            }}
          >
            for moving to Europe
          </div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {[
            "Manually verified",
            "Free AI plan score",
            "Protected payments",
          ].map((chip) => (
            <div
              key={chip}
              style={{
                display: "flex",
                padding: "14px 24px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.14)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#ffffff",
                fontSize: 26,
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
