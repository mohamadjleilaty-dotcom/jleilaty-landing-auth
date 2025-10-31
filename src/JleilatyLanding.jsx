import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function JleilatyLanding() {
  // تبديل اللغة (AR/EN) + اتجاه الصفحة
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "ar")
  useEffect(() => {
    localStorage.setItem("lang", lang)
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = lang
  }, [lang])

  const t = (ar, en) => (lang === "ar" ? ar : en)

  // تأثير بسيط للفقاعات في الهيرو
  useEffect(() => {
    const el = document.getElementById("liquid")
    if (!el) return
    el.animate([{ transform: "translateY(0)" }, { transform: "translateY(-6px)" }, { transform: "translateY(0)" }], {
      duration: 2400,
      iterations: Infinity,
      easing: "ease-in-out",
    })
  }, [])

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_#0b1e16_0%,_#07130f_40%,_#040a08_100%)] text-white">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 backdrop-blur bg-black/20 border-b border-white/10">
        <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-400/90 shadow" />
            <div className="font-black tracking-wide">
              JLEILATY <span className="text-emerald-400">ELECTROPLATING</span>
            </div>
          </div>

          <ul className="hidden md:flex items-center gap-6 text-sm opacity-90">
            <li><a href="#services" className="hover:opacity-100">{t("الخدمات", "Services")}</a></li>
            <li><a href="#products" className="hover:opacity-100">{t("المنتجات", "Products")}</a></li>
            <li><a href="#process" className="hover:opacity-100">{t("العمليات", "Process")}</a></li>
            <li><a href="#lab" className="hover:opacity-100">{t("المختبر", "Lab")}</a></li>
            <li><a href="#contact" className="hover:opacity-100">{t("تواصل", "Contact")}</a></li>
          </ul>

          <div className="flex items-center gap-2">
            <Link
              to="/consultations"
              className="rounded-xl bg-emerald-400 text-black px-4 py-2 font-bold hover:bg-emerald-300"
            >
              {t("الاستشارات", "Consultations")}
            </Link>

            <button
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="rounded-xl border border-white/20 px-3 py-2 text-sm hover:bg-white/5"
            >
              {lang === "ar" ? "EN" : "AR"}
            </button>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-black leading-tight">
              {t("حلول طلاء كهربائي احترافية", "Professional Electroplating Solutions")}
            </h1>
            <p className="mt-4 text-white/80">
              {t(
                "تجهيز معامل كاملة: خطوط طلاء، محولات، خزانات، وسوائل كيميائية. استشارات فنية وخبرة 30+ سنة.",
                "End-to-end plants: plating lines, rectifiers, tanks, and chemicals. 30+ years of practical expertise."
              )}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#products" className="rounded-xl bg-white/10 border border-white/15 px-4 py-2 hover:bg-white/15">
                {t("تعرّف على المنتجات", "Explore Products")}
              </a>
              <Link to="/consultations" className="rounded-xl bg-emerald-400 text-black px-4 py-2 font-bold hover:bg-emerald-300">
                {t("اطلب استشارة", "Request Consultation")}
              </Link>
            </div>
            <div className="mt-4 text-xs opacity-70">
              {t("مظهر معدني أخضر/ذهبي قابل للتخصيص", "Metallic green/gold theme — customizable")}
            </div>
          </div>

          {/* beaker / liquid */}
          <div className="relative aspect-[4/3] md:aspect-square">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-emerald-500/20 to-teal-400/10 border border-emerald-400/20 shadow-[0_0_120px_-20px_rgba(16,185,129,0.6)]" />
            <div className="absolute inset-6 rounded-[1.6rem] bg-black/40 border border-white/10 backdrop-blur" />
            <div className="absolute inset-10 rounded-[1.2rem] border border-white/10 bg-gradient-to-b from-white/10 to-white/0" />

            {/* السائل */}
            <div id="liquid" className="absolute left-10 right-10 bottom-10 h-1/2">
              <div className="absolute inset-0 rounded-[1rem] bg-gradient-to-t from-emerald-400/70 to-emerald-300/30 blur-[2px]" />
              {/* فقاعات */}
              {[...Array(16)].map((_, i) => (
                <span
                  key={i}
                  style={{
                    left: `${8 + (i * 5) % 80}%`,
                    animationDelay: `${(i % 5) * 0.6}s`,
                    animationDuration: `${2 + (i % 6) * 0.6}s`,
                  }}
                  className="absolute bottom-2 w-2 h-2 rounded-full bg-white/80 animate-[rise_linear_infinite]"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <Section id="services" title={t("الخدمات", "Services")} subtitle={t("حلول شاملة من التصميم إلى الإنتاج", "End-to-end solutions from design to production")}>
        <Cards
          items={[
            { h: t("تجهيز معامل كاملة", "Turn-key Plants"), p: t("تصميم وتركيب خطوط الطلاء وخزانات وتهوية.", "Design & install plating lines, tanks & ventilation.") },
            { h: t("محولات وقدرة", "Rectifiers & Power"), p: t("محولات تيار مستمر عالية الاعتمادية.", "Reliable DC rectifiers.") },
            { h: t("استشارات فنية", "Technical Consulting"), p: t("تحليل مشاكل الطلاء وحلول سريعة.", "Troubleshooting & process optimization.") },
          ]}
        />
      </Section>

      {/* PRODUCTS */}
      <Section id="products" title={t("المنتجات", "Products")} subtitle={t("كيماويات طلاء متنوعة مع إضافاتنا الخاصة", "Diverse plating chemistries with our proprietary additives")}>
        <Cards
          items={[
            { h: t("نيكل لامع/ساتان", "Bright/Satin Nickel"), p: t("تحكم بالمظهر والصلابة، ملاءمة واسعة.", "Appearance & hardness control, wide operating window.") },
            { h: t("نحاس حامضي/قلوي", "Acid/Alkaline Copper"), p: t("تغطية ممتازة ولصق عالٍ على طبقات لاحقة.", "Excellent coverage & adhesion to subsequent layers.") },
            { h: t("لاك كهربائي كاثودي", "Cathodic E-coat"), p: t("لمعان عالٍ وشوي منخفض، شفاف أو ملون.", "High gloss, low-bake; clear or pigmented.") },
          ]}
        />
      </Section>

      {/* PROCESS */}
      <Section id="process" title={t("خطوات العمل", "Our Process")} subtitle={t("تقييم — تصميم — تنفيذ — متابعة", "Assess — Design — Implement — Support")}>
        <ol className="max-w-5xl mx-auto px-4 grid md:grid-cols-4 gap-4 list-decimal">
          {["التقييم", "التصميم", "التنفيذ", "الدعم"].map((step, i) => (
            <li key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-emerald-400 font-bold">{t(step, ["Assess","Design","Implement","Support"][i])}</div>
              <div className="text-sm opacity-80 mt-1">
                {t("نراجع المتطلبات ونحدد هدف الجودة والتكلفة.", "We align on quality targets & cost constraints.")}
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* LAB */}
      <Section id="lab" title={t("المختبر", "Lab")} subtitle={t("تحاليل دوريّة وحلول شوائب فعّالة", "Routine analysis & impurity control")}>
        <Cards
          items={[
            { h: t("تحليل الحمامات", "Bath Analysis"), p: t("قياس المعادن والـ pH والمواد العضوية.", "Metals, pH and organic level checks.") },
            { h: t("تنقية ومعالجة", "Purification"), p: t("كربون نشط/أكسدة، ترشيح مستمر.", "Activated carbon/oxidation, continuous filtration.") },
            { h: t("تأهيل خطوط جديدة", "Line Commissioning"), p: t("بدء تشغيل آمن مع سلاسل تجارب.", "Safe ramp-up with trial series.") },
          ]}
        />
      </Section>

      {/* CONTACT */}
      <Section id="contact" title={t("تواصل معنا", "Contact")} subtitle={t("نخدم تركيا وسوريا والدول العربية", "Serving Turkey, Syria & the Arab region")}>
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-sm opacity-80">{t("واتساب مباشر", "WhatsApp Direct")}</div>
            <a href="https://wa.me/905000000000" className="text-emerald-400 hover:underline">+90 500 000 00 00</a>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-sm opacity-80">{t("البريد", "Email")}</div>
            <a href="mailto:info@jleilatygroup.com" className="text-emerald-400 hover:underline">info@jleilatygroup.com</a>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-sm opacity-80">{t("الاستشارات", "Consultations")}</div>
            <Link to="/consultations" className="text-emerald-400 hover:underline">{t("قدّم طلبك الآن", "Send your request")}</Link>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="mt-14 border-t border-white/10 py-6 text-center text-xs opacity-70">
        © {new Date().getFullYear()} JLEILATY ELECTROPLATING — {t("كل الحقوق محفوظة", "All rights reserved")}
      </footer>

      {/* أنيميشن للفقاعات */}
      <style>{`
        @keyframes rise { from { transform: translateY(0); opacity: .8 } to { transform: translateY(-110%); opacity: 0 } }
        .animate-\\[rise_linear_infinite\\] { animation: rise linear infinite; }
      `}</style>
    </div>
  )
}

// مكوّنات مساعدة بسيطة
function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="py-14">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-black">{title}</h2>
        <p className="opacity-80 mt-1">{subtitle}</p>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  )
}

function Cards({ items }) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {items.map((it, i) => (
        <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition">
          <div className="font-semibold">{it.h}</div>
          <div className="text-sm opacity-80 mt-1">{it.p}</div>
        </div>
      ))}
    </div>
  )
}
