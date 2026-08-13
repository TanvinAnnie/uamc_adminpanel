"use client";

import Link from "next/link";

import {
  FileText,
  Pencil,
  Trash2,
} from "lucide-react";

interface Notice {
  _id: string;
  title: string;
  slug: string;

  category:
    | "General Notice"
    | "Admission Notice"
    | "Reports"
    | "Job Circular";

  description: string;
  pdf: string;
  date: string;
  time: string;
  isPublished: boolean;
  order: number;
  createdAt: string;
}

interface NoticeTableRowProps {
  notice: Notice;
  onDelete: (id: string) => void;
  mobile?: boolean;
}

export default function NoticeTableRow({
  notice,
  onDelete,
  mobile = false,
}: NoticeTableRowProps) {
  const noticeDate = new Date(notice.date);

  // =========================================================
  // MOBILE ACTIONS
  // =========================================================

  if (mobile) {
    return (
      <div className="flex items-center gap-3">
        {/* PDF */}

        {notice.pdf && (
          <a
            href={notice.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-emerald-400/20
              bg-emerald-400/10
              text-emerald-400
              transition
              hover:scale-105
              hover:bg-emerald-400/20
            "
            title="View PDF"
          >
            <FileText size={18} />
          </a>
        )}

        {/* EDIT */}

        <Link
          href={`/dashboard/home/notices/edit/${notice._id}`}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-blue-400/20
            bg-blue-400/10
            text-blue-400
            transition
            hover:scale-105
            hover:bg-blue-400/20
          "
          title="Edit Notice"
        >
          <Pencil size={18} />
        </Link>

        {/* DELETE */}

        <button
          type="button"
          onClick={() => onDelete(notice._id)}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-red-400/20
            bg-red-400/10
            text-red-400
            transition
            hover:scale-105
            hover:bg-red-400/20
          "
          title="Delete Notice"
        >
          <Trash2 size={18} />
        </button>
      </div>
    );
  }

  // =========================================================
  // DESKTOP TABLE ROW
  // =========================================================

  return (
    <tr
      className="
        border-b
        border-white/10
        transition
        hover:bg-white/[0.03]
      "
    >
      {/* TITLE */}

      <td className="px-6 py-5">
        <div className="max-w-md">
          <h3
            className="
              line-clamp-1
              font-semibold
              text-white
            "
          >
            {notice.title}
          </h3>

          <p
            className="
              mt-1
              line-clamp-1
              text-sm
              text-slate-400
            "
          >
            {notice.slug}
          </p>
        </div>
      </td>

      {/* CATEGORY */}

      <td className="px-6 py-5">
        <span
          className="
            inline-flex
            rounded-full
            border
            border-cyan-400/20
            bg-cyan-400/10
            px-3
            py-1
            text-xs
            font-semibold
            text-cyan-400
          "
        >
          {notice.category}
        </span>
      </td>

      {/* DATE */}

      <td className="px-6 py-5">
        <div>
          <p
            className="
              text-sm
              font-semibold
              text-white
            "
          >
            {noticeDate.toLocaleDateString()}
          </p>

          <p
            className="
              mt-1
              text-xs
              text-slate-500
            "
          >
            {notice.time}
          </p>
        </div>
      </td>

      {/* ORDER */}

      <td className="px-6 py-5">
        <span
          className="
            rounded-lg
            bg-slate-800
            px-3
            py-1
            text-sm
            font-medium
            text-slate-300
          "
        >
          #{notice.order}
        </span>
      </td>

      {/* STATUS */}

      <td className="px-6 py-5">
        {notice.isPublished ? (
          <span
            className="
              inline-flex
              rounded-full
              border
              border-emerald-400/20
              bg-emerald-400/10
              px-3
              py-1
              text-xs
              font-semibold
              text-emerald-400
            "
          >
            Published
          </span>
        ) : (
          <span
            className="
              inline-flex
              rounded-full
              border
              border-red-400/20
              bg-red-400/10
              px-3
              py-1
              text-xs
              font-semibold
              text-red-400
            "
          >
            Unpublished
          </span>
        )}
      </td>

      {/* CREATED */}

      <td
        className="
          px-6
          py-5
          text-sm
          text-slate-400
        "
      >
        {new Date(notice.createdAt).toLocaleDateString()}
      </td>

      {/* ACTIONS */}

      <td className="px-6 py-5">
        <div
          className="
            flex
            items-center
            justify-center
            gap-3
          "
        >
          {/* PDF */}

          {notice.pdf && (
            <a
              href={notice.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-emerald-400/20
                bg-emerald-400/10
                text-emerald-400
                transition
                hover:scale-105
                hover:bg-emerald-400/20
              "
              title="View PDF"
            >
              <FileText size={18} />
            </a>
          )}

          {/* EDIT */}

          <Link
            href={`/dashboard/home/notices/edit/${notice._id}`}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-blue-400/20
              bg-blue-400/10
              text-blue-400
              transition
              hover:scale-105
              hover:bg-blue-400/20
            "
            title="Edit Notice"
          >
            <Pencil size={18} />
          </Link>

          {/* DELETE */}

          <button
            type="button"
            onClick={() => onDelete(notice._id)}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-red-400/20
              bg-red-400/10
              text-red-400
              transition
              hover:scale-105
              hover:bg-red-400/20
            "
            title="Delete Notice"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}