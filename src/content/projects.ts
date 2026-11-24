import type { Project } from "./types";

// Placeholder projects — photos are real, names and figures are not.
export const projects: Project[] = [
  {
    slug: "ofis-ve-uretim-binasi-dilovasi",
    title: "Ofis ve üretim binası",
    city: "Kocaeli",
    district: "Dilovası",
    type: "cok-katli",
    year: 2025,
    summary: "Üç katlı çelik ofis ve üretim binası; projelendirme, imalat ve montaj.",
    images: [
      {
        src: "/images/projects/cok-katli-iskelet.jpg",
        alt: "Montajı süren çok katlı çelik ofis ve üretim binasının iskeleti",
      },
    ],
    featured: true,
    isPlaceholder: true,
  },
  {
    slug: "uretim-tesisi-gebze",
    title: "Üretim tesisi",
    city: "Kocaeli",
    district: "Gebze",
    type: "fabrika",
    year: 2025,
    summary: "Fabrika binası çelik taşıyıcı sistemi.",
    images: [
      {
        src: "/images/projects/kolon-montaj.jpg",
        alt: "Fabrika binasının sahada dikilmiş çelik kolonları",
      },
    ],
    featured: true,
    isPlaceholder: true,
  },
  {
    slug: "ticari-bina-catisi-kestel",
    title: "Ticari bina çatısı",
    city: "Bursa",
    district: "Kestel",
    type: "celik-cati",
    year: 2026,
    summary: "Betonarme ticari binaya çelik çatı imalatı ve montajı.",
    images: [
      {
        src: "/images/projects/celik-cati-vinc.jpg",
        alt: "Betonarme binanın üzerine vinçle çelik çatı montajı",
      },
    ],
    featured: true,
    isPlaceholder: true,
  },
  {
    slug: "lojistik-deposu-gebze",
    title: "Lojistik deposu",
    city: "Kocaeli",
    district: "Gebze",
    type: "depo",
    year: 2024,
    summary: "Lojistik deposu çelik konstrüksiyonu.",
    images: [
      {
        src: "/images/projects/atolye-imalat.jpg",
        alt: "Atölyede imalatı süren depo kolonları ve kirişleri",
      },
    ],
    featured: false,
    isPlaceholder: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}