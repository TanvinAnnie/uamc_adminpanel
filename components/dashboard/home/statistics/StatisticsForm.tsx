"use client";

import {
  ChangeEvent,
  FormEvent,
  useState,
} from "react";

import {
  Loader2,
  Save,
  Upload,
  X,
} from "lucide-react";

import {
  toast,
} from "sonner";

import type {
  StatisticsData,
} from "./StatisticsTableRow";

// =========================================================
// PROPS
// =========================================================

interface StatisticsFormProps {
  initialData?: StatisticsData | null;

  onSuccess?: (
    data: StatisticsData
  ) => void;

  onDataChange?: (
    data: StatisticsFormData
  ) => void;
}

// =========================================================
// FORM DATA TYPE
// =========================================================

export interface StatisticsFormData {
  backgroundImage: string;

  statisticOneValue: string;
  statisticOneTitle: string;

  statisticTwoValue: string;
  statisticTwoTitle: string;

  statisticThreeValue: string;
  statisticThreeTitle: string;

  isActive: boolean;
}

// =========================================================
// API RESPONSE TYPE
// =========================================================

interface StatisticsApiResponse {
  success?: boolean;

  message?: string;

  data?: StatisticsData;

  url?: string;
}

// =========================================================
// DEFAULT DATA
// =========================================================

const defaultFormData: StatisticsFormData = {
  backgroundImage: "",

  statisticOneValue: "",
  statisticOneTitle: "",

  statisticTwoValue: "",
  statisticTwoTitle: "",

  statisticThreeValue: "",
  statisticThreeTitle: "",

  isActive: true,
};

// =========================================================
// COMPONENT
// =========================================================

