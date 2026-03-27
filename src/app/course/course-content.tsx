"use client";

import { useState, type ElementType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  BookOpen,
  ChevronRight,
  CheckCircle,
  Circle,
  LogOut,
  Cpu,
  FlaskConical,
  Briefcase,
  Rocket,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { weeks as weeksData } from "@/data/course-data";

const iconMap: Record<string, ElementType> = {
  BookOpen,
  FlaskConical,
  Briefcase,
  Rocket,
};

const weeks = weeksData.map((w) => ({
  ...w,
  icon: iconMap[w.iconName] || BookOpen,
}));

export default function CourseContent() {
  const [expandedWeek, setExpandedWeek] = useState<string>("week-1");
  const [activeModule, setActiveModule] = useState<string>("1.1");
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleComplete = (id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const allModules = weeks.flatMap((w) => w.modules);
  const activeContent = allModules.find((m) => m.id === activeModule);
  const activeIndex = allModules.findIndex((m) => m.id === activeModule);
  const prevModule = activeIndex > 0 ? allModules[activeIndex - 1] : null;
  const nextModule =
    activeIndex < allModules.length - 1 ? allModules[activeIndex + 1] : null;

  const totalModules = allModules.length;
  const progress = Math.round((completed.size / totalModules) * 100);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.reload();
  };

  return (
    <div className="h-screen flex flex-col bg-zinc-950 text-white overflow-hidden">
      {/* Top bar */}
      <div className="border-b border-zinc-800 px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-zinc-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-zinc-800"
            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarOpen ? (
              <PanelLeftClose className="w-5 h-5" />
            ) : (
              <PanelLeftOpen className="w-5 h-5" />
            )}
          </button>
          <Cpu className="w-5 h-5 text-indigo-400" />
          <span className="font-semibold text-sm hidden sm:inline">
            AI Infra Course
          </span>
          <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded">
            Admin
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-xs text-zinc-400 hidden sm:block">
            {completed.size}/{totalModules} complete ({progress}%)
          </div>
          <div className="w-24 sm:w-32 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <button
            onClick={handleLogout}
            className="text-zinc-400 hover:text-white transition-colors p-1"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <AnimatePresence initial={false}>
          {sidebarOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="border-r border-zinc-800 flex-shrink-0 overflow-hidden"
            >
              <div className="w-80 h-full overflow-y-auto p-4">
                {weeks.map((week) => {
                  const weekModules = week.modules;
                  const weekCompleted = weekModules.filter((m) =>
                    completed.has(m.id)
                  ).length;
                  const WeekIcon = week.icon;

                  return (
                    <div key={week.id} className="mb-1">
                      <button
                        onClick={() =>
                          setExpandedWeek(
                            expandedWeek === week.id ? "" : week.id
                          )
                        }
                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left ${
                          expandedWeek === week.id
                            ? "bg-zinc-900"
                            : "hover:bg-zinc-900/50"
                        }`}
                      >
                        <WeekIcon
                          className={`w-5 h-5 ${week.color} flex-shrink-0`}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">
                            {week.title}
                          </div>
                          <div className="text-xs text-zinc-500 truncate">
                            {weekCompleted}/{weekModules.length} completed
                          </div>
                        </div>
                        <motion.div
                          animate={{
                            rotate: expandedWeek === week.id ? 90 : 0,
                          }}
                          transition={{ duration: 0.15 }}
                        >
                          <ChevronRight className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {expandedWeek === week.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="py-1 pl-3 space-y-0.5">
                              {week.modules.map((mod) => (
                                <div
                                  key={mod.id}
                                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer transition-all ${
                                    activeModule === mod.id
                                      ? "bg-indigo-500/10 text-indigo-300 border-l-2 border-indigo-500"
                                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/50 border-l-2 border-transparent"
                                  }`}
                                  onClick={() => setActiveModule(mod.id)}
                                >
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleComplete(mod.id);
                                    }}
                                    className="flex-shrink-0 hover:scale-110 transition-transform"
                                  >
                                    {completed.has(mod.id) ? (
                                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                                    ) : (
                                      <Circle className="w-4 h-4 text-zinc-600 hover:text-zinc-400" />
                                    )}
                                  </button>
                                  <span
                                    className={`flex-1 ${
                                      completed.has(mod.id)
                                        ? "line-through opacity-50"
                                        : ""
                                    }`}
                                  >
                                    {mod.id} {mod.title}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {activeContent && (
            <motion.div
              key={activeContent.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-3xl mx-auto px-6 sm:px-10 py-10"
            >
              <div className="flex items-start justify-between mb-8 gap-4">
                <div>
                  <div className="text-xs text-indigo-400 font-mono mb-1 tracking-wider">
                    MODULE {activeContent.id}
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
                    {activeContent.title}
                  </h1>
                </div>
                <span className="text-xs text-zinc-500 bg-zinc-800/80 px-3 py-1.5 rounded-full flex-shrink-0 mt-1">
                  {activeContent.duration}
                </span>
              </div>

              <article className="course-content">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-2xl sm:text-3xl font-bold text-white mt-10 mb-5">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-xl sm:text-2xl font-bold text-white mt-10 mb-4 pb-2 border-b border-zinc-800">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-lg font-semibold text-white mt-8 mb-3">
                        {children}
                      </h3>
                    ),
                    h4: ({ children }) => (
                      <h4 className="text-base font-semibold text-zinc-200 mt-6 mb-2">
                        {children}
                      </h4>
                    ),
                    p: ({ children }) => (
                      <p className="text-zinc-300 leading-relaxed mb-4">
                        {children}
                      </p>
                    ),
                    strong: ({ children }) => (
                      <strong className="text-white font-semibold">
                        {children}
                      </strong>
                    ),
                    em: ({ children }) => (
                      <em className="text-zinc-400 italic">{children}</em>
                    ),
                    ul: ({ children }) => (
                      <ul className="space-y-1.5 mb-5 ml-1">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="space-y-1.5 mb-5 ml-1 list-decimal list-inside marker:text-indigo-400">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-zinc-300 leading-relaxed flex items-start gap-2">
                        <span className="text-indigo-400 mt-1 flex-shrink-0 text-sm leading-relaxed">
                          &bull;
                        </span>
                        <span className="flex-1">{children}</span>
                      </li>
                    ),
                    code: ({ className, children }) => {
                      const isBlock = className?.includes("language-");
                      if (isBlock) {
                        const lang = className?.replace("language-", "") || "";
                        return (
                          <code className="text-sm" data-lang={lang}>
                            {children}
                          </code>
                        );
                      }
                      return (
                        <code className="text-indigo-300 bg-zinc-800/80 px-1.5 py-0.5 rounded text-[0.85em] font-mono">
                          {children}
                        </code>
                      );
                    },
                    pre: ({ children }) => (
                      <pre className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-5 overflow-x-auto text-sm leading-relaxed font-mono text-zinc-300">
                        {children}
                      </pre>
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto mb-6 rounded-xl border border-zinc-800">
                        <table className="w-full text-sm">{children}</table>
                      </div>
                    ),
                    thead: ({ children }) => (
                      <thead className="bg-zinc-900/80 border-b border-zinc-700">
                        {children}
                      </thead>
                    ),
                    th: ({ children }) => (
                      <th className="text-left text-zinc-300 font-semibold px-4 py-3 text-xs uppercase tracking-wider">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="text-zinc-400 px-4 py-3 border-b border-zinc-800/50">
                        {children}
                      </td>
                    ),
                    tr: ({ children }) => (
                      <tr className="hover:bg-zinc-800/30 transition-colors">
                        {children}
                      </tr>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-2 border-indigo-500 pl-4 py-2 mb-5 bg-indigo-500/5 rounded-r-lg pr-4">
                        {children}
                      </blockquote>
                    ),
                    hr: () => <hr className="border-zinc-800 my-8" />,
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                    input: ({ checked }) => (
                      <span
                        className={`inline-flex items-center justify-center w-4 h-4 rounded border mr-2 flex-shrink-0 ${
                          checked
                            ? "bg-emerald-500 border-emerald-500 text-white"
                            : "border-zinc-600"
                        }`}
                      >
                        {checked && (
                          <span className="text-[10px]">&#10003;</span>
                        )}
                      </span>
                    ),
                  }}
                >
                  {activeContent.content}
                </ReactMarkdown>
              </article>

              {/* Bottom nav */}
              <div className="mt-10 pt-6 border-t border-zinc-800 flex items-center justify-between gap-4 flex-wrap">
                <button
                  onClick={() => toggleComplete(activeContent.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    completed.has(activeContent.id)
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700"
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

                <div className="flex items-center gap-3">
                  {prevModule && (
                    <button
                      onClick={() => setActiveModule(prevModule.id)}
                      className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
                    >
                      <ChevronRight className="w-4 h-4 rotate-180" />
                      Previous
                    </button>
                  )}
                  {nextModule && (
                    <button
                      onClick={() => {
                        setActiveModule(nextModule.id);
                        const nextWeek = weeks.find((w) =>
                          w.modules.some((m) => m.id === nextModule.id)
                        );
                        if (nextWeek) setExpandedWeek(nextWeek.id);
                      }}
                      className="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-1"
                    >
                      Next Module
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
