import Image from "next/image";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { SlBasket } from "react-icons/sl";

import { NavigationMenuDemo } from "../navigation/NavigationMenu";

export default function Header() {
  return (
    <div className="relative">
      <nav className="fixed left-0 top-0 z-50 w-full bg-white shadow-sm">
        <div className="w-full border-b border-slate-100 bg-slate-50 py-2">
          <div className="mx-auto max-w-7xl px-8 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
              Vêtements industriels et professionnels haut de gamme
            </p>
          </div>
        </div>

        <div className="container mx-auto flex items-center justify-between p-4 pb-0">
          <button className="cursor-pointer text-2xl font-bold" type="button">
            <FaSearch />
          </button>

          <Link href="/">
            <Image
              src="/logo.png"
              alt="Sotico logo"
              width={250}
              height={60}
              className="cursor-pointer"
            />
          </Link>

          <button className="cursor-pointer text-2xl" type="button">
            <SlBasket />
          </button>
        </div>

        <div className="container mx-auto justify-center pt-2 pb-3 text-lg font-semibold text-gray-800">
          <NavigationMenuDemo />
        </div>

        <div className="bg-[#0c437c] py-4 text-white">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-8 text-center md:grid-cols-3">
            <div>
              <p className="mb-0.5 text-[15px] font-bold uppercase tracking-[0.2em]">
                FREE SHIPPING
              </p>
              <p className="text-s underline underline-offset-4">
                On all orders over £75 *
              </p>
            </div>
            <div className="border-white/10 md:border-x">
              <p className="mb-0.5 text-[15px] font-bold uppercase tracking-[0.2em]">
                28 DAY RETURNS*
              </p>
              <p className="text-s underline underline-offset-4">
                Free Within 14 Days *
              </p>
            </div>
            <div>
              <p className="mb-0.5 text-[15px] font-bold uppercase tracking-[0.2em]">
                FREE LOGO SET-UP
              </p>
              <p className="text-s underline underline-offset-4">
                Embroidery &amp; Transfers
              </p>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative flex items-center overflow-hidden bg-white pt-40">
        <div className="h-[90vh] w-full">
          <div className="absolute inset-0 grid h-full grid-cols-1 pt-10 lg:grid-cols-12">
            <div className="hidden bg-background lg:col-span-5 lg:block" />
            <div className="relative col-span-12 h-full lg:col-span-7">
              {/* Remote marketing image kept as a plain img until a Next image host is configured. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="h-full w-full object-cover"
                alt="Montage of three professionals in Sotico uniforms."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyGv9ZF64nFYFvzBixhs__AHwhrcLuXgoFBsO5cW4vjgpD5CtUxA-drguHiBtwK__0W6thwFwXYrVrYeXvz51MvpxMA4PEKB-wbdkEpC8ZDhrMWCPZco5beJEKutOBce4CWk0i58o3ZAwRJ1hFtT801SohhWnRg_y0NWnWLOBQ-jtEqDMJYq8r2M45SAc4uXhs1wgAsVsmw73qYEJG91R7iltat_2xb6gs1_aQRlxB8VGs-xaX2WL2CG0Tl_E2Xsa0CNMrgzaNzxc"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent lg:from-background lg:via-background/40" />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent mix-blend-multiply" />
            </div>
          </div>

          <div className="relative z-10 ml-[15%] w-full max-w-7xl pb-20 pt-50">
            <div className="grid grid-cols-1 items-center lg:grid-cols-12">
              <div className="lg:col-span-6">
                <p className="mb-4 text-sm font-bold tracking-[0.2em] text-[#0c437c]">
                  SOTICO GROUP
                </p>
                <h1 className="mb-8 text-4xl font-extrabold leading-[1.05] tracking-tight text-[#0c437c] md:text-6xl lg:text-7xl">
                  UNE GRANDE MARQUE POUR LES PROFESSIONNELS
                </h1>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/products"
                    className="editorial-gradient flex items-center justify-between rounded-md bg-[#0c437c] px-8 py-4 font-semibold text-white transition-all hover:shadow-xl hover:shadow-primary/20"
                  >
                    <span>DÉCOUVREZ NOTRE CATALOGUE</span>
                    <span className="ml-4">→</span>
                  </Link>
                  <button
                    className="rounded-md bg-[#aebebb] px-8 py-4 font-semibold text-white transition-colors hover:bg-slate-500"
                    type="button"
                  >
                    SUR MESURE
                  </button>
                </div>

                <div className="mt-12 inline-block rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-xl">
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary">
                    Qualité Certifiée
                  </p>
                  <p className="text-sm font-medium text-on-surface-variant">
                    Standard Européen ISO 9001
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
