import HeroSection from "./HeroSection";
import SiteHeaderBar from "./SiteHeaderBar";

export default function Header() {
  return (
    <div className="relative">
      <SiteHeaderBar />
      <HeroSection />
    </div>
  );
}
