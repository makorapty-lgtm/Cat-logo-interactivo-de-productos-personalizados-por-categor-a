// Makora — Sections (Hero, Categories, Process, Corporate, Seasons, CTA, Footer)

function Header({ query, setQuery, onOpenCat, onCotizar, dark, setDark, onMenu, isMobile }) {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "color-mix(in oklab, var(--surface) 92%, transparent)",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid color-mix(in oklab, var(--ink) 8%, transparent)",
    }}>
      <div className="m-container" style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 0", height: 56 }}>
        <a href="#top" style={{ textDecoration: "none" }}>
          <MakoraLogo size={26} dark={dark} />
        </a>
        {!isMobile && (
          <nav style={{ display: "flex", gap: 22, marginLeft: 28 }}>
            {[
              ["Catálogo", "#catalogo"],
              ["Categorías", "#categorias"],
              ["Cómo funciona", "#proceso"],
              ["Corporativo", "#corporativo"],
              ["Temporadas", "#temporadas"],
            ].map(([l, h]) => (
              <a key={l} href={h} style={{
                color: "color-mix(in oklab, var(--ink) 75%, transparent)",
                textDecoration: "none", fontSize: 13.5, fontWeight: 500,
              }}>{l}</a>
            ))}
          </nav>
        )}
        <div style={{ flex: 1 }} />
        {!isMobile && (
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "var(--cream-1)", borderRadius: 999,
            padding: "7px 14px", width: 280,
            border: "1px solid color-mix(in oklab, var(--ink) 8%, transparent)",
          }}>
            <Icon.search size={15} />
            <input value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Busca tazas, hoodies, kits…"
              style={{ border: "none", background: "transparent", outline: "none", flex: 1, fontSize: 13, color: "var(--ink)", fontFamily: "var(--ui)" }}
            />
          </div>
        )}
        <button onClick={() => setDark(!dark)} className="m-btn m-btn-ghost" title="Cambiar tema" style={{ padding: 9 }}>
          {dark ? <Icon.sun size={16}/> : <Icon.moon size={16}/>}
        </button>
        {!isMobile && (
          <button onClick={onCotizar} className="m-btn m-btn-primary" style={{ padding: "9px 14px", fontSize: 13 }}>
            <Icon.whatsapp size={14}/> Cotizar
          </button>
        )}
        {isMobile && (
          <button onClick={onMenu} className="m-btn m-btn-ghost" style={{ padding: 9 }}>
            <Icon.menu size={18}/>
          </button>
        )}
      </div>
    </header>
  );
}

