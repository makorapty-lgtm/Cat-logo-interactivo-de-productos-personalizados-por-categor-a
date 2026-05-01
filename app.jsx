// Makora — App shell: state + filters + grid + assembly

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "teal",
  "typography": "geist",
  "dark": false,
  "density": "comfy",
  "cardStyle": "soft",
  "tone": "cercano"
}/*EDITMODE-END*/;

const ACCENTS = {
  teal:     { name: "Teal Makora",  base: "#0F9787", deep: "#0A6A60", soft: "#E5F3F0" },
  navy:     { name: "Marino",       base: "#2D4A6B", deep: "#1A2E45", soft: "#E6ECF2" },
  terra:    { name: "Terracota",    base: "#C8553D", deep: "#8E3A28", soft: "#F6E3DD" },
  mustard:  { name: "Mostaza",      base: "#B8862F", deep: "#7E5A18", soft: "#F4ECDB" },
  forest:   { name: "Bosque",       base: "#1F6B4A", deep: "#114230", soft: "#E1EEE7" },
};

const TYPOGRAPHY = {
  geist:    { display: "'Geist', system-ui, sans-serif", ui: "'Geist', system-ui, sans-serif", mono: "'JetBrains Mono', ui-monospace, monospace" },
  manrope:  { display: "'Manrope', system-ui, sans-serif", ui: "'Manrope', system-ui, sans-serif", mono: "'JetBrains Mono', ui-monospace, monospace" },
  editorial:{ display: "'Fraunces', Georgia, serif", ui: "'Geist', system-ui, sans-serif", mono: "'JetBrains Mono', ui-monospace, monospace" },
};

