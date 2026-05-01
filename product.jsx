// Makora — Product Card + Quick View modal

function ProductCard({ product, onOpen, density = "comfy", style = "soft" }) {
  const cat = window.MAKORA_CATEGORIES.find(c => c.id === product.cat);
  const compact = density === "compact";
  const cardStyle = {
    soft: { border: "1px solid color-mix(in oklab, var(--ink) 10%, transparent)", boxShadow: "0 1px 0 color-mix(in oklab, var(--ink) 4%, transparent)" },
    flat: { border: "1px solid color-mix(in oklab, var(--ink) 14%, transparent)", boxShadow: "none" },
    elevated: { border: "1px solid color-mix(in oklab, var(--ink) 6%, transparent)", boxShadow: "0 14px 30px -18px color-mix(in oklab, var(--ink) 35%, transparent), 0 2px 6px -2px color-mix(in oklab, var(--ink) 12%, transparent)" },
  }[style];

  return (
    <article className="m-card" onClick={() => onOpen(product)} style={{
      background: "var(--surface)",
      borderRadius: 12,
      ...cardStyle,
      padding: compact ? 10 : 12,
      cursor: "pointer", display: "flex", flexDirection: "column", gap: compact ? 8 : 10,
      transition: "transform .25s ease, box-shadow .25s ease, border-color .2s",
    }}>
      <div style={{ position: "relative" }}>
        <ProductPlaceholder
          label={product.placeholder.label}
          sub={product.placeholder.sub}
          accent={cat?.accent}
          ratio={compact ? "1/1" : "4/5"}
          dense={compact}
          img={product.img}
        />
        <div style={{ position: "absolute", top: 10, left: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
          <StateBadge state={product.state} />
        </div>
        <div className="m-card-hover" style={{
          position: "absolute", left: 8, right: 8, bottom: 8,
          display: "flex", gap: 6,
        }}>
          <button className="m-btn m-btn-primary" style={{ flex: 1, padding: "9px 10px", fontSize: 12 }}
            onClick={(e) => { e.stopPropagation(); onOpen(product); }}>
            Vista rápida
          </button>
          <button className="m-btn m-btn-ghost-on-img" style={{ padding: "9px 10px" }}
            onClick={(e) => { e.stopPropagation(); window.makoraQuote(product); }}
            title="Cotizar por WhatsApp">
            <Icon.whatsapp size={14} />
          </button>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6, padding: compact ? "2px 2px 4px" : "4px 4px 6px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <span style={{
            fontFamily: "var(--mono)", fontSize: 10, letterSpacing: ".08em",
            color: "color-mix(in oklab, var(--ink) 55%, transparent)",
            textTransform: "uppercase",
          }}>{cat?.short} · {product.technique}</span>
          <PersonalizableTag />
        </div>
        <h3 style={{
          margin: 0, fontFamily: "var(--display)", fontWeight: 600,
          fontSize: compact ? 14.5 : 16, lineHeight: 1.2, letterSpacing: "-0.01em",
          color: "var(--ink)",
        }}>{product.name}</h3>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: 2, gap: 8 }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink)" }}>
            {product.priceFrom != null ? (
              <><span style={{ color: "color-mix(in oklab, var(--ink) 55%, transparent)" }}>desde</span> <strong style={{ fontWeight: 700 }}>${product.priceFrom.toFixed(2)}</strong></>
            ) : (
              <span style={{ color: "var(--accent-deep)", fontWeight: 600 }}>Cotización</span>
            )}
          </div>
          <span style={{
            fontFamily: "var(--mono)", fontSize: 10.5,
            color: "color-mix(in oklab, var(--ink) 55%, transparent)",
          }}>
            {product.lead}
          </span>
        </div>
      </div>
    </article>
  );
}

