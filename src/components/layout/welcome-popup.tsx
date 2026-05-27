"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

export function WelcomePopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("welcome_seen");
    if (!seen) {
      const timer = setTimeout(() => setOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  function close() {
    setOpen(false);
    sessionStorage.setItem("welcome_seen", "1");
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close"
        onClick={close}
        className="absolute inset-0 bg-black/30"
      />

      <div className="relative w-full max-w-md animate-[popIn_0.3s_ease-out] rounded-2xl bg-white px-10 pb-12 pt-14 text-center shadow-soft-lg">
        <button
          type="button"
          aria-label="Close"
          onClick={close}
          className="absolute right-5 top-5 text-gray-400 transition-colors hover:text-foreground"
        >
          <X className="size-8" strokeWidth={1.5} />
        </button>

        <Image
          src="/logo.png"
          alt="Dr. Sailaja's Eye Hospital"
          width={120}
          height={120}
          className="mx-auto"
        />

        <h2 className="mt-8 text-[28px] font-light text-brand sm:text-[32px]">
          Call Us to Book an Appointment
        </h2>

        <a
          href="tel:+918884471641"
          className="mt-4 block text-[32px] font-medium tracking-wide text-foreground transition-colors hover:text-brand sm:text-[38px]"
        >
          +91 88844 71641
        </a>

        <Link
          href="https://kivihealth.com/iam/sai.laja.15614/bookslot"
          onClick={close}
          className="mt-8 inline-flex h-16 w-full max-w-xs items-center justify-center rounded-pill bg-brand text-xl font-semibold text-white shadow-brand transition-colors hover:bg-brand-dark"
        >
          Book Appointment
        </Link>
      </div>
    </div>
  );
}
