import { useState } from "react";
import { Badge, Button, Card, CLAY_COLORS, ClayProvider, Input, Textarea } from "../src";
import type { ClayColor } from "../src";

export function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [count, setCount] = useState(0);
  const [scopeColor, setScopeColor] = useState<ClayColor>("coral");

  return (
    <div className="playground" data-clay-theme={theme}>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Claymorph home">
          <span className="brand-mark" aria-hidden="true" />
          <span>claymorph</span>
        </a>
        <Button variant="secondary" size="sm" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? "Dark" : "Light"} theme
        </Button>
      </header>

      <main id="top" className="page-shell">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <Badge variant="primary">React UI kit · 0.1</Badge>
            <h1 id="hero-title">
              Soft by nature.
              <span>Clear by design.</span>
            </h1>
            <p>
              A small, thoughtful set of React primitives with squishy surfaces, strong contrast,
              and none of the runtime styling weight.
            </p>
            <div className="hero-actions">
              <Button size="lg" onClick={() => setCount((value) => value + 1)}>
                Add a little joy
              </Button>
              <Button
                size="lg"
                variant="secondary"
                disabled={count === 0}
                onClick={() => setCount((value) => Math.max(0, value - 1))}
              >
                Undo
              </Button>
            </div>
          </div>

          <Card className="joy-card" padding="lg" aria-live="polite">
            <Badge variant={count > 0 ? "success" : "neutral"}>
              {count > 0 ? "Feeling softer" : "Ready to play"}
            </Badge>
            <strong className="joy-count">{count}</strong>
            <span className="joy-label">little moments of joy</span>
            <div className="joy-shapes" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </Card>
        </section>

        <section id="components" className="component-section" aria-labelledby="components-title">
          <div className="section-heading">
            <Badge variant="success">The essentials</Badge>
            <h2 id="components-title">A friendly place to start.</h2>
            <p>Native elements underneath, clay on the outside.</p>
          </div>

          <div className="component-grid">
            <Card padding="lg">
              <div className="card-heading">
                <span className="example-number">01</span>
                <div>
                  <h3>Buttons</h3>
                  <p>Clear actions with a satisfying press.</p>
                </div>
              </div>
              <div className="button-showcase">
                <Button onClick={() => setCount((value) => value + 1)}>Primary action</Button>
                <Button variant="secondary" onClick={() => setCount(0)}>
                  Reset gently
                </Button>
                <Button variant="danger" onClick={() => setCount(0)}>
                  Reset firmly
                </Button>
                <Button disabled>Disabled</Button>
              </div>
              <Button
                variant="secondary"
                size="sm"
                fullWidth
                onClick={() => setCount((value) => value + 1)}
              >
                Full width works too
              </Button>
            </Card>

            <Card padding="lg">
              <div className="card-heading">
                <span className="example-number">02</span>
                <div>
                  <h3>Inputs</h3>
                  <p>Familiar fields with a soft landing.</p>
                </div>
              </div>
              <form className="form-showcase" onSubmit={(event) => event.preventDefault()}>
                <div className="field">
                  <label htmlFor="project-name">Project name</label>
                  <Input id="project-name" name="project-name" defaultValue="Something lovely" />
                </div>
                <div className="field">
                  <label htmlFor="project-email">Contact email</label>
                  <Input
                    id="project-email"
                    name="project-email"
                    type="email"
                    defaultValue="hello@"
                    invalid
                    aria-describedby="email-hint email-error"
                  />
                  <span id="email-hint" className="field-hint">
                    We will only use this for project updates.
                  </span>
                  <span id="email-error" className="field-error">
                    Add the part after @ to complete the address.
                  </span>
                </div>
                <div className="field">
                  <label htmlFor="project-notes">Notes</label>
                  <Textarea
                    id="project-notes"
                    name="project-notes"
                    defaultValue="Rounded corners. Kind colors. Thoughtful details."
                  />
                </div>
              </form>
            </Card>

            <Card padding="lg" className="badge-card">
              <div className="card-heading">
                <span className="example-number">03</span>
                <div>
                  <h3>Badges</h3>
                  <p>Small signals, easy to read.</p>
                </div>
              </div>
              <div className="badge-showcase" aria-label="Badge variants">
                <Badge>Neutral</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="danger">Danger</Badge>
              </div>
            </Card>

            <div className="clay-surface surface-example">
              <div>
                <span className="example-number">04</span>
                <h3>Just the surface</h3>
              </div>
              <p>
                Use <code>.clay-surface</code> when you need the visual recipe without a component
                abstraction.
              </p>
            </div>
          </div>
        </section>

        <section className="palette-section" aria-labelledby="palette-title">
          <Card padding="lg">
            <div className="card-heading">
              <span className="example-number">05</span>
              <div>
                <h3 id="palette-title">Palette &amp; scopes</h3>
                <p>Pick one color for a scope, or leave elements on automatic mix.</p>
              </div>
            </div>

            <div className="palette-group">
              <span className="palette-label">Choose the scoped color</span>
              <div className="palette-showcase" aria-label="Scoped color choices">
                {CLAY_COLORS.map((color) => (
                  <Button
                    key={color}
                    color={color}
                    size="sm"
                    aria-pressed={scopeColor === color}
                    onClick={() => setScopeColor(color)}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            <ClayProvider color={scopeColor}>
              <div className="scope-example">
                <span className="palette-label">
                  Current scope: <strong>{scopeColor}</strong>
                </span>
                <div className="scope-row">
                  <Button>Scoped action</Button>
                  <Badge variant="primary">Scoped badge</Badge>
                </div>
                <div className="field scope-field">
                  <label htmlFor="scoped-field">Scoped field focus</label>
                  <Input id="scoped-field" placeholder={`Focus me for ${scopeColor}`} />
                </div>
              </div>
            </ClayProvider>

            <div className="automatic-example">
              <span className="palette-label">Automatic per-element mix</span>
              <div className="scope-row">
                <Button size="sm">Automatic one</Button>
                <Button size="sm">Automatic two</Button>
                <Button size="sm">Automatic three</Button>
                <Badge variant="primary">Automatic badge</Badge>
              </div>
            </div>
          </Card>
        </section>
      </main>

      <footer className="footer">Made soft. Built solid.</footer>
    </div>
  );
}
