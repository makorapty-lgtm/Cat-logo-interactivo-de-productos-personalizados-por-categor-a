// Makora — Filters: desktop bar + mobile drawer + active chips

function FilterBar({ filters, setFilters, count, sort, setSort, view, setView, openDrawer, isMobile }) {
  const F = window.MAKORA_FILTERS;

  if (isMobile) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderBottom: "1px solid color-mix(in oklab, var(--ink) 8%, transparent)", background: "var(--surface)", position: "sticky", top: 56, zIndex: 30 }}>
        <button className="m-btn m-btn-ghost" onClick={openDrawer} style={{ padding: "9px 12px", fontSize: 13 }}>
          <Icon.filter size={15} /> Filtros
          {totalActive(filters) > 0 && <span style={chipCount}>{totalActive(filters)}</span>}
        </button>
        <select value={sort} onChange={(e) => setSort(e.target.value)} style={selectStyle}>
          <option value="featured">Destacados</option>
          <option value="popular">Más vendidos</option>
          <option value="recent">Más recientes</option>
          <option value="price">Precio base</option>
        </select>
        <span style={{ marginLeft: "auto", fontFamily: "var(--mono)", fontSize: 11, color: "color-mix(in oklab, var(--ink) 55%, transparent)" }}>
          {count} prod.
        </span>
      </div>
    );
  }

  return (
    <div style={{
      position: "sticky", top: 64, zIndex: 30,
      background: "color-mix(in oklab, var(--surface) 92%, transparent)",
      backdropFilter: "blur(8px)",
      borderBottom: "1px solid color-mix(in oklab, var(--ink) 8%, transparent)",
    }}>
      <div className="m-container" style={{ display: "flex", gap: 12, alignItems: "center", padding: "14px 0" }}>
        <FilterDropdown title="Categoría" options={window.MAKORA_CATEGORIES.map(c => ({ id: c.id, label: c.name }))}
          values={filters.cat} onChange={(v) => setFilters(f => ({ ...f, cat: v }))} />
        <FilterDropdown title="Técnica" options={F.techniques.map(t => ({ id: t, label: t }))}
          values={filters.tech} onChange={(v) => setFilters(f => ({ ...f, tech: v }))} />
        <FilterDropdown title="Ocasión" options={F.occasions.map(t => ({ id: t, label: t }))}
          values={filters.occ} onChange={(v) => setFilters(f => ({ ...f, occ: v }))} />
        <FilterDropdown title="Cliente" options={F.audiences.map(t => ({ id: t, label: t }))}
          values={filters.aud} onChange={(v) => setFilters(f => ({ ...f, aud: v }))} />
        <FilterDropdown title="Material" options={F.materials.map(t => ({ id: t, label: t }))}
          values={filters.mat} onChange={(v) => setFilters(f => ({ ...f, mat: v }))} />
        <FilterDropdown title="Precio" options={F.prices.map(p => ({ id: p.id, label: p.label }))}
          values={filters.price} onChange={(v) => setFilters(f => ({ ...f, price: v }))} />
        <FilterDropdown title="Entrega" options={F.leads.map(t => ({ id: t, label: t }))}
          values={filters.lead} onChange={(v) => setFilters(f => ({ ...f, lead: v }))} />

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "color-mix(in oklab, var(--ink) 55%, transparent)" }}>
            {count} productos
          </span>
          <select value={sort} onChange={(e) => setSort(e.target.value)} style={selectStyle}>
            <option value="featured">Ordenar: Destacados</option>
            <option value="popular">Más vendidos</option>
            <option value="recent">Más recientes</option>
            <option value="price">Precio base</option>
          </select>
          <div style={{ display: "flex", border: "1px solid color-mix(in oklab, var(--ink) 12%, transparent)", borderRadius: 8, overflow: "hidden" }}>
            <button onClick={() => setView("grid")} style={viewBtn(view === "grid")}><Icon.grid size={15}/></button>
            <button onClick={() => setView("rows")} style={viewBtn(view === "rows")}><Icon.rows size={15}/></button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterDropdown({ title, options, values, onChange }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  const toggle = (id) => {
    onChange(values.includes(id) ? values.filter(x => x !== id) : [...values, id]);
  };
  const has = values.length > 0;
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)} style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "8px 12px", borderRadius: 999,
        border: has ? "1px solid var(--accent)" : "1px solid color-mix(in oklab, var(--ink) 14%, transparent)",
        background: has ? "color-mix(in oklab, var(--accent) 10%, var(--surface))" : "var(--surface)",
        color: has ? "var(--accent-deep)" : "var(--ink)",
        fontSize: 13, fontFamily: "var(--ui)", cursor: "pointer", fontWeight: 500,
      }}>
        {title}
        {has && <span style={{ ...chipCount, background: "var(--accent)", color: "#fff" }}>{values.length}</span>}
        <Icon.chevron size={14} />
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", left: 0, zIndex: 40,
          background: "var(--surface)", border: "1px solid color-mix(in oklab, var(--ink) 10%, transparent)",
          borderRadius: 12, minWidth: 240, padding: 8,
          boxShadow: "0 20px 50px -10px color-mix(in oklab, var(--ink) 30%, transparent)",
          maxHeight: 320, overflow: "auto",
        }}>
          {options.map(o => {
            const sel = values.includes(o.id);
            return (
              <button key={o.id} onClick={() => toggle(o.id)} style={{
                display: "flex", alignItems: "center", gap: 8,
                width: "100%", padding: "8px 10px", borderRadius: 8,
                background: sel ? "color-mix(in oklab, var(--accent) 10%, transparent)" : "transparent",
                border: "none", cursor: "pointer", textAlign: "left",
                color: "var(--ink)", fontSize: 13.5,
              }}>
                <span style={{
                  width: 16, height: 16, borderRadius: 4,
                  border: sel ? "none" : "1px solid color-mix(in oklab, var(--ink) 25%, transparent)",
                  background: sel ? "var(--accent)" : "transparent",
                  display: "grid", placeItems: "center", color: "#fff",
                  flexShrink: 0,
                }}>{sel && <Icon.check size={11}/>}</span>
                {o.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ActiveChips({ filters, setFilters, query, setQuery }) {
  const all = [];
  filters.cat.forEach(id => {
    const c = window.MAKORA_CATEGORIES.find(x => x.id === id);
    all.push({ k: "cat", id, label: c?.name || id });
  });
  filters.tech.forEach(id => all.push({ k: "tech", id, label: id }));
  filters.occ.forEach(id => all.push({ k: "occ", id, label: id }));
  filters.aud.forEach(id => all.push({ k: "aud", id, label: id }));
  filters.mat.forEach(id => all.push({ k: "mat", id, label: id }));
  filters.price.forEach(id => {
    const p = window.MAKORA_FILTERS.prices.find(x => x.id === id);
    all.push({ k: "price", id, label: p?.label || id });
  });
  filters.lead.forEach(id => all.push({ k: "lead", id, label: id }));
  if (query) all.push({ k: "q", id: "q", label: `"${query}"` });

  if (all.length === 0) return null;

  const remove = (k, id) => {
    if (k === "q") setQuery("");
    else setFilters(f => ({ ...f, [k]: f[k].filter(x => x !== id) }));
  };
  const clearAll = () => {
    setFilters({ cat: [], tech: [], occ: [], aud: [], mat: [], price: [], lead: [] });
    setQuery("");
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", padding: "12px 0" }}>
      <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".08em", color: "color-mix(in oklab, var(--ink) 55%, transparent)", textTransform: "uppercase" }}>
        Filtros activos
      </span>
      {all.map((c, i) => (
        <span key={i} style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "5px 6px 5px 12px", borderRadius: 999,
          background: "color-mix(in oklab, var(--accent) 10%, transparent)",
          color: "var(--accent-deep)", fontSize: 12.5, fontWeight: 500,
        }}>
          {c.label}
          <button onClick={() => remove(c.k, c.id)} aria-label="Quitar" style={{
            border: "none", background: "color-mix(in oklab, var(--accent) 25%, transparent)", color: "var(--accent-deep)",
            width: 18, height: 18, borderRadius: 999, cursor: "pointer",
            display: "grid", placeItems: "center",
          }}><Icon.close size={10}/></button>
        </span>
      ))}
      <button onClick={clearAll} style={{
        background: "transparent", border: "none", color: "var(--ink)",
        textDecoration: "underline", cursor: "pointer", fontSize: 12.5, padding: "4px 8px",
        fontFamily: "var(--ui)",
      }}>Limpiar todo</button>
    </div>
  );
}

function FilterDrawer({ open, onClose, filters, setFilters, sort, setSort }) {
  const F = window.MAKORA_FILTERS;
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 70,
      background: "color-mix(in oklab, var(--ink) 50%, transparent)",
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        position: "absolute", right: 0, top: 0, bottom: 0,
        width: "min(380px, 92%)", background: "var(--surface)",
        display: "flex", flexDirection: "column", overflow: "hidden",
      }}>
        <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid color-mix(in oklab, var(--ink) 8%, transparent)" }}>
          <strong style={{ fontFamily: "var(--display)", fontSize: 18, color: "var(--ink)" }}>Filtros</strong>
          <button onClick={onClose} style={{ border: "none", background: "transparent", color: "var(--ink)", cursor: "pointer" }}>
            <Icon.close />
          </button>
        </div>
        <div style={{ flex: 1, overflow: "auto", padding: "8px 20px 20px" }}>
          <DrawerSection title="Categoría" options={window.MAKORA_CATEGORIES.map(c => ({id: c.id, label: c.name}))} values={filters.cat} onChange={v => setFilters(f => ({...f, cat: v}))} />
          <DrawerSection title="Técnica" options={F.techniques.map(t => ({id:t, label:t}))} values={filters.tech} onChange={v => setFilters(f => ({...f, tech: v}))} />
          <DrawerSection title="Ocasión" options={F.occasions.map(t => ({id:t, label:t}))} values={filters.occ} onChange={v => setFilters(f => ({...f, occ: v}))} />
          <DrawerSection title="Cliente" options={F.audiences.map(t => ({id:t, label:t}))} values={filters.aud} onChange={v => setFilters(f => ({...f, aud: v}))} />
          <DrawerSection title="Material" options={F.materials.map(t => ({id:t, label:t}))} values={filters.mat} onChange={v => setFilters(f => ({...f, mat: v}))} />
          <DrawerSection title="Precio" options={F.prices.map(p => ({id:p.id, label:p.label}))} values={filters.price} onChange={v => setFilters(f => ({...f, price: v}))} />
          <DrawerSection title="Entrega" options={F.leads.map(t => ({id:t, label:t}))} values={filters.lead} onChange={v => setFilters(f => ({...f, lead: v}))} />
        </div>
        <div style={{ padding: 16, borderTop: "1px solid color-mix(in oklab, var(--ink) 8%, transparent)", display: "flex", gap: 8 }}>
          <button onClick={() => setFilters({cat:[],tech:[],occ:[],aud:[],mat:[],price:[],lead:[]})}
            className="m-btn m-btn-ghost" style={{ flex: 1, padding: "12px" }}>Limpiar</button>
          <button onClick={onClose} className="m-btn m-btn-primary" style={{ flex: 2, padding: "12px" }}>Ver resultados</button>
        </div>
      </div>
    </div>
  );
}

