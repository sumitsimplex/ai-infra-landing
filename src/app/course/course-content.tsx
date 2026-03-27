"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  ChevronRight,
  ChevronDown,
  CheckCircle,
  Circle,
  LogOut,
  Cpu,
  FlaskConical,
  Briefcase,
  Rocket,
} from "lucide-react";

type Module = {
  id: string;
  title: string;
  duration: string;
  content: string;
};

type Week = {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  modules: Module[];
};

const weeks: Week[] = [
  {
    id: "week-1",
    title: "Week 1: Technical Foundations",
    subtitle: "Know more than your client about their problem",
    icon: BookOpen,
    color: "text-blue-400",
    modules: [
      {
        id: "1.1",
        title: "The AI Infrastructure Landscape",
        duration: "30 min read",
        content: `## What Companies Actually Need

Every company is in one of four stages with AI:

**Stage 1: Experimenting** → Using OpenAI/Claude APIs
**Stage 2: Getting Serious** → Fine-tuning models, building RAG
**Stage 3: Self-Hosting** → Need to control data, costs, latency ← YOUR CLIENTS
**Stage 4: Scaled Production** → Running AI at massive scale ← YOUR CLIENTS

### Why Companies Self-Host

1. **Data Sovereignty & Compliance (40%)** — GDPR, healthcare, finance
2. **Cost at Scale (30%)** — API costs become enormous above 100K requests/day
3. **Latency & Performance (20%)** — self-hosted = same data centre as the app
4. **Customisation & Control (10%)** — custom fine-tuned models, specific hardware

### The Cost Math That Gets CTOs on the Phone

| Approach | Monthly Cost (100K req/day) |
|----------|---------------------------|
| OpenAI GPT-4 API | ~€90,000 |
| Self-hosted 2x A100 (on-demand) | ~€6,500 |
| Self-hosted 2x A100 (spot) | ~€2,800 |
| Optimised (spot + autoscaling + quantised) | ~€1,400 |

**You're selling a 98% cost reduction.** That's an easy conversation.

### Your Competitive Advantage

| Competitor | Your Edge |
|-----------|-----------|
| Cloud ML services | Cloud-agnostic, cheaper at scale |
| MLOps platforms | Full ownership and customisation |
| Big consultancies | Fast, lean, personally accountable |
| Freelancers | Deep architecture expertise |

### Homework
1. Find 3 companies in Ireland/EU hiring ML Platform Engineers
2. Calculate API vs self-host cost for 50K requests/day
3. Read 5 LinkedIn posts about self-hosting LLMs`,
      },
      {
        id: "1.2",
        title: "GPU Deep Dive",
        duration: "45 min read",
        content: `## The Economics of GPUs

### GPU Lineup

| GPU | VRAM | Best For | Cost/hr |
|-----|------|----------|---------|
| T4 | 16 GB | Small models | €0.35-0.50 |
| L4 | 24 GB | Mid models | €0.70-0.90 |
| A10G | 24 GB | Mid models, training | €1.00-1.50 |
| A100 | 40/80 GB | Large models | €3.00-4.50 |
| H100 | 80 GB | Massive models | €8.00-12.00 |

### The Golden Rule: VRAM = What Models You Can Run

| Parameters | VRAM (FP16) | GPU |
|-----------|-------------|-----|
| 7B | ~14 GB | T4 or L4 |
| 13B | ~26 GB | A10G or L40S |
| 70B | ~140 GB | 2x A100 80GB |
| 70B quantised (4-bit) | ~35 GB | 1x A100 40GB |

### Quantisation — Your Secret Weapon

- **FP16:** Full precision, full VRAM, best quality
- **INT8:** ~50% VRAM, ~1-2% quality drop
- **AWQ/GPTQ (4-bit):** ~25% VRAM, ~3-5% quality drop

### The 6-Step Cost Optimisation Framework

1. **Right-sizing** — using A100 when L4 works? (50-70% savings)
2. **Spot instances** — 60-70% discount for fault-tolerant workloads
3. **Autoscaling** — don't run 24/7 for a daytime workload (30-60%)
4. **Quantisation** — 4-bit instead of FP16? (50% by using smaller GPU)
5. **Batching** — continuous batching = 2-5x throughput, same hardware
6. **Reserved instances** — commit for 1-3 years for stable baseline (30-50%)

### Homework
1. Price out 3 GPU scenarios on your cloud provider
2. Create a GPU recommendation cheat sheet`,
      },
      {
        id: "1.3",
        title: "Model Serving Frameworks",
        duration: "40 min read",
        content: `## vLLM vs Triton vs TGI

### The Problem with DIY

A Flask wrapper processes ONE request at a time — wasting 70-80% of GPU compute.

### vLLM (Your Default — 90% of clients)

**PagedAttention** manages GPU memory like an OS manages RAM.
Result: **3-5x more throughput** on the same GPU.

| Feature | vLLM |
|---------|------|
| Throughput | 3-5x vs naive |
| API | OpenAI-compatible |
| Models | LLMs only |
| Ease of use | Very easy |

### Triton (5-10% of clients)

Multi-framework, multi-model server from NVIDIA.
Use when: multiple model types, ensembles, NVIDIA support contract.

### TGI (Rare)

HuggingFace's serving framework. Use when: deeply embedded in HF ecosystem.

### Performance (Llama 3 8B, A100, 128 users)

| Framework | Tokens/s | P99 Latency |
|-----------|----------|-------------|
| Flask | ~200 | 12,000ms |
| TGI | ~1,800 | 850ms |
| vLLM | ~2,400 | 620ms |

**12x improvement** with vLLM vs Flask. Same model, same GPU.

### Decision Matrix

- "We want to serve an LLM" → **vLLM**
- "We run multiple model types" → **Triton**
- "We're a HuggingFace shop" → **TGI or vLLM**
- "We don't know yet" → **vLLM**`,
      },
      {
        id: "1.4",
        title: "K8s for AI Workloads",
        duration: "45 min read",
        content: `## What's Different from Regular Workloads

### Health Checks — The #1 Source of Failures

A 70B model takes 2-5 minutes to load. Default K8s probes timeout at 30s.

**Use ALL THREE probe types:**

\`\`\`yaml
startupProbe:           # Gives model time to load
  failureThreshold: 30  # 5 min total
livenessProbe:          # Restarts if crashed
  initialDelaySeconds: 300
readinessProbe:         # Removes from service if not ready
  periodSeconds: 10
\`\`\`

### GPU Scheduling Rules

- GPUs cannot be shared (by default)
- Requests MUST equal limits
- Taint GPU nodes to prevent non-GPU pods
- Set memory to 1.5-2x model size

### Autoscaling

HPA doesn't understand GPU metrics. Use **KEDA**:
- Scale on GPU utilisation or queue depth
- Supports scale-to-zero
- Stabilisation windows prevent flapping

### AI vs Standard K8s

| Aspect | Standard | AI/GPU |
|--------|----------|--------|
| Startup | Seconds | 2-5 minutes |
| Node cost | €0.10-0.50/hr | €3-12/hr |
| Scaling metric | CPU/memory | GPU util / queue |
| Storage | < 1GB | 10-200GB models |`,
      },
      {
        id: "1.5",
        title: "Security & Compliance",
        duration: "30 min read",
        content: `## The Reason Clients Pay Premium

### GDPR (Your Home Turf — Ireland)

1. **Data Residency** — data stays in EU
2. **Data Processing Agreements** — self-hosted = you control everything
3. **Right to Erasure** — no third-party data retention risk
4. **Data Minimisation** — log metadata, not payloads

### Security Checklist

**Infrastructure:** RBAC, Pod Security Standards, network policies, secrets manager
**Application:** API auth, rate limiting, input validation, no payload logging
**Data:** Encryption at rest + transit, model encryption, backup strategy
**Operational:** Incident response plan, access audit trail, vulnerability scanning

### How to Talk About Security

Bad: "I configure RBAC and network policies."
Good: "I make sure your customer data never touches a system you don't control."`,
      },
      {
        id: "1.6",
        title: "Lab 1: Deploy LLM on Local K8s",
        duration: "2-3 hours hands-on",
        content: `## Hands-On: Deploy a Model on K8s

### Steps

1. Create namespace: \`kubectl create namespace ai-lab\`
2. Install NVIDIA device plugin
3. Deploy vLLM with proper health checks
4. Test inference via OpenAI-compatible API
5. Observe GPU usage with nvidia-smi

### Exercises

1. **Break the health checks** — set failureThreshold to 2, watch the pod loop
2. **Add resource quotas** — try deploying 2 replicas, see one stay Pending
3. **Benchmark** — send concurrent requests, measure latency

**You've now done what 95% of your prospects are struggling with.**`,
      },
    ],
  },
  {
    id: "week-2",
    title: "Week 2: Hands-On Mastery",
    subtitle: "Build it until it's boring. Then you're ready.",
    icon: FlaskConical,
    color: "text-emerald-400",
    modules: [
      {
        id: "2.1",
        title: "Full Stack Cloud Deploy",
        duration: "4-6 hours hands-on",
        content: `## Build the Exact Stack You'll Deliver to Clients

### Phase-by-Phase

1. **Infrastructure** — Terraform → GKE + GPU node pool (~10 min)
2. **GPU Drivers** — NVIDIA device plugin verification
3. **Model Serving** — vLLM via Helm chart
4. **Monitoring** — Prometheus + Grafana + DCGM + Kubecost
5. **Gateway** — Kong with auth + rate limiting
6. **Load Test** — hey tool, 200 concurrent users
7. **Clean Up** — terraform destroy (save money!)

### Budget: €20-50 total

Use GCP €300 free credits or AWS Activate.

### Document Everything

- What took longer than expected?
- Where did you get stuck?
- How long did each phase take?

**Screenshot your work — this becomes your portfolio.**`,
      },
      {
        id: "2.2",
        title: "Monitoring & Observability",
        duration: "2-3 hours",
        content: `## The Dashboard That Wins Clients

### Three Layers

1. **Infrastructure** — GPU util, memory, temperature
2. **Application** — throughput, latency, queue depth
3. **Business** — cost per hour, cost per request

### Key Grafana Dashboard Layout

Row 1: Overview stats (req/s, P95 latency, errors, pods)
Row 2: GPU health (utilisation, memory, temperature, power)
Row 3: Inference performance (latency percentiles, throughput, queue)
Row 4: Cost (€/hour, €/1K tokens, daily trend)

### Alert Rules

- GPU > 90% for 5m → warning
- GPU memory > 95% → critical
- Queue > 10 requests → scale up needed
- P99 latency > 30s → investigate
- Pod restarting → critical

**Export dashboard as JSON — import for every client.**`,
      },
      {
        id: "2.3",
        title: "Autoscaling & Cost Optimisation",
        duration: "2-3 hours",
        content: `## Where You Save Clients The Most Money

### KEDA Configuration

Scale on GPU utilisation:
\`\`\`yaml
triggers:
  - type: prometheus
    metadata:
      query: avg(DCGM_FI_DEV_GPU_UTIL)
      threshold: "70"
\`\`\`

### Cost Impact Example

| Scenario | Monthly Cost |
|----------|-------------|
| 1x A100 24/7 on-demand | €2,160 |
| With autoscaling (10hr/day) | €900 |
| With spot + scaling | €360 |
| **Savings** | **83%** |

### Schedule-Based Scaling

For business-hours-only workloads:
\`\`\`yaml
triggers:
  - type: cron
    metadata:
      timezone: Europe/Dublin
      start: "0 8 * * 1-5"
      end: "0 18 * * 1-5"
      desiredReplicas: "2"
\`\`\``,
      },
      {
        id: "2.4",
        title: "API Gateway & Security",
        duration: "2 hours",
        content: `## Protecting the Inference Endpoint

### Why Gateway?

Without: Anyone can use your GPU, no tracking, DDoS vulnerability
With: Auth, rate limiting, logging, TLS

### Kong on K8s

- API key auth per client
- Rate limiting (60/min, 1000/hr)
- Request size limiting (1MB max)
- TLS via cert-manager + Let's Encrypt

### Logging Best Practices

**Log:** timestamp, request ID, consumer, status, latency, token count
**Never log:** request body, response body, API keys`,
      },
      {
        id: "2.5",
        title: "Troubleshooting Playbook",
        duration: "1 hour read + practice",
        content: `## The 15 Problems You'll See at Every Client

1. **Pod Pending** — no GPU available → check node pool max
2. **CrashLoopBackOff** — startup probe too short → increase threshold
3. **OOMKilled** — insufficient memory → increase limits or reduce model
4. **High latency** — GPU overloaded → scale up replicas
5. **Download fails** — HF token issue or network policy blocking egress
6. **Spot reclaimed** — node disappears → PodDisruptionBudget + multi-replica
7. **Driver mismatch** — CUDA errors → update drivers
8. **Autoscaler stuck** — metrics not flowing → check Prometheus scrape
9. **Flapping** — scale up/down rapidly → increase stabilisation window
10. **Garbage output** — quantisation too aggressive → try FP16
11. **No GPU metrics** — DCGM not running → install/verify
12. **Cost overrun** — idle nodes → fix autoscaler min/schedule
13. **Network blocked** — 502/503 → check NetworkPolicy
14. **TLS issues** — cert-manager misconfigured → check ClusterIssuer
15. **Cold start slow** — expected for large models → use PVC, keep min=1 in prod

### Troubleshooting Order

1. Events → 2. Logs → 3. Resources → 4. Network → 5. Metrics

**90% solved at step 1 or 2.**`,
      },
    ],
  },
  {
    id: "week-3",
    title: "Week 3: The Business",
    subtitle: "Technical skills get you in the room. Business skills pay the bills.",
    icon: Briefcase,
    color: "text-amber-400",
    modules: [
      {
        id: "3.1",
        title: "Positioning & Messaging",
        duration: "30 min",
        content: `## How to Describe What You Do

### Your 30-Second Pitch

"Most companies building AI hit the same wall — models work in notebooks but can't get to production. Their ML team ends up spending months debugging Kubernetes instead of building features.

I fix that. I deploy production-ready AI infrastructure in 2-3 weeks. GPU costs drop 40-60%, and your data never leaves your cloud."

### Words That Work

| Don't Say | Say Instead |
|-----------|-------------|
| "I do DevOps" | "I deploy AI infrastructure" |
| "I set up Kubernetes" | "I get your models to production" |
| "I'm a freelancer" | "I'm an independent consultant" |
| "It depends" | "For your situation, I'd suggest..." |

### Content Pillars (post 3-4x/week)

1. **Education** — technical insights
2. **Pain points** — problems you solve
3. **Behind the scenes** — builds trust
4. **Results** — social proof`,
      },
      {
        id: "3.2",
        title: "Pricing Psychology",
        duration: "30 min",
        content: `## Why €7K Feels Like a Bargain

### Anchoring

Always anchor against the alternative:

| Your fee | The alternative |
|----------|----------------|
| €7-11K one-time | ML Platform Engineer: €120-180K/year |
| €7-11K one-time | 3 months of engineer time: €30-45K |
| €7-11K one-time | €15K/month wasted GPU costs |

### Three-Tier Strategy

Tier 1: €3-4.5K (Architecture Review) — the "too small" option
**Tier 2: €7-11K (Build & Deploy)** — most will pick this
Tier 3: €2-3.5K/mo (Retainer) — recurring revenue

### Never Discount, Reduce Scope

"For €5K, I can deliver the architecture review plus partial deployment — K8s cluster and model serving, without monitoring and gateway."

### Irish Tax

- Sole trader when < €75K, Ltd when above
- VAT threshold: €37,500 for services
- EU B2B: reverse charge (no VAT)
- **Talk to an accountant before first invoice**`,
      },
      {
        id: "3.3",
        title: "The Discovery Call",
        duration: "45 min",
        content: `## The 15-Minute Call That Closes Deals

### Golden Rules

1. Listen 70%, talk 30%
2. Ask, don't tell
3. Take notes — use their exact words later
4. Never pitch on the first call

### The 7 Questions

1. "What AI workloads are you running/planning?"
2. "Where are you hosting? Any compliance constraints?"
3. "What does your team look like?"
4. "What have you tried so far? Biggest blocker?"
5. "What happens if this isn't solved next month?"
6. "Do you have a budget in mind?"
7. "What's your ideal timeline?"

### The Close

"I can put together a one-page proposal by [day]. It'll outline exactly what I'd do, the timeline, and the investment. Does that work?"

### Follow-Up Sequence

Day 0: Call → Day 1: Proposal → Day 3: Check-in → Day 7: Last follow-up

**Three follow-ups maximum. Then nurture via LinkedIn.**`,
      },
      {
        id: "3.4",
        title: "Proposals & Contracts",
        duration: "30 min",
        content: `## Templates You Can Use Today

### One-Page Proposal Structure

1. **The Challenge** — their problem, their words
2. **Proposed Solution** — what you'll build
3. **Timeline** — week-by-week deliverables
4. **Investment** — fee + expected cloud costs
5. **Expected Outcomes** — time saved, cost reduced, ROI
6. **Next Steps** — how to proceed

### Contract Essentials

- Scope clearly defined (prevents scope creep)
- 50/50 payment (50% upfront, 50% on completion)
- IP transfers to client on full payment
- 7-day termination clause
- Governed by Irish law

**Have a solicitor review your contract once (€200-400). Worth it.**`,
      },
      {
        id: "3.5",
        title: "Finding Clients",
        duration: "45 min",
        content: `## The 5 Channels (Ranked by Speed)

### 1. LinkedIn Outbound (Fastest)

Send 10 DMs/day. Target:
- CTOs of startups hiring ML engineers
- VPs posting about AI challenges
- Companies with open MLOps roles

**The math:** 200 DMs/month → 10-20 replies → 4-10 calls → 1-4 clients

### 2. LinkedIn Content (Compounds)

Post 3-4x/week. Mix education, pain points, behind-the-scenes, results.

### 3. Communities

r/kubernetes, r/mlops, CNCF Slack, MLOps Community. Answer questions. Be helpful.

### 4. Referrals

Build relationships with ML consultants, cloud architects, recruiters. 10-15% referral fee.

### 5. SEO (Slow but autopilot)

Blog posts: "Cost of Self-Hosting Llama 3", "vLLM vs Triton", etc.

### Qualify Fast

Good: Has budget, timeline, authority, and real pain
Bad: "Can you do it for €500?", no timeline, "we'll pay after our raise"`,
      },
      {
        id: "3.6",
        title: "Irish Business Basics",
        duration: "20 min",
        content: `## Setup Checklist

### Sole Trader vs Ltd

| | Sole Trader | Ltd |
|---|---|---|
| Setup | Free, immediate | €200-400, 1-2 weeks |
| Tax rate | 20-40% + PRSI + USC | 12.5% corp tax |
| Better when | < €75K/year | > €75K/year |

**Start as sole trader. Switch later.**

### VAT Rules

- Ireland B2B: charge 23% VAT
- EU B2B: reverse charge (no VAT) — get their VAT number
- Non-EU: no VAT

### Before First Client

- [ ] Revenue registration
- [ ] Business bank account
- [ ] Invoicing tool (Xero or Wave)
- [ ] Professional indemnity insurance (~€300-500/yr)
- [ ] Accountant consultation
- [ ] Contract reviewed by solicitor`,
      },
    ],
  },
  {
    id: "week-4",
    title: "Week 4: Launch",
    subtitle: "Imperfect action beats perfect preparation.",
    icon: Rocket,
    color: "text-red-400",
    modules: [
      {
        id: "4.1",
        title: "7-Day LinkedIn Post Sprint",
        duration: "30 min/day",
        content: `## Publish Every Day This Week

### Calendar

| Day | Type | Topic |
|-----|------|-------|
| Mon | Education | GPU cost breakdown |
| Tue | Pain point | 5 K8s mistakes |
| Wed | Behind scenes | "I deployed Llama 3..." |
| Thu | Education | vLLM vs naive serving |
| Fri | Credibility | The hiring problem |
| Sat | Architecture | Stack diagram |
| Sun | Story | Why I do this |

### Posting Rules

1. No links in post body (LinkedIn suppresses them)
2. First line = the hook
3. Use line breaks generously
4. End with a CTA
5. Reply to every comment within 1 hour
6. Post 8-9am Irish time

**Engage with 10 posts/day before and after your own.**`,
      },
      {
        id: "4.2",
        title: "Outreach Sprint: 50 DMs",
        duration: "45 min/day × 5 days",
        content: `## 10 DMs Per Day for 5 Days

### Daily Targets

Mon: CTOs of startups hiring ML engineers
Tue: VPs/Heads of ML posting about challenges
Wed: Engineering leads at EU companies (GDPR angle)
Thu: People who engaged with your posts
Fri: Re-engage viewers + new targets

### DM Sequence

**Day 1:** Personalised first touch
**Day 3:** Follow up (if viewed, didn't reply)
**Day 7:** Value-add (share a relevant post)

**Maximum 3 messages. Then move on.**

### Expected Results

50 DMs → 5-10 replies → 2-5 calls → 1-3 proposals → 1-2 clients

**1-2 clients = €7-22K revenue.**`,
      },
      {
        id: "4.3",
        title: "Portfolio & Case Study",
        duration: "2 hours",
        content: `## Your Lab Work = Your Portfolio

### Package Your Week 2 Deployment

Write a case study:
- Challenge → Solution → Architecture → Results
- Include screenshots (Grafana, kubectl, load test)
- Add architecture diagram

### Display It

1. Landing page case study section
2. LinkedIn Featured section
3. GitHub (pin your template repo)
4. Discovery calls — "Let me show you..."

### First Paying Client → Real Case Study

Negotiate upfront: 15% discount for case study rights.
Most clients agree.`,
      },
      {
        id: "4.4",
        title: "Your First Client: Start to Finish",
        duration: "1 hour read",
        content: `## The Complete Walkthrough

### Timeline

Day 1-3: DM → Discovery call
Day 4: Proposal sent
Day 7-10: Contract signed + deposit
Day 10-30: Deliver
Day 30: Final payment + case study

### 3-Week Delivery

**Week 1:** Architecture deep dive + infrastructure build
**Week 2:** Model serving + monitoring
**Week 3:** Security + testing + documentation + handoff

### Post-Delivery Checklist

- [ ] Final invoice sent + paid
- [ ] Case study written
- [ ] Testimonial requested
- [ ] Retainer offered (€2-3.5K/mo)
- [ ] Referral asked

### The Retainer Upsell

"I can handle ongoing optimisation for €2-3.5K/month — essentially a senior AI infra engineer on call without the €150K salary."

---

## You've Completed the Course

Your target: 2-3 clients = €15-30K/month.

**You've got this. Go make it happen.**`,
      },
    ],
  },
];

