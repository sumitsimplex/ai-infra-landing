"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "We spent 2 months trying to get our LLM to production. He did it in 2 weeks and cut our GPU costs by 55%.",
    name: "Sarah M.",
    role: "CTO, Series B Startup",
    stars: 5,
  },
  {
    quote:
      "Our data scientists went from fighting Kubernetes to shipping features. The ROI was immediate.",
    name: "James K.",
    role: "VP Engineering, HealthTech",
    stars: 5,
  },
  {
    quote:
      "The architecture review alone saved us from a six-figure infrastructure mistake. Worth every cent.",
    name: "Priya R.",
    role: "Head of ML, FinTech",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-indigo-400 text-sm font-semibold tracking-wider uppercase">
            Results
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            What Clients Say
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 relative"
            >
              <Quote className="w-8 h-8 text-indigo-500/20 absolute top-6 right-6" />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>
              <p className="text-zinc-300 leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-zinc-500 text-sm">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social proof numbers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-zinc-800"
        >
          {[
            { value: "10+", label: "Years in Cloud & Data" },
            { value: "40-60%", label: "Avg. Cost Reduction" },
            { value: "2-3", label: "Weeks to Production" },
            { value: "100%", label: "Data Sovereignty" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text">
                {stat.value}
              </div>
              <div className="text-zinc-500 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
