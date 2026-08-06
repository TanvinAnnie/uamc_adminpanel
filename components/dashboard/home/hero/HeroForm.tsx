"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

import HeroImageUpload from "./HeroImageUpload";
import HeroPreview from "./HeroPreview";

interface HeroFormProps {
  initialData?: {
    _id?: string;
    tagline: string;
    title: string;
    highlightText: string;
    lastTitle: string;
    buttonText: string;
    buttonLink: string;
    backgroundImage: string;
    rightTitle: string;
    courseOneTitle: string;
    courseOneDescription: string;
    courseTwoTitle: string;
    courseTwoDescription: string;
    slideNumber: number;
    isActive: boolean;
  };
}

export default function HeroForm({
  initialData,
}: HeroFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    tagline: initialData?.tagline || "",
    title: initialData?.title || "",
    highlightText:
      initialData?.highlightText || "",
    lastTitle:
      initialData?.lastTitle || "",
    buttonText:
      initialData?.buttonText || "",
    buttonLink:
      initialData?.buttonLink || "",
    backgroundImage:
      initialData?.backgroundImage || "",
    rightTitle:
      initialData?.rightTitle || "",
    courseOneTitle:
      initialData?.courseOneTitle || "",
    courseOneDescription:
      initialData?.courseOneDescription || "",
    courseTwoTitle:
      initialData?.courseTwoTitle || "",
    courseTwoDescription:
      initialData?.courseTwoDescription || "",
    slideNumber:
      initialData?.slideNumber || 1,
    isActive:
      initialData?.isActive ?? true,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "slideNumber"
          ? Number(value)
          : value,
    }));
  };

  const handleImage = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      backgroundImage: url,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const url = initialData?._id
        ? `/api/hero/${initialData._id}`
        : "/api/hero";

      const method = initialData?._id
        ? "PATCH"
        : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      toast.success(
        initialData?._id
          ? "Hero updated successfully."
          : "Hero created successfully."
      );

      router.push("/dashboard/home/hero");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
  onSubmit={handleSubmit}
  className="space-y-8"
>
  <div
    className="
      overflow-hidden
      rounded-[32px]
      border
      border-slate-800
      bg-gradient-to-br
      from-slate-950
      via-slate-900
      to-slate-950
      shadow-[0_25px_70px_rgba(0,0,0,0.45)]
    "
  >
    {/* Header */}

    <div
      className="
        border-b
        border-slate-800

        bg-gradient-to-r
        from-slate-900
        via-slate-900
        to-slate-800

        px-8
        py-7
      "
    >
      <div
        className="
          flex
          flex-col
          gap-6

          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <div>

          <div
            className="
              inline-flex
              items-center
              gap-2

              rounded-full

              border
              border-cyan-500/30

              bg-cyan-500/10

              px-4
              py-2

              text-sm
              font-semibold
              text-cyan-300
            "
          >
            <Sparkles size={16} />

            Hero Management
          </div>

          <h1 className="mt-5 text-4xl font-bold text-white">
            {initialData?._id
              ? "Update Hero Slide"
              : "Create Hero Slide"}
          </h1>

          <p className="mt-3 max-w-2xl text-slate-400">
            Create beautiful homepage hero sections with
            live preview and responsive layout.
          </p>

        </div>

        <div
          className="
            rounded-3xl

            border
            border-cyan-500/20

            bg-cyan-500/10

            px-6
            py-5
          "
        >
          <p className="text-sm text-slate-400">
            Slide Status
          </p>

          <h3
            className={`
              mt-2

              text-2xl
              font-bold

              ${
                formData.isActive
                  ? "text-emerald-400"
                  : "text-red-400"
              }
            `}
          >
            {formData.isActive
              ? "Active"
              : "Inactive"}
          </h3>
        </div>

      </div>
    </div>

    {/* Content */}

    <div className="p-6 lg:p-8">

      <div
        className="
          grid

          gap-8

          xl:grid-cols-2
        "
      >

        {/* Left Card */}

        <div
          className="
            space-y-7

            rounded-[28px]

            border
            border-slate-800

            bg-slate-900/70

            p-7

            backdrop-blur-xl
          "
        >

          <HeroImageUpload
            image={formData.backgroundImage}
            onChange={handleImage}
          />
          {/* Tagline */}

<div>
  <label className="mb-3 block text-sm font-semibold uppercase tracking-wider text-slate-300">
    Tagline
  </label>

  <input
    type="text"
    name="tagline"
    value={formData.tagline}
    onChange={handleChange}
    placeholder="Enter Hero Tagline"
    className="
      w-full
      rounded-2xl
      border
      border-slate-700
      bg-slate-950
      px-5
      py-4
      text-white
      placeholder:text-slate-500
      outline-none
      transition-all
      focus:border-cyan-500
      focus:ring-4
      focus:ring-cyan-500/20
    "
  />
</div>

