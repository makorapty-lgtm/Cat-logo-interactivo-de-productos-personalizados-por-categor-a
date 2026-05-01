// Makora — UI primitives shared across the catalog

// Imagen de producto: usa foto real si existe `img`, si no rayas diagonales + label mono
function ProductPlaceholder({ label, sub, ratio = "4/5", accent, dense = false, big = false, img }) {
  const a = accent || "var(--ink)";
  if (img) {
    return (
      <div
        className="m-ph"
        style={{
          aspectRatio: ratio,
          position: "relative",
          overflow: "hidden",
          borderRadius: dense ? 8 : 10,
          border: `1px solid color-mix(in oklab, var(--ink) 8%, transparent)`,
          background: "var(--cream-2)",
        }}
      >
        <img
          src={img}
          alt={label}
          loading="lazy"
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", display: "block",
          }}
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
        {/* Sutil vignette para legibilidad de badges */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(180deg, transparent 60%, rgba(19,34,74,.10) 100%)",
        }} />
      </div>
    );
  }
  return (
    <div
      className="m-ph"
      style={{
        aspectRatio: ratio,
        background: `repeating-linear-gradient(135deg, var(--cream-2) 0 12px, var(--cream-1) 12px 24px)`,
        position: "relative",
        overflow: "hidden",
        borderRadius: dense ? 8 : 10,
        border: `1px solid color-mix(in oklab, var(--ink) 8%, transparent)`,
      }}
    >
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(120% 80% at 50% 100%, color-mix(in oklab, ${a} 8%, transparent), transparent 60%)`,
      }} />
      <div style={{
        position: "absolute", left: big ? 24 : 12, top: big ? 24 : 12,
        fontFamily: "var(--mono)", fontSize: big ? 12 : 10, letterSpacing: ".08em",
        color: "color-mix(in oklab, var(--ink) 55%, transparent)",
      }}>
        IMG · {label}
      </div>
      <div style={{
        position: "absolute", left: big ? 24 : 12, bottom: big ? 24 : 12, right: big ? 24 : 12,
        display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 8,
      }}>
        <div style={{
          fontFamily: "var(--display)", fontWeight: 700,
          fontSize: big ? 28 : 17, letterSpacing: "-0.01em", lineHeight: 1.05,
          color: "var(--ink)",
        }}>
          {label}
        </div>
        <div style={{
          fontFamily: "var(--mono)", fontSize: big ? 11 : 9, letterSpacing: ".06em",
          color: "color-mix(in oklab, var(--ink) 55%, transparent)",
          textAlign: "right", maxWidth: "55%",
        }}>
          {sub}
        </div>
      </div>
      {/* corner mark */}
      <div style={{
        position: "absolute", right: big ? 24 : 12, top: big ? 24 : 12,
        width: big ? 28 : 20, height: big ? 28 : 20,
        border: "1px solid color-mix(in oklab, var(--ink) 25%, transparent)",
        borderRadius: 4,
      }} />
    </div>
  );
}

function StateBadge({ state }) {
  if (!state) return null;
  const map = {
    nuevo:      { label: "Nuevo",      bg: "var(--accent)",  fg: "#fff" },
    popular:    { label: "Popular",    bg: "var(--ink)",     fg: "#fff" },
    bestseller: { label: "Bestseller", bg: "var(--mustard)", fg: "#fff" },
    destacado:  { label: "Destacado",  bg: "var(--mustard)", fg: "#fff" },
  };
  const c = map[state];
  if (!c) return null;
  return (
    <span className="m-state-badge" style={{
      background: c.bg, color: c.fg,
      fontSize: 10.5, fontWeight: 600, letterSpacing: ".04em",
      textTransform: "uppercase",
      padding: "4px 8px", borderRadius: 4,
      fontFamily: "var(--display)",
    }}>{c.label}</span>
  );
}

function PersonalizableTag() {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      fontSize: 10.5, fontFamily: "var(--mono)", letterSpacing: ".05em",
      color: "var(--accent-deep)",
      background: "color-mix(in oklab, var(--accent) 10%, transparent)",
      border: "1px solid color-mix(in oklab, var(--accent) 35%, transparent)",
      padding: "3px 7px", borderRadius: 999, textTransform: "uppercase",
    }}>
      <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
        <path d="M2 9.5 L7 4.5 L9 6.5 L4 11.5 L2 11.5 L2 9.5 Z M7.5 4 L8.5 3 L10.5 5 L9.5 6 Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" fill="none"/>
      </svg>
      Personalizable
    </span>
  );
}

// Inline svg icon set (1.5px, lineal, monocromo)
const Icon = {
  search: (p) => <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>,
  cart: (p) => <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h2l2.5 12.5a2 2 0 0 0 2 1.5h7.5a2 2 0 0 0 2-1.5L21 8H6"/><circle cx="10" cy="20.5" r="1.2"/><circle cx="18" cy="20.5" r="1.2"/></svg>,
  whatsapp: (p) => <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="currentColor"><path d="M19.05 4.91A10 10 0 0 0 12 2 10 10 0 0 0 2 12a10 10 0 0 0 1.5 5.27L2 22l4.85-1.5A10 10 0 0 0 12 22a10 10 0 0 0 7.05-17.09zM12 20.18a8.16 8.16 0 0 1-4.18-1.16l-.3-.18-2.88.9.92-2.8-.2-.31A8.16 8.16 0 1 1 20.18 12 8.18 8.18 0 0 1 12 20.18zm4.6-6.06c-.25-.13-1.49-.74-1.72-.82s-.4-.13-.57.13-.65.82-.8 1-.3.18-.55.06a6.6 6.6 0 0 1-1.96-1.21 7.46 7.46 0 0 1-1.36-1.7c-.14-.25 0-.39.11-.51s.25-.28.37-.42.18-.21.27-.37a.41.41 0 0 0 0-.39c-.06-.12-.57-1.36-.78-1.86s-.41-.42-.57-.42h-.49a.94.94 0 0 0-.69.32A2.87 2.87 0 0 0 6.5 9.6a5 5 0 0 0 1 2.65 11.43 11.43 0 0 0 4.4 3.88c.61.27 1.09.43 1.46.55a3.55 3.55 0 0 0 1.62.1 2.65 2.65 0 0 0 1.74-1.23 2.13 2.13 0 0 0 .15-1.23c-.06-.11-.22-.18-.47-.31z"/></svg>,
  arrow: (p) => <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-5-6 6 6-6 6"/></svg>,
  close: (p) => <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m6 6 12 12M6 18 18 6"/></svg>,
  filter: (p) => <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5h18M6 12h12M10 19h4"/></svg>,
  grid: (p) => <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  rows: (p) => <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="4" width="18" height="5" rx="1"/><rect x="3" y="13" width="18" height="5" rx="1"/></svg>,
  sun: (p) => <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5"/></svg>,
  moon: (p) => <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/></svg>,
  share: (p) => <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="m8.2 11 7.6-3.5M8.2 13l7.6 3.5"/></svg>,
  bookmark: (p) => <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4h12v17l-6-4-6 4z"/></svg>,
  check: (p) => <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5 9-11"/></svg>,
  menu: (p) => <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>,
  chevron: (p) => <svg viewBox="0 0 24 24" width={p.size||16} height={p.size||16} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>,
};

// Logo de Makora (recreado en SVG, fiel al original)
function MakoraLogo({ size = 28, mono = false, dark = false }) {
  const ink = dark ? "#F6F2EB" : "#13224A";
  const teal = mono ? ink : "#0F9787";
  const mint = mono ? ink : "#3FC89A";
  const top = mono ? ink : "#1B2D5E";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <svg width={size * 1.05} height={size} viewBox="0 0 60 56" fill="none" aria-hidden>
        {/* top face */}
        <path d="M30 4 L54 16 L30 28 L6 16 Z" fill={top} />
        {/* left face (teal) */}
        <path d="M6 16 L30 28 L30 52 L6 40 Z" fill={teal} />
        {/* right face (mint) */}
        <path d="M54 16 L30 28 L30 52 L54 40 Z" fill={mint} />
      </svg>
      <span style={{
        fontFamily: "var(--display)", fontWeight: 700, fontSize: size * 0.92,
        letterSpacing: "-0.02em", color: ink, lineHeight: 1,
      }}>Makora</span>
    </span>
  );
}

Object.assign(window, {
  ProductPlaceholder, StateBadge, PersonalizableTag, Icon, MakoraLogo,
});
