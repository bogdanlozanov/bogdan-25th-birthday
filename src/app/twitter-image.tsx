import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 600,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          backgroundColor: "#05060d",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(760px 380px at 12% 18%, rgba(125,249,255,0.18), transparent 60%), radial-gradient(720px 420px at 88% 24%, rgba(255,79,216,0.18), transparent 60%), radial-gradient(640px 480px at 50% 100%, rgba(244,201,93,0.16), transparent 60%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "380px",
            height: "380px",
            borderRadius: "999px",
            background: "rgba(184,75,255,0.2)",
            filter: "blur(90px)",
            top: "-110px",
            right: "-40px",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            padding: "72px",
          }}
        >
          <div
            style={{
              fontSize: 44,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "#7df9ff",
            }}
          >
            Happy Birthday
          </div>
          <div style={{ fontSize: 80, fontWeight: 700, lineHeight: 1 }}>
            Bogdan Lozanov
          </div>
          <div style={{ fontSize: 36, fontWeight: 600, color: "#f4c95d" }}>
            Take a candy
          </div>
        </div>
      </div>
    ),
    size
  );
}
