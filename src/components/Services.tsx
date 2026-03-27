"use client";

import { motion } from "framer-motion";
import { FileSearch, Rocket, Headphones, Check } from "lucide-react";

const tiers = [
  {
    name: "Architecture Review",
    price: "\u20AC3,000 \u2013 \u20AC4,500",
    period: "one-time",
    icon: FileSearch,
    description: "A full blueprint for your AI infrastructure.",
    features: [
      "Audit current infra & AI workload needs",
      "GPU node pool sizing & strategy",
      "Model serving architecture blueprint",
      "Cost projection & optimisation plan",
      "Terraform/Helm scaffolding delivered",
      "30-min video walkthrough",
    ],
    timeline: "Delivered in 1 week",
    cta: "Book Review",
    featured: false,
  },
  {
    name: "Build & Deploy",
    price: "\u20AC7,000 \u2013 \u20AC11,000",
    period: "one-time",
    icon: Rocket,
    description: "I build and deploy the full stack for you.",
    features: [
      "Everything in Architecture Review",
      "Full K8s cluster with GPU node pool",
      "Model serving (vLLM / Triton / TGI)",
      "Autoscaling & GPU-aware scheduling",
      "Monitoring, alerts & cost guardrails",
      "API gateway with auth & rate limiting",
      "Production-hardened & documented",
      "60-min handoff call with your team",
    ],
    timeline: "Delivered in 2\u20133 weeks",
    cta: "Start Building",
    featured: true,
  },
  {
    name: "Managed Retainer",
    price: "\u20AC2,000 \u2013 \u20AC3,500",
    period: "/month",
    icon: Headphones,
    description: "Ongoing optimisation and peace of mind.",
    features: [
      "Ongoing scaling & optimisation",
      "New model deployments",
      "Incident response & troubleshooting",
      "Monthly cost & performance reports",
      "Slack/Teams access for quick questions",
      "Cancel anytime",
    ],
    timeline: "Month-to-month",
    cta: "Get Retainer",
    featured: false,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/5 to-transparent" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-indigo-400 text-sm font-semibold tracking-wider uppercase">
            Services
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Choose Your Path
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            From strategy to full deployment. Pick what you need.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl p-8 ${
                tier.featured
                  ? "bg-gradient-to-b from-indigo-950/50 to-zinc-900/80 border-2 border-indigo-500/40 shadow-xl shadow-indigo-500/10 lg:scale-105"
                  : "bg-zinc-900/50 border border-zinc-800"
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    tier.featured
                      ? "bg-indigo-500/20"
                      : "bg-zinc-800"
                  }`}
                >
                  <tier.icon
                    className={`w-5 h-5 ${
                      tier.featured ? "text-indigo-400" : "text-zinc-400"
                    }`}
                  />
                </div>
                <h3 className="text-xl font-bold">{tier.name}</h3>
              </div>

              <div className="mb-4">
                <span className="text-3xl font-bold">{tier.price}</span>
                <span className="text-zinc-500 text-sm ml-1">
                  {tier.period}
                </span>
              </div>

              <p className="text-zinc-400 text-sm mb-6">{tier.description}</p>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="text-xs text-zinc-500 mb-4">{tier.timeline}</div>

              <a
                href="#contact"
                className={`block w-full text-center py-3 rounded-xl font-semibold transition-all ${
                  tier.featured
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                    : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
                }`}
              >
                {tier.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