export default function StatisticsForm({
  initialData = null,

  onSuccess,

  onDataChange,
}: StatisticsFormProps) {
  // =======================================================
  // FORM STATE
  // =======================================================

  const [
    formData,
    setFormData,
  ] =
    useState<StatisticsFormData>(
      initialData
        ? {
            backgroundImage:
              initialData.backgroundImage ||
              "",

            statisticOneValue:
              initialData.statisticOneValue ||
              "",

            statisticOneTitle:
              initialData.statisticOneTitle ||
              "",

            statisticTwoValue:
              initialData.statisticTwoValue ||
              "",

            statisticTwoTitle:
              initialData.statisticTwoTitle ||
              "",

            statisticThreeValue:
              initialData.statisticThreeValue ||
              "",

            statisticThreeTitle:
              initialData.statisticThreeTitle ||
              "",

            isActive:
              initialData.isActive ??
              true,
          }
        : defaultFormData
    );

  // =======================================================
  // SAVING
  // =======================================================

  const [
    saving,
    setSaving,
  ] = useState(false);

  // =======================================================
  // UPLOADING
  // =======================================================

  const [
    uploading,
    setUploading,
  ] = useState(false);

  // =======================================================
  // INPUT CHANGE
  // =======================================================

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const {
      name,
      value,
    } = event.target;

    const field =
      name as keyof StatisticsFormData;

    const updatedData = {
      ...formData,

      [field]: value,
    } as StatisticsFormData;

    setFormData(
      updatedData
    );

    onDataChange?.(
      updatedData
    );
  };

  // =======================================================
  // IMAGE UPLOAD
  // =======================================================

  const handleImageUpload = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    // =====================================================
    // FILE TYPE
    // =====================================================

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      toast.error(
        "Please select a valid image file."
      );

      event.target.value = "";

      return;
    }

    // =====================================================
    // FILE SIZE
    // =====================================================

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      toast.error(
        "Image size must be less than 5MB."
      );

      event.target.value = "";

      return;
    }

    try {
      setUploading(true);

      // ===================================================
      // FORM DATA
      // ===================================================

      const formDataUpload =
        new FormData();

      formDataUpload.append(
        "file",
        file
      );

      formDataUpload.append(
        "type",
        "image"
      );

      // ===================================================
      // UPLOAD REQUEST
      // ===================================================

      const response =
        await fetch(
          "/api/upload",
          {
            method: "POST",

            body:
              formDataUpload,
          }
        );

      // ===================================================
      // READ RESPONSE AS TEXT FIRST
      // ===================================================

      const responseText =
        await response.text();

      let result:
        | StatisticsApiResponse
        | null = null;

      try {
        result =
          responseText
            ? JSON.parse(
                responseText
              )
            : null;
      } catch (parseError) {
        console.error(
          "IMAGE UPLOAD INVALID JSON:",
          parseError
        );

        console.error(
          "IMAGE UPLOAD RAW RESPONSE:",
          responseText
        );

        throw new Error(
          `Upload API returned an invalid response. HTTP ${response.status}.`
        );
      }

      // ===================================================
      // API ERROR
      // ===================================================

      if (
        !response.ok ||
        !result?.success
      ) {
        throw new Error(
          result?.message ||
            `Image upload failed. HTTP ${response.status}.`
        );
      }

      // ===================================================
      // GET IMAGE URL
      // ===================================================

      const uploadedUrl =
        result.url ||
        (
          result.data as
            | unknown as
              {
                url?: string;
              }
            | undefined
        )?.url;

      // ===================================================
      // URL VALIDATION
      // ===================================================

      if (
        !uploadedUrl ||
        typeof uploadedUrl !==
          "string"
      ) {
        console.error(
          "IMAGE UPLOAD RESPONSE:",
          result
        );

        throw new Error(
          "Image URL was not returned by the upload API."
        );
      }

      // ===================================================
      // UPDATE FORM
      // ===================================================

      const updatedData = {
        ...formData,

        backgroundImage:
          uploadedUrl,
      } as StatisticsFormData;

      setFormData(
        updatedData
      );

      onDataChange?.(
        updatedData
      );

      toast.success(
        "Background image uploaded successfully."
      );
    } catch (error) {
      console.error(
        "IMAGE UPLOAD ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Image upload failed."
      );
    } finally {
      setUploading(false);

      event.target.value = "";
    }
  };

  // =======================================================
  // REMOVE IMAGE
  // =======================================================

  const removeImage = () => {
    const updatedData = {
      ...formData,

      backgroundImage: "",
    };

    setFormData(
      updatedData
    );

    onDataChange?.(
      updatedData
    );
  };

  // =======================================================
  // SUBMIT FORM
  // =======================================================

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    // =====================================================
    // VALIDATION
    // =====================================================

    if (
      !formData.backgroundImage
    ) {
      toast.error(
        "Please upload a background image."
      );

      return;
    }

    if (
      !formData.statisticOneValue.trim() ||
      !formData.statisticOneTitle.trim() ||
      !formData.statisticTwoValue.trim() ||
      !formData.statisticTwoTitle.trim() ||
      !formData.statisticThreeValue.trim() ||
      !formData.statisticThreeTitle.trim()
    ) {
      toast.error(
        "Please fill all statistics fields."
      );

      return;
    }

    try {
      setSaving(true);

      // ===================================================
      // DETERMINE CREATE / UPDATE
      // ===================================================

      const isEdit =
        Boolean(
          initialData?._id
        );

      // ===================================================
      // PAYLOAD
      // ===================================================

      const payload = {
        backgroundImage:
          formData.backgroundImage,

        statisticOneValue:
          formData.statisticOneValue.trim(),

        statisticOneTitle:
          formData.statisticOneTitle.trim(),

        statisticTwoValue:
          formData.statisticTwoValue.trim(),

        statisticTwoTitle:
          formData.statisticTwoTitle.trim(),

        statisticThreeValue:
          formData.statisticThreeValue.trim(),

        statisticThreeTitle:
          formData.statisticThreeTitle.trim(),

        isActive:
          formData.isActive,
      };

      // ===================================================
      // IMPORTANT
      //
      // Statistics is a SINGLE DOCUMENT.
      //
      // UPDATE:
      // PUT /api/statistics
      //
      // CREATE:
      // POST /api/statistics
      // ===================================================

      const response =
        await fetch(
          "/api/statistics",
          {
            method: isEdit
              ? "PUT"
              : "POST",

            headers: {
              "Content-Type":
                "application/json",

              Accept:
                "application/json",
            },

            body:
              JSON.stringify(
                payload
              ),
          }
        );

      // ===================================================
      // READ RESPONSE SAFELY
      // ===================================================

      const responseText =
        await response.text();

      let result:
        | StatisticsApiResponse
        | null = null;

      try {
        result =
          responseText
            ? JSON.parse(
                responseText
              )
            : null;
      } catch (parseError) {
        console.error(
          "STATISTICS API INVALID JSON:",
          parseError
        );

        console.error(
          "STATISTICS API RAW RESPONSE:",
          responseText
        );

        throw new Error(
          `Statistics API returned an invalid response. HTTP ${response.status}.`
        );
      }

      // ===================================================
      // API ERROR
      // ===================================================

      if (
        !response.ok ||
        !result?.success
      ) {
        throw new Error(
          result?.message ||
            `Failed to ${
              isEdit
                ? "update"
                : "create"
            } statistics. HTTP ${response.status}.`
        );
      }

      // ===================================================
      // SUCCESS DATA CHECK
      // ===================================================

      if (!result.data) {
        throw new Error(
          "Statistics API did not return updated data."
        );
      }

      // ===================================================
      // UPDATE LOCAL FORM
      // ===================================================

      const updatedStatistics =
        result.data;

      const updatedFormData: StatisticsFormData =
        {
          backgroundImage:
            updatedStatistics.backgroundImage ||
            "",

          statisticOneValue:
            updatedStatistics.statisticOneValue ||
            "",

          statisticOneTitle:
            updatedStatistics.statisticOneTitle ||
            "",

          statisticTwoValue:
            updatedStatistics.statisticTwoValue ||
            "",

          statisticTwoTitle:
            updatedStatistics.statisticTwoTitle ||
            "",

          statisticThreeValue:
            updatedStatistics.statisticThreeValue ||
            "",

          statisticThreeTitle:
            updatedStatistics.statisticThreeTitle ||
            "",

          isActive:
            updatedStatistics.isActive ??
            true,
        };

      setFormData(
        updatedFormData
      );

      onDataChange?.(
        updatedFormData
      );

      // ===================================================
      // SUCCESS TOAST
      // ===================================================

      toast.success(
        isEdit
          ? "Statistics updated successfully."
          : "Statistics created successfully."
      );

      // ===================================================
      // SUCCESS CALLBACK
      // ===================================================

      onSuccess?.(
        updatedStatistics
      );
    } catch (error) {
      console.error(
        "SAVE STATISTICS ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to save statistics."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <form
      onSubmit={
        handleSubmit
      }
      className="
        space-y-6
        rounded-3xl
        border
        border-white/10
        bg-slate-900/70
        p-5
        shadow-xl
        backdrop-blur-xl
        sm:p-6
      "
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          border-b
          border-white/10
          pb-5
        "
      >
        <h2
          className="
            text-xl
            font-bold
            text-white
            sm:text-2xl
          "
        >
          {initialData
            ? "Edit Statistics"
            : "Create Statistics"}
        </h2>

        <p
          className="
            mt-2
            text-sm
            text-slate-400
          "
        >
          Manage homepage statistics
          section.
        </p>
      </div>

      {/* =====================================================
          BACKGROUND IMAGE
      ===================================================== */}

      <div
        className="
          rounded-2xl
          border
          border-white/10
          bg-white/5
          p-5
        "
      >
        <h3
          className="
            text-sm
            font-semibold
            text-white
          "
        >
          Background Image
        </h3>

        <p
          className="
            mt-1
            text-xs
            text-slate-400
          "
        >
          Upload statistics
          background image.
        </p>

        <label
          className="
            mt-5
            flex
            min-h-[220px]
            cursor-pointer
            items-center
            justify-center
            overflow-hidden
            rounded-2xl
            border-2
            border-dashed
            border-white/20
            bg-slate-950/40
            transition
            hover:border-emerald-400
          "
        >
          {formData.backgroundImage ? (
            <div
              className="
                relative
                h-full
                w-full
              "
            >
              <img
                src={
                  formData.backgroundImage
                }
                alt="Statistics background"
                className="
                  h-[220px]
                  w-full
                  object-cover
                "
              />

              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault();

                  event.stopPropagation();

                  removeImage();
                }}
                disabled={
                  uploading ||
                  saving
                }
                className="
                  absolute
                  right-3
                  top-3
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-red-500
                  text-white
                  transition
                  hover:bg-red-600
                  disabled:opacity-50
                "
              >
                <X
                  size={18}
                />
              </button>
            </div>
          ) : (
            <div
              className="
                flex
                flex-col
                items-center
                text-center
              "
            >
              {uploading ? (
                <Loader2
                  size={36}
                  className="
                    animate-spin
                    text-emerald-400
                  "
                />
              ) : (
                <Upload
                  size={36}
                  className="
                    text-slate-400
                  "
                />
              )}

              <span
                className="
                  mt-4
                  text-sm
                  font-semibold
                  text-slate-300
                "
              >
                {uploading
                  ? "Uploading..."
                  : "Upload Background Image"}
              </span>

              <span
                className="
                  mt-1
                  text-xs
                  text-slate-500
                "
              >
                PNG JPG WEBP • Max 5MB
              </span>
            </div>
          )}

          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            hidden
            disabled={
              uploading ||
              saving
            }
            onChange={
              handleImageUpload
            }
          />
        </label>
      </div>

      {/* =====================================================
          STATISTICS CARDS
      ===================================================== */}

      <div
        className="
          grid
          gap-5
          lg:grid-cols-3
        "
      >
        {[
          {
            value:
              "statisticOneValue",
            title:
              "statisticOneTitle",
            label:
              "Statistics One",
          },

          {
            value:
              "statisticTwoValue",
            title:
              "statisticTwoTitle",
            label:
              "Statistics Two",
          },

          {
            value:
              "statisticThreeValue",
            title:
              "statisticThreeTitle",
            label:
              "Statistics Three",
          },
        ].map(
          (item) => (
            <div
              key={
                item.value
              }
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-5
              "
            >
              <h3
                className="
                  mb-4
                  text-sm
                  font-bold
                  text-emerald-400
                "
              >
                {item.label}
              </h3>

              {/* VALUE */}

              <input
                name={
                  item.value
                }
                value={
                  formData[
                    item.value as keyof StatisticsFormData
                  ] as string
                }
                onChange={
                  handleChange
                }
                placeholder="Number"
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-slate-950
                  px-4
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-slate-500
                  focus:border-emerald-400
                "
              />

              {/* TITLE */}

              <input
                name={
                  item.title
                }
                value={
                  formData[
                    item.title as keyof StatisticsFormData
                  ] as string
                }
                onChange={
                  handleChange
                }
                placeholder="Title"
                className="
                  mt-3
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-slate-950
                  px-4
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-slate-500
                  focus:border-emerald-400
                "
              />
            </div>
          )
        )}
      </div>

      {/* =====================================================
          ACTIVE STATUS
      ===================================================== */}

      <label
        className="
          flex
          items-center
          justify-between
          rounded-2xl
          border
          border-white/10
          bg-white/5
          p-5
        "
      >
        <div>
          <h3
            className="
              text-sm
              font-semibold
              text-white
            "
          >
            Publish Statistics
          </h3>

          <p
            className="
              mt-1
              text-xs
              text-slate-400
            "
          >
            Show this section on
            homepage.
          </p>
        </div>

        <input
          type="checkbox"
          checked={
            formData.isActive
          }
          onChange={(event) => {
            const updatedData = {
              ...formData,

              isActive:
                event.target.checked,
            };

            setFormData(
              updatedData
            );

            onDataChange?.(
              updatedData
            );
          }}
          className="
            h-5
            w-5
            accent-emerald-500
          "
        />
      </label>

      {/* =====================================================
          SAVE BUTTON
      ===================================================== */}

      <button
        type="submit"
        disabled={
          saving ||
          uploading
        }
        className="
          inline-flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-gradient-to-r
          from-emerald-500
          to-cyan-500
          px-6
          py-3
          text-sm
          font-bold
          text-white
          transition
          hover:scale-[1.01]
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {saving ? (
          <Loader2
            size={18}
            className="
              animate-spin
            "
          />
        ) : (
          <Save
            size={18}
          />
        )}

        {saving
          ? "Saving..."
          : initialData
          ? "Update Statistics"
          : "Create Statistics"}
      </button>
    </form>
  );
}