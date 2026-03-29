import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-gray-900 py-14 text-gray-300">
      <div className="container mx-auto grid grid-cols-1 gap-10 px-6 md:grid-cols-4">
        <div>
          <h3 className="mb-4 text-2xl font-bold text-white">Sotico</h3>
          <p className="leading-relaxed text-gray-400">
            Est une entreprise familiale, fondée en 1982 par M. Mohamed
            KHALFALLAH. C&apos;est une des premières entreprises tunisiennes
            spécialisée dans la fabrication de vêtements professionnels pour les
            secteurs de la santé, l&apos;industrie et retardateur de flamme.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-xl font-semibold text-white">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link className="transition hover:text-white" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-white" href="/products">
                Shop
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-white" href="#">
                About Us
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-white" href="#">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xl font-semibold text-white">Contact</h4>
          <ul className="space-y-2">
            <li>📞 (+216) 73 288 533/544</li>
            <li>📧 mk@soticogroup.com / contact@soticogroup.com</li>
            <li>📍 GP1, Route de Sfax Z.I. BeniRabiaa 4015 M&apos;saken - Tunisie</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xl font-semibold text-white">Follow Us</h4>
          <div className="flex gap-4 text-2xl">
            <a href="#" className="transition hover:text-white">
              🌐
            </a>
            <a href="#" className="transition hover:text-white">
              📘
            </a>
            <a href="#" className="transition hover:text-white">
              📸
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500">
        © {new Date().getFullYear()} Sotico. All rights reserved.
      </div>
    </footer>
  );
}
