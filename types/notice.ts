export type NoticeCategory =
  | "General Notice"
  | "Admission Notice"
  | "Reports"
  | "Job Circular";

export interface INotice {
  _id?: string;

  title: string;

  slug: string;

  category: NoticeCategory;

  pdf: string;

  date: string;

  time: string;

  isPublished: boolean;

  order: number;

  createdAt?: string;

  updatedAt?: string;
}