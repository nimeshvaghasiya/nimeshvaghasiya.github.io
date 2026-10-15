/**
 * Nimesh Vaghasiya - Modern Architectural Portfolio
 * Interactive Systems, Neural Network Background, Terminal CLI & Architecture Blueprints
 */

document.addEventListener('DOMContentLoaded', () => {
  initNeuralCanvas();
  initHeaderScroll();
  initArchitectureTabs();
  initProjectFilters();
  initTerminal();
  initGitHubStats();
  initCopyEmail();
  initBlueprintModals();
  initThemeToggle();
  initMobileNav();
});

/* ==========================================================================
   1. Interactive Neural Constellation Background
   ========================================================================== */
function initNeuralCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const mouse = { x: -1000, y: -1000, radius: 140 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  const particleCount = Math.min(Math.floor((width * height) / 14000), 75);
  const particles = [];

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = Math.random() * 1.8 + 1;
      this.baseAlpha = Math.random() * 0.4 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse gentle repulsion
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        this.x -= (dx / dist) * force * 2.5;
        this.y -= (dy / dist) * force * 2.5;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(34, 211, 238, ${this.baseAlpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          const alpha = (1 - dist / 130) * 0.22;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. Header Scroll Effect
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   3. Architecture Blueprint Tabs Switcher
   ========================================================================== */
function initArchitectureTabs() {
  const tabs = document.querySelectorAll('.arch-tab-btn');
  const panels = document.querySelectorAll('.arch-panel');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      panels.forEach((p) => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-target');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   4. Project Category Filters
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. Interactive Developer Terminal CLI
   ========================================================================== */
function initTerminal() {
  const terminalInput = document.getElementById('terminal-cli-input');
  const terminalBody = document.getElementById('terminal-body');
  const chipBtns = document.querySelectorAll('.chip-btn');

  if (!terminalInput || !terminalBody) return;

  const COMMANDS = {
    help: `Available commands:
  <span class="terminal-cmd">skills</span>       - High-level overview of core proficiencies
  <span class="terminal-cmd">projects</span>     - Key architecture implementations
  <span class="terminal-cmd">stack</span>        - Detailed technical arsenal
  <span class="terminal-cmd">stats</span>        - Real-time GitHub and system metrics
  <span class="terminal-cmd">whoami</span>       - Architectural summary and engineering focus
  <span class="terminal-cmd">contact</span>      - Direct communication channels
  <span class="terminal-cmd">hire</span>         - Consulting and engineering engagement info
  <span class="terminal-cmd">clear</span>        - Clear terminal screen`,

    whoami: `Nimesh Vaghasiya
Principal Full-Stack Engineer & AI / Cloud Solutions Architect
10+ years engineering resilient multi-tenant SaaS platforms, autonomous AI agent pipelines, algorithmic trading engines, and enterprise distributed integrations.`,

    skills: `Core Capabilities:
  • <span style="color:#06b6d4;">Autonomous AI & Quant:</span> Python Algo Bots (v1, v2), Claude API, OpenAI, MCP Servers, Real-time Risk Engines
  • <span style="color:#8b5cf6;">Multi-Tenant Cloud:</span> Laravel 12, Stancl Tenancy, Filament v3, Inertia.js + React, Redis Horizon
  • <span style="color:#10b981;">Enterprise Integration:</span> n8n Orchestration (100+ production workflows), Airbyte on Kubernetes, Google Cloud Functions
  • <span style="color:#fbbf24;">Headless & Data:</span> Directus BaaS, Pimcore PIM/MDM, Appwrite, Metabase BI, PostgREST, PostgreSQL`,

    projects: `Featured Systems:
  1. Multi-Tenant E-Commerce Core (Stancl Tenancy, Laravel 12, Inertia React, Filament v3)
  2. Algorithmic Trading Systems v1 & v2 (Python, Docker, WebSockets, Risk Controls)
  3. Enterprise Integration Hub (100+ n8n workflows, Airbyte on K8s, Amazon SP-API, Lightspeed)
  4. AI Developer & Agent Workflows (Custom MCP Servers, Claude API, Automated Dev Tooling)
  5. Headless Master Data & Analytics Lake (Directus, Pimcore PIM, Metabase, PostgREST)`,

    stack: `Technical Arsenal:
  • Languages: TypeScript, JavaScript, Python, PHP, C#, SQL, HTML5/CSS3
  • Frameworks: Next.js, React, Angular, Laravel 12, ASP.NET Core, Inertia.js, Tailwind CSS
  • Platforms & DBs: PostgreSQL, Redis, Directus, Pimcore, Baserow, Appwrite, Metabase, MSSQL
  • Cloud & DevOps: Docker, Kubernetes, DigitalOcean, Hetzner, Vercel, GCP, GitHub Actions`,

    stats: `GitHub Statistics (@nimeshvaghasiya):
  • Public Repositories: 184+
  • Active In: Distributed Systems, Automation, AI Agents, Full-Stack Architecture
  • Availability: Open for Principal / Staff Roles & Architecture Advisory`,

    contact: `Direct Contact:
  • Email: <a href="mailto:nimesh.vaghasiya95@live.com" style="color:#06b6d4; text-decoration:underline;">nimesh.vaghasiya95@live.com</a>
  • GitHub: <a href="https://github.com/nimeshvaghasiya" target="_blank" style="color:#06b6d4; text-decoration:underline;">https://github.com/nimeshvaghasiya</a>
  • X / Twitter: <a href="https://x.com/nimeshvaghasiya" target="_blank" style="color:#06b6d4; text-decoration:underline;">@nimeshvaghasiya</a>`,

    hire: `Engagement Options:
  • Principal / Lead Solutions Architect (Remote Global)
  • Enterprise SaaS & Multi-Tenancy Architecture
  • Autonomous AI & Quantitative Systems Design
  • Enterprise Workflow Automation & ETL Pipeline Modernization
  Email directly: <span style="color:#06b6d4;">nimesh.vaghasiya95@live.com</span>`
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();

    // Append user input line
    const userLine = document.createElement('div');
    userLine.className = 'terminal-line';
    userLine.innerHTML = `<span class="terminal-prompt">nimesh@architect:~$</span> <span class="terminal-cmd">${escapeHtml(rawCmd)}</span>`;
    terminalBody.appendChild(userLine);

    if (cmd === 'clear') {
      terminalBody.innerHTML = '';
      return;
    }

    const outputLine = document.createElement('div');
    outputLine.className = 'terminal-output';

    if (COMMANDS[cmd]) {
      outputLine.innerHTML = COMMANDS[cmd];
    } else if (cmd === '') {
      // Do nothing for empty input
      return;
    } else {
      outputLine.innerHTML = `command not found: <span style="color:#ef4444;">${escapeHtml(cmd)}</span>. Type <span class="terminal-cmd">help</span> for available commands.`;
    }

    terminalBody.appendChild(outputLine);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      terminalInput.value = '';
      executeCommand(val);
    }
  });

  chipBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) {
        executeCommand(cmd);
      }
    });
  });
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/* ==========================================================================
   6. Live GitHub Stats Fetcher
   ========================================================================== */
