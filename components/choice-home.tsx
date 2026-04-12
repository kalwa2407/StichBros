"use client";

import type { CSSProperties, FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";

import type { Collection, Product, Service, Story, Testimonial } from "@/lib/catalog";

type ChoiceHomeProps = {
  brand: {
    name: string;
    tagline: string;
    description: string;
  };
  stats: Array<{ label: string; value: string }>;
  collections: Collection[];
  products: Product[];
  services: Service[];
  stories: Story[];
  testimonials: Testimonial[];
};

type FormState = {
  name: string;
  email: string;
  service: string;
  note: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  service: "Private Styling Sessions",
  note: "",
};

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 16L21 21" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M5 20c1.2-3.2 4.1-4.8 7-4.8s5.8 1.6 7 4.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M6 9h12l-1.1 11H7.1L6 9Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9 9a3 3 0 0 1 6 0" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function ChoiceHome(props: ChoiceHomeProps) {
  const { brand, stats, collections, products, services, stories, testimonials } = props;
  const [activeCollection, setActiveCollection] = useState(collections[0]?.slug ?? "");
  const [form, setForm] = useState<FormState>(initialForm);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    function onScroll() {
      setScrollY(window.scrollY);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const currentCollection =
    collections.find((collection) => collection.slug === activeCollection) ?? collections[0];

  const visibleProducts = useMemo(
    () => products.filter((product) => product.collection === activeCollection),
    [activeCollection, products],
  );

  const heroTransform = Math.min(scrollY * 0.18, 70);
  const cardTransform = Math.min(scrollY * 0.12, 36);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setMessage("");

    try {
      const response = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        setMessage(payload.error ?? "Unable to send your request right now.");
        return;
      }

      setMessage(payload.message ?? "Your request has been received.");
      setForm(initialForm);
    } catch {
      setMessage("Unable to reach the concierge desk right now.");
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="page-shell">
      <section className="hero-frame" id="home">
        <header className="lux-header">
          <nav className="lux-nav" aria-label="Primary">
            <a href="#collections">Collections</a>
            <a href="#proof">Results</a>
            <a href="#services">Private Service</a>
          </nav>

          <a className="lux-brand" href="#home">
            <span>Choice</span>
            <span className="lux-divider" />
            <span>MensWear</span>
          </a>

          <div className="lux-icons" aria-label="Quick actions">
            <button type="button" aria-label="Search">
              <SearchIcon />
            </button>
            <button type="button" aria-label="Account">
              <UserIcon />
            </button>
            <button type="button" aria-label="Bag">
              <BagIcon />
            </button>
          </div>
        </header>

        <div className="hero-canvas">
          <div className="hero-media-wrap" style={{ transform: `translateY(${heroTransform}px)` }} />
          <div className="hero-overlay" />
          <div className="hero-noise" />

          <div className="hero-content glass-panel">
            <p className="eyebrow">Private tailoring. Wedding authority. Visible presence.</p>
            <h1>{brand.tagline}</h1>
            <p className="hero-description">{brand.description}</p>
            <div className="hero-actions">
              <a className="button-primary" href="#collections">
                Explore the collection
              </a>
              <a className="button-secondary" href="#concierge">
                Reserve your private fitting
              </a>
            </div>

            <div className="hero-proofline">
              <span>430+ fittings this season</span>
              <span>Trusted by grooms, founders, and high-visibility clients</span>
            </div>
          </div>

          <div
            className="hero-floating-card glass-panel"
            style={{ transform: `translateY(${cardTransform}px)` }}
          >
            <p className="micro-copy">Current power piece</p>
            <h2>{visibleProducts[0]?.name}</h2>
            <strong>{visibleProducts[0]?.line}</strong>
            <p>{visibleProducts[0]?.description}</p>
            <div className="hero-floating-meta">
              <span>{visibleProducts[0]?.price}</span>
              <span>{currentCollection?.cta}</span>
            </div>
          </div>

          <div className="hero-stats">
            {stats.map((stat) => (
              <article key={stat.label} className="hero-stat-card glass-panel">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="quick-strip">
        <article className="glass-panel">
          <span>Why it converts</span>
          <strong>Sharper copy. Less noise. More status.</strong>
        </article>
        <article className="glass-panel">
          <span>What you sell</span>
          <strong>Authority, confidence, and premium perception.</strong>
        </article>
        <article className="glass-panel">
          <span>What happens next</span>
          <strong>Luxury visuals now. Cart, PDP, and CRM next.</strong>
        </article>
      </section>

      <section className="section-block" id="collections">
        <div className="section-heading">
          <p className="eyebrow">Curated collections</p>
          <h2>Less explanation. Stronger outcomes.</h2>
          <p>Every collection now leads with what the customer becomes, not just what he buys.</p>
        </div>

        <div className="collection-switcher">
          {collections.map((collection) => {
            const isActive = collection.slug === activeCollection;

            return (
              <button
                key={collection.slug}
                className={isActive ? "switch-chip active" : "switch-chip"}
                type="button"
                onClick={() => setActiveCollection(collection.slug)}
              >
                {collection.name}
              </button>
            );
          })}
        </div>

        <div className="feature-band">
          <article className="feature-story glass-panel">
            <p className="eyebrow">{currentCollection?.eyebrow}</p>
            <h3>{currentCollection?.headline}</h3>
            <p>{currentCollection?.description}</p>
          </article>

          <article className="feature-note glass-panel">
            <p className="eyebrow">Mood</p>
            <p>{currentCollection?.mood}</p>
          </article>
        </div>

        <div className="product-grid">
          {visibleProducts.map((product) => (
            <article key={product.id} className="product-card glass-panel">
              <div
                className="product-card-media"
                style={
                  {
                    "--product-surface": product.surface,
                    "--accent": product.accent,
                  } as CSSProperties
                }
              />
              <div className="product-card-copy">
                <div className="product-line">
                  <span>{product.category}</span>
                  <strong>{product.price}</strong>
                </div>
                <h3>{product.name}</h3>
                <p className="product-tagline">{product.line}</p>
                <p>{product.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block editorial-layout" id="proof">
        <div className="section-heading">
          <p className="eyebrow">Trust and authority</p>
          <h2>Luxury without proof is just decoration.</h2>
        </div>

        <div className="trust-grid">
          <article className="trust-panel glass-panel">
            <p className="eyebrow">Proof</p>
            <h3>300+ private fittings this season</h3>
            <p>High-intent clients don’t buy clothes. They buy certainty, presence, and outcome.</p>
          </article>
          <article className="trust-panel glass-panel">
            <p className="eyebrow">Transformation</p>
            <h3>Fit correction changes everything</h3>
            <p>Sharper sleeve break, better shoulder line, cleaner waist. That is where premium starts.</p>
          </article>
        </div>

        <div className="editorial-grid">
          {stories.map((story) => (
            <article key={story.title} className="editorial-card glass-panel">
              <p className="eyebrow">{story.subtitle}</p>
              <h3>{story.title}</h3>
              <p>{story.copy}</p>
            </article>
          ))}
        </div>

        <div className="testimonial-row">
          {testimonials.map((testimonial) => (
            <blockquote key={testimonial.author} className="quote-card glass-panel">
              <div
                className="quote-avatar"
                aria-label={testimonial.author}
              >
                {testimonial.badge}
              </div>
              <p>{testimonial.quote}</p>
              <footer>
                <strong>{testimonial.author}</strong>
                <span>{testimonial.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="section-block services-layout" id="services">
        <div className="section-heading">
          <p className="eyebrow">Luxury services</p>
          <h2>Designed like a premium business tool, not a visual exercise.</h2>
        </div>

        <div className="service-grid">
          {services.map((service) => (
            <article key={service.title} className="service-card glass-panel">
              <p className="eyebrow">{service.badge}</p>
              <h3>{service.title}</h3>
              <p>{service.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block concierge-layout" id="concierge">
        <div className="concierge-copy">
          <p className="eyebrow">High-intent CTA</p>
          <h2>Reserve a fitting that changes how you are seen.</h2>
          <p>Use this as the premium conversion point instead of a weak generic contact form.</p>
        </div>

        <form className="concierge-form glass-panel" onSubmit={onSubmit}>
          <label>
            Name
            <input
              required
              type="text"
              placeholder="Your full name"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            />
          </label>
          <label>
            Email
            <input
              required
              type="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({ ...current, email: event.target.value }))
              }
            />
          </label>
          <label>
            Service
            <select
              value={form.service}
              onChange={(event) =>
                setForm((current) => ({ ...current, service: event.target.value }))
              }
            >
              {services.map((service) => (
                <option key={service.title} value={service.title}>
                  {service.title}
                </option>
              ))}
            </select>
          </label>
          <label>
            Notes
            <textarea
              rows={5}
              placeholder="Wedding, reception, boardroom, or full wardrobe upgrade."
              value={form.note}
              onChange={(event) => setForm((current) => ({ ...current, note: event.target.value }))}
            />
          </label>
          <button className="button-primary submit-button" disabled={sending} type="submit">
            {sending ? "Sending request..." : "Reserve your private fitting"}
          </button>
          {message ? <p className="form-message">{message}</p> : null}
        </form>
      </section>
    </main>
  );
}
