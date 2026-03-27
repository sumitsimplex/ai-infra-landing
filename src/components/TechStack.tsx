"use client";

import { motion } from "framer-motion";

const categories = [
  {
    label: "Orchestration",
    items: ["Kubernetes", "Helm", "ArgoCD", "Kustomize"],
  },
  {
    label: "Infrastructure",
    items: ["Terraform", "AWS", "GCP", "Azure"],
  },
  {
    label: "AI / Model Serving",
    items: ["vLLM", "Triton", "TGI", "NVIDIA GPUs"],
  },
  {
    label: "Observability",
    items: ["Prometheus", "Grafana", "Kubecost", "OpenCost"],
  },
  {
    label: "Networking",
    items: ["Kong", "Envoy", "Istio", "Cert-Manager"],
  },
  {
    label: "Scaling",
    items: ["KEDA", "Cluster Autoscaler", "Spot Instances", "GPU Scheduling"],
  },
];

export default function TechStack() {
  return (
    <section id="tech" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/5 to-transparent" />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-indigo-400 text-sm font-semibold tracking-wider uppercase">
            Technology
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Battle-Tested Stack
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            No experiments on your infrastructure. Every tool here is
            production-proven at scale.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6"
            >
              <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider mb-4">
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="bg-zinc-800/80 text-zinc-300 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-500/10 hover:text-indigo-300 transition-colors cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