async function initGitHubStats() {
  const repoCountEl = document.getElementById('github-repo-count');
  const followersCountEl = document.getElementById('github-followers-count');
  const avatarImgEl = document.getElementById('profile-avatar');

  try {
    const res = await fetch('https://api.github.com/users/nimeshvaghasiya');
    if (res.ok) {
      const data = await res.json();
      if (repoCountEl && data.public_repos) repoCountEl.textContent = `${data.public_repos}+`;
      if (followersCountEl && data.followers !== undefined) followersCountEl.textContent = `${data.followers}`;
      if (avatarImgEl && data.avatar_url) avatarImgEl.src = data.avatar_url;
    }
  } catch (err) {
    // Fallback to static numbers if rate limited or offline
    if (repoCountEl) repoCountEl.textContent = '184+';
    if (followersCountEl) followersCountEl.textContent = '25+';
  }
}

/* ==========================================================================
   7. Copy Email Toast Notification
   ========================================================================== */
function initCopyEmail() {
  const copyButtons = document.querySelectorAll('.copy-email-trigger');
  const toast = document.getElementById('toast-notification');

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const email = 'nimesh.vaghasiya95@live.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard: ' + email);
      }).catch(() => {
        window.location.href = 'mailto:' + email;
      });
    });
  });
}

