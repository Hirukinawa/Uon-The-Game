import { useState } from "react";

export default function JFCircular() {
  const [size, setSize] = useState(2);
  const sizes = [
    { label: "Pequeno", px: 280 },
    { label: "Médio", px: 380 },
    { label: "Grande", px: 480 },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#fafafa",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: "24px 16px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: 600, width: "100%", textAlign: "center" }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#333", marginBottom: 4 }}>
          JF — Great Vibes · Moldura Redonda
        </h1>
        <p style={{ color: "#888", fontSize: 13, marginBottom: 20 }}>
          Tema Lúdica Natureza
        </p>

        {/* Size selector */}
        <div style={{
          display: "inline-flex",
          gap: 0,
          borderRadius: 8,
          overflow: "hidden",
          border: "1px solid #e0d6cc",
          marginBottom: 28,
        }}>
          {sizes.map((s, i) => (
            <button
              key={i}
              onClick={() => setSize(i)}
              style={{
                padding: "8px 18px",
                fontSize: 12,
                fontWeight: size === i ? 700 : 400,
                color: size === i ? "#fff" : "#8D6E63",
                background: size === i ? "#8D6E63" : "#fff",
                border: "none",
                cursor: "pointer",
                borderRight: i < 2 ? "1px solid #e0d6cc" : "none",
                transition: "all 0.2s ease",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Main circular monogram */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 28,
        }}>
          <svg
            viewBox="0 0 400 400"
            style={{
              width: sizes[size].px,
              height: sizes[size].px,
              transition: "all 0.3s ease",
            }}
          >
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4A24E" />
                <stop offset="50%" stopColor="#C48B3C" />
                <stop offset="100%" stopColor="#8B6914" />
              </linearGradient>
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C48B3C" />
                <stop offset="100%" stopColor="#A67C38" />
              </linearGradient>
              <filter id="wcf" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
              </filter>
              <clipPath id="circleClip">
                <circle cx="200" cy="200" r="175" />
              </clipPath>
            </defs>

            {/* Outer ring */}
            <circle cx="200" cy="200" r="185" fill="none" stroke="#C48B3C" strokeWidth="1.5" opacity="0.2" />
            <circle cx="200" cy="200" r="178" fill="none" stroke="url(#ringGrad)" strokeWidth="2.5" opacity="0.35" />
            <circle cx="200" cy="200" r="170" fill="none" stroke="#C48B3C" strokeWidth="0.8" opacity="0.15" />

            {/* White fill */}
            <circle cx="200" cy="200" r="175" fill="#fff" />

            {/* Content clipped to circle */}
            <g clipPath="url(#circleClip)">

              {/* Soft background wash */}
              <circle cx="200" cy="200" r="175" fill="#fdfcf8" />
              <circle cx="140" cy="140" r="90" fill="#f9f5e8" opacity="0.4" />
              <circle cx="280" cy="250" r="80" fill="#f5f8f0" opacity="0.35" />

              {/* ===== TOP ARCH - Dense leaf garland ===== */}
              {/* Left side */}
              <g transform="translate(65, 55) rotate(-35)">
                <ellipse rx="22" ry="8" fill="#7CB342" opacity="0.55" />
                <line x1="-19" y1="0" x2="19" y2="0" stroke="#558B2F" strokeWidth="0.8" opacity="0.4" />
              </g>
              <g transform="translate(48, 75) rotate(-55)">
                <ellipse rx="18" ry="6.5" fill="#8BC34A" opacity="0.45" />
                <line x1="-15" y1="0" x2="15" y2="0" stroke="#558B2F" strokeWidth="0.7" opacity="0.35" />
              </g>
              <g transform="translate(38, 100) rotate(-65)">
                <ellipse rx="16" ry="6" fill="#9CCC65" opacity="0.4" />
              </g>
              <g transform="translate(90, 38) rotate(-15)">
                <ellipse rx="20" ry="7" fill="#66BB6A" opacity="0.45" />
                <line x1="-17" y1="0" x2="17" y2="0" stroke="#558B2F" strokeWidth="0.7" opacity="0.35" />
              </g>
              <g transform="translate(120, 32) rotate(0)">
                <ellipse rx="16" ry="6" fill="#7CB342" opacity="0.38" />
              </g>
              <g transform="translate(150, 30) rotate(10)">
                <ellipse rx="14" ry="5.5" fill="#8BC34A" opacity="0.35" />
              </g>
              {/* Center top */}
              <g transform="translate(178, 28) rotate(5)">
                <ellipse rx="12" ry="5" fill="#9CCC65" opacity="0.32" />
              </g>
              <g transform="translate(200, 27) rotate(0)">
                <ellipse rx="10" ry="4.5" fill="#A5D6A7" opacity="0.28" />
              </g>
              <g transform="translate(222, 28) rotate(-5)">
                <ellipse rx="12" ry="5" fill="#9CCC65" opacity="0.32" />
              </g>
              {/* Right side */}
              <g transform="translate(250, 30) rotate(-10)">
                <ellipse rx="14" ry="5.5" fill="#8BC34A" opacity="0.35" />
              </g>
              <g transform="translate(280, 32) rotate(0)">
                <ellipse rx="16" ry="6" fill="#7CB342" opacity="0.38" />
              </g>
              <g transform="translate(310, 38) rotate(15)">
                <ellipse rx="20" ry="7" fill="#66BB6A" opacity="0.45" />
                <line x1="-17" y1="0" x2="17" y2="0" stroke="#558B2F" strokeWidth="0.7" opacity="0.35" />
              </g>
              <g transform="translate(335, 55) rotate(35)">
                <ellipse rx="22" ry="8" fill="#7CB342" opacity="0.55" />
                <line x1="-19" y1="0" x2="19" y2="0" stroke="#558B2F" strokeWidth="0.8" opacity="0.4" />
              </g>
              <g transform="translate(352, 75) rotate(55)">
                <ellipse rx="18" ry="6.5" fill="#8BC34A" opacity="0.45" />
                <line x1="-15" y1="0" x2="15" y2="0" stroke="#558B2F" strokeWidth="0.7" opacity="0.35" />
              </g>
              <g transform="translate(362, 100) rotate(65)">
                <ellipse rx="16" ry="6" fill="#9CCC65" opacity="0.4" />
              </g>

              {/* Flowers in top garland */}
              {[
                { x: 75, y: 48, s: 5.5, c: "#FFD54F" },
                { x: 110, y: 35, s: 4.5, c: "#FFF176" },
                { x: 145, y: 30, s: 4, c: "#FFCC80" },
                { x: 200, y: 30, s: 3.5, c: "#FFD54F" },
                { x: 255, y: 30, s: 4, c: "#FFCC80" },
                { x: 290, y: 35, s: 4.5, c: "#FFF176" },
                { x: 325, y: 48, s: 5.5, c: "#FFD54F" },
              ].map((f, i) => (
                <g key={`tf${i}`}>
                  <circle cx={f.x} cy={f.y} r={f.s} fill={f.c} opacity="0.6" />
                  <circle cx={f.x} cy={f.y} r={f.s * 0.3} fill="#F9A825" opacity="0.5" />
                </g>
              ))}

              {/* ===== SIDE DECORATIONS - Vine-like branches ===== */}
              {/* Left vine */}
              <path d="M 35 120 Q 40 160, 32 200 Q 28 240, 45 280" fill="none" stroke="#8D6E63" strokeWidth="1.2" opacity="0.18" strokeLinecap="round" />
              <g transform="translate(32, 135) rotate(-75)">
                <ellipse rx="13" ry="5" fill="#7CB342" opacity="0.35" />
              </g>
              <g transform="translate(36, 165) rotate(-60)">
                <ellipse rx="11" ry="4.5" fill="#8BC34A" opacity="0.3" />
              </g>
              <g transform="translate(30, 200) rotate(-80)">
                <ellipse rx="12" ry="4.5" fill="#9CCC65" opacity="0.32" />
              </g>
              <g transform="translate(32, 235) rotate(-65)">
                <ellipse rx="10" ry="4" fill="#7CB342" opacity="0.28" />
              </g>
              <g transform="translate(40, 265) rotate(-50)">
                <ellipse rx="11" ry="4.5" fill="#8BC34A" opacity="0.25" />
              </g>

              {/* Right vine */}
              <path d="M 365 120 Q 360 160, 368 200 Q 372 240, 355 280" fill="none" stroke="#8D6E63" strokeWidth="1.2" opacity="0.18" strokeLinecap="round" />
              <g transform="translate(368, 135) rotate(75)">
                <ellipse rx="13" ry="5" fill="#7CB342" opacity="0.35" />
              </g>
              <g transform="translate(364, 165) rotate(60)">
                <ellipse rx="11" ry="4.5" fill="#8BC34A" opacity="0.3" />
              </g>
              <g transform="translate(370, 200) rotate(80)">
                <ellipse rx="12" ry="4.5" fill="#9CCC65" opacity="0.32" />
              </g>
              <g transform="translate(368, 235) rotate(65)">
                <ellipse rx="10" ry="4" fill="#7CB342" opacity="0.28" />
              </g>
              <g transform="translate(360, 265) rotate(50)">
                <ellipse rx="11" ry="4.5" fill="#8BC34A" opacity="0.25" />
              </g>

              {/* Side flowers */}
              {[
                { x: 38, y: 150, s: 4, c: "#FFCC80" },
                { x: 34, y: 215, s: 3.5, c: "#FFD54F" },
                { x: 42, y: 250, s: 4, c: "#FFF176" },
                { x: 362, y: 150, s: 4, c: "#FFCC80" },
                { x: 366, y: 215, s: 3.5, c: "#FFD54F" },
                { x: 358, y: 250, s: 4, c: "#FFF176" },
              ].map((f, i) => (
                <g key={`sf${i}`}>
                  <circle cx={f.x} cy={f.y} r={f.s} fill={f.c} opacity="0.5" />
                  <circle cx={f.x} cy={f.y} r={f.s * 0.3} fill="#F9A825" opacity="0.4" />
                </g>
              ))}

              {/* ===== BIRDS ===== */}
              {/* Bird 1 - top left */}
              <path d="M 80 90 Q 86 80, 92 86" fill="none" stroke="#8D6E63" strokeWidth="1.5" opacity="0.35" strokeLinecap="round" />
              <path d="M 92 86 Q 98 78, 104 84" fill="none" stroke="#8D6E63" strokeWidth="1.5" opacity="0.35" strokeLinecap="round" />
              {/* Bird 2 - top right */}
              <path d="M 300 80 Q 305 72, 310 77" fill="none" stroke="#8D6E63" strokeWidth="1.4" opacity="0.3" strokeLinecap="round" />
              <path d="M 310 77 Q 315 70, 320 75" fill="none" stroke="#8D6E63" strokeWidth="1.4" opacity="0.3" strokeLinecap="round" />
              {/* Bird 3 - smaller, higher */}
              <path d="M 185 55 Q 188 50, 192 53" fill="none" stroke="#8D6E63" strokeWidth="1" opacity="0.22" strokeLinecap="round" />
              <path d="M 192 53 Q 195 49, 198 52" fill="none" stroke="#8D6E63" strokeWidth="1" opacity="0.22" strokeLinecap="round" />
              {/* Bird 4 - left side */}
              <path d="M 55 115 Q 59 108, 63 112" fill="none" stroke="#8D6E63" strokeWidth="1.1" opacity="0.25" strokeLinecap="round" />
              <path d="M 63 112 Q 67 106, 71 110" fill="none" stroke="#8D6E63" strokeWidth="1.1" opacity="0.25" strokeLinecap="round" />

              {/* ===== MAIN JF TEXT - properly sized ===== */}
              <text
                x="200"
                y="218"
                textAnchor="middle"
                fontFamily="'Great Vibes', cursive"
                fontSize="105"
                fill="url(#goldGrad)"
                filter="url(#wcf)"
                style={{ letterSpacing: "6px" }}
              >
                JF
              </text>

              {/* ===== BOTTOM - Rich flower garden ===== */}
              {/* Ground area */}
              <ellipse cx="200" cy="365" rx="170" ry="40" fill="#E8F5E9" opacity="0.35" />

              {/* Bottom leaf clusters */}
              <g transform="translate(100, 320) rotate(-10)">
                <ellipse rx="16" ry="6" fill="#7CB342" opacity="0.45" />
                <line x1="-13" y1="0" x2="13" y2="0" stroke="#558B2F" strokeWidth="0.7" opacity="0.35" />
              </g>
              <g transform="translate(130, 330) rotate(5)">
                <ellipse rx="14" ry="5.5" fill="#8BC34A" opacity="0.4" />
              </g>
              <g transform="translate(160, 338) rotate(15)">
                <ellipse rx="12" ry="5" fill="#9CCC65" opacity="0.35" />
              </g>
              <g transform="translate(200, 340) rotate(0)">
                <ellipse rx="13" ry="5" fill="#7CB342" opacity="0.38" />
              </g>
              <g transform="translate(240, 338) rotate(-15)">
                <ellipse rx="12" ry="5" fill="#9CCC65" opacity="0.35" />
              </g>
              <g transform="translate(270, 330) rotate(-5)">
                <ellipse rx="14" ry="5.5" fill="#8BC34A" opacity="0.4" />
              </g>
              <g transform="translate(300, 320) rotate(10)">
                <ellipse rx="16" ry="6" fill="#7CB342" opacity="0.45" />
                <line x1="-13" y1="0" x2="13" y2="0" stroke="#558B2F" strokeWidth="0.7" opacity="0.35" />
              </g>

              {/* Bottom flowers - large cluster */}
              {[
                { x: 110, y: 305, s: 7.5, c: "#FFD54F" },
                { x: 90, y: 318, s: 6, c: "#FFF176" },
                { x: 130, y: 318, s: 6.5, c: "#FFCC80" },
                { x: 75, y: 332, s: 5.5, c: "#FFE082" },
                { x: 148, y: 330, s: 5, c: "#FFD54F" },
                { x: 105, y: 340, s: 5, c: "#FFF176" },
                { x: 170, y: 340, s: 4.5, c: "#FFCC80" },
                { x: 200, y: 328, s: 6, c: "#FFD54F" },
                { x: 230, y: 340, s: 4.5, c: "#FFCC80" },
                { x: 252, y: 330, s: 5, c: "#FFD54F" },
                { x: 270, y: 318, s: 6.5, c: "#FFCC80" },
                { x: 295, y: 340, s: 5, c: "#FFF176" },
                { x: 290, y: 305, s: 7.5, c: "#FFD54F" },
                { x: 310, y: 318, s: 6, c: "#FFF176" },
                { x: 325, y: 332, s: 5.5, c: "#FFE082" },
              ].map((f, i) => (
                <g key={`bf${i}`}>
                  <circle cx={f.x} cy={f.y} r={f.s} fill={f.c} opacity="0.55" />
                  <circle cx={f.x} cy={f.y} r={f.s * 0.3} fill="#F9A825" opacity="0.45" />
                </g>
              ))}

              {/* Grass blades */}
              {[65, 85, 105, 125, 145, 165, 185, 200, 215, 235, 255, 275, 295, 315, 335].map((x, i) => (
                <g key={`gr${i}`}>
                  <line x1={x} y1={355} x2={x - 4} y2={342 - (i % 3) * 4}
                    stroke="#7CB342" strokeWidth="1.4" opacity="0.28" strokeLinecap="round" />
                  <line x1={x + 5} y1={355} x2={x + 9} y2={345 - (i % 2) * 5}
                    stroke="#8BC34A" strokeWidth="1.1" opacity="0.22" strokeLinecap="round" />
                </g>
              ))}

              {/* Subtle butterfly near text */}
              <g transform="translate(305, 165) scale(0.7)">
                <path d="M 0 0 Q -12 -10, -8 -20 Q -4 -12, 0 -5" fill="#FFCC80" opacity="0.35" />
                <path d="M 0 0 Q 12 -10, 8 -20 Q 4 -12, 0 -5" fill="#FFD54F" opacity="0.3" />
                <path d="M 0 0 Q -8 8, -5 15 Q -2 8, 0 3" fill="#FFCC80" opacity="0.28" />
                <path d="M 0 0 Q 8 8, 5 15 Q 2 8, 0 3" fill="#FFD54F" opacity="0.25" />
                <line x1="0" y1="-5" x2="0" y2="3" stroke="#8D6E63" strokeWidth="0.6" opacity="0.3" />
              </g>

              {/* Another small butterfly */}
              <g transform="translate(88, 175) scale(0.5) rotate(-15)">
                <path d="M 0 0 Q -12 -10, -8 -20 Q -4 -12, 0 -5" fill="#CE93D8" opacity="0.25" />
                <path d="M 0 0 Q 12 -10, 8 -20 Q 4 -12, 0 -5" fill="#BA68C8" opacity="0.22" />
                <path d="M 0 0 Q -8 8, -5 15 Q -2 8, 0 3" fill="#CE93D8" opacity="0.2" />
                <path d="M 0 0 Q 8 8, 5 15 Q 2 8, 0 3" fill="#BA68C8" opacity="0.18" />
                <line x1="0" y1="-5" x2="0" y2="3" stroke="#8D6E63" strokeWidth="0.5" opacity="0.25" />
              </g>
            </g>

            {/* Outer ring on top of clip */}
            <circle cx="200" cy="200" r="178" fill="none" stroke="url(#ringGrad)" strokeWidth="2.5" opacity="0.35" />
          </svg>
        </div>

        {/* Wall simulation */}
        <div style={{
          background: "#fff",
          borderRadius: 14,
          padding: 20,
          border: "2px solid #f0ebe5",
          textAlign: "left",
        }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#555", marginBottom: 12 }}>
            Simulação na parede
          </div>
          <svg viewBox="0 0 500 370" style={{ width: "100%", background: "#f5f0eb", borderRadius: 10 }}>
            <rect width="500" height="370" fill="#f5f0eb" rx="10" />

            {/* Circular lettering */}
            <circle cx="250" cy="90" r="48" fill="#fff" stroke="#C48B3C" strokeWidth="1.2" opacity="0.6" />
            <text x="250" y="102" textAnchor="middle"
              fontFamily="'Great Vibes', cursive" fontSize="48" fill="#C48B3C" opacity="0.55">
              JF
            </text>
            <text x="250" y="150" textAnchor="middle" fontSize="7" fill="#bbb">ø 35–40 cm</text>

            {/* Spacing */}
            <line x1="250" y1="140" x2="250" y2="162" stroke="#ddd" strokeWidth="1" strokeDasharray="3 2" />
            <text x="268" y="155" fontSize="7" fill="#ccc">~10 cm</text>

            {/* 3 frames */}
            {[0, 1, 2].map(i => {
              const frameW = 63;
              const frameH = 90;
              const gap = 15;
              const totalW = frameW * 3 + gap * 2;
              const startX = (500 - totalW) / 2;
              const x = startX + i * (frameW + gap);
              return (
                <g key={i}>
                  <rect x={x} y={165} width={frameW} height={frameH} rx="3"
                    fill="#fff" stroke="#d4c8b8" strokeWidth="1.5" />
                  <rect x={x + 4} y={169} width={frameW - 8} height={frameH - 8} rx="2" fill="#f8f3eb" />
                  <circle cx={x + frameW / 2} cy={200} r={12} fill="#C8E6C9" opacity="0.4" />
                  <rect x={x + 12} y={220} width={frameW - 24} height={18} rx="3" fill="#FFE0B2" opacity="0.3" />
                  <text x={x + frameW / 2} y={268} textAnchor="middle" fontSize="7" fill="#bbb">21×30</text>
                </g>
              );
            })}

            {/* Width */}
            <line x1="107" y1="285" x2="393" y2="285" stroke="#ccc" strokeWidth="1" />
            <line x1="107" y1="280" x2="107" y2="290" stroke="#ccc" strokeWidth="1" />
            <line x1="393" y1="280" x2="393" y2="290" stroke="#ccc" strokeWidth="1" />
            <text x="250" y="302" textAnchor="middle" fontSize="9" fill="#bbb">~73 cm</text>
          </svg>
        </div>

        {/* Sizing note */}
        <div style={{
          marginTop: 16,
          background: "#fff",
          borderRadius: 10,
          padding: 14,
          border: "1px solid #f0ebe5",
          fontSize: 12,
          color: "#888",
          textAlign: "left",
          lineHeight: 1.6,
        }}>
          <strong style={{ color: "#666" }}>Nota sobre dimensão circular:</strong> Como agora é redondo, a referência muda. Um diâmetro entre 35 e 40 cm mantém a proporção harmônica com os 3 quadros (21×30). Acima de 40 cm começa a dominar visualmente o conjunto.
        </div>
      </div>
    </div>
  );
}
