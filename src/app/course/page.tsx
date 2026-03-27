"use client";

import { useState, useEffect } from "react";
import LoginForm from "./login";
import CourseContent from "./course-content";

export default function CoursePage() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if already authenticated by trying to read session cookie
    fetch("/api/auth/check")
      .then((res) => setIsAuth(res.ok))
      .catch(() => setIsAuth(false));
  }, []);

  if (isAuth === null) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuth) {
    return <LoginForm onSuccess={() => setIsAuth(true)} />;
  }

  return <CourseContent />;
}
