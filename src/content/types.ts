export type StructureType =
  | "fabrika"
  | "depo"
  | "cok-katli"
  | "celik-cati"
  | "diger";

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  slug: string;
  title: string;
  city: string;
  district: string;
  type: StructureType;
  steelTons?: number;
  areaM2?: number;
  year?: number;
  summary: string;
  images: ProjectImage[];
  featured?: boolean;
  isPlaceholder: boolean;
}

export interface Company {
  name: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  email: string;
  address: string;
  mapsUrl: string;
  hours: string;
  isPlaceholder: boolean;
}