export default function CourseContent() {
  const [expandedWeek, setExpandedWeek] = useState<string>("week-1");
  const [activeModule, setActiveModule] = useState<string>("1.1");
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const toggleComplete = (id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const activeContent = weeks
    .flatMap((w) => w.modules)
    .find((m) => m.id === activeModule);

  const totalModules = weeks.reduce((a, w) => a + w.modules.length, 0);
  const progress = Math.round((completed.size / totalModules) * 100);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Top bar */}
      <div className="border-b border-zinc-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Cpu className="w-5 h-5 text-indigo-400" />
          <span className="font-semibold text-sm">AI Infra Course</span>
          <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded">
            Admin
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-xs text-zinc-400">
            {completed.size}/{totalModules} complete ({progress}%)
          </div>
          <div className="w-32 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <button
            onClick={handleLogout}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 border-r border-zinc-800 min-h-[calc(100vh-49px)] overflow-y-auto p-4 flex-shrink-0">
          {weeks.map((week) => (
            <div key={week.id} className="mb-2">
              <button
                onClick={() =>
                  setExpandedWeek(expandedWeek === week.id ? "" : week.id)
                }
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-900 transition-colors text-left"
              >
                <week.icon className={`w-5 h-5 ${week.color} flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">
                    {week.title}
                  </div>
                  <div className="text-xs text-zinc-500 truncate">
                    {week.subtitle}
                  </div>
                </div>
                {expandedWeek === week.id ? (
                  <ChevronDown className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                )}
              </button>

              <AnimatePresence>
                {expandedWeek === week.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    {week.modules.map((mod) => (
                      <button
                        key={mod.id}
                        onClick={() => setActiveModule(mod.id)}
                        className={`w-full flex items-center gap-2 px-4 py-2 ml-4 rounded-lg text-left text-sm transition-colors ${
                          activeModule === mod.id
                            ? "bg-indigo-500/10 text-indigo-300"
                            : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                        }`}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleComplete(mod.id);
                          }}
                          className="flex-shrink-0"
                        >
                          {completed.has(mod.id) ? (
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Circle className="w-4 h-4 text-zinc-600" />
                          )}
                        </button>
                        <span
                          className={
                            completed.has(mod.id) ? "line-through opacity-60" : ""
                          }
                        >
                          {mod.id} {mod.title}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto min-h-[calc(100vh-49px)]">
          {activeContent && (
            <motion.div
              key={activeContent.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-3xl mx-auto px-8 py-10"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-xs text-indigo-400 font-mono mb-1">
                    MODULE {activeContent.id}
                  </div>
                  <h1 className="text-3xl font-bold">{activeContent.title}</h1>
                </div>
                <span className="text-xs text-zinc-500 bg-zinc-800 px-3 py-1 rounded-full">
                  {activeContent.duration}
                </span>
              </div>

              <div className="prose prose-invert prose-sm max-w-none prose-headings:text-white prose-p:text-zinc-300 prose-li:text-zinc-300 prose-strong:text-white prose-code:text-indigo-300 prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-th:text-zinc-300 prose-td:text-zinc-400 prose-table:text-sm">
                {activeContent.content.split("\n").map((line, i) => {
                  if (line.startsWith("## "))
                    return (
                      <h2 key={i} className="text-2xl font-bold mt-8 mb-4">
                        {line.replace("## ", "")}
                      </h2>
                    );
                  if (line.startsWith("### "))
                    return (
                      <h3 key={i} className="text-xl font-semibold mt-6 mb-3">
                        {line.replace("### ", "")}
                      </h3>
                    );
                  if (line.startsWith("```"))
                    return null; // Skip code fences in simple render
                  if (line.startsWith("| "))
                    return (
                      <pre
                        key={i}
                        className="text-xs bg-zinc-900 border border-zinc-800 px-4 py-1 rounded-lg overflow-x-auto"
                      >
                        {line}
                      </pre>
                    );
                  if (line.startsWith("- ") || line.startsWith("* "))
                    return (
                      <li key={i} className="ml-4 text-zinc-300">
                        {line.replace(/^[-*] /, "")}
                      </li>
                    );
                  if (line.startsWith("**") && line.endsWith("**"))
                    return (
                      <p key={i} className="font-semibold text-white">
                        {line.replace(/\*\*/g, "")}
                      </p>
                    );
                  if (line.trim() === "") return <br key={i} />;
                  return (
                    <p key={i} className="text-zinc-300 leading-relaxed">
                      {line}
                    </p>
                  );
                })}
              </div>

              <div className="mt-10 pt-6 border-t border-zinc-800 flex items-center justify-between">
                <button
                  onClick={() => toggleComplete(activeContent.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    completed.has(activeContent.id)
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  }`}
                >
                  {completed.has(activeContent.id) ? (
                    <>
                      <CheckCircle className="w-4 h-4" /> Completed
                    </>
                  ) : (
                    <>
                      <Circle className="w-4 h-4" /> Mark as Complete
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
