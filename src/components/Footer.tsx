"use client";

import { Cpu } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 text-zinc-500">
          <Cpu className="w-5 h-5 text-indigo-400" />
          <span className="text-sm">
            &copy; {new Date().getFullYear()} AI Infrastructure Consulting.
            Based in Ireland.
          </span>
        </div>
        <div className="flex gap-6 text-sm text-zinc-500">
          <a href="#services" className="hover:text-white transition-colors">
            Services
          </a>
          <a href="#process" className="hover:text-white transition-colors">
            Process
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            Contact
          </a>
          {/* Add your LinkedIn URL here */}
          <a
            href="https://linkedin.com/in/YOUR_PROFILE"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
