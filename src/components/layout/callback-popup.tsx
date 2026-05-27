"use client";

import { useState, type FormEvent } from "react";
import { X, Phone } from "lucide-react";
import Image from "next/image";

const WHATSAPP_NUMBER = "918884471641";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function CallbackPopup({ open, onClose }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const message = `Hi, I'd like to request a callback.\n\nName: ${name}\nPhone: ${phone}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setName("");
    setPhone("");
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/30"
      />

      <div className="relative w-full max-w-md animate-[popIn_0.3s_ease-out] rounded-2xl bg-white px-10 pb-10 pt-12 text-center shadow-soft-lg">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-5 top-5 text-gray-400 transition-colors hover:text-foreground"
        >
          <X className="size-8" strokeWidth={1.5} />
        </button>

        <Image
          src="/logo.png"
          alt="Dr. Sailaja's Eye Hospital"
          width={80}
          height={80}
          className="mx-auto"
        />

        <h2 className="mt-6 text-[24px] font-light text-brand sm:text-[28px]">
          Request a Callback
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Leave your details and we&apos;ll get back to you shortly.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <input
            type="text"
            required
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-12 rounded-pill border border-border bg-background px-5 text-sm text-foreground outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="tel"
              required
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-12 w-full rounded-pill border border-border bg-background pl-11 pr-5 text-sm text-foreground outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </div>
          <button
            type="submit"
            className="mt-2 h-14 w-full rounded-pill bg-brand text-lg font-semibold text-white shadow-brand transition-colors hover:bg-brand-dark"
          >
            Send via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