function QuickViewModal({ product, onClose }) {
  const [imgIdx, setImgIdx] = React.useState(0);
  const [qty, setQty] = React.useState(product?.min || 1);
  const [notes, setNotes] = React.useState("");
  const cat = product ? window.MAKORA_CATEGORIES.find(c => c.id === product.cat) : null;

  React.useEffect(() => {
    if (!product) return;
    setImgIdx(0); setQty(product.min || 1); setNotes("");
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [product]);

  if (!product) return null;

  const galeria = [
    { label: product.placeholder.label, sub: product.placeholder.sub, img: product.img },
    { label: "DETALLE", sub: "Vista cercana", img: null },
    { label: "EN USO", sub: "Aplicación real", img: null },
    { label: "OPCIÓN", sub: "Variante" },
  ];

  const submit = () => {
    window.makoraQuote(product, { qty, notes });
  };

  return (
    <div role="dialog" aria-modal="true" onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 80,
      background: "color-mix(in oklab, var(--ink) 60%, transparent)",
      backdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: "var(--surface)", borderRadius: 14, width: "min(1100px, 100%)",
        maxHeight: "92vh", overflow: "hidden",
        display: "grid", gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 1fr)",
        boxShadow: "0 40px 80px -20px rgba(0,0,0,0.4)",
      }} className="m-modal">
        {/* Galería */}
        <div style={{ padding: 24, background: "var(--cream-1)", display: "flex", flexDirection: "column", gap: 12, minHeight: 0 }}>
          <ProductPlaceholder
            label={galeria[imgIdx].label} sub={galeria[imgIdx].sub}
            img={galeria[imgIdx].img}
            accent={cat?.accent} ratio="1/1" big
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
            {galeria.map((g, i) => (
              <button key={i} onClick={() => setImgIdx(i)} style={{
                padding: 0, border: i === imgIdx ? "2px solid var(--accent)" : "1px solid color-mix(in oklab, var(--ink) 12%, transparent)",
                borderRadius: 8, background: "transparent", cursor: "pointer", overflow: "hidden",
              }}>
                <ProductPlaceholder label={g.label} sub="" img={g.img} accent={cat?.accent} ratio="1/1" dense />
              </button>
            ))}
          </div>
        </div>

        {/* Detalles */}
        <div style={{ padding: "28px 28px 0", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
            <div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "color-mix(in oklab, var(--ink) 55%, transparent)" }}>
                {cat?.name} · {product.technique}
              </div>
              <h2 style={{ margin: "6px 0 0", fontFamily: "var(--display)", fontWeight: 700, fontSize: 28, letterSpacing: "-0.02em", lineHeight: 1.1, color: "var(--ink)" }}>
                {product.name}
              </h2>
              <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                <PersonalizableTag />
                <StateBadge state={product.state} />
                {product.tags.slice(0, 3).map(t => (
                  <span key={t} style={{
                    fontSize: 10.5, fontFamily: "var(--mono)", textTransform: "uppercase", letterSpacing: ".05em",
                    border: "1px solid color-mix(in oklab, var(--ink) 14%, transparent)",
                    padding: "3px 7px", borderRadius: 999, color: "color-mix(in oklab, var(--ink) 70%, transparent)",
                  }}>{t}</span>
                ))}
              </div>
            </div>
            <button onClick={onClose} aria-label="Cerrar" style={{
              border: "1px solid color-mix(in oklab, var(--ink) 12%, transparent)",
              background: "var(--surface)", borderRadius: 999, width: 36, height: 36,
              display: "grid", placeItems: "center", cursor: "pointer", color: "var(--ink)",
            }}>
              <Icon.close size={16} />
            </button>
          </div>

          <p style={{
            margin: "16px 0 0", color: "color-mix(in oklab, var(--ink) 75%, transparent)",
            fontSize: 14.5, lineHeight: 1.55, textWrap: "pretty",
          }}>
            Producto totalmente personalizable. Ideal para {product.tags.slice(0,2).join(", ").toLowerCase()}. 
            Aplicamos {product.technique.toLowerCase()} con acabado profesional para que tu idea destaque.
          </p>

          <div style={{ overflow: "auto", marginTop: 20, paddingRight: 4, display: "flex", flexDirection: "column", gap: 16 }}>
            <SpecRow label="Material" value={product.material} />
            <SpecRow label="Colores / variantes" value={product.colors.join(" · ")} />
            <SpecRow label="Pedido mínimo" value={product.min === 1 ? "1 unidad" : `${product.min} unidades`} />
            <SpecRow label="Tiempo de entrega" value={product.lead} />
            <SpecRow label="Rango de precio" value={product.priceFrom != null ? `Desde $${product.priceFrom.toFixed(2)} · varía según cantidad y diseño` : "Cotización a la medida"} />
            <div>
              <Label>¿Qué se puede personalizar?</Label>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
                {["Logo", "Nombre", "Frase", "Foto", "Colores marca"].map(x => (
                  <span key={x} style={{
                    fontSize: 12, fontFamily: "var(--mono)",
                    background: "color-mix(in oklab, var(--accent) 8%, transparent)",
                    border: "1px solid color-mix(in oklab, var(--accent) 25%, transparent)",
                    color: "var(--accent-deep)",
                    padding: "5px 10px", borderRadius: 999,
                  }}>{x}</span>
                ))}
              </div>
            </div>
            <div>
              <Label>Casos de uso</Label>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
                {product.tags.map(t => (
                  <span key={t} style={{
                    fontSize: 12, padding: "5px 10px", borderRadius: 999,
                    background: "var(--cream-2)", color: "var(--ink)",
                  }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Cantidad + notas */}
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 12, alignItems: "end" }}>
              <div>
                <Label>Cantidad</Label>
                <div style={{ display: "flex", alignItems: "center", marginTop: 6, border: "1px solid color-mix(in oklab, var(--ink) 14%, transparent)", borderRadius: 8, overflow: "hidden", height: 40 }}>
                  <button onClick={() => setQty(Math.max(product.min, qty - 1))} style={qtyBtn}>−</button>
                  <input value={qty} onChange={(e) => setQty(Math.max(product.min, parseInt(e.target.value)||product.min))} style={{ width: 56, textAlign: "center", border: "none", background: "transparent", fontFamily: "var(--mono)", fontSize: 14, color: "var(--ink)" }} />
                  <button onClick={() => setQty(qty + 1)} style={qtyBtn}>+</button>
                </div>
              </div>
              <div>
                <Label>Notas para tu cotización</Label>
                <input value={notes} onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ej: logo en dorado, entrega 12 dic"
                  style={{
                    marginTop: 6, width: "100%", height: 40, padding: "0 12px",
                    border: "1px solid color-mix(in oklab, var(--ink) 14%, transparent)",
                    borderRadius: 8, fontFamily: "var(--ui)", fontSize: 14, color: "var(--ink)",
                    background: "var(--surface)",
                  }} />
              </div>
            </div>
          </div>

          {/* CTA fijo */}
          <div style={{
            marginTop: 16, padding: "16px 0",
            borderTop: "1px solid color-mix(in oklab, var(--ink) 8%, transparent)",
            display: "flex", gap: 8, alignItems: "center",
          }}>
            <button className="m-btn m-btn-primary" onClick={submit} style={{ flex: 1, padding: "13px 18px", fontSize: 14 }}>
              <Icon.whatsapp size={16} /> Solicitar cotización
            </button>
            <button className="m-btn m-btn-ghost" title="Compartir" style={{ padding: 12 }}>
              <Icon.share size={16} />
            </button>
            <button className="m-btn m-btn-ghost" title="Guardar idea" style={{ padding: 12 }}>
              <Icon.bookmark size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const qtyBtn = {
  width: 38, height: "100%", border: "none", background: "var(--cream-1)",
  cursor: "pointer", fontSize: 18, color: "var(--ink)", fontFamily: "var(--mono)",
};

function Label({ children }) {
  return <div style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: ".09em", color: "color-mix(in oklab, var(--ink) 55%, transparent)", textTransform: "uppercase" }}>{children}</div>;
}

function SpecRow({ label, value }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 16, alignItems: "baseline" }}>
      <Label>{label}</Label>
      <div style={{ fontSize: 14, color: "var(--ink)" }}>{value}</div>
    </div>
  );
}

Object.assign(window, { ProductCard, QuickViewModal });
