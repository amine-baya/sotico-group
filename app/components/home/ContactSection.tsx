export default function ContactSection() {
  return (
    <section className="bg-[#f3f4f6] py-24">
      <div className="mx-auto max-w-7xl bg-white px-8 py-12">
        <div className="mb-16 flex items-center gap-6">
          <div className="h-12 w-1 bg-amber-500" />
          <h2 className="text-5xl font-bold tracking-tight text-[#0D427D] italic md:text-6xl">
            Let&apos;s talk
          </h2>
        </div>

        <form className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
          <Field label="First name" required>
            <input
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="First name"
              type="text"
            />
          </Field>

          <Field label="Last name" required>
            <input
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Last name"
              type="text"
            />
          </Field>

          <Field label="Email address" required>
            <input
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Email address"
              type="email"
            />
          </Field>

          <Field label="Phone number">
            <input
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Phone number"
              type="tel"
            />
          </Field>

          <div className="grid grid-cols-1 gap-8 md:col-span-2 sm:grid-cols-3">
            <Field label="Company" required>
              <input
                className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Company"
                type="text"
              />
            </Field>

            <Field label="Job title">
              <input
                className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Job title"
                type="text"
              />
            </Field>

            <Field label="Enquiry type" required>
              <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-amber-500">
                <option>Please select...</option>
                <option>Product Inquiry</option>
                <option>Custom Solutions</option>
                <option>Partnerships</option>
                <option>Technical Support</option>
              </select>
            </Field>
          </div>

          <Field label="Message" required className="md:col-span-2">
            <textarea
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Message"
              rows={4}
            />
          </Field>

          <div className="space-y-6 md:col-span-2">
            <p className="max-w-4xl text-xs leading-relaxed text-slate-500">
              SOTICO Group needs the contact information you provide to us to
              contact you about our products and services. You may unsubscribe
              from these communications at anytime. For information on how to
              unsubscribe, as well as our privacy practices and commitment to
              protecting your privacy, check out our{" "}
              <a className="underline transition-colors hover:text-slate-800" href="#">
                Privacy Policy
              </a>
              .
            </p>
            <button
              className="bg-amber-500 px-12 py-4 text-sm font-bold uppercase tracking-widest text-slate-900 shadow-lg transition-all hover:bg-amber-400 active:scale-95"
              type="submit"
            >
              Submit
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