function Hero({ tone }) {
  const t = tone || { heroTitle: <>Productos personalizados<br/><span style={{ color: "var(--accent)" }}>para regalos, eventos<br/>y empresas.</span></>, heroSub: "Sublimación, vinil textil, vinil imprimible e impresión 3D. Cotiza tu idea y la hacemos realidad — desde 1 unidad hasta volumen corporativo." };
  return (
    <section style={{ position: "relative", overflow: "hidden", paddingTop: 28 }}>
      <div className="m-container" style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 56, alignItems: "center", padding: "48px 0 72px" }} id="hero-grid">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 12px", borderRadius: 999, background: "color-mix(in oklab, var(--accent) 10%, transparent)", color: "var(--accent-deep)", fontSize: 12, fontFamily: "var(--mono)", letterSpacing: ".06em", textTransform: "uppercase" }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--accent)" }}/> Hecho en Panamá
          </div>
          <h1 style={{
            margin: "20px 0 0", fontFamily: "var(--display)", fontWeight: 700,
            fontSize: "clamp(40px, 5.6vw, 76px)", lineHeight: 0.98, letterSpacing: "-0.035em",
            color: "var(--ink)", textWrap: "balance",
          }}>
            {t.heroTitle}
          </h1>
          <p style={{
            margin: "20px 0 0", fontSize: 17.5, lineHeight: 1.55,
            color: "color-mix(in oklab, var(--ink) 75%, transparent)", maxWidth: 520, textWrap: "pretty",
          }}>
            {t.heroSub}
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 28, flexWrap: "wrap" }}>
            <a href="#catalogo" className="m-btn m-btn-primary" style={{ padding: "14px 22px", fontSize: 14 }}>
              Ver catálogo <Icon.arrow size={16}/>
            </a>
            <button onClick={() => window.makoraQuote()} className="m-btn m-btn-outline" style={{ padding: "14px 22px", fontSize: 14 }}>
              <Icon.whatsapp size={15}/> Solicitar cotización
            </button>
          </div>
          <div style={{ display: "flex", gap: 28, marginTop: 36 }}>
            {[
              ["+60", "productos"],
              ["6", "categorías"],
              ["3–10 días", "entrega típica"],
              ["1 unid.", "pedido mínimo"],
            ].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 22, color: "var(--ink)", letterSpacing: "-0.01em" }}>{n}</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: "color-mix(in oklab, var(--ink) 55%, transparent)", marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Composición visual: collage editorial */}
        <div style={{ position: "relative", aspectRatio: "1/1.08", maxWidth: 560, marginLeft: "auto" }}>
          <div style={{ position: "absolute", left: "0%", top: "5%", width: "55%", transform: "rotate(-3deg)" }}>
            <ProductPlaceholder label="HOODIE" sub="DTF · French terry" accent="#13224A" ratio="3/4" img="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80" />
          </div>
          <div style={{ position: "absolute", right: "0%", top: "0%", width: "48%", transform: "rotate(2deg)" }}>
            <ProductPlaceholder label="TAZA 11oz" sub="Sublimación full color" accent="#0F9787" ratio="1/1" img="https://images.unsplash.com/photo-1572119003128-d110c07af847?w=600&auto=format&fit=crop&q=80" />
          </div>
          <div style={{ position: "absolute", right: "5%", bottom: "8%", width: "50%", transform: "rotate(-2deg)" }}>
            <ProductPlaceholder label="LLAVERO 3D" sub="PLA mate" accent="#C8853D" ratio="4/5" img="https://images.unsplash.com/photo-1631544114551-99c4b40f5b79?w=600&auto=format&fit=crop&q=80" />
          </div>
          <div style={{ position: "absolute", left: "8%", bottom: "0%", width: "42%", transform: "rotate(4deg)" }}>
            <ProductPlaceholder label="GIFT BOX" sub="Kit corporativo" accent="#0F9787" ratio="1/1" img="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=80" />
          </div>
          <div style={{
            position: "absolute", right: "-12px", top: "44%",
            background: "var(--ink)", color: "var(--cream-1)",
            padding: "10px 14px", borderRadius: 12, transform: "rotate(-4deg)",
            fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase",
            boxShadow: "0 12px 30px -10px rgba(0,0,0,.3)",
          }}>
            <div style={{ opacity: .7, marginBottom: 2 }}>Personaliza con</div>
            <div style={{ fontWeight: 700, fontSize: 13 }}>Logo · Nombre · Foto</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoriesGrid({ onPick }) {
  const cats = window.MAKORA_CATEGORIES;
  const counts = cats.map(c => window.MAKORA_PRODUCTS.filter(p => p.cat === c.id).length);
  return (
    <section id="categorias" style={{ background: "var(--cream-1)", padding: "80px 0", borderTop: "1px solid color-mix(in oklab, var(--ink) 8%, transparent)", borderBottom: "1px solid color-mix(in oklab, var(--ink) 8%, transparent)" }}>
      <div className="m-container">
        <SectionHead eyebrow="Explora por categoría" title="Encuentra la opción ideal" sub="Personaliza con nombre, logo, frase o diseño. Cada categoría escala desde 1 unidad hasta pedidos por volumen." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 36 }} className="m-cat-grid">
          {cats.map((c, i) => (
            <button key={c.id} onClick={() => onPick(c.id)} className="m-cat" style={{
              textAlign: "left", padding: 0, border: "1px solid color-mix(in oklab, var(--ink) 10%, transparent)",
              background: "var(--surface)", borderRadius: 14, overflow: "hidden", cursor: "pointer",
              display: "flex", flexDirection: "column",
            }}>
              <div style={{ position: "relative" }}>
                <ProductPlaceholder label={c.name.toUpperCase()} sub={`${counts[i]} productos`} accent={c.accent} ratio="16/10" img={c.heroImg} />
              </div>
              <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <h3 style={{ margin: 0, fontFamily: "var(--display)", fontWeight: 700, fontSize: 19, color: "var(--ink)", letterSpacing: "-0.01em" }}>{c.name}</h3>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "color-mix(in oklab, var(--ink) 55%, transparent)" }}>{counts[i]} productos</span>
                </div>
                <p style={{ margin: 0, fontSize: 14, color: "color-mix(in oklab, var(--ink) 70%, transparent)", lineHeight: 1.5, textWrap: "pretty" }}>{c.desc}</p>
                <span style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--ui)", fontSize: 13, fontWeight: 600, color: "var(--accent-deep)" }}>
                  Explorar <Icon.arrow size={14}/>
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, sub, align = "left" }) {
  return (
    <div style={{ textAlign: align, maxWidth: 680, ...(align === "center" ? { margin: "0 auto" } : {}) }}>
      <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--accent-deep)" }}>{eyebrow}</div>
      <h2 style={{ margin: "10px 0 0", fontFamily: "var(--display)", fontWeight: 700, fontSize: "clamp(28px, 3.4vw, 44px)", letterSpacing: "-0.025em", color: "var(--ink)", lineHeight: 1.05, textWrap: "balance" }}>{title}</h2>
      {sub && <p style={{ margin: "12px 0 0", fontSize: 16, color: "color-mix(in oklab, var(--ink) 70%, transparent)", lineHeight: 1.55, textWrap: "pretty" }}>{sub}</p>}
    </div>
  );
}

