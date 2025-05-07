import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";
import animationPlugin from "tailwindcss-animate";

const config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      backgroundColor: {
        bgPrimary: "var(--bg-primary)",
        bgSecondary: "var(--bg-secondary)",
        "podcast-black": "#0A0A0C",
      },
      colors: {
        boneWhite: "var(--bone-white)",
        carbonBlack: "var(--carbon-black)",
        textBody: "var(--text-body)",
        stroke: "var(--stroke)",
        "primary-100": "var(--primary-100)",
        "primary-60": "var(--primary-60)",
        "primary-40": "var(--primary-40)",
        "primary-30": "var(--primary-30)",
        "primary-10": "var(--primary-10)",
      },
      fontFamily: {
        kanit: ["Kanit", ...fontFamily.sans],
        roboto: ["Roboto", ...fontFamily.sans],
      },
      spacing: {
        "side-spacing": "80px",
        "side-spacing-tablet": "40px",
        "side-spacing-mobile": "24px",
      },
      fontSize: {
        display: ["130px", {}],
        banner: ["72px", { lineHeight: "82px" }],
        h1: ["58px", { lineHeight: "70px", fontWeight: "700" }],
        h2: ["48px", { lineHeight: "60px", fontWeight: "700" }],
        h3: ["38px", { lineHeight: "46px", fontWeight: "700" }],
        h4: ["28px", { lineHeight: "36px", fontWeight: "700" }],
        h5: ["22px", { lineHeight: "30px", fontWeight: "700" }],
        h6: ["18px", { lineHeight: "26px", fontWeight: "700" }],
        //  body text - large
        "body-lg": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-lg-medium": ["16px", { lineHeight: "24px", fontWeight: "500" }],
        "body-lg-semiBold": ["16px", { lineHeight: "24px", fontWeight: "600" }],
        "body-lg-bold": ["16px", { lineHeight: "24px", fontWeight: "700" }],
        //  body text - small
        "body-sm": ["14px", { lineHeight: "22px", fontWeight: "400" }],
        "body-sm-medium": ["14px", { lineHeight: "22px", fontWeight: "500" }],
        "body-sm-semiBold": ["14px", { lineHeight: "22px", fontWeight: "600" }],
        "body-sm-bold": ["14px", { lineHeight: "22px", fontWeight: "700" }],
        //  body text - extra small
        "body-xs": ["12px", { lineHeight: "18px", fontWeight: "400" }],
        "body-xs-medium": ["12px", { lineHeight: "18px", fontWeight: "500" }],
        "body-xs-semiBold": ["12px", { lineHeight: "18px", fontWeight: "600" }],
        "body-xs-bold": ["12px", { lineHeight: "18px", fontWeight: "700" }],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100%",
            color: "var(--text-body)",
            h1: {
              color: "var(--bone-white)",
            },
            h2: {
              color: "var(--bone-white)",
              fontSize: "24px",
              marginTop: "32px",
              marginBottom: "16px",
              fontWeight: "600",
            },
            h3: {
              color: "var(--bone-white)",
            },
            strong: {
              color: "var(--bone-white)",
            },
            a: {
              color: "var(--primary-100)",
              "&:hover": {
                color: "var(--bone-white)",
              },
            },
            ul: {
              li: {
                "&::marker": {
                  color: "var(--primary-100)",
                },
              },
            },
            p: {
              marginTop: "16px",
              marginBottom: "16px",
            },
          },
        },
      },
    },
  },
  plugins: [
    animationPlugin,
    require("@tailwindcss/typography"),
    plugin(function ({ addVariant }) {
      // Add custom variants here as needed
    }),
  ],
} satisfies Config;

export default config;
