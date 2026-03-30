export type PartnerLogo = {
  src: string;
  alt: string;
};

export type Certificate = {
  slug: string;
  title: string;
  imageSrc: string;
  pdfSrc: string;
};

export const partnerLogos: PartnerLogo[] = [
  { src: "/images.jpeg", alt: "Company Logo 1" },
  { src: "/images.jpeg", alt: "Company Logo 2" },
  { src: "/images.jpeg", alt: "Company Logo 3" },
  { src: "/images.jpeg", alt: "Company Logo 4" },
  { src: "/images.jpeg", alt: "Company Logo 5" },
];

export const certificates: Certificate[] = [
  {
    slug: "iso-9001",
    title: "ISO 9001",
    imageSrc: "/file.svg",
    pdfSrc: "/certificates/iso-9001.pdf",
  },
  {
    slug: "iso-14001",
    title: "ISO 14001",
    imageSrc: "/file.svg",
    pdfSrc: "/certificates/iso-14001.pdf",
  },
  {
    slug: "iso-45001",
    title: "ISO 45001",
    imageSrc: "/file.svg",
    pdfSrc: "/certificates/iso-45001.pdf",
  },
];
