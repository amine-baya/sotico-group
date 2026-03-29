import Link from "next/link";
import { notFound } from "next/navigation";

import { certificates } from "@/app/components/home/home-content";

type CertificatePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return certificates.map((certificate) => ({
    slug: certificate.slug,
  }));
}

export default async function CertificatePage({
  params,
}: CertificatePageProps) {
  const { slug } = await params;
  const certificate = certificates.find((item) => item.slug === slug);

  if (!certificate) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Certificate
            </p>
            <h1 className="text-4xl font-bold text-[#0c437c]">
              {certificate.title}
            </h1>
          </div>
          <Link
            href="/"
            className="rounded-full border border-slate-300 px-5 py-2 font-semibold text-slate-700 transition hover:bg-white"
          >
            Back to home
          </Link>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
          <iframe
            src={certificate.pdfSrc}
            title={`${certificate.title} certificate PDF`}
            className="h-[80vh] w-full"
          />
        </div>
      </div>
    </main>
  );
}
