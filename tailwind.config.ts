import type { Config } from "tailwindcss"

const config: Config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            keyframes: {
                "canopy-x": {
                    from: { transform: "translateX(0)" },
                    to: { transform: "translateX(calc(-100% - var(--gap)))" },
                },
                "canopy-y": {
                    from: { transform: "translateY(0)" },
                    to: { transform: "translateY(calc(-100% - var(--gap)))" },
                },
            },
            animation: {
                "canopy-horizontal": "canopy-x var(--duration) infinite linear",
                "canopy-vertical": "canopy-y var(--duration) linear infinite",
            },
            maxWidth: {
                "350": "87.5rem",
            },
            height: {
                "105": "26.25rem",
                "125": "31.25rem",
                "130": "32.5rem",
                "150": "37.5rem",
            },
            width: {
                "70": "17.5rem",
                "85": "21.25rem",
            },
        },
    },
    plugins: [],
}
export default config