function showToast(message) {
  const toast = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');
  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* ==========================================================================
   8. Project Blueprint Detail Modal
   ========================================================================== */
const PROJECT_BLUEPRINTS = {
  multitenant: {
    title: 'Multi-Tenant E-Commerce Cloud Platform',
    badge: 'Enterprise Architecture & Cloud SaaS',
    overview: 'Engineered a modern single-database multi-tenant platform architected for rapid multi-brand e-commerce provisioning, unified cross-brand inventory tracking, and isolated administrative panels.',
    specs: [
      { label: 'Architecture Model', value: 'Single-DB Multi-Tenancy with Stancl Tenancy v3 and dynamic tenant connection resolution' },
      { label: 'Backend Framework', value: 'Laravel 12 with PHP 8.3+, Pest test suite, and Pint static analysis' },
      { label: 'Admin & Storefront', value: 'Filament v3 admin suite with Inertia 2 + React + TypeScript storefront integration' },
      { label: 'Queue Infrastructure', value: 'Redis + Laravel Horizon managing high-throughput asynchronous job pipelines' },
      { label: 'Deployment', value: 'Hetzner Dedicated Infrastructure & Vercel Edge Serverless' }
    ],
    codeSnippet: `// Multi-Tenancy Tenant Scoping
class BrandResource extends Resource {
    protected static ?string $model = Brand::class;
    
    public static function getEloquentQuery(): Builder {
        return parent::getEloquentQuery()
            ->where('tenant_id', tenant('id'))
            ->with(['catalogs', 'channels']);
    }
}`
  },
  tradingbot: {
    title: 'Algorithmic Trading & Autonomous Execution Engine (v1 & v2)',
    badge: 'AI Systems & Quantitative Automation',
    overview: 'Architected containerized algorithmic trading bots featuring real-time WebSocket tick streams, algorithmic strategy calculation, portfolio rebalancing, and strict automated stop-loss / risk controls.',
    specs: [
      { label: 'Core Engine', value: 'Python async event loop, Pandas, NumPy, and WebSockets' },
      { label: 'Risk Mitigation', value: 'Dynamic slippage protection, max-drawdown circuit breakers, and capital allocation guards' },
      { label: 'Deployment Stack', value: 'Docker Compose with multi-stage production builds and automatic restart triggers' },
      { label: 'Monitoring', value: 'Real-time telemetry, automated trade logging, and emergency halt mechanisms' }
    ],
    codeSnippet: `# Quantitative Risk & Order Execution
class ExecutionEngine:
    async def evaluate_tick(self, tick: MarketTick):
        signal = self.strategy.compute(tick)
        if signal.is_actionable:
            if self.risk_manager.validate(signal):
                await self.order_gateway.dispatch(signal)
            else:
                logger.warning(f"Order rejected by risk guard: {signal}")`
  },
  integrationhub: {
    title: 'Enterprise Integration Hub & Multi-Channel Sync',
    badge: 'Distributed Data & Workflow Automation',
    overview: 'Centralized workflow orchestration connecting heterogeneous enterprise services: Amazon Selling Partner API (SP-API), Lightspeed POS, Rainforest API, Exact Online accounting, and serverless Google Cloud Functions.',
    specs: [
      { label: 'Orchestration Hub', value: 'n8n workflow automation platform with 100+ active production pipelines' },
      { label: 'ETL Pipelines', value: 'Airbyte data replication cluster deployed on DigitalOcean Kubernetes (k8s)' },
      { label: 'Serverless Scrapers', value: 'Google Cloud Functions for real-time external catalog extraction and price parsing' },
      { label: 'Sync Consistency', value: 'Idempotent webhook handlers with exponential backoff and dead-letter queues' }
    ],
    codeSnippet: `// Webhook Ingestion & Job Queue
export async function handleAmazonSpWebhook(event) {
    const payload = verifyAmazonSignature(event);
    await queue.add('sync-inventory-ledger', {
        sku: payload.sku,
        quantity: payload.delta,
        timestamp: Date.now()
    }, { attempts: 5, backoff: { type: 'exponential', delay: 1000 } });
}`
  },
  aiagents: {
    title: 'AI Agent Pipelines & Model Context Protocol (MCP)',
    badge: 'Autonomous AI & Developer Tooling',
    overview: 'Implemented Model Context Protocol (MCP) servers and LLM-assisted workflows to automate code review, context-aware query resolution, and multi-agent developer workflows.',
    specs: [
      { label: 'Protocols', value: 'Model Context Protocol (MCP), OpenAPI / Swagger schemas, JSON-RPC' },
      { label: 'LLM Integrations', value: 'Anthropic Claude API, OpenAI APIs, and custom local agent sidecars' },
      { label: 'Context Engineering', value: 'Dynamic codebase indexation, structured schema injection, and deterministic prompt chaining' }
    ],
    codeSnippet: `// MCP Server Tool Definition
export const searchCatalogTool = {
  name: "search_product_catalog",
  description: "Semantic search across product master catalog",
  parameters: z.object({
    query: z.string(),
    tenantId: z.string()
  }),
  execute: async ({ query, tenantId }) => {
    return await vectorStore.query(query, { filter: { tenantId } });
  }
};`
  },
  headlesspim: {
    title: 'Headless PIM / MDM & Analytics Data Lake',
    badge: 'Headless Data & Business Intelligence',
    overview: 'Built enterprise-grade Product Information Management (PIM) and Master Data Management (MDM) using Directus BaaS and Pimcore, coupled with Metabase BI analytics dashboards and PostgREST.',
    specs: [
      { label: 'PIM / MDM Layer', value: 'Pimcore & Directus Headless CMS for complex multi-attribute product catalogs' },
      { label: 'Analytics Engine', value: 'Metabase BI connecting directly to PostgreSQL reporting replicas' },
      { label: 'API Layer', value: 'PostgREST providing auto-generated RESTful endpoints from database schema' }
    ],
    codeSnippet: `-- PostgREST Real-Time View
CREATE OR REPLACE VIEW api_v1.sales_performance AS
SELECT 
    b.name AS brand_name,
    COUNT(o.id) AS total_orders,
    SUM(o.amount) AS gross_revenue
FROM orders o
JOIN brands b ON o.brand_id = b.id
GROUP BY b.name;`
  },
  microservices: {
    title: 'Distributed Microservices & Reverse Proxy Core',
    badge: 'Systems Engineering & High-Performance RPC',
    overview: 'Engineered high-performance HTTP reverse proxy and microservices service registry architecture with asynchronous RPC protocols, Consul discovery, and distributed caching.',
    specs: [
      { label: 'Core Language', value: 'C#, ASP.NET Core, Netty asynchronous RPC framework' },
      { label: 'Service Discovery', value: 'Consul and ZooKeeper cluster coordination' },
      { label: 'Load Balancing', value: 'Weighted least-connections, consistent hashing, and health check probes' }
    ],
    codeSnippet: `// High-Performance Reverse Proxy Pipeline
public void Configure(IApplicationBuilder app) {
    app.UseRouting();
    app.UseEndpoints(endpoints => {
        endpoints.MapReverseProxy(proxyPipeline => {
            proxyPipeline.UseLoadBalancing();
            proxyPipeline.UsePassiveHealthChecks();
        });
    });
}`
  }
};

function initBlueprintModals() {
  const modalBackdrop = document.getElementById('blueprint-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const triggers = document.querySelectorAll('.blueprint-trigger');

  if (!modalBackdrop || !closeBtn) return;

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const key = trigger.getAttribute('data-project');
      const data = PROJECT_BLUEPRINTS[key];
      if (!data) return;

      document.getElementById('modal-title').textContent = data.title;
      document.getElementById('modal-badge').textContent = data.badge;
      document.getElementById('modal-overview').textContent = data.overview;

      const specsList = document.getElementById('modal-specs-list');
      specsList.innerHTML = '';
      data.specs.forEach((spec) => {
        const li = document.createElement('li');
        li.style.marginBottom = '10px';
        li.innerHTML = `<strong style="color:var(--accent-cyan-light);">${spec.label}:</strong> <span style="color:var(--text-secondary);">${spec.value}</span>`;
        specsList.appendChild(li);
      });

      const codeBlock = document.getElementById('modal-code-snippet');
      if (codeBlock) {
        codeBlock.textContent = data.codeSnippet;
      }

      modalBackdrop.classList.add('open');
    });
  });

  closeBtn.addEventListener('click', () => {
    modalBackdrop.classList.remove('open');
  });

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      modalBackdrop.classList.remove('open');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      modalBackdrop.classList.remove('open');
    }
  });
}

/* ==========================================================================
   9. Theme Toggle
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);

  toggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const nextTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('portfolio-theme', nextTheme);
  });
}

/* ==========================================================================
   10. Mobile Navigation Toggle
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}