function ProcessSection() {
  const steps = [
    ["01", "Elige producto", "Explora el catálogo y guarda los que más te gusten."],
    ["02", "Define tu diseño", "Envíanos logo, foto, frase o tu idea — nosotros la adaptamos."],
    ["03", "Recibe cotización", "Te respondemos por WhatsApp con precio, tiempo y mockup."],
    ["04", "Producción", "Aprobamos el arte y entramos a producción con calidad pro."],
    ["05", "Entrega", "Recogida en taller o envío en Panamá según tu necesidad."],
  ];
  return (
    <section id="proceso" style={{ padding: "96px 0" }}>
      <div className="m-container">
        <SectionHead eyebrow="Cómo funciona" title="De tu idea al producto en 5 pasos" sub="Sin fricción y sin sorpresas. Diseñamos un proceso simple para que pidas con confianza." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 14, marginTop: 40 }} className="m-process">
          {steps.map(([n, t, d], i) => (
            <div key={n} style={{
              border: "1px solid color-mix(in oklab, var(--ink) 10%, transparent)",
              borderRadius: 14, padding: 22, background: "var(--surface)",
              display: "flex", flexDirection: "column", gap: 10, position: "relative",
            }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--accent-deep)", letterSpacing: ".06em" }}>{n}</div>
              <h3 style={{ margin: 0, fontFamily: "var(--display)", fontWeight: 700, fontSize: 17, color: "var(--ink)", letterSpacing: "-0.01em" }}>{t}</h3>
              <p style={{ margin: 0, fontSize: 13.5, color: "color-mix(in oklab, var(--ink) 70%, transparent)", lineHeight: 1.5 }}>{d}</p>
              {i < 4 && <div className="m-step-arrow" style={{ position: "absolute", right: -10, top: "50%", color: "color-mix(in oklab, var(--ink) 25%, transparent)" }}><Icon.arrow size={16}/></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CorporateBlock() {
  const items = [
    "Regalos promocionales con tu logo",
    "Branding completo para eventos y ferias",
    "Pedidos por volumen con descuentos progresivos",
    "Kits corporativos personalizados",
    "Onboarding de nuevos empleados",
    "Reconocimientos y premios a la medida",
  ];
  return (
    <section id="corporativo" style={{ background: "var(--ink)", color: "var(--cream-1)", padding: "96px 0" }}>
      <div className="m-container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }} id="corp-grid">
        <div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "color-mix(in oklab, var(--accent) 90%, white)" }}>Para empresas</div>
          <h2 style={{ margin: "10px 0 0", fontFamily: "var(--display)", fontWeight: 700, fontSize: "clamp(28px, 3.6vw, 48px)", letterSpacing: "-0.025em", lineHeight: 1.05 }}>
            Branding tangible.<br/>Pedidos para clientes individuales y corporativos.
          </h2>
          <p style={{ margin: "16px 0 0", fontSize: 16, lineHeight: 1.55, color: "color-mix(in oklab, var(--cream-1) 75%, transparent)", maxWidth: 540 }}>
            Trabajamos con empresas, agencias y organizadores de eventos para producir kits y regalos que la gente realmente quiere usar.
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: "28px 0 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {items.map(i => (
              <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, lineHeight: 1.5 }}>
                <span style={{ marginTop: 2, color: "var(--accent)", flexShrink: 0 }}><Icon.check size={16}/></span>
                {i}
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", gap: 10, marginTop: 28, flexWrap: "wrap" }}>
            <button onClick={() => window.makoraQuote(null, { type: "corporativo" })} className="m-btn m-btn-primary" style={{ padding: "13px 20px", fontSize: 14 }}>
              <Icon.whatsapp size={15}/> Cotización corporativa
            </button>
            <button onClick={() => window.makoraQuote(null, { type: "kit" })} className="m-btn" style={{ padding: "13px 20px", fontSize: 14, background: "transparent", color: "var(--cream-1)", border: "1px solid color-mix(in oklab, var(--cream-1) 35%, transparent)" }}>
              Solicitar kit de muestra
            </button>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <ProductPlaceholder label="GIFT BOX" sub="Kit ejecutivo" accent="#C8853D" ratio="3/4" img="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=80" />
          <ProductPlaceholder label="UNIFORME" sub="Equipo branded" accent="#0F9787" ratio="3/4" img="https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600&auto=format&fit=crop&q=80" />
          <ProductPlaceholder label="LANYARD" sub="Sublimación" accent="#0F9787" ratio="3/4" img="https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?w=600&auto=format&fit=crop&q=80" />
          <ProductPlaceholder label="PLACA MDF" sub="Reconocimiento" accent="#C8853D" ratio="3/4" img="https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600&auto=format&fit=crop&q=80" />
        </div>
      </div>
    </section>
  );
}