const TONES = {
  cercano: {
    heroTitle: <>Productos personalizados<br/><span style={{ color: "var(--accent)" }}>para regalos, eventos<br/>y empresas.</span></>,
    heroSub: "Sublimación, vinil textil, vinil imprimible e impresión 3D. Cotiza tu idea y la hacemos realidad — desde 1 unidad hasta volumen corporativo.",
    cta: "Cotiza tu idea",
  },
  profesional: {
    heroTitle: <>Personalización<br/><span style={{ color: "var(--accent)" }}>profesional para marcas, eventos y producción a medida.</span></>,
    heroSub: "Servicios de sublimación, vinil, vinil textil imprimible e impresión 3D. Producción flexible desde 1 unidad hasta lotes corporativos con tiempos garantizados.",
    cta: "Solicita propuesta",
  },
};

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const accent = ACCENTS[tweaks.accent] || ACCENTS.teal;
  const typo = TYPOGRAPHY[tweaks.typography] || TYPOGRAPHY.geist;
  const dark = tweaks.dark;
  const density = tweaks.density;
  const cardStyle = tweaks.cardStyle;

  const [query, setQuery] = React.useState("");
  const [filters, setFilters] = React.useState({ cat: [], tech: [], occ: [], aud: [], mat: [], price: [], lead: [] });
  const [sort, setSort] = React.useState("featured");
  const [view, setView] = React.useState("grid");
  const [drawer, setDrawer] = React.useState(false);
  const [openProduct, setOpenProduct] = React.useState(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 820);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Quote helper bound to globals
  React.useEffect(() => {
    window.makoraQuote = (product, ctx = {}) => {
      const phone = "50768374844";
      let txt;
      if (product) {
        txt = `Hola Makora 👋\nQuiero cotizar: *${product.name}*\nCategoría: ${product.cat}\nTécnica: ${product.technique}`;
        if (ctx.qty) txt += `\nCantidad: ${ctx.qty}`;
        if (ctx.notes) txt += `\nNotas: ${ctx.notes}`;
      } else if (ctx.type === "corporativo") {
        txt = "Hola Makora 👋\nMe interesa una *cotización corporativa* para mi empresa. ¿Podemos coordinar?";
      } else if (ctx.type === "kit") {
        txt = "Hola Makora 👋\nQuiero solicitar un *kit de muestra* para evaluar productos personalizados.";
      } else if (ctx.type === "temporada") {
        txt = "Hola Makora 👋\nMe gustaría ver el *calendario de temporadas* y reservar producción.";
      } else if (ctx.customer || ctx.message) {
        txt = `Hola Makora 👋\nSoy ${ctx.customer || "cliente nuevo"}.\nMi WhatsApp: ${ctx.phone || "—"}\n${ctx.message || ""}`;
      } else {
        txt = "Hola Makora 👋\nQuiero solicitar una cotización.";
      }
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(txt)}`, "_blank");
    };
  }, []);

  // Filter products
  const filtered = React.useMemo(() => {
    let list = window.MAKORA_PRODUCTS.slice();
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(p => (p.name + " " + p.technique + " " + p.tags.join(" ") + " " + p.material).toLowerCase().includes(q));
    }
    if (filters.cat.length) list = list.filter(p => filters.cat.includes(p.cat));
    if (filters.tech.length) list = list.filter(p => filters.tech.some(t => p.technique.toLowerCase().includes(t.toLowerCase())));
    if (filters.occ.length) list = list.filter(p => filters.occ.some(o => p.tags.includes(o)));
    if (filters.aud.length) list = list.filter(p => filters.aud.some(a => p.tags.includes(a)));
    if (filters.mat.length) list = list.filter(p => filters.mat.some(m => p.material.toLowerCase().includes(m.toLowerCase())));
    if (filters.price.length) {
      list = list.filter(p => filters.price.some(id => {
        const range = window.MAKORA_FILTERS.prices.find(x => x.id === id);
        if (!range) return false;
        if (range.quoteOnly) return p.priceFrom == null;
        if (p.priceFrom == null) return false;
        if (range.min != null && p.priceFrom < range.min) return false;
        if (range.max != null && p.priceFrom > range.max) return false;
        return true;
      }));
    }
    if (filters.lead.length) list = list.filter(p => filters.lead.some(l => p.lead === l || (l === "Cotización" && p.lead === "Cotización")));

    if (sort === "popular") list.sort((a,b) => (b.state==="popular"||b.state==="bestseller") - (a.state==="popular"||a.state==="bestseller"));
    else if (sort === "recent") list.sort((a,b) => (b.state==="nuevo") - (a.state==="nuevo"));
    else if (sort === "price") list.sort((a,b) => (a.priceFrom??9999) - (b.priceFrom??9999));
    else list.sort((a,b) => (b.state==="destacado") - (a.state==="destacado"));
    return list;
  }, [query, filters, sort]);

  const tone = TONES[tweaks.tone] || TONES.cercano;

  // CSS variables
  const cssVars = dark ? {
    "--ink": "#F6F2EB",
    "--surface": "#0E1326",
    "--cream-1": "#161C36",
    "--cream-2": "#1E254A",
    "--accent": accent.base,
    "--accent-deep": "#fff",
    "--accent-soft": "#161C36",
    "--mustard": "#D9A04C",
  } : {
    "--ink": "#13224A",
    "--surface": "#FFFFFF",
    "--cream-1": "#F6F2EB",
    "--cream-2": "#EDE6D8",
    "--accent": accent.base,
    "--accent-deep": accent.deep,
    "--accent-soft": accent.soft,
    "--mustard": "#C8853D",
  };

  return (
    <div id="top" style={{
      ...cssVars,
      "--display": typo.display, "--ui": typo.ui, "--mono": typo.mono,
      background: "var(--surface)", color: "var(--ink)",
      fontFamily: typo.ui, minHeight: "100vh",
      colorScheme: dark ? "dark" : "light",
    }}>
      <Header
        query={query} setQuery={setQuery}
        onCotizar={() => window.makoraQuote()}
        dark={dark} setDark={(v) => setTweak("dark", v)}
        onMenu={() => setDrawer(true)}
        isMobile={isMobile}
      />
      <Hero tone={tone} />
      <CategoriesGrid onPick={(catId) => {
        setFilters(f => ({ ...f, cat: [catId] }));
        document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }} />

      <section id="catalogo">
        <div className="m-container" style={{ paddingTop: 64, paddingBottom: 16 }}>
          <SectionHead eyebrow="Catálogo" title="Explora todos los productos personalizables" sub="Filtra por categoría, técnica, ocasión o cliente. Cada producto se adapta a tu idea, marca o evento." />
        </div>
        <FilterBar filters={filters} setFilters={setFilters} count={filtered.length} sort={sort} setSort={setSort} view={view} setView={setView} openDrawer={() => setDrawer(true)} isMobile={isMobile} />
        <div className="m-container">
          <ActiveChips filters={filters} setFilters={setFilters} query={query} setQuery={setQuery} />

          {filtered.length === 0 ? (
            <div style={{ padding: "80px 20px", textAlign: "center", border: "1px dashed color-mix(in oklab, var(--ink) 18%, transparent)", borderRadius: 14, marginBottom: 64 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".08em", color: "color-mix(in oklab, var(--ink) 55%, transparent)" }}>SIN RESULTADOS</div>
              <h3 style={{ margin: "10px 0 6px", fontFamily: "var(--display)", fontWeight: 700, fontSize: 22, color: "var(--ink)" }}>No encontramos productos con esos filtros</h3>
              <p style={{ margin: 0, color: "color-mix(in oklab, var(--ink) 65%, transparent)" }}>Limpia algunos filtros o pídenos cotización a medida.</p>
              <button onClick={() => window.makoraQuote()} className="m-btn m-btn-primary" style={{ marginTop: 18, padding: "11px 18px" }}>
                <Icon.whatsapp size={14}/> Cotizar a medida
              </button>
            </div>
          ) : (
            <div className={view === "rows" ? "m-grid m-grid-rows" : "m-grid"} style={{
              display: "grid",
              gridTemplateColumns: view === "rows"
                ? "repeat(auto-fill, minmax(360px, 1fr))"
                : (density === "compact" ? "repeat(auto-fill, minmax(200px, 1fr))" : "repeat(auto-fill, minmax(240px, 1fr))"),
              gap: density === "compact" ? 12 : 18,
              paddingBottom: 64,
            }}>
              {filtered.map(p => (
                <ProductCard key={p.id} product={p} onOpen={setOpenProduct} density={density} style={cardStyle} />
              ))}
            </div>
          )}
        </div>
      </section>

      <ProcessSection />
      <CorporateBlock />
      <SeasonsBlock />
      <FinalCTA />
      <Footer />

      <FilterDrawer open={drawer} onClose={() => setDrawer(false)} filters={filters} setFilters={setFilters} sort={sort} setSort={setSort} />
      <QuickViewModal product={openProduct} onClose={() => setOpenProduct(null)} />

      {/* Floating WhatsApp */}
      <button onClick={() => window.makoraQuote()} className="m-fab" aria-label="Cotizar por WhatsApp" style={{
        position: "fixed", right: 22, bottom: 22, zIndex: 60,
        width: 56, height: 56, borderRadius: 999,
        background: "#25D366", color: "white", border: "none",
        display: "grid", placeItems: "center", cursor: "pointer",
        boxShadow: "0 14px 30px -8px rgba(37,211,102,.55), 0 4px 10px rgba(0,0,0,.15)",
      }}>
        <Icon.whatsapp size={26} />
      </button>

      <TweaksUI tweaks={tweaks} setTweak={setTweak} />
    </div>
  );
}

function TweaksUI({ tweaks, setTweak }) {
  return (
    <TweaksPanel title="Tweaks · Makora">
      <TweakSection label="Apariencia" />
      <div className="twk-row">
        <div className="twk-row-h">
          <span style={{ fontSize: 12, color: "rgba(255,255,255,.7)" }}>Color de acento</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 6, marginTop: 8 }}>
          {Object.entries(ACCENTS).map(([k, v]) => (
            <button key={k} onClick={() => setTweak("accent", k)} title={v.name} style={{
              padding: 0, borderRadius: 8, border: tweaks.accent === k ? "2px solid #fff" : "1px solid rgba(255,255,255,.15)",
              background: v.base, height: 32, cursor: "pointer",
            }}/>
          ))}
        </div>
      </div>
      <TweakRadio label="Tipografía" value={tweaks.typography} onChange={v => setTweak("typography", v)}
        options={["geist","manrope","editorial"]}/>
      <TweakToggle label="Modo oscuro" value={tweaks.dark} onChange={v => setTweak("dark", v)}/>
      <TweakSection label="Catálogo" />
      <TweakRadio label="Densidad" value={tweaks.density} onChange={v => setTweak("density", v)}
        options={["comfy","compact"]}/>
      <TweakRadio label="Tarjeta" value={tweaks.cardStyle} onChange={v => setTweak("cardStyle", v)}
        options={["soft","flat","elevated"]}/>
      <TweakRadio label="Tono" value={tweaks.tone} onChange={v => setTweak("tone", v)}
        options={["cercano","profesional"]}/>
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