function DrawerSection({ title, options, values, onChange }) {
  const [open, setOpen] = React.useState(true);
  const toggle = (id) => onChange(values.includes(id) ? values.filter(x => x !== id) : [...values, id]);
  return (
    <div style={{ borderBottom: "1px solid color-mix(in oklab, var(--ink) 6%, transparent)", padding: "14px 0" }}>
      <button onClick={() => setOpen(!open)} style={{
        display: "flex", justifyContent: "space-between", width: "100%",
        background: "transparent", border: "none", padding: 0, cursor: "pointer",
        color: "var(--ink)", fontFamily: "var(--display)", fontSize: 14, fontWeight: 600,
      }}>
        {title} {values.length > 0 && <span style={{ ...chipCount, background: "var(--accent)", color: "#fff" }}>{values.length}</span>}
        <span style={{ marginLeft: "auto", transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }}><Icon.chevron size={14}/></span>
      </button>
      {open && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
          {options.map(o => {
            const sel = values.includes(o.id);
            return (
              <button key={o.id} onClick={() => toggle(o.id)} style={{
                padding: "6px 12px", borderRadius: 999, fontSize: 12.5,
                border: sel ? "1px solid var(--accent)" : "1px solid color-mix(in oklab, var(--ink) 14%, transparent)",
                background: sel ? "color-mix(in oklab, var(--accent) 12%, transparent)" : "var(--surface)",
                color: sel ? "var(--accent-deep)" : "var(--ink)",
                cursor: "pointer", fontFamily: "var(--ui)",
              }}>{o.label}</button>
            );
          })}
        </div>
      )}
    </div>
  );
}

const chipCount = { display: "inline-grid", placeItems: "center", minWidth: 18, height: 18, borderRadius: 999, background: "color-mix(in oklab, var(--ink) 12%, transparent)", color: "var(--ink)", fontSize: 11, fontFamily: "var(--mono)", padding: "0 6px" };
const selectStyle = { padding: "8px 12px", borderRadius: 8, border: "1px solid color-mix(in oklab, var(--ink) 14%, transparent)", background: "var(--surface)", color: "var(--ink)", fontFamily: "var(--ui)", fontSize: 13, cursor: "pointer" };
const viewBtn = (active) => ({ padding: "7px 10px", border: "none", background: active ? "var(--ink)" : "var(--surface)", color: active ? "var(--cream-1)" : "var(--ink)", cursor: "pointer", display: "grid", placeItems: "center" });

function totalActive(f) {
  return f.cat.length + f.tech.length + f.occ.length + f.aud.length + f.mat.length + f.price.length + f.lead.length;
}

Object.assign(window, { FilterBar, FilterDrawer, ActiveChips, totalActive });
