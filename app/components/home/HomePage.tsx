import Header from "../layout/Header";
import AboutSection from "./AboutSection";
import CategoryGrid from "./CategoryGrid";
import ContactSection from "./ContactSection";
import PartnerLogos from "./PartnerLogos";
import SiteFooter from "./SiteFooter";

export default function HomePage() {
  return (
    <main>
      <Header />
      <CategoryGrid />
      <PartnerLogos />
      <AboutSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
