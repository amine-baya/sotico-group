import { Suspense } from "react";

import { LoginForm } from "@/app/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#dbeafe_0%,#eff6ff_28%,#f8fafc_100%)] px-4 py-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[32px] bg-[#0c437c] p-8 text-white shadow-[0_30px_80px_rgba(12,67,124,0.25)] lg:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-200">
            SOTICO Group
          </p>
          <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-tight">
            Protected admin access for your product and category catalog.
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-7 text-sky-100/90">
            Sign in with the single admin account stored in Postgres. From the
            dashboard you can manage categories, create products, and update the
            visual catalog without touching the old Express backend.
          </p>
        </section>

        <Suspense fallback={<div className="rounded-[32px] bg-white p-10 shadow-sm" />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
