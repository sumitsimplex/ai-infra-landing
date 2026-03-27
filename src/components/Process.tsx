"use client";

import { motion } from "framer-motion";
import { MessageCircle, Search, Wrench, Gift } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    step: "01",
    title: "Discovery Call",
    desc: "15-minute call. You tell me what you're building, I tell you if I can help. No pitch, no pressure.",
  },
  {
    icon: Search,
    step: "02",
    title: "Architecture Audit",
    desc: "I review your current infrastructure, model requirements, compliance needs, and design the optimal architecture.",
  },
  {
    icon: Wrench,
    step: "03",
    title: "Build & Deploy",
    desc: "I build the entire stack — K8s cluster, model serving, monitoring, autoscaling — and deploy it to your cloud.",
  },
  {
    icon: Gift,
    step: "04",
    title: "Handoff & Support",
    desc: "Full documentation, runbooks, 60-min walkthrough with your team, and 2 weeks of async support included.",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-indigo-400 text-sm font-semibold tracking-wider uppercase">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            From Call to Production
          </h2>
          <p className="text-zinc-400 text-lg">
            A straightforward process. No surprises.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-indigo-500/20 to-transparent hidden md:block" />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex gap-6 md:gap-8 items-start"
              >
                <div className="relative z-10 w-16 h-16 bg-zinc-900 border border-zinc-700 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <div className="pt-2">
                  <div className="text-indigo-400 text-xs font-mono mb-1">
                    STEP {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-zinc-400 leading-relaxed max-w-lg">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
