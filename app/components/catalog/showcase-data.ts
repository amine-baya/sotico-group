import { Locale, translations } from "../i18n/translations";

export type ShowcaseColor = {
  id: string;
  name: {
    en: string;
    fr: string;
  };
  hex: string;
};

export type ShowcaseProduct = {
  slug: string;
  title: {
    en: string;
    fr: string;
  };
  description: {
    en: string;
    fr: string;
  };
  image: string;
  gallery: string[];
  colors: ShowcaseColor[];
  sizes: string[];
};

export type ShowcaseSubcategory = {
  index: number;
  title: {
    en: string;
    fr: string;
  };
  products: ShowcaseProduct[];
};

export type ShowcaseCategory = {
  slug: string;
  title: {
    en: string;
    fr: string;
  };
  description: {
    en: string;
    fr: string;
  };
  image: string;
  subcategories: ShowcaseSubcategory[];
};

const colorSets: ShowcaseColor[][] = [
  [
    { id: "navy", name: { en: "Navy", fr: "Marine" }, hex: "#1E3A5F" },
    { id: "white", name: { en: "White", fr: "Blanc" }, hex: "#F4F4F5" },
    { id: "teal", name: { en: "Teal", fr: "Bleu vert" }, hex: "#0F766E" },
  ],
  [
    { id: "charcoal", name: { en: "Charcoal", fr: "Anthracite" }, hex: "#364153" },
    { id: "sand", name: { en: "Sand", fr: "Sable" }, hex: "#C8B59A" },
    { id: "orange", name: { en: "Safety Orange", fr: "Orange sécurité" }, hex: "#F97316" },
  ],
  [
    { id: "black", name: { en: "Black", fr: "Noir" }, hex: "#111827" },
    { id: "cream", name: { en: "Cream", fr: "Crème" }, hex: "#F6E7C1" },
    { id: "burgundy", name: { en: "Burgundy", fr: "Bordeaux" }, hex: "#7F1D1D" },
  ],
  [
    { id: "slate", name: { en: "Slate", fr: "Ardoise" }, hex: "#475569" },
    { id: "sky", name: { en: "Sky", fr: "Bleu ciel" }, hex: "#38BDF8" },
    { id: "silver", name: { en: "Silver", fr: "Argent" }, hex: "#CBD5E1" },
  ],
  [
    { id: "green", name: { en: "Forest", fr: "Vert forêt" }, hex: "#166534" },
    { id: "stone", name: { en: "Stone", fr: "Pierre" }, hex: "#A8A29E" },
    { id: "yellow", name: { en: "Lime", fr: "Citron vert" }, hex: "#A3E635" },
  ],
];

const productImageSets = [
  ["/healthcare.png", "/dentists.webp", "/healthcare_clothes.webp"],
  ["/industry.png", "/factory.jpg", "/cat-const.jpg"],
  ["/hospitality.png", "/chef.png", "/backg.jpg"],
  ["/corporate.png", "/uklogo.avif", "/logo.jpeg"],
  ["/cleaning.png", "/constraction.jpg", "/gilet.png"],
];

