"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Clock, EuroIcon, ShieldAlert, UserX } from "lucide-react";

const pains = [
  {
    icon: UserX,
    title: "Model stuck in notebooks",
    desc: "Your ML team built something great — but it can't get to production without platform expertise.",
  },
  {
    icon: EuroIcon,
    title: "GPU costs spiraling",
    desc: "GPUs running 24/7 for a 9-5 workload. No autoscaling. No spot instances. No visibility.",
  },
  {
    icon: ShieldAlert,
    title: "Compliance says no",
    desc: "Regulated industry? Sensitive data? You need to self-host — no data leaving your cloud.",
  },
  {
    icon: Clock,
    title: "Months of K8s debugging",
    desc: "GPU scheduling, health checks, model loading — your team is drowning in infrastructure problems.",
  },
  {
    icon: AlertTriangle,
    title: "Can't hire fast enough",
    desc: "ML Platform Engineers are unicorns. 4+ months to hire, if you can find one at all.",
  },
];

export default function PainPoints() {
  return (
    <section id="problems" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-indigo-400 text-sm font-semibold tracking-wider uppercase">
            The Problem
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Sound Familiar?
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Every company building AI hits the same infrastructure wall.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pains.map((pain, i) => (
            <motion.div
              key={pain.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-indigo-500/30 transition-all hover:bg-zinc-900/80"
            >
              <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center mb-4">
                <pain.icon className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{pain.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{pain.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
