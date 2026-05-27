"use client";

import { useState } from "react";
import { Container } from "@/components/ui";
import { CallbackPopup } from "./callback-popup";

const SLATE_CLIP = "polygon(40px 0, 100% 0, 100% 100%, 0 100%)";

export function TopBar() {
  const [showCallback, setShowCallback] = useState(false);

  return (
    <>
      <div className="relative hidden bg-brand text-white lg:block">
        <div
          aria-hidden
          className="absolute inset-y-0 right-0 w-[34%] bg-footer"
          style={{ clipPath: SLATE_CLIP }}
        />

        <Container size="full" padding="lg">
          <div className="relative flex h-10 items-center justify-between text-[13px]">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setShowCallback(true)}
                className="font-medium transition-colors hover:text-white/80"
              >
                Request a Callback
              </button>
              <span aria-hidden className="text-white/40">|</span>
              <a href="tel:+918884471641" className="hover:text-white/80">
                +91 88844 71641
              </a>
            </div>

            <div className="flex items-center gap-3 pl-12">
              <span className="font-medium">For Appointment Call :</span>
              <a href="tel:+918884471641" className="hover:text-white/80">
                +91 88844 71641
              </a>
            </div>
          </div>
        </Container>
      </div>

      <CallbackPopup
        open={showCallback}
        onClose={() => setShowCallback(false)}
      />
    </>
  );
}
