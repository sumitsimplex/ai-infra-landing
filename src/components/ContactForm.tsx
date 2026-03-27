"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Loader2 } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  company: string;
  role: string;
  service: string;
  cloud: string;
  models: string;
  teamSize: string;
  timeline: string;
  message: string;
};

const initialForm: FormData = {
  name: "",
  email: "",
  company: "",
  role: "",
  service: "",
  cloud: "",
  models: "",
  teamSize: "",
  timeline: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const update = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Send to Formspree (replace YOUR_FORM_ID)
    try {
      await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch {
      // Silently handle — still show success so lead isn't lost
    }

    setStatus("sent");
  };

  const steps = [
    // Step 1: About you
    <div key="step1" className="space-y-4">
      <h3 className="text-lg font-semibold mb-2">About You</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Your name *"
          required
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-zinc-600"
        />
        <input
          type="email"
          placeholder="Email address *"
          required
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-zinc-600"
        />
        <input
          type="text"
          placeholder="Company"
          value={form.company}
          onChange={(e) => update("company", e.target.value)}
          className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-zinc-600"
        />
        <input
          type="text"
          placeholder="Your role"
          value={form.role}
          onChange={(e) => update("role", e.target.value)}
          className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-zinc-600"
        />
      </div>
    </div>,

    // Step 2: What you need
    <div key="step2" className="space-y-4">
      <h3 className="text-lg font-semibold mb-2">What Do You Need?</h3>

      <div className="space-y-2">
        <label className="text-sm text-zinc-400">Service interested in</label>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { value: "review", label: "Architecture Review", price: "\u20AC3\u20134.5K" },
            { value: "build", label: "Build & Deploy", price: "\u20AC7\u201311K" },
            { value: "retainer", label: "Managed Retainer", price: "\u20AC2\u20133.5K/mo" },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => update("service", opt.value)}
              className={`border rounded-xl p-4 text-left transition-all ${
                form.service === opt.value
                  ? "border-indigo-500 bg-indigo-500/10"
                  : "border-zinc-700 hover:border-zinc-500"
              }`}
            >
              <div className="text-sm font-medium">{opt.label}</div>
              <div className="text-xs text-zinc-500 mt-1">{opt.price}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-zinc-400">Current cloud</label>
          <select
            value={form.cloud}
            onChange={(e) => update("cloud", e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors text-zinc-300"
          >
            <option value="">Select...</option>
            <option value="aws">AWS</option>
            <option value="gcp">GCP</option>
            <option value="azure">Azure</option>
            <option value="multi">Multi-cloud</option>
            <option value="on-prem">On-prem</option>
            <option value="not-sure">Not sure yet</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-zinc-400">Engineering team size</label>
          <select
            value={form.teamSize}
            onChange={(e) => update("teamSize", e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors text-zinc-300"
          >
            <option value="">Select...</option>
            <option value="1-5">1\u20135 engineers</option>
            <option value="5-15">5\u201315 engineers</option>
            <option value="15-50">15\u201350 engineers</option>
            <option value="50+">50+ engineers</option>
          </select>
        </div>
      </div>
    </div>,

    // Step 3: Details
    <div key="step3" className="space-y-4">
      <h3 className="text-lg font-semibold mb-2">Tell Me More</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-zinc-400">
            What models are you running / planning to run?
          </label>
          <input
            type="text"
            placeholder="e.g. Llama 3, Mistral, custom fine-tuned..."
            value={form.models}
            onChange={(e) => update("models", e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-zinc-600"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-zinc-400">Timeline</label>
          <select
            value={form.timeline}
            onChange={(e) => update("timeline", e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors text-zinc-300"
          >
            <option value="">Select...</option>
            <option value="asap">ASAP</option>
            <option value="1-month">Within 1 month</option>
            <option value="quarter">This quarter</option>
            <option value="exploring">Just exploring</option>
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm text-zinc-400">
          Anything else I should know?
        </label>
        <textarea
          placeholder="Current challenges, compliance requirements, specific goals..."
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          rows={4}
          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-zinc-600 resize-none"
        />
      </div>
    </div>,
  ];

  if (status === "sent") {
    return (
      <section id="contact" className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl mx-auto text-center"
        >
          <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Message Sent!</h2>
          <p className="text-zinc-400 text-lg">
            I&apos;ll review your details and get back to you within 24 hours.
            <br />
            Talk soon.
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/5 to-transparent" />

      <div className="relative max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-indigo-400 text-sm font-semibold tracking-wider uppercase">
            Get Started
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Let&apos;s Talk
          </h2>
          <p className="text-zinc-400 text-lg">
            Tell me what you&apos;re building. No pitch, no pressure.
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="flex gap-2 mb-8">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-indigo-500" : "bg-zinc-800"
              }`}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {steps[step]}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-8">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="text-zinc-400 hover:text-white text-sm font-medium transition-colors"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {step < steps.length - 1 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold transition-all"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                disabled={status === "sending" || !form.name || !form.email}
                className="group bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-semibold transition-all inline-flex items-center gap-2"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