{/* Title */}

<div>
  <label className="mb-3 block text-sm font-semibold uppercase tracking-wider text-slate-300">
    Main Title
  </label>

  <input
    type="text"
    name="title"
    value={formData.title}
    onChange={handleChange}
    placeholder="Enter Hero Title"
    className="
      w-full
      rounded-2xl
      border
      border-slate-700
      bg-slate-950
      px-5
      py-4
      text-white
      placeholder:text-slate-500
      outline-none
      transition-all
      focus:border-cyan-500
      focus:ring-4
      focus:ring-cyan-500/20
    "
  />
</div>

{/* Highlight Text */}

<div>
  <label className="mb-3 block text-sm font-semibold uppercase tracking-wider text-slate-300">
    Highlight Text
  </label>

  <input
    type="text"
    name="highlightText"
    value={formData.highlightText}
    onChange={handleChange}
    placeholder="Highlight Word"
    className="
      w-full
      rounded-2xl
      border
      border-slate-700
      bg-slate-950
      px-5
      py-4
      text-white
      placeholder:text-slate-500
      outline-none
      transition-all
      focus:border-cyan-500
      focus:ring-4
      focus:ring-cyan-500/20
    "
  />
</div>

{/* Last Title */}

<div>
  <label className="mb-3 block text-sm font-semibold uppercase tracking-wider text-slate-300">
    Last Title
  </label>

  <input
    type="text"
    name="lastTitle"
    value={formData.lastTitle}
    onChange={handleChange}
    placeholder="Ending Title"
    className="
      w-full
      rounded-2xl
      border
      border-slate-700
      bg-slate-950
      px-5
      py-4
      text-white
      placeholder:text-slate-500
      outline-none
      transition-all
      focus:border-cyan-500
      focus:ring-4
      focus:ring-cyan-500/20
    "
  />
</div>

{/* Button Text */}

<div>
  <label className="mb-3 block text-sm font-semibold uppercase tracking-wider text-slate-300">
    Button Text
  </label>

  <input
    type="text"
    name="buttonText"
    value={formData.buttonText}
    onChange={handleChange}
    placeholder="Explore Now"
    className="
      w-full
      rounded-2xl
      border
      border-slate-700
      bg-slate-950
      px-5
      py-4
      text-white
      placeholder:text-slate-500
      outline-none
      transition-all
      focus:border-cyan-500
      focus:ring-4
      focus:ring-cyan-500/20
    "
  />
</div>

{/* Button Link */}

<div>
  <label className="mb-3 block text-sm font-semibold uppercase tracking-wider text-slate-300">
    Button Link
  </label>

  <input
    type="text"
    name="buttonLink"
    value={formData.buttonLink}
    onChange={handleChange}
    placeholder="/admission"
    className="
      w-full
      rounded-2xl
      border
      border-slate-700
      bg-slate-950
      px-5
      py-4
      text-white
      placeholder:text-slate-500
      outline-none
      transition-all
      focus:border-cyan-500
      focus:ring-4
      focus:ring-cyan-500/20
    "
  />
</div>

</div>

{/* Right Preview */}

<div className="space-y-6 xl:sticky xl:top-6 self-start">
  <HeroPreview
    tagline={formData.tagline}
    title={formData.title}
    highlightText={formData.highlightText}
    lastTitle={formData.lastTitle}
    buttonText={formData.buttonText}
    buttonLink={formData.buttonLink}
    backgroundImage={formData.backgroundImage}
    rightTitle={formData.rightTitle}
    courseOneTitle={formData.courseOneTitle}
    courseOneDescription={formData.courseOneDescription}
    courseTwoTitle={formData.courseTwoTitle}
    courseTwoDescription={formData.courseTwoDescription}
  />
</div>
{/* Right Side Settings */}

<div
  className="
    rounded-[28px]
    border
    border-slate-800
    bg-slate-900/70
    p-7
    backdrop-blur-xl
  "
