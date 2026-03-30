export type Locale = "en" | "fr";

export const locales: Locale[] = ["en", "fr"];

export const translations = {
  en: {
    languageSwitcher: {
      en: "EN",
      fr: "FR",
    },
    navigation: {
      aboutUs: "About Us",
      workwear: "Workwear",
      ppe: "PPE",
      standards: "Standards",
      contactUs: "Contact Us",
      backlog: "Backlog",
      todo: "To Do",
      done: "Done",
    },
    header: {
      topBanner: "Premium industrial and professional clothing",
      promoShippingTitle: "FREE SHIPPING",
      promoShippingText: "On all orders over £75 *",
      promoReturnsTitle: "28 DAY RETURNS*",
      promoReturnsText: "Free Within 14 Days *",
      promoLogoTitle: "FREE LOGO SET-UP",
      promoLogoText: "Embroidery & Transfers",
      heroEyebrow: "SOTICO GROUP",
      heroTitle: "A MAJOR BRAND FOR PROFESSIONALS",
      heroPrimaryCta: "DISCOVER OUR CATALOGUE",
      heroSecondaryCta: "TAILOR-MADE",
      qualityTitle: "Certified Quality",
      qualityText: "European Standard ISO 9001",
      heroImageAlt: "Montage of professionals wearing Sotico uniforms.",
    },
    home: {
      categoryCta: "See more",
      partnerTitle: "Trusted by Leading Companies",
      categories: [
        {
          title: "HEALTHCARE",
          src: "/healthcare.png",
          href: "/healthcare",
          description:
            "Premium medical uniforms designed for comfort, hygiene, and durability.",
          subCategories: [
            "Women's Nurses Tunics",
            "Men's Tunics",
            "Healthcare Scrubs",
            "Healthcare Trousers",
            "Nurse Dresses",
            "Maternity Tunics",
          ],
        },
        {
          title: "INDUSTRY",
          src: "/industry.png",
          href: "/industry-construction",
          description:
            "Heavy-duty workwear built for safety, protection, and performance in demanding environments.",
          subCategories: [
            "Coveralls",
            "Work Jackets",
            "Work Trousers",
            "High-Visibility Clothing",
            "Flame-Resistant Clothing",
            "Waterproof Workwear",
          ],
        },
        {
          title: "HOSPITALITY",
          src: "/hospitality.png",
          href: "/hospitality",
          description:
            "Professional uniforms for chefs, kitchen staff, and service teams.",
          subCategories: [
            "Chef Jackets",
            "Chef Trousers",
            "Aprons",
            "Kitchen Uniforms",
            "Waiter & Waitress Uniforms",
            "Catering Uniforms",
          ],
        },
        {
          title: "SERVICE",
          src: "/corporate.png",
          href: "/corporate",
          description:
            "Elegant uniforms for office, retail, and customer-facing professionals.",
          subCategories: [
            "Office Uniforms",
            "Reception Staff Uniforms",
            "Retail Staff Uniforms",
            "Security Uniforms",
            "Airline Staff Uniforms",
            "Customer Service Apparel",
          ],
        },
        {
          title: "CLEANING",
          src: "/cleaning.png",
          href: "/cleaning-services",
          description:
            "Durable and practical clothing for cleaning and maintenance professionals.",
          subCategories: [
            "Cleaning Staff Uniforms",
            "Housekeeping Uniforms",
            "Janitorial Workwear",
            "Industrial Laundry Clothing",
            "Maintenance Uniforms",
            "Protective Overalls",
          ],
        },
      ],
      about: {
        titlePrefix: "About",
        titleAccent: "Sotico",
        paragraphOne:
          "At Sotico, we design and craft professional uniforms that bring comfort, safety, and confidence to every worker. From construction sites to workshops, we believe that quality work starts with quality wear.",
        paragraphTwo:
          "Our mission is to blend durability, functionality, and modern style because we know that good design can empower productivity. Every fabric we choose and every stitch we make reflects our passion for excellence.",
        cta: "Learn More",
      },
      contact: {
        title: "Let's talk",
        firstName: "First name",
        lastName: "Last name",
        email: "Email address",
        phone: "Phone number",
        company: "Company",
        jobTitle: "Job title",
        enquiryType: "Enquiry type",
        message: "Message",
        submit: "Submit",
        placeholders: {
          firstName: "First name",
          lastName: "Last name",
          email: "Email address",
          phone: "Phone number",
          company: "Company",
          jobTitle: "Job title",
          message: "Message",
        },
        enquiryOptions: [
          "Please select...",
          "Product Inquiry",
          "Custom Solutions",
          "Partnerships",
          "Technical Support",
        ],
        privacy:
          "SOTICO Group needs the contact information you provide to contact you about our products and services. You may unsubscribe from these communications at anytime. For information on how to unsubscribe, as well as our privacy practices and commitment to protecting your privacy, check out our Privacy Policy.",
        privacyLink: "Privacy Policy",
      },
      footer: {
        companyDescription:
          "A family business founded in 1982 by Mr. Mohamed KHALFALLAH, Sotico is one of the first Tunisian companies specialized in manufacturing professional clothing for healthcare, industry, and flame-retardant sectors.",
        quickLinks: "Quick Links",
        home: "Home",
        shop: "Shop",
        about: "About Us",
        contact: "Contact",
        contactTitle: "Contact",
        followUs: "Follow Us",
        copyright: "All rights reserved.",
      },
    },
    certificates: {
      label: "Certificate",
      backHome: "Back to home",
      pdfTitleSuffix: "certificate PDF",
    },
    aboutPage: {
      eyebrow: "Who We Are",
      title: "Building professional wear with heritage, precision, and trust.",
      intro:
        "Sotico combines decades of manufacturing expertise with a constant focus on quality, safety, and long-term partnerships.",
      storyTitle: "Our Story",
      timelineTitle: "Key Milestones",
      timelineIntro:
        "A quick look at the moments that shaped the company and its growth.",
      timeline: [
        {
          year: "1982",
          title: "Company founded",
          description:
            "Sotico begins as a family business with a clear mission: manufacture reliable professional clothing in Tunisia.",
        },
        {
          year: "1995",
          title: "Industrial expansion",
          description:
            "Production capacity grows to serve more healthcare, industrial, and service-sector clients.",
        },
        {
          year: "2008",
          title: "Quality structuring",
          description:
            "The company reinforces its quality systems and operational processes to meet stricter professional standards.",
        },
        {
          year: "2020",
          title: "Modern product development",
          description:
            "Sotico expands its collections with more technical, durable, and design-conscious workwear solutions.",
        },
        {
          year: "Today",
          title: "Trusted regional partner",
          description:
            "The company continues to serve professionals with certified quality, tailored service, and long-term reliability.",
        },
      ],
    },
    showcase: {
      titlePrefix: "Collection",
      subcategoryLabel: "Subcategory",
      productsLabel: "Products",
      colorLabel: "Colors",
      sizesLabel: "Available sizes",
      detailsCta: "View product",
      backToCollections: "Back to collections",
      relatedLabel: "Selected collection",
    },
    products: {
      catalogueTitle: "Our Catalogue",
      catalogueSubtitle: "Manage your workwear collection",
      addProduct: "Add Product",
      loading: "Loading...",
      viewDetails: "View Details",
      edit: "Edit",
      delete: "Delete",
      deleteConfirm: "Do you really want to delete this product?",
      deleteSuccess: "Product deleted successfully",
      deleteError: "Error while deleting the product",
      fetchError: "Error while loading products",
      categories: [
        { value: "All", label: "All" },
        { value: "Construction", label: "Construction" },
        { value: "Tennis", label: "Tennis" },
        { value: "Industrial", label: "Industrial" },
        { value: "Safety", label: "Safety" },
        { value: "Other", label: "Other" },
      ],
      create: {
        title: "Add New Product",
        back: "Back",
        name: "Product Name",
        price: "Price (TND)",
        category: "Category",
        description: "Description",
        image: "Product Image",
        submit: "Create Product",
        success: "Product created successfully!",
        error: "Error while creating the product",
        placeholders: {
          name: "Ex: Protective coverall",
          price: "0.00",
          description: "Details about the garment (material, durability, use...)",
        },
      },
      editPage: {
        loading: "Loading product data...",
        title: "Edit Product Details",
        cancel: "Cancel",
        name: "Name",
        price: "Price (TND)",
        category: "Category",
        description: "Technical Description",
        submit: "Save Changes",
        success: "Attributes updated!",
        error: "Error while updating the product",
      },
    },
  },
  fr: {
    languageSwitcher: {
      en: "EN",
      fr: "FR",
    },
    navigation: {
      aboutUs: "À propos",
      workwear: "Vêtements",
      ppe: "EPI",
      standards: "Normes",
      contactUs: "Contact",
      backlog: "En attente",
      todo: "À faire",
      done: "Terminé",
    },
    header: {
      topBanner: "Vêtements industriels et professionnels haut de gamme",
      promoShippingTitle: "LIVRAISON OFFERTE",
      promoShippingText: "Pour toute commande supérieure à £75 *",
      promoReturnsTitle: "RETOUR 28 JOURS*",
      promoReturnsText: "Gratuit sous 14 jours *",
      promoLogoTitle: "LOGO OFFERT",
      promoLogoText: "Broderie & transferts",
      heroEyebrow: "SOTICO GROUP",
      heroTitle: "UNE GRANDE MARQUE POUR LES PROFESSIONNELS",
      heroPrimaryCta: "DÉCOUVREZ NOTRE CATALOGUE",
      heroSecondaryCta: "SUR MESURE",
      qualityTitle: "Qualité certifiée",
      qualityText: "Norme européenne ISO 9001",
      heroImageAlt: "Montage de professionnels portant des uniformes Sotico.",
    },
    home: {
      categoryCta: "Voir plus",
      partnerTitle: "Ils nous font confiance",
      categories: [
        {
          title: "SANTÉ",
          src: "/healthcare.png",
          href: "/healthcare",
          description:
            "Des tenues médicales premium conçues pour le confort, l'hygiène et la durabilité.",
          subCategories: [
            "Tuniques infirmières femme",
            "Tuniques homme",
            "Scrubs médicaux",
            "Pantalons santé",
            "Robes infirmières",
            "Tuniques maternité",
          ],
        },
        {
          title: "INDUSTRIE",
          src: "/industry.png",
          href: "/industry-construction",
          description:
            "Des vêtements de travail robustes conçus pour la sécurité, la protection et la performance.",
          subCategories: [
            "Combinaisons",
            "Vestes de travail",
            "Pantalons de travail",
            "Haute visibilité",
            "Protection ignifuge",
            "Vêtements imperméables",
          ],
        },
        {
          title: "HÔTELLERIE",
          src: "/hospitality.png",
          href: "/hospitality",
          description:
            "Des uniformes professionnels pour les chefs, les cuisines et les équipes de service.",
          subCategories: [
            "Vestes de chef",
            "Pantalons de chef",
            "Tabliers",
            "Uniformes de cuisine",
            "Uniformes de salle",
            "Tenues traiteur",
          ],
        },
        {
          title: "SERVICE",
          src: "/corporate.png",
          href: "/corporate",
          description:
            "Des uniformes élégants pour les bureaux, le retail et les métiers en contact client.",
          subCategories: [
            "Uniformes de bureau",
            "Tenues d'accueil",
            "Uniformes retail",
            "Uniformes de sécurité",
            "Tenues aériennes",
            "Service client",
          ],
        },
        {
          title: "NETTOYAGE",
          src: "/cleaning.png",
          href: "/cleaning-services",
          description:
            "Des vêtements durables et pratiques pour les métiers du nettoyage et de la maintenance.",
          subCategories: [
            "Uniformes nettoyage",
            "Tenues housekeeping",
            "Vêtements de conciergerie",
            "Blanchisserie industrielle",
            "Uniformes maintenance",
            "Combinaisons de protection",
          ],
        },
      ],
      about: {
        titlePrefix: "À propos de",
        titleAccent: "Sotico",
        paragraphOne:
          "Chez Sotico, nous concevons et fabriquons des uniformes professionnels qui apportent confort, sécurité et confiance à chaque travailleur. Des chantiers aux ateliers, nous pensons qu'un bon travail commence par une bonne tenue.",
        paragraphTwo:
          "Notre mission est d'allier durabilité, fonctionnalité et style contemporain, car nous savons qu'un bon design peut renforcer la productivité. Chaque tissu que nous choisissons et chaque couture que nous réalisons reflètent notre passion de l'excellence.",
        cta: "En savoir plus",
      },
      contact: {
        title: "Parlons-en",
        firstName: "Prénom",
        lastName: "Nom",
        email: "Adresse e-mail",
        phone: "Téléphone",
        company: "Entreprise",
        jobTitle: "Fonction",
        enquiryType: "Type de demande",
        message: "Message",
        submit: "Envoyer",
        placeholders: {
          firstName: "Prénom",
          lastName: "Nom",
          email: "Adresse e-mail",
          phone: "Téléphone",
          company: "Entreprise",
          jobTitle: "Fonction",
          message: "Message",
        },
        enquiryOptions: [
          "Veuillez sélectionner...",
          "Demande produit",
          "Solutions sur mesure",
          "Partenariats",
          "Support technique",
        ],
        privacy:
          "SOTICO Group a besoin des informations que vous nous fournissez afin de vous contacter au sujet de nos produits et services. Vous pouvez vous désinscrire à tout moment. Pour en savoir plus sur la désinscription, nos pratiques de confidentialité et notre engagement à protéger vos données, consultez notre Politique de confidentialité.",
        privacyLink: "Politique de confidentialité",
      },
      footer: {
        companyDescription:
          "Entreprise familiale fondée en 1982 par M. Mohamed KHALFALLAH, Sotico est l'une des premières entreprises tunisiennes spécialisées dans la fabrication de vêtements professionnels pour les secteurs de la santé, de l'industrie et des protections ignifuges.",
        quickLinks: "Liens rapides",
        home: "Accueil",
        shop: "Catalogue",
        about: "À propos",
        contact: "Contact",
        contactTitle: "Contact",
        followUs: "Suivez-nous",
        copyright: "Tous droits réservés.",
      },
    },
    certificates: {
      label: "Certificat",
      backHome: "Retour à l'accueil",
      pdfTitleSuffix: "PDF du certificat",
    },
    aboutPage: {
      eyebrow: "Qui sommes-nous",
      title:
        "Créer des vêtements professionnels avec héritage, précision et confiance.",
      intro:
        "Sotico associe des décennies de savoir-faire industriel à une exigence constante de qualité, de sécurité et de partenariat durable.",
      storyTitle: "Notre histoire",
      timelineTitle: "Étapes clés",
      timelineIntro:
        "Un aperçu des moments essentiels qui ont marqué l'entreprise et sa croissance.",
      timeline: [
        {
          year: "1982",
          title: "Création de l'entreprise",
          description:
            "Sotico naît comme entreprise familiale avec une mission claire : fabriquer en Tunisie des vêtements professionnels fiables.",
        },
        {
          year: "1995",
          title: "Expansion industrielle",
          description:
            "La capacité de production augmente pour répondre à davantage de clients des secteurs santé, industrie et services.",
        },
        {
          year: "2008",
          title: "Structuration qualité",
          description:
            "L'entreprise renforce ses systèmes qualité et ses processus afin de répondre à des standards professionnels plus exigeants.",
        },
        {
          year: "2020",
          title: "Développement produit moderne",
          description:
            "Sotico élargit ses collections avec des solutions de workwear plus techniques, durables et soignées.",
        },
        {
          year: "Aujourd'hui",
          title: "Partenaire régional de confiance",
          description:
            "L'entreprise accompagne toujours les professionnels avec une qualité certifiée, un service sur mesure et une fiabilité durable.",
        },
      ],
    },
    showcase: {
      titlePrefix: "Collection",
      subcategoryLabel: "Sous-catégorie",
      productsLabel: "Produits",
      colorLabel: "Couleurs",
      sizesLabel: "Tailles disponibles",
      detailsCta: "Voir le produit",
      backToCollections: "Retour aux collections",
      relatedLabel: "Collection sélectionnée",
    },
    products: {
      catalogueTitle: "Notre catalogue",
      catalogueSubtitle: "Gérez votre collection de vêtements professionnels",
      addProduct: "Ajouter un produit",
      loading: "Chargement...",
      viewDetails: "Voir les détails",
      edit: "Modifier",
      delete: "Supprimer",
      deleteConfirm: "Voulez-vous vraiment supprimer ce produit ?",
      deleteSuccess: "Produit supprimé avec succès",
      deleteError: "Erreur lors de la suppression du produit",
      fetchError: "Erreur lors du chargement des produits",
      categories: [
        { value: "All", label: "Tous" },
        { value: "Construction", label: "Construction" },
        { value: "Tennis", label: "Tennis" },
        { value: "Industrial", label: "Industriel" },
        { value: "Safety", label: "Sécurité" },
        { value: "Other", label: "Autre" },
      ],
      create: {
        title: "Ajouter un nouveau produit",
        back: "Retour",
        name: "Nom du produit",
        price: "Prix (TND)",
        category: "Catégorie",
        description: "Description",
        image: "Image du produit",
        submit: "Créer le produit",
        success: "Produit créé avec succès !",
        error: "Erreur lors de la création du produit",
        placeholders: {
          name: "Ex : Combinaison de protection",
          price: "0.00",
          description:
            "Détails sur la tenue (matière, durabilité, usage...)",
        },
      },
      editPage: {
        loading: "Chargement des données du produit...",
        title: "Modifier les informations du produit",
        cancel: "Annuler",
        name: "Nom",
        price: "Prix (TND)",
        category: "Catégorie",
        description: "Description technique",
        submit: "Enregistrer les modifications",
        success: "Attributs mis à jour !",
        error: "Erreur lors de la mise à jour du produit",
      },
    },
  },
} as const;

export type TranslationDictionary = (typeof translations)[Locale];