function SeasonsBlock() {
  const items = [
    { title: "Día del Padre", date: "Junio", color: "#13224A", img: "https://images.unsplash.com/photo-1622445275576-721325763afe?w=600&auto=format&fit=crop&q=80" },
    { title: "Regreso a clases", date: "Marzo", color: "#0F9787", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=80" },
    { title: "San Valentín", date: "Febrero", color: "#C8553D", img: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&auto=format&fit=crop&q=80" },
    { title: "Día de la Madre", date: "Diciembre*", color: "#C8853D", img: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?w=600&auto=format&fit=crop&q=80" },
    { title: "Navidad", date: "Diciembre", color: "#0F9787", img: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=600&auto=format&fit=crop&q=80" },
    { title: "Cumpleaños", date: "Todo el año", color: "#13224A", img: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600&auto=format&fit=crop&q=80" },
  ];
  return (
    <section id="temporadas" style={{ padding: "96px 0", background: "var(--cream-1)" }}>
      <div className="m-container">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <SectionHead eyebrow="Temporadas y campañas" title="Detalles que llegan a tiempo" sub="Producimos por adelantado para que tus regalos estacionales no lleguen tarde. Reserva con anticipación." />
          <button onClick={() => window.makoraQuote(null, { type: "temporada" })} className="m-btn m-btn-outline" style={{ padding: "11px 18px", fontSize: 13.5 }}>
            Ver calendario completo <Icon.arrow size={14}/>
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 12, marginTop: 36 }} className="m-seasons">
          {items.map(s => (
            <div key={s.title} style={{
              background: "var(--surface)", borderRadius: 14, overflow: "hidden",
              border: "1px solid color-mix(in oklab, var(--ink) 10%, transparent)",
            }}>
              <ProductPlaceholder label={s.title.toUpperCase()} sub={s.date} accent={s.color} ratio="3/4" img={s.img} />
              <div style={{ padding: "12px 14px" }}>
                <div style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 14.5, color: "var(--ink)" }}>{s.title}</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "color-mix(in oklab, var(--ink) 55%, transparent)", marginTop: 2 }}>{s.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [msg, setMsg] = React.useState("");
  const submit = () => {
    window.makoraQuote(null, { customer: name, phone, message: msg });
  };
  return (
    <section style={{ padding: "96px 0", background: "var(--accent-soft)", borderTop: "1px solid color-mix(in oklab, var(--ink) 8%, transparent)" }}>
      <div className="m-container" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 56, alignItems: "center" }} id="final-grid">
        <div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--accent-deep)" }}>Cotiza tu idea</div>
          <h2 style={{ margin: "10px 0 0", fontFamily: "var(--display)", fontWeight: 700, fontSize: "clamp(32px, 4vw, 56px)", letterSpacing: "-0.025em", lineHeight: 1.02, color: "var(--ink)", textWrap: "balance" }}>
            Cuéntanos qué necesitas y la hacemos realidad.
          </h2>
          <p style={{ margin: "16px 0 0", fontSize: 16, lineHeight: 1.55, color: "color-mix(in oklab, var(--ink) 75%, transparent)", maxWidth: 520 }}>
            Cada producto es personalizable y se adapta al cliente. Respondemos cotizaciones en menos de 24 horas hábiles.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, marginTop: 24, fontSize: 14, color: "color-mix(in oklab, var(--ink) 80%, transparent)" }}>
            <div><strong style={{ color: "var(--ink)" }}>WhatsApp</strong><br/>+507 6837-4844</div>
            <div><strong style={{ color: "var(--ink)" }}>Atención</strong><br/>Lun – Sáb · 9:00 a 18:00</div>
            <div><strong style={{ color: "var(--ink)" }}>Ubicación</strong><br/>Panamá · envíos nacionales</div>
          </div>
        </div>
        <div style={{ background: "var(--surface)", borderRadius: 16, padding: 28, border: "1px solid color-mix(in oklab, var(--ink) 8%, transparent)", boxShadow: "0 30px 60px -30px rgba(0,0,0,.25)" }}>
          <h3 style={{ margin: 0, fontFamily: "var(--display)", fontSize: 20, color: "var(--ink)", letterSpacing: "-0.01em" }}>Solicita cotización rápida</h3>
          <p style={{ margin: "6px 0 18px", fontSize: 13, color: "color-mix(in oklab, var(--ink) 60%, transparent)" }}>Te respondemos por WhatsApp con propuesta y mockup.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Field label="Nombre" value={name} setValue={setName} placeholder="Tu nombre o empresa"/>
            <Field label="WhatsApp" value={phone} setValue={setPhone} placeholder="+507 0000 0000"/>
            <Field label="Cuéntanos tu idea" value={msg} setValue={setMsg} multiline placeholder="50 tazas con logo de la empresa para evento del 14 dic"/>
          </div>
          <button onClick={submit} className="m-btn m-btn-primary" style={{ width: "100%", padding: "14px", fontSize: 14, marginTop: 14 }}>
            <Icon.whatsapp size={15}/> Enviar por WhatsApp
          </button>
          <p style={{ margin: "12px 0 0", fontSize: 11.5, color: "color-mix(in oklab, var(--ink) 55%, transparent)", textAlign: "center", fontFamily: "var(--mono)", letterSpacing: ".04em" }}>
            Sin spam · Solo te escribimos para tu cotización
          </p>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, setValue, placeholder, multiline }) {
  const Tag = multiline ? "textarea" : "input";
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: ".09em", textTransform: "uppercase", color: "color-mix(in oklab, var(--ink) 55%, transparent)" }}>{label}</span>
      <Tag value={value} onChange={e => setValue(e.target.value)} placeholder={placeholder}
        rows={multiline ? 3 : undefined}
        style={{
          padding: "11px 14px", border: "1px solid color-mix(in oklab, var(--ink) 14%, transparent)",
          borderRadius: 10, fontSize: 14, fontFamily: "var(--ui)", color: "var(--ink)",
          background: "var(--surface)", outline: "none", resize: "vertical",
        }}/>
    </label>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid color-mix(in oklab, var(--ink) 8%, transparent)", padding: "48px 0 36px", background: "var(--surface)" }}>
      <div className="m-container" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 32 }} id="footer-grid">
        <div>
          <MakoraLogo size={26} />
          <p style={{ margin: "16px 0 0", fontSize: 13.5, lineHeight: 1.55, color: "color-mix(in oklab, var(--ink) 65%, transparent)", maxWidth: 320 }}>
            Productos personalizados en Panamá: sublimación, vinil, vinil textil imprimible e impresión 3D. Ideas que toman forma.
          </p>
        </div>
        <FooterCol title="Catálogo" items={["Sublimación", "Textil personalizado", "Impresión 3D", "Corporativo", "Temporadas", "Packaging"]}/>
        <FooterCol title="Empresa" items={["Cómo funciona", "Para empresas", "Tiempos de entrega", "Pago y envíos", "Política de personalización"]}/>
        <FooterCol title="Contacto" items={["WhatsApp +507 6837-4844", "hola@makora.pa", "@makora.pa", "Lun–Sáb · 9–18h"]}/>
      </div>
      <div className="m-container" style={{ display: "flex", justifyContent: "space-between", marginTop: 36, paddingTop: 20, borderTop: "1px solid color-mix(in oklab, var(--ink) 6%, transparent)", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".06em", color: "color-mix(in oklab, var(--ink) 55%, transparent)" }}>
        <span>© 2026 MAKORA · IDEAS QUE TOMAN FORMA</span>
        <span>Hecho con cariño en Panamá</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }) {
  return (
    <div>
      <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 14, color: "var(--ink)", letterSpacing: "-0.005em" }}>{title}</div>
      <ul style={{ listStyle: "none", padding: 0, margin: "12px 0 0", display: "flex", flexDirection: "column", gap: 7 }}>
        {items.map(i => (
          <li key={i} style={{ fontSize: 13, color: "color-mix(in oklab, var(--ink) 65%, transparent)" }}>{i}</li>
        ))}
      </ul>
    </div>
  );
}

Object.assign(window, { Header, Hero, CategoriesGrid, SectionHead, ProcessSection, CorporateBlock, SeasonsBlock, FinalCTA, Footer });
