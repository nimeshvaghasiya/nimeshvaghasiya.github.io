/**
 * Nimesh Vaghasiya - Modern Architectural Portfolio
 * Interactive Systems, Neural Network Background, Terminal CLI & Architecture Blueprints
 */

document.addEventListener('DOMContentLoaded', () => {
  initNeuralCanvas();
  initHeaderScroll();
  initArchitectureTabs();
  initTopologyVisualizer();
  initProjectFilters();
  initTerminal();
  initGitHubStats();
  initCopyEmail();
  initBlueprintModals();
  initThemeToggle();
  initMobileNav();
  initAIAssistant();
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

    draw(isLight) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = isLight 
        ? `rgba(2, 132, 199, ${this.baseAlpha * 0.75})` 
        : `rgba(34, 211, 238, ${this.baseAlpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw(isLight);

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          const alpha = (1 - dist / 130) * 0.22;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = isLight 
            ? `rgba(124, 58, 237, ${alpha * 0.8})` 
            : `rgba(139, 92, 246, ${alpha})`;
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
  <span class="terminal-cmd">ai-workflow</span>  - 100% AI-driven engineering methodology (zero manual coding)
  <span class="terminal-cmd">projects</span>     - Key architecture implementations
  <span class="terminal-cmd">stack</span>        - Detailed technical arsenal
  <span class="terminal-cmd">stats</span>        - Real-time engineering and system metrics
  <span class="terminal-cmd">whoami</span>       - Architectural summary and engineering focus
  <span class="terminal-cmd">contact</span>      - Direct communication channels
  <span class="terminal-cmd">hire</span>         - Consulting and engineering engagement info
  <span class="terminal-cmd">clear</span>        - Clear terminal screen`,

    whoami: `Nimesh Vaghasiya
Principal Full-Stack Engineer & AI-First Solutions Architect
10+ years architecting resilient multi-tenant SaaS platforms, enterprise workflow automation hubs, and quantitative trading systems. For the past 2+ years, operating 100% using AI tools and autonomous coding agents with zero manual coding.`,

    'ai-workflow': `100% AI-Augmented Engineering Methodology (2023 — Present):
  • Zero Manual Coding: For the past 2 years, all production code, schemas, and pipelines are built exclusively using AI tools and autonomous coding agents.
  • Spec-Driven Architecture: Formal interface specifications, strict tenant scoping contracts, and domain boundary design.
  • Agentic Loop & Tooling: Model Context Protocol (MCP) servers, Claude 3.5, OpenAI, prompt-chaining, and automated code reviews.
  • Continuous Automated Verification: Every module is verified via automated test loops (Pest, PHPUnit, Playwright, TypeScript compilation).
  • Impact: 10x delivery speed, zero architectural debt, and enterprise-grade resilience.`,

    skills: `Core Capabilities:
  • <span style="color:#06b6d4;">AI-First & Agentic Systems:</span> 100% AI-Driven Development (2+ Yrs), Zero Manual Coding, MCP Servers, Claude API, OpenAI Agent Loops
  • <span style="color:#8b5cf6;">Multi-Tenant SaaS & Cloud:</span> Laravel 12, Stancl Tenancy (Single-DB), Filament v3, Inertia 2 + React, Redis Horizon
  • <span style="color:#ec4899;">Enterprise .NET & Backends:</span> ASP.NET Core (.NET 6), ASP.NET Zero / ABP, C#, EF Core, MSSQL, Hangfire, GoCardless
  • <span style="color:#10b981;">Automation & Omnichannel ETL:</span> n8n Orchestration (100+ production workflows), Airbyte on Kubernetes, Amazon SP-API, Lightspeed
  • <span style="color:#f59e0b;">Autonomous AI & Quant:</span> Python Algo Bots (v1, v2), WebSockets, Real-time Risk Circuit Breakers, Risk Engine`,

    projects: `Featured Shipped Systems:
  1. Multi-Tenant Retail & Brand Store Core (Laravel 12, Stancl Tenancy, Inertia React, Filament v3)
  2. My Business Tracker (MBT) SaaS (ASP.NET Core .NET 6, ASP.NET Zero, Hangfire, GoCardless Direct Debit)
  3. Autonomous Quantitative Trading Systems (v1 & v2) (Python, Docker, WebSockets, Risk Controls)
  4. Enterprise Workflow Automation Hub (100+ n8n workflows, Airbyte on K8s, Amazon SP-API, Lightspeed)
  5. Amazon Seller Intelligence - Spixview (Amazon SP-API, Metabase BI, Directus BaaS, BigQuery)
  6. StartupHire Talent Platform (Next.js 13+ App Router, TypeScript, Prisma, Tailwind, Shadcn UI)
  7. RouteManager Fleet Dispatch (ASP.NET Core, Angular, Google Maps, WebSockets, Logistics Engine)
  8. Windows Native Virtualization (C#, Win32 COM Interop, VirtualDesktop, Box CLI)`,

    stack: `Technical Arsenal:
  • Languages: C#, TypeScript, JavaScript, Python, PHP 8.3+, SQL, HTML5/CSS3
  • AI & Agentic: Claude 3.5, OpenAI, Model Context Protocol (MCP), Spec-Driven TDD, Autonomous Coding Agents
  • Frameworks: ASP.NET Core (.NET 6), Laravel 12, Next.js, React, Angular, Inertia.js, Tailwind CSS
  • Cloud & DevOps: Docker, Kubernetes, DigitalOcean, Hetzner, Vercel, GCP Functions, GitHub Actions CI/CD
  • Storage & Data: PostgreSQL, MSSQL Server, Redis, Directus BaaS, Pimcore PIM, Metabase BI`,

    stats: `Engineering Metrics:
  • Experience: 10+ Years Cloud & Full-Stack Architecture
  • AI-First Delivery: 100% AI-Driven with Zero Manual Coding (Past 2+ Years)
  • Shipped Systems: 15+ Enterprise Commercial & Client Platforms
  • Production Workflows: 100+ Active n8n Pipelines & Automated ETL Jobs
  • GitHub (@nimeshvaghasiya): Sandbox, experiment lab, and open-source explorations
  • Availability: Open for Principal / Staff Solutions Architect Roles & Advisory`,

    contact: `Direct Contact:
  • Email: <a href="mailto:nimesh.vaghasiya95@live.com" style="color:#06b6d4; text-decoration:underline;">nimesh.vaghasiya95@live.com</a>
  • GitHub: <a href="https://github.com/nimeshvaghasiya" target="_blank" style="color:#06b6d4; text-decoration:underline;">https://github.com/nimeshvaghasiya</a>
  • X / Twitter: <a href="https://x.com/nimeshvaghasiya" target="_blank" style="color:#06b6d4; text-decoration:underline;">@nimeshvaghasiya</a>`,

    hire: `Engagement Options:
  • Principal / Staff Solutions Architect (Remote Global)
  • Enterprise Multi-Tenant SaaS & Cloud Platform Architecture
  • Automated ETL & Omnichannel Integration (n8n, Airbyte, Amazon SP-API)
  • Algorithmic Trading Systems & Autonomous AI Agent Workflows
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
    title: 'Multi-Tenant Retail & Brand Store Core',
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
  mbt: {
    title: 'My Business Tracker (MBT) Enterprise SaaS Platform',
    badge: 'Enterprise Multi-Tenant Cloud SaaS',
    overview: 'Engineered an enterprise multi-tenant financial tracking & ERP platform with ASP.NET Core (.NET 6), ABP / ASP.NET Zero, GoCardless direct debit processing, EDI file parsing, and recurring background job reconciliation.',
    specs: [
      { label: 'Architecture Framework', value: 'ASP.NET Core (.NET 6) with ABP / ASP.NET Zero multi-tenancy & Entity Framework Core' },
      { label: 'Payment Gateway', value: 'GoCardless Direct Debit API for automated recurring collections & customer mandates' },
      { label: 'Background Processing', value: 'Hangfire cluster with Redis backing for scheduled billing runs and ledger reconciliation' },
      { label: 'Database & Security', value: 'MSSQL Server with multi-tenant schema partitioning, audit logs, and transaction ledgers' },
      { label: 'Client Application', value: 'Progressive Web App (PWA) with responsive dashboard, Metronic UI, and offline tolerance' }
    ],
    codeSnippet: `// Recurring Payment Dispatch with Hangfire & GoCardless
public async Task ProcessDirectDebitBatchAsync(Guid tenantId, DateTime billingCycle) {
    using (_currentTenant.Change(tenantId)) {
        var pendingInvoices = await _invoiceRepository.GetUnpaidDirectDebitsAsync(billingCycle);
        foreach (var inv in pendingInvoices) {
            _backgroundJobClient.Enqueue<IPaymentAppService>(svc =>
                svc.CreateGoCardlessPaymentAsync(inv.CustomerMandateId, inv.TotalAmount, inv.Id));
        }
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
  spixview: {
    title: 'Amazon Seller Intelligence & Analytics Platform (Spixview)',
    badge: 'E-Commerce Intelligence & Data Pipelines',
    overview: 'Architected automated Amazon SP-API seller intelligence platform pulling daily order metrics, buy-box tracking, sales velocity, and profit margins into Directus BaaS and Metabase BI executive dashboards.',
    specs: [
      { label: 'Ingestion Engine', value: 'Amazon Selling Partner API (SP-API) with LWA token rotation and rate-limit backoff' },
      { label: 'Headless CMS & BaaS', value: 'Directus BaaS for product attribute mapping, channel definitions, and metadata' },
      { label: 'Business Intelligence', value: 'Metabase BI connecting to high-speed PostgreSQL reporting replicas' },
      { label: 'Data Processing', value: 'Automated profit-after-ad-spend (POAS) calculations and inventory restock alerts' }
    ],
    codeSnippet: `// Amazon SP-API Order Metrics Aggregator
export async function syncSellerMetrics(marketplaceId, sellerAuth) {
    const spClient = new SellingPartnerApi({ ...sellerAuth, marketplaceId });
    const orders = await spClient.callAPI({
        operation: 'getOrders',
        endpoint: 'orders',
        query: { CreatedAfter: getPast24hIsoString() }
    });
    return await aggregateProfitMetrics(orders.payload.Orders);
}`
  },
  startuphire: {
    title: 'StartupHire Talent Acquisition & Recruitment Platform',
    badge: 'Modern Full-Stack & Next.js Architecture',
    overview: 'Designed and deployed modern recruitment platform for tech startups using Next.js 13+ App Router, Prisma ORM, NextAuth, and Shadcn UI, featuring live role filtering, candidate tracking, and resume management.',
    specs: [
      { label: 'Framework', value: 'Next.js 13+ with React Server Components, TypeScript, and edge routing' },
      { label: 'Data Layer', value: 'Prisma ORM with PostgreSQL hosted on Supabase / Cloud infrastructure' },
      { label: 'UI & Styling', value: 'Tailwind CSS, Shadcn UI, and Radix UI accessible primitives' },
      { label: 'Authentication', value: 'NextAuth.js with multi-provider OAuth and role-based permissions' }
    ],
    codeSnippet: `// Next.js App Router Server Component & Prisma Query
export async function JobListingFeed({ searchParams }: { searchParams: FilterParams }) {
    const jobs = await prisma.jobPost.findMany({
        where: {
            published: true,
            roleType: searchParams.type,
            salaryMin: { gte: searchParams.minSalary || 0 }
        },
        include: { company: true, tags: true },
        orderBy: { createdAt: 'desc' }
    });
    return <JobGrid jobs={jobs} />;
}`
  },
  routemanager: {
    title: 'RouteManager Fleet Dispatch & Logistics Routing',
    badge: 'Fleet Logistics & Geospatial Routing',
    overview: 'Built real-time dispatch and delivery management system enabling multi-stop route optimization, driver live location tracking, customer ETA alerts, and interactive dispatch mapping.',
    specs: [
      { label: 'Backend Architecture', value: 'ASP.NET Core REST APIs with real-time SignalR / WebSocket dispatch feeds' },
      { label: 'Geospatial Optimization', value: 'Google Maps Directions API integration with dynamic waypoint reordering' },
      { label: 'Frontend Interface', value: 'Angular SPA with interactive SVG map layers and real-time fleet telematics' },
      { label: 'Database', value: 'MSSQL Server with spatial data types for geofenced delivery verification' }
    ],
    codeSnippet: `// Fleet Route Optimization Dispatch
[HttpPost("optimize-manifest")]
public async Task<ActionResult<RoutePlanDto>> OptimizeRoute([FromBody] ManifestRequest request) {
    var waypoints = request.Stops.Select(s => new GeoCoordinate(s.Lat, s.Lng)).ToList();
    var optimizedSequence = await _routingService.CalculateShortestPathAsync(request.Depot, waypoints);
    await _hubContext.Clients.Group(request.DriverId).SendAsync("RouteUpdated", optimizedSequence);
    return Ok(optimizedSequence);
}`
  },
  desktoptools: {
    title: 'Windows Native Virtualization & Systems Tooling',
    badge: 'Systems Programming & Win32 COM Interop',
    overview: 'Engineered high-performance C# Windows systems utilities interfacing with native unmanaged Win32 COM interfaces for desktop virtualization, plus secure headless enterprise Box cloud storage CLI.',
    specs: [
      { label: 'Systems Language', value: 'C# / .NET with P/Invoke and native COM VTable interop' },
      { label: 'Windows Virtual Desktop', value: 'IVirtualDesktopManager native shell interface hook for seamless switching' },
      { label: 'Enterprise Storage CLI', value: 'Headless Box API synchronization tool with token cache and chunked streaming' },
      { label: 'Packaging', value: 'Published open-source NuGet library components and lightweight native binaries' }
    ],
    codeSnippet: `// Native Win32 COM Interop for Virtual Desktop
[ComImport]
[InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
[Guid("a5cd92ff-29be-454c-8d04-d82879fb3f1b")]
public interface IVirtualDesktopManager {
    int IsWindowOnCurrentVirtualDesktop(IntPtr topLevelWindow, out bool onCurrentDesktop);
    Guid GetWindowDesktopId(IntPtr topLevelWindow);
    int MoveWindowToDesktop(IntPtr topLevelWindow, ref Guid desktopId);
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

  const sunIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>`;

  const moonIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>`;

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    if (theme === 'light') {
      toggleBtn.innerHTML = moonIcon;
      toggleBtn.setAttribute('title', 'Switch to Dark Theme');
      toggleBtn.setAttribute('aria-label', 'Switch to Dark Theme');
    } else {
      toggleBtn.innerHTML = sunIcon;
      toggleBtn.setAttribute('title', 'Switch to Light Theme');
      toggleBtn.setAttribute('aria-label', 'Switch to Light Theme');
    }
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', theme === 'light' ? '#f8fafc' : '#07090e');
    }
  }

  const currentTheme = localStorage.getItem('portfolio-theme') || 'dark';
  applyTheme(currentTheme);

  toggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    applyTheme(isDark ? 'light' : 'dark');
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

/* ==========================================================================
   11. Interactive System Topology Visualizer
   ========================================================================== */
const TOPOLOGY_SPECS = {
  ingest: {
    title: 'Traffic & Webhook Ingestion Gateways',
    tech: 'Cloudflare Edge • Amazon SP-API • POS Webhooks',
    metric: 'Throughput: 14,500 req/min • P95: 18ms',
    desc: 'Ingests external order captures, inventory adjustments, and catalog updates with HMAC signature verification, TLS termination, and dead-letter queue buffering.'
  },
  router: {
    title: 'Multi-Tenant Dynamic Scoping Router',
    tech: 'Laravel 12 • Stancl Tenancy v3 • Sanctum Auth',
    metric: 'Routing Latency: 4ms • 100% Tenant Isolation',
    desc: 'Dynamically resolves tenant context from subdomains and custom headers. Applies automated Eloquent tenancy scopes ensuring zero cross-tenant data leakage.'
  },
  compute: {
    title: 'Asynchronous Workflow & Processing Clusters',
    tech: 'n8n Orchestration • Redis Horizon • Python Engines',
    metric: 'Active Workers: 32 • Failed Jobs: 0.001%',
    desc: 'Distributes long-running jobs across dedicated queues: inventory rebalancing, invoice PDF rendering, price recalculations, and trading strategy tick evaluations.'
  },
  storage: {
    title: 'Multi-Tenant Core Storage & Product Catalog',
    tech: 'PostgreSQL 16 • Directus BaaS • Pimcore MDM',
    metric: 'SKU Count: 50,000+ • Read Latency: 12ms',
    desc: 'Central single-database repository storing multi-brand product taxonomies, order ledgers, and tenant metadata with JSONB attributes and read replicas.'
  },
  lake: {
    title: 'Distributed ETL & Business Intelligence Lake',
    tech: 'Airbyte on Kubernetes • Metabase BI • PostgREST',
    metric: 'Sync Interval: Real-time CDC • Uptime: 99.98%',
    desc: 'High-throughput data replication cluster deployed on Kubernetes streaming sales analytics into Metabase BI executive dashboards and real-time reporting APIs.'
  }
};

function initTopologyVisualizer() {
  const nodes = document.querySelectorAll('.topology-node');
  const titleEl = document.getElementById('inspector-title');
  const techEl = document.getElementById('inspector-tech');
  const metricEl = document.getElementById('inspector-metric');
  const descEl = document.getElementById('inspector-desc');

  if (!nodes.length || !titleEl) return;

  nodes.forEach((node) => {
    node.addEventListener('click', () => {
      nodes.forEach((n) => n.classList.remove('selected'));
      node.classList.add('selected');

      const key = node.getAttribute('data-node');
      const data = TOPOLOGY_SPECS[key];
      if (data) {
        titleEl.textContent = data.title;
        techEl.textContent = data.tech;
        metricEl.textContent = data.metric;
        descEl.textContent = data.desc;
      }
    });
  });
}

/* ==========================================================================
   12. Floating AI Digital Twin ("Ask Nimesh's AI Agent")
   ========================================================================== */
function initAIAssistant() {
  const toggleBtn = document.getElementById('ai-assistant-toggle');
  const drawer = document.getElementById('ai-chat-drawer');
  const closeBtn = document.getElementById('ai-chat-close-btn');
  const sendBtn = document.getElementById('ai-chat-send-btn');
  const inputEl = document.getElementById('ai-chat-input');
  const bodyEl = document.getElementById('ai-chat-body');
  const promptChips = document.querySelectorAll('.chat-prompt-chip');

  if (!toggleBtn || !drawer || !inputEl || !bodyEl) return;

  toggleBtn.addEventListener('click', () => {
    drawer.classList.toggle('open');
    if (drawer.classList.contains('open')) {
      inputEl.focus();
    }
  });

  closeBtn.addEventListener('click', () => {
    drawer.classList.remove('open');
  });

  promptChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const q = chip.getAttribute('data-prompt');
      if (q) {
        handleUserMessage(q);
      }
    });
  });

  sendBtn.addEventListener('click', () => {
    const text = inputEl.value.trim();
    if (text) {
      inputEl.value = '';
      handleUserMessage(text);
    }
  });

  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const text = inputEl.value.trim();
      if (text) {
        inputEl.value = '';
        handleUserMessage(text);
      }
    }
  });

  function handleUserMessage(query) {
    appendMessage(query, 'user');

    // Show simulated typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chat-bubble chat-bubble-agent';
    typingIndicator.innerHTML = '<span style="color:var(--accent-cyan); font-family:var(--font-mono);">Thinking & retrieving architecture context...</span>';
    bodyEl.appendChild(typingIndicator);
    bodyEl.scrollTop = bodyEl.scrollHeight;

    setTimeout(() => {
      bodyEl.removeChild(typingIndicator);
      const reply = generateAgentReply(query);
      appendMessage(reply, 'agent');
    }, 600);
  }

  function appendMessage(text, sender) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble chat-bubble-${sender}`;
    bubble.innerHTML = text;
    bodyEl.appendChild(bubble);
    bodyEl.scrollTop = bodyEl.scrollHeight;
  }

  function generateAgentReply(rawQuery) {
    const q = rawQuery.toLowerCase();

    if (q.includes('tenan') || q.includes('multi-tenant') || q.includes('laravel') || q.includes('database')) {
      return `<strong>Multi-Tenancy Architecture:</strong><br>
Nimesh engineered a single-database multi-tenant retail platform using <strong>Laravel 12</strong> and <strong>Stancl Tenancy v3</strong>. Rather than running costly database-per-tenant infrastructure, this model isolates data using automated Eloquent tenant query scopes, sub-100ms response latencies, and unified administrative control via <strong>Filament v3</strong> and <strong>Inertia 2 + React</strong>. High-volume jobs run seamlessly through a <strong>Redis + Horizon</strong> cluster.`;
    }

    if (q.includes('trading') || q.includes('quant') || q.includes('algo') || q.includes('bot')) {
      return `<strong>Algorithmic Trading & Autonomous Engines:</strong><br>
Nimesh built quantitative trading systems (TradingBot v1 & v2) in <strong>Python</strong> running inside production Docker containers. Key architectural highlights include real-time WebSocket tick ingestion, asynchronous event loops, automated strategy execution, and automated risk guards with max-drawdown circuit breakers.`;
    }

    if (q.includes('n8n') || q.includes('etl') || q.includes('airbyte') || q.includes('workflow') || q.includes('integration')) {
      return `<strong>Enterprise Integration & ETL Ecosystem:</strong><br>
Nimesh architected a distributed automation hub managing over <strong>100+ production n8n workflows</strong> connecting Amazon Selling Partner API (SP-API), Lightspeed POS, and accounting ERPs. He also operates an <strong>Airbyte cluster on DigitalOcean Kubernetes</strong> for high-throughput data replication into analytics warehouses.`;
    }

    if (q.includes('zero manual') || q.includes('no manual') || q.includes('how do you work') || q.includes('ai-first') || q.includes('ai tools') || q.includes('ai workflow') || q.includes('agentic')) {
      return `<strong>100% AI-Augmented Engineering (Past 2 Years):</strong><br>
For the last 2+ years, Nimesh does not write boilerplate code manually. Instead, he operates as an <strong>AI-First Solutions Architect</strong> orchestrating autonomous coding agents, LLM reasoning pipelines (Claude 3.5, OpenAI), and custom Model Context Protocol (MCP) servers.<br><br>
<strong>Production Methodology:</strong><br>
• <em>Spec-Driven Architecture:</em> Defines domain boundaries, single-DB multi-tenancy models, and OpenAPI/TypeScript schemas upfront.<br>
• <em>Autonomous Coding Subagents:</em> Dispatches specialized agents to generate implementations with zero manual drag.<br>
• <em>Automated Verification Loops:</em> Continuous execution of unit/feature test suites (Pest, PHPUnit, Playwright, typecheck) to verify deterministic correctness.<br>
• <em>10x Velocity:</em> Enables shipping complete enterprise platforms in days rather than months with zero tech debt.`;
    }

    if (q.includes('ai') || q.includes('mcp') || q.includes('agent') || q.includes('llm')) {
      return `<strong>Autonomous AI & MCP Architecture:</strong><br>
Nimesh specializes in AI agent engineering, utilizing the <strong>Model Context Protocol (MCP)</strong> to allow LLMs (Claude, OpenAI) to perform deterministic codebase reasoning, execute verified unit tests, and safely query live system metrics through JSON-RPC and structured OpenAPI interfaces.`;
    }

    if (q.includes('mbt') || q.includes('tracker') || q.includes('dotnet') || q.includes('.net') || q.includes('c#') || q.includes('gocardless')) {
      return `<strong>My Business Tracker (MBT) & Enterprise .NET SaaS:</strong><br>
Nimesh architected My Business Tracker (MBT), an enterprise multi-tenant cloud platform built with <strong>ASP.NET Core (.NET 6)</strong> and the <strong>ASP.NET Zero / ABP Framework</strong>. Key architectural highlights include automated recurring Direct Debit collections via <strong>GoCardless API</strong>, EDI transaction batch parsing, <strong>Hangfire</strong> background processing with Redis, and an Angular Progressive Web App (PWA).`;
    }

    if (q.includes('spixview') || q.includes('amazon') || q.includes('seller') || q.includes('metabase')) {
      return `<strong>Amazon Seller Intelligence Platform (Spixview):</strong><br>
Nimesh engineered an automated seller intelligence system integrating <strong>Amazon SP-API</strong> for real-time order fee reconciliation, buy-box tracking, sales velocity forecasting, and executive dashboards built in <strong>Metabase BI</strong> connected to <strong>Directus BaaS</strong>.`;
    }

    if (q.includes('startuphire') || q.includes('next') || q.includes('recruitment') || q.includes('prisma')) {
      return `<strong>StartupHire Recruitment Platform:</strong><br>
A modern talent acquisition platform built with <strong>Next.js 13+ App Router</strong>, React Server Components, <strong>Prisma ORM</strong>, NextAuth, and <strong>Tailwind CSS + Shadcn UI</strong>, featuring dynamic role indexing, candidate pipelines, and edge authentication.`;
    }

    if (q.includes('route') || q.includes('fleet') || q.includes('logistics') || q.includes('dispatch')) {
      return `<strong>RouteManager Fleet Logistics Engine:</strong><br>
A real-time delivery dispatch platform built with <strong>ASP.NET Core</strong> and <strong>Angular</strong>, providing multi-stop route optimization using Google Maps APIs, driver WebSocket telematics, and automated dispatch manifests.`;
    }

    if (q.includes('github') || q.includes('repo') || q.includes('fork') || q.includes('public')) {
      return `<strong>Engineering Body of Work & GitHub:</strong><br>
Nimesh's primary engineering body of work across his 10+ year career consists of proprietary commercial production platforms, private client infrastructure (Upwork, Adleads, Fiverr contracts), and high-throughput SaaS. His public GitHub profile serves as his experimental sandbox and research lab.`;
    }

    if (q.includes('hire') || q.includes('contact') || q.includes('email') || q.includes('role') || q.includes('job') || q.includes('available')) {
      return `<strong>Engagement & Availability:</strong><br>
Nimesh is currently available for <strong>Principal / Staff Solutions Architecture roles</strong>, enterprise SaaS advisory, and high-impact distributed systems consulting.<br><br>
You can reach him directly at: <a href="mailto:nimesh.vaghasiya95@live.com" style="color:var(--accent-cyan); text-decoration:underline;">nimesh.vaghasiya95@live.com</a> or connect on <a href="https://github.com/nimeshvaghasiya" target="_blank" style="color:var(--accent-cyan); text-decoration:underline;">GitHub Lab</a>.`;
    }

    return `<strong>System Architecture Summary:</strong><br>
Nimesh Vaghasiya is a Principal Full-Stack Engineer & Cloud Solutions Architect with 10+ years of experience engineering multi-tenant platforms (Laravel 12 & Stancl Tenancy, ASP.NET Core .NET 6 & MBT), autonomous AI agents & quant trading bots (Python, Docker, MCP), and distributed ETL hubs (100+ n8n workflows, Airbyte on K8s).<br><br>
Feel free to ask about <em>My Business Tracker (MBT)</em>, <em>multi-tenant retail core</em>, <em>algorithmic trading bots</em>, <em>Amazon SP-API pipelines</em>, or <em>how to get in touch</em>!`;
  }
}