const productNameVariants = [
  { en: "Signature", fr: "Signature" },
  { en: "Core", fr: "Essentiel" },
  { en: "Advance", fr: "Advance" },
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toCategorySlug(href: string) {
  return href.replace(/^\//, "");
}

function buildDescription(
  locale: Locale,
  productTitle: string,
  subcategoryTitle: string,
  categoryTitle: string
) {
  if (locale === "fr") {
    return `${productTitle} est conçu pour la sous-catégorie ${subcategoryTitle} de la collection ${categoryTitle}, avec une coupe professionnelle, des finitions durables et un confort adapté à un usage quotidien.`;
  }

  return `${productTitle} is designed for the ${subcategoryTitle} subcategory in the ${categoryTitle} collection, combining professional fit, durable finishes, and all-day comfort.`;
}

const showcaseCatalog: ShowcaseCategory[] = translations.en.home.categories.map(
  (category, categoryIndex) => {
    const categoryFr = translations.fr.home.categories[categoryIndex];
    const categorySlug = toCategorySlug(category.href);
    const images = productImageSets[categoryIndex % productImageSets.length];

    return {
      slug: categorySlug,
      title: {
        en: category.title,
        fr: categoryFr.title,
      },
      description: {
        en: category.description,
        fr: categoryFr.description,
      },
      image: category.src,
      subcategories: category.subCategories.map((subcategory, subcategoryIndex) => {
        const subcategoryFr = categoryFr.subCategories[subcategoryIndex];

        return {
          index: subcategoryIndex,
          title: {
            en: subcategory,
            fr: subcategoryFr,
          },
          products: productNameVariants.map((variant, productIndex) => {
            const productTitleEn = `${subcategory} ${variant.en}`;
            const productTitleFr = `${subcategoryFr} ${variant.fr}`;

            return {
              slug: slugify(`${subcategory}-${variant.en}-${productIndex + 1}`),
              title: {
                en: productTitleEn,
                fr: productTitleFr,
              },
              description: {
                en: buildDescription("en", productTitleEn, subcategory, category.title),
                fr: buildDescription("fr", productTitleFr, subcategoryFr, categoryFr.title),
              },
              image: images[productIndex % images.length],
              gallery: [
                images[productIndex % images.length],
                images[(productIndex + 1) % images.length],
                images[(productIndex + 2) % images.length],
              ],
              colors: colorSets[
                (categoryIndex + subcategoryIndex + productIndex) % colorSets.length
              ],
              sizes: ["XS", "S", "M", "L", "XL", "XXL"],
            };
          }),
        };
      }),
    };
  }
);

export function getShowcaseCategories() {
  return showcaseCatalog;
}

export function getShowcaseCategory(categorySlug: string) {
  return showcaseCatalog.find((category) => category.slug === categorySlug);
}

export function getLocalizedCategorySummaries(locale: Locale) {
  return showcaseCatalog.map((category) => ({
    slug: category.slug,
    href: `/collections/${category.slug}`,
    image: category.image,
    title: category.title[locale],
    description: category.description[locale],
    firstSubcategoryIndex: 0,
  }));
}

export function getLocalizedSubcategories(locale: Locale, categorySlug: string) {
  const category = getShowcaseCategory(categorySlug);

  if (!category) {
    return [];
  }

  return category.subcategories.map((subcategory) => ({
    index: subcategory.index,
    title: subcategory.title[locale],
  }));
}

export function getCollectionView(
  locale: Locale,
  categorySlug: string,
  subcategoryIndex = 0
) {
  const category = getShowcaseCategory(categorySlug);

  if (!category) {
    return null;
  }

  const selectedSubcategory =
    category.subcategories[subcategoryIndex] ?? category.subcategories[0];

  return {
    category: {
      slug: category.slug,
      title: category.title[locale],
      description: category.description[locale],
      image: category.image,
    },
    selectedSubcategory: {
      index: selectedSubcategory.index,
      title: selectedSubcategory.title[locale],
      products: selectedSubcategory.products.map((product) => ({
        slug: product.slug,
        title: product.title[locale],
        description: product.description[locale],
        image: product.image,
        gallery: product.gallery,
        colors: product.colors.map((color) => ({
          id: color.id,
          name: color.name[locale],
          hex: color.hex,
        })),
        sizes: product.sizes,
      })),
    },
    subcategories: category.subcategories.map((subcategory) => ({
      index: subcategory.index,
      title: subcategory.title[locale],
    })),
  };
}

export function getShowcaseProduct(
  locale: Locale,
  categorySlug: string,
  productSlug: string
) {
  const category = getShowcaseCategory(categorySlug);

  if (!category) {
    return null;
  }

  for (const subcategory of category.subcategories) {
    const product = subcategory.products.find((item) => item.slug === productSlug);

    if (product) {
      return {
        category: {
          slug: category.slug,
          title: category.title[locale],
        },
        subcategory: {
          index: subcategory.index,
          title: subcategory.title[locale],
        },
        product: {
          slug: product.slug,
          title: product.title[locale],
          description: product.description[locale],
          image: product.image,
          gallery: product.gallery,
          sizes: product.sizes,
          colors: product.colors.map((color) => ({
            id: color.id,
            name: color.name[locale],
            hex: color.hex,
          })),
        },
      };
    }
  }

  return null;
}
