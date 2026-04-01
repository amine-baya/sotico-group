"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

import {
  contactFormSchema,
  type ContactFormValues,
} from "../contact/contact-schema";
import { useLanguage } from "../providers/LanguageProvider";

export default function ContactSection() {
  const { locale, t } = useLanguage();
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">(
    "idle"
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      jobTitle: "",
      enquiryType: "",
      message: "",
      locale,
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitState("idle");

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...values, locale }),
    });

    if (!response.ok) {
      setSubmitState("error");
      return;
    }

    reset({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      jobTitle: "",
      enquiryType: "",
      message: "",
      locale,
    });
    setSubmitState("success");
  };

  return (
    <section id="contact-section" className="scroll-mt-56 bg-[#f3f4f6] py-24">
      <div className="mx-auto max-w-7xl bg-white px-8 py-12">
        <div className="mb-16 flex items-center gap-6">
          <div className="h-12 w-1 bg-amber-500" />
          <h2 className="text-5xl font-bold tracking-tight text-[#0D427D] italic md:text-6xl">
            {t.home.contact.title}
          </h2>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2"
        >
          <input type="hidden" value={locale} {...register("locale")} />

          <Field
            label={t.home.contact.firstName}
            required
            error={resolveErrorMessage("firstName", errors.firstName?.message, t)}
          >
            <input
              {...register("firstName")}
              className={getInputClassName(Boolean(errors.firstName))}
              placeholder={t.home.contact.placeholders.firstName}
              type="text"
            />
          </Field>

          <Field
            label={t.home.contact.lastName}
            required
            error={resolveErrorMessage("lastName", errors.lastName?.message, t)}
          >
            <input
              {...register("lastName")}
              className={getInputClassName(Boolean(errors.lastName))}
              placeholder={t.home.contact.placeholders.lastName}
              type="text"
            />
          </Field>

          <Field
            label={t.home.contact.email}
            required
            error={resolveErrorMessage("email", errors.email?.message, t)}
          >
            <input
              {...register("email")}
              className={getInputClassName(Boolean(errors.email))}
              placeholder={t.home.contact.placeholders.email}
              type="email"
            />
          </Field>

          <Field label={t.home.contact.phone}>
            <input
              {...register("phone")}
              className={getInputClassName(Boolean(errors.phone))}
              placeholder={t.home.contact.placeholders.phone}
              type="tel"
            />
          </Field>

          <div className="grid grid-cols-1 gap-8 md:col-span-2 sm:grid-cols-3">
            <Field
              label={t.home.contact.company}
              required
              error={resolveErrorMessage("company", errors.company?.message, t)}
            >
              <input
                {...register("company")}
                className={getInputClassName(Boolean(errors.company))}
                placeholder={t.home.contact.placeholders.company}
                type="text"
              />
            </Field>

            <Field label={t.home.contact.jobTitle}>
              <input
                {...register("jobTitle")}
                className={getInputClassName(Boolean(errors.jobTitle))}
                placeholder={t.home.contact.placeholders.jobTitle}
                type="text"
              />
            </Field>

            <Field
              label={t.home.contact.enquiryType}
              required
              error={resolveErrorMessage(
                "enquiryType",
                errors.enquiryType?.message,
                t
              )}
            >
              <select
                {...register("enquiryType")}
                className={getInputClassName(Boolean(errors.enquiryType))}
              >
                <option value="">{t.home.contact.enquiryOptions[0]}</option>
                {t.home.contact.enquiryOptions.slice(1).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field
            label={t.home.contact.message}
            required
            className="md:col-span-2"
            error={resolveErrorMessage("message", errors.message?.message, t)}
          >
            <textarea
              {...register("message")}
              className={getInputClassName(Boolean(errors.message))}
              placeholder={t.home.contact.placeholders.message}
              rows={4}
            />
          </Field>

          <div className="space-y-6 md:col-span-2">
            <p className="max-w-4xl text-xs leading-relaxed text-slate-500">
              {t.home.contact.privacy.replace(t.home.contact.privacyLink, "").trim()}{" "}
              <a className="underline transition-colors hover:text-slate-800" href="#">
                {t.home.contact.privacyLink}
              </a>
              .
            </p>

            {submitState === "success" ? (
              <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                {t.home.contact.status.success}
              </p>
            ) : null}

            {submitState === "error" ? (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {t.home.contact.status.error}
              </p>
            ) : null}

            <button
              className="bg-amber-500 px-12 py-4 text-sm font-bold uppercase tracking-widest text-slate-900 shadow-lg transition-all hover:bg-amber-400 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? t.home.contact.status.sending
                : t.home.contact.submit}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  required?: boolean;
  className?: string;
  error?: string;
  children: React.ReactNode;
};

function Field({
  label,
  required = false,
  className,
  error,
  children,
}: FieldProps) {
  return (
    <div className={["space-y-2", className].filter(Boolean).join(" ")}>
      <label className="block text-sm font-semibold text-slate-700">
        {label}
        {required ? <span className="ml-0.5 text-amber-500">*</span> : null}
      </label>
      {children}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}

function getInputClassName(hasError: boolean) {
  return [
    "w-full rounded-lg border p-3 outline-none transition-all focus:ring-2 focus:ring-amber-500",
    hasError ? "border-red-400 bg-red-50" : "border-gray-300 bg-white",
  ].join(" ");
}

function resolveErrorMessage(
  field:
    | "firstName"
    | "lastName"
    | "email"
    | "company"
    | "enquiryType"
    | "message",
  errorKey: string | undefined,
  t: ReturnType<typeof useLanguage>["t"]
) {
  if (!errorKey) {
    return undefined;
  }

  return t.home.contact.validation[field];
}
