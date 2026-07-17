import { ImageResponse } from "next/og"

export const alt = "Emirhan — Full-Stack Developer & Designer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
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
                    background: "#0a0a0a",
                    backgroundImage:
                        "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(255,255,255,0.10), transparent)",
                    color: "#fafafa",
                    fontFamily: "sans-serif",
                }}
            >
                <div
                    style={{
                        fontSize: 26,
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        color: "rgba(250,250,250,0.5)",
                    }}
                >
                    emirhan.cv
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: 24,
                        fontSize: 104,
                        fontWeight: 900,
                        lineHeight: 1.02,
                        letterSpacing: "-0.04em",
                    }}
                >
                    <span>Full-Stack</span>
                    <span>Developer &amp; Designer</span>
                </div>
                <div
                    style={{
                        marginTop: 32,
                        fontSize: 30,
                        color: "rgba(250,250,250,0.6)",
                        maxWidth: 760,
                    }}
                >
                    Building polished interfaces and robust backends, end to end.
                </div>
            </div>
        ),
        { ...size }
    )
}
