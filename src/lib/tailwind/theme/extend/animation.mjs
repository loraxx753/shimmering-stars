const keyframes = {
    shadcn: {
        "accordion-down": {
            from: { height: "0" },
            to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: "0" },
        },
    },
    animata: {
        meteor: {
            "0%": { transform: "translateY(-20%) translateX(-50%)" },
            "100%": { transform: "translateY(300%) translateX(-50%)" },
        },
        "pop-blob": {
            "0%": { transform: "scale(1)" },
            "33%": { transform: "scale(1.2)" },
            "66%": { transform: "scale(0.8)" },
            "100%": { transform: "scale(1)" },
        },
        "bg-position": {
            "0%": { backgroundPosition: "0% 50%" },
            "100%": { backgroundPosition: "100% 50%" },
          },
          "shine": {
            from: { backgroundPosition: '200% 0' },
            to: { backgroundPosition: '-200% 0' },
        },  
    },
    'magic-ui': {
        grid: {
            "0%": { transform: "translateY(-50%)" },
            "100%": { transform: "translateY(0)" },
        },
        "shine-pulse": {
            "0%": {
              "background-position": "0% 0%",
            },
            "50%": {
              "background-position": "100% 100%",
            },
            to: {
              "background-position": "0% 0%",
            },
        },  
    },
    moon: {
        float: {
            "0%, 100%": { transform: "translateY(0)" },
            "50%": { transform: "translateY(-8px)" },
        },
        twinkle: {
            "0%, 100%": { opacity: "1", transform: "scale(1) rotate(0deg)" },
            "50%": { opacity: "0.4", transform: "scale(0.8) rotate(20deg)" },
        },
        "rise-in": {
            from: { opacity: "0", transform: "translateY(12px)" },
            to: { opacity: "1", transform: "translateY(0)" },
        },
    }

}

const animations = {
    shadcn: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
    },
    animata: {
        "meteor": "meteor var(--duration) var(--delay) ease-in-out infinite",
        "pop-blob": "pop-blob 5s infinite",
        "shine": "shine 8s ease-in-out infinite",
    },
    'magic-ui': {
        grid: "grid 15s linear infinite",
    },
    moon: {
        float: "float 6s ease-in-out infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        "rise-in": "rise-in 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both",
    }
}

export default {
    animation: {
        ...animations.shadcn,
        ...animations.animata,
        ...animations['magic-ui'],
        ...animations.moon
    },
    keyframes: {
        ...keyframes.shadcn,
        ...keyframes.animata,
        ...keyframes['magic-ui'],
        ...keyframes.moon
    },
}