export type PublicationCategory =
  | "Journal"
  | "Tender";

export interface IPublication {
  _id?: string;

  title: string;

  slug: string;

  category: PublicationCategory;

  pdf: string;

  date: string;

  time: string;

  isPublished: boolean;

  order: number;

  createdAt?: string;

  updatedAt?: string;
}