"use client";

import { KataKuLogo } from "@/components/kataku-logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "KataKu";

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  return (
    <div className="min-h-screen bg-white transition-colors duration-200 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <nav className="flex items-center justify-between py-6">
          <KataKuLogo width={64} height={64} />
          <div className="flex gap-4">
            <Button
              variant="ghost"
              className="text-slate-700 dark:text-slate-200"
            >
              Features
            </Button>
            <Button
              variant="ghost"
              className="text-slate-700 dark:text-slate-200"
            >
              About
            </Button>
            <Button
              variant="ghost"
              className="text-slate-700 dark:text-slate-200"
            >
              Contact
            </Button>
            <Button
              variant="outline"
              className="border-slate-300 dark:border-slate-700 dark:text-slate-200"
              asChild
            >
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button
              className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              asChild
            >
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="flex flex-col items-center justify-between gap-12 py-20 md:flex-row">
          <div className="flex-1 space-y-6">
            <h1 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Your thoughts,{" "}
              <span className="text-indigo-600 dark:text-indigo-400">
                your sanctuary
              </span>
            </h1>
            <p className="max-w-md text-xl text-slate-600 dark:text-slate-300">
              Express yourself freely in a private, secure space where your
              words belong only to you.
            </p>
            <div className="flex gap-4 pt-4">
              <Button
                size="lg"
                className="bg-indigo-600 px-8 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                asChild
              >
                <Link href="/dashboard">Get Started</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-300 dark:border-slate-700 dark:text-slate-200"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative h-[400px] w-full flex-1">
            <Image
              src="https://res.cloudinary.com/dtzuqhpsy/image/upload/f_auto,q_auto/tsddae5e5pthkdzxe95k"
              alt="KataKu App Interface"
              fill
              className="object-contain dark:brightness-90"
              priority
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 gap-8 py-16 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:bg-slate-800 dark:shadow-slate-800/30">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
              Private & Secure
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Your thoughts remain yours alone, protected by end-to-end
              encryption.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:bg-slate-800 dark:shadow-slate-800/30">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
              Express Freely
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Write without judgment or fear, in a space designed for authentic
              self-expression.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:bg-slate-800 dark:shadow-slate-800/30">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
              Your Personal Space
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              A sanctuary for your thoughts, organized just the way you like it.
            </p>
          </div>
        </div>

        {/* Testimonial */}
        <div className="flex justify-center py-12">
          <div className="max-w-2xl rounded-xl bg-white p-8 text-center shadow-sm dark:bg-slate-800 dark:shadow-slate-800/30">
            <p className="mb-4 text-lg text-slate-700 italic dark:text-slate-300">
              "KataKu has become my digital sanctuary. It's where I can be
              completely honest with myself without worrying about privacy or
              judgment."
            </p>
            <p className="font-medium text-slate-900 dark:text-white">
              — Sarah L., Writer & KataKu User
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">
            Ready to claim your personal space?
          </h2>
          <p className="mx-auto mb-8 max-w-md text-slate-600 dark:text-slate-300">
            Join thousands of users who have found freedom in expressing their
            thoughts with KataKu.
          </p>
          <Button
            size="lg"
            className="bg-indigo-600 px-8 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            asChild
          >
            <Link href="/notes/new">Start Writing Today</Link>
          </Button>
        </div>

        {/* Footer */}
        <footer className="border-t border-slate-200 py-8 dark:border-slate-800">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 flex items-center gap-2 md:mb-0">
              <KataKuLogo width={24} height={24} />
              <span className="font-medium text-slate-900 dark:text-white">
                KataKu
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                © {new Date().getFullYear()}
              </span>
            </div>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                FAQ
              </a>
              <a
                href="#"
                className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                Contact
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
