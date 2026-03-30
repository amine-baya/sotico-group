"use client";

import { useLanguage } from "../providers/LanguageProvider";

export default function ContactSection() {
  const { t } = useLanguage();

  return (
    <section
      id="contact-section"
      className="scroll-mt-56 bg-[#f3f4f6] py-24"
    >
      <div className="mx-auto max-w-7xl bg-white px-8 py-12">
        <div className="mb-16 flex items-center gap-6">
          <div className="h-12 w-1 bg-amber-500" />
          <h2 className="text-5xl font-bold tracking-tight text-[#0D427D] italic md:text-6xl">
            {t.home.contact.title}
          </h2>
        </div>

        <form className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
          <Field label={t.home.contact.firstName} required>
            <input
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder={t.home.contact.placeholders.firstName}
              type="text"
            />
          </Field>

          <Field label={t.home.contact.lastName} required>
            <input
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder={t.home.contact.placeholders.lastName}
              type="text"
            />
          </Field>

          <Field label={t.home.contact.email} required>
            <input
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder={t.home.contact.placeholders.email}
              type="email"
            />
          </Field>

          <Field label={t.home.contact.phone}>
            <input
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder={t.home.contact.placeholders.phone}
              type="tel"
            />
          </Field>

          <div className="grid grid-cols-1 gap-8 md:col-span-2 sm:grid-cols-3">
            <Field label={t.home.contact.company} required>
              <input
                className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder={t.home.contact.placeholders.company}
                type="text"
              />
            </Field>

            <Field label={t.home.contact.jobTitle}>
              <input
                className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder={t.home.contact.placeholders.jobTitle}
                type="text"
              />
            </Field>

            <Field label={t.home.contact.enquiryType} required>
              <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-amber-500">
                {t.home.contact.enquiryOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </Field>
          </div>

          <Field label={t.home.contact.message} required className="md:col-span-2">
            <textarea
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
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
            <button
              className="bg-amber-500 px-12 py-4 text-sm font-bold uppercase tracking-widest text-slate-900 shadow-lg transition-all hover:bg-amber-400 active:scale-95"
              type="submit"
            >
              {t.home.contact.submit}
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
  children: React.ReactNode;
};

function Field({ label, required = false, className, children }: FieldProps) {
  return (
    <div className={["space-y-2", className].filter(Boolean).join(" ")}>
      <label className="block text-sm font-semibold text-slate-700">
        {label}
        {required ? <span className="ml-0.5 text-amber-500">*</span> : null}
      </label>
      {children}
    </div>
  );
}