>
  <div className="mb-7">
    <h2 className="text-2xl font-bold text-white">
      Hero Settings
    </h2>

    <p className="mt-2 text-sm text-slate-400">
      Configure the right-side content and hero display options.
    </p>
  </div>

  <div className="space-y-6">

    {/* Right Title */}

    <div>
      <label className="mb-3 block text-sm font-semibold uppercase tracking-wider text-slate-300">
        Right Card Title
      </label>

      <input
        type="text"
        name="rightTitle"
        value={formData.rightTitle}
        onChange={handleChange}
        placeholder="Our Courses"
        className="
          w-full
          rounded-2xl
          border
          border-slate-700
          bg-slate-950
          px-5
          py-4
          text-white
          placeholder:text-slate-500
          outline-none
          transition-all
          focus:border-cyan-500
          focus:ring-4
          focus:ring-cyan-500/20
        "
      />
    </div>

    {/* Course One */}

    <div>
      <label className="mb-3 block text-sm font-semibold uppercase tracking-wider text-slate-300">
        Course One Title
      </label>

      <input
        type="text"
        name="courseOneTitle"
        value={formData.courseOneTitle}
        onChange={handleChange}
        placeholder="MBBS Program"
        className="
          w-full
          rounded-2xl
          border
          border-slate-700
          bg-slate-950
          px-5
          py-4
          text-white
          placeholder:text-slate-500
          outline-none
          transition-all
          focus:border-cyan-500
          focus:ring-4
          focus:ring-cyan-500/20
        "
      />
    </div>

    <div>
      <label className="mb-3 block text-sm font-semibold uppercase tracking-wider text-slate-300">
        Course One Description
      </label>

      <textarea
        rows={4}
        name="courseOneDescription"
        value={formData.courseOneDescription}
        onChange={handleChange}
        placeholder="Write course description..."
        className="
          w-full
          rounded-2xl
          border
          border-slate-700
          bg-slate-950
          px-5
          py-4
          text-white
          placeholder:text-slate-500
          outline-none
          transition-all
          resize-none
          focus:border-cyan-500
          focus:ring-4
          focus:ring-cyan-500/20
        "
      />
    </div>

    {/* Course Two */}

    <div>
      <label className="mb-3 block text-sm font-semibold uppercase tracking-wider text-slate-300">
        Course Two Title
      </label>

      <input
        type="text"
        name="courseTwoTitle"
        value={formData.courseTwoTitle}
        onChange={handleChange}
        placeholder="Nursing Program"
        className="
          w-full
          rounded-2xl
          border
          border-slate-700
          bg-slate-950
          px-5
          py-4
          text-white
          placeholder:text-slate-500
          outline-none
          transition-all
          focus:border-cyan-500
          focus:ring-4
          focus:ring-cyan-500/20
        "
      />
    </div>

    <div>
      <label className="mb-3 block text-sm font-semibold uppercase tracking-wider text-slate-300">
        Course Two Description
      </label>

      <textarea
        rows={4}
        name="courseTwoDescription"
        value={formData.courseTwoDescription}
        onChange={handleChange}
        placeholder="Write course description..."
        className="
          w-full
          rounded-2xl
          border
          border-slate-700
          bg-slate-950
          px-5
          py-4
          text-white
          placeholder:text-slate-500
          outline-none
          transition-all
          resize-none
          focus:border-cyan-500
          focus:ring-4
          focus:ring-cyan-500/20
        "
      />
    </div>

    {/* Grid */}

    <div className="grid gap-8 xl:grid-cols-[1fr_620px] items-start">

      <div>
        <label className="mb-3 block text-sm font-semibold uppercase tracking-wider text-slate-300">
          Slide Number
        </label>

        <input
          type="number"
          name="slideNumber"
          min={1}
          value={formData.slideNumber}
          onChange={handleChange}
          className="
            w-full
            rounded-2xl
            border
            border-slate-700
            bg-slate-950
            px-5
            py-4
            text-white
            outline-none
            transition-all
            focus:border-cyan-500
            focus:ring-4
            focus:ring-cyan-500/20
          "
        />
      </div>

      <div>
        <label className="mb-3 block text-sm font-semibold uppercase tracking-wider text-slate-300">
          Status
        </label>

        <select
          name="isActive"
          value={String(formData.isActive)}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              isActive: e.target.value === "true",
            }))
          }
          className="
            w-full
            rounded-2xl
            border
            border-slate-700
            bg-slate-950
            px-5
            py-4
            text-white
            outline-none
            transition-all
            focus:border-cyan-500
            focus:ring-4
            focus:ring-cyan-500/20
          "
        >
          <option value="true">
            Active
          </option>

          <option value="false">
            Inactive
          </option>
        </select>
      </div>

    </div>
  </div>
</div>
        {/* Action Buttons */}

       <div
  className="
    mt-auto

    flex
    justify-end

    gap-4

    border-t
    border-slate-800

    pt-8
  "
>

         <button
  type="button"
  onClick={() => router.back()}
  className="
    h-12
    w-full
    rounded-xl

    border
    border-slate-700

    bg-slate-900

    px-6

    text-sm
    font-semibold
    text-slate-300

    transition-all

    hover:border-cyan-500
    hover:text-cyan-300

    sm:w-auto
  "
>
  Cancel
</button>

         <button
  type="submit"
  disabled={loading}
  className="
    h-12
    w-full

    rounded-xl

    bg-gradient-to-r
    from-cyan-500
    to-blue-600

    px-6

    text-sm
    font-semibold
    text-white

    transition-all

    hover:scale-105

    disabled:opacity-60

    sm:w-auto
  "
>
  {loading
    ? "Saving..."
    : initialData?._id
    ? "Update Hero"
    : "Create Hero"}
</button>
        </div>

      </div>
    </div>

  </div>

</form>
);
}