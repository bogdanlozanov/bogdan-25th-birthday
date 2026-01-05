import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
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
              "radial-gradient(800px 400px at 10% 10%, rgba(125,249,255,0.18), transparent 60%), radial-gradient(700px 500px at 90% 20%, rgba(255,79,216,0.18), transparent 60%), radial-gradient(600px 500px at 50% 100%, rgba(244,201,93,0.16), transparent 60%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "420px",
            height: "420px",
            borderRadius: "999px",
            background: "rgba(184,75,255,0.2)",
            filter: "blur(90px)",
            top: "-120px",
            right: "-60px",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            padding: "80px",
          }}
        >
          <div
            style={{
              fontSize: 50,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "#7df9ff",
            }}
          >
            Happy Birthday
          </div>
          <div style={{ fontSize: 88, fontWeight: 700, lineHeight: 1 }}>
            Bogdan Lozanov
          </div>
          <div style={{ fontSize: 40, fontWeight: 600, color: "#f4c95d" }}>
            Take a candy
          </div>
        </div>
      </div>
    ),
    size
  );
}
