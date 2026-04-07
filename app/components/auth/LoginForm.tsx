"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { ArrowRight, LockKeyhole } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const callbackUrl = searchParams.get("callbackUrl") || "/products";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    if (result?.error) {
      setErrorMessage("Invalid admin credentials.");
      setIsSubmitting(false);
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  };

  return (
    <Card className="rounded-[32px] border border-slate-200/80 bg-white/95 py-0 shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
      <CardHeader className="border-b border-slate-100 py-8">
        <div className="inline-flex w-fit rounded-full bg-sky-100 p-3 text-sky-700">
          <LockKeyhole className="h-5 w-5" />
        </div>
        <CardTitle className="mt-3 text-2xl">Admin sign in</CardTitle>
        <CardDescription>
          Use the seeded admin email and password to access the Prisma dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent className="py-8">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-sky-400 focus:bg-white"
              placeholder="admin@sotico-group.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-sky-400 focus:bg-white"
              placeholder="••••••••"
            />
          </div>

          {errorMessage ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </div>
          ) : null}

          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            <ArrowRight className="h-4 w-4" />
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <p className="mt-6 text-sm text-slate-500">
          Need to return to the public website?{" "}
          <Link className="font-medium text-sky-700 hover:underline" href="/">
            Go back home
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
