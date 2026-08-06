"use client";

import Image from "next/image";
import {
  ImagePlus,
  Loader2,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { toast } from "sonner";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface HeroImageUploadProps {
  image: string;
  onChange: (url: string) => void;
}

export default function HeroImageUpload({
  image,
  onChange,
}: HeroImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] =
    useState(false);

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = e.target.files?.[0];

      if (!file) return;

      setUploading(true);

      const formData = new FormData();

      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(
          result.message || "Image upload failed."
        );
        return;
      }

      onChange(result.url);

      toast.success(
        "Image uploaded successfully."
      );
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-5">

      {/* Label */}

      <div>
        <label className="text-sm font-semibold text-slate-200">
          Hero Background Image
        </label>

        <p className="mt-1 text-xs text-slate-500">
          Recommended size: 1920 × 1080px
        </p>
      </div>

      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={handleUpload}
      />

      {!image ? (
        <motion.button
          whileHover={{
            scale: 1.01,
          }}
          whileTap={{
            scale: 0.98,
          }}
          type="button"
          disabled={uploading}
          onClick={() =>
            inputRef.current?.click()
          }
          className="
            relative

            flex
            h-[320px]
            w-full

            flex-col
            items-center
            justify-center

            overflow-hidden

            rounded-3xl

            border-2
            border-dashed
            border-cyan-500/40

            bg-gradient-to-br
            from-slate-900
            via-slate-950
            to-slate-900

            transition-all
            duration-300

            hover:border-cyan-400
            hover:shadow-[0_0_40px_rgba(6,182,212,0.18)]

            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {/* Glow */}

          <div className="absolute h-44 w-44 rounded-full bg-cyan-500/10 blur-3xl" />

          {uploading ? (
            <>
              <Loader2
                size={54}
                className="animate-spin text-cyan-400"
              />

              <h3 className="mt-6 text-lg font-semibold text-white">
                Uploading Image...
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Please wait a moment
              </p>
            </>
          ) : (
            <>
              <div
                className="
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center

                  rounded-full

                  bg-cyan-500/10

                  text-cyan-400
                "
              >
                <UploadCloud size={42} />
              </div>

              <h3 className="mt-6 text-xl font-bold text-white">
                Upload Hero Image
              </h3>

              <p className="mt-2 max-w-sm text-center text-sm leading-7 text-slate-400">
                Drag & Drop your image here or click
                to browse from your computer.
              </p>

              <div className="mt-6 rounded-full bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300">
                PNG • JPG • JPEG • WEBP
              </div>
            </>
          )}
        </motion.button>
      ) : (
        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            overflow-hidden

            rounded-3xl

            border
            border-slate-800

            bg-slate-950

            shadow-[0_20px_50px_rgba(0,0,0,0.35)]
          "
        >
          {/* Preview */}

          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={image}
              alt="Hero Preview"
              fill
              className="
                object-cover
                transition
                duration-500
                hover:scale-105
              "
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            <div className="absolute bottom-5 left-5">
              <div className="rounded-full bg-cyan-500/90 px-4 py-2 text-xs font-semibold text-white shadow-lg">
                Hero Preview
              </div>
            </div>
          </div>

          {/* Footer */}

          <div
            className="
              flex
              flex-col
              gap-4

              border-t
              border-slate-800

              p-5

              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div className="min-w-0">
              <h4 className="truncate font-semibold text-white">
                Background Image Uploaded
              </h4>

              <p className="mt-1 text-sm text-slate-400">
                Click upload again if you want to
                replace this image.
              </p>
            </div>

            <div className="flex gap-3">

              <button
                type="button"
                onClick={() =>
                  inputRef.current?.click()
                }
                className="
                  flex
                  items-center
                  gap-2

                  rounded-xl

                  bg-cyan-500

                  px-5
                  py-3

                  text-sm
                  font-semibold
                  text-white

                  transition

                  hover:bg-cyan-600
                "
              >
                <ImagePlus size={18} />
                Replace
              </button>

              <button
                type="button"
                onClick={() => onChange("")}
                className="
                  flex
                  items-center
                  gap-2

                  rounded-xl

                  bg-red-500/10

                  px-5
                  py-3

                  text-sm
                  font-semibold
                  text-red-400

                  transition

                  hover:bg-red-500/20
                "
              >
                <Trash2 size={18} />
                Remove
              </button>

            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}