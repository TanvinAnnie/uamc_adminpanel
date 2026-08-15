"use client";

import {
  ArrowLeft,
  Loader2,
  BarChart3,
} from "lucide-react";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import { toast } from "sonner";

import StatisticsForm from "@/components/dashboard/home/statistics/StatisticsForm";

import StatisticsPreview from "@/components/dashboard/home/statistics/StatisticsPreview";

import type {
  StatisticsData,
} from "@/components/dashboard/home/statistics/StatisticsTableRow";

// =========================================================
// API RESPONSE TYPE
// =========================================================

interface StatisticsApiResponse {
  success?: boolean;
  message?: string;
  data?: StatisticsData;
}

// =========================================================
// SAFE JSON RESPONSE PARSER
// =========================================================

async function parseApiResponse(
  response: Response
): Promise<StatisticsApiResponse> {
  const text = await response.text();

  if (!text.trim()) {
    throw new Error(
      `API returned an empty response. Status: ${response.status}`
    );
  }

  try {
    return JSON.parse(text) as StatisticsApiResponse;
  } catch {
    console.error(
      "STATISTICS API INVALID RESPONSE:",
      text
    );

    throw new Error(
      `Statistics API returned an invalid response. Status: ${response.status}`
    );
  }
}

// =========================================================
// PAGE
// =========================================================

export default function EditStatisticsPage() {
  const router = useRouter();

  const params = useParams();

  // =======================================================
  // ID
  // =======================================================

  const id =
    typeof params?.id === "string"
      ? params.id
      : "";

  // =======================================================
  // STATE
  // =======================================================

  const [
    statistics,
    setStatistics,
  ] = useState<StatisticsData | null>(
    null
  );

  const [
    previewData,
    setPreviewData,
  ] = useState<StatisticsData | null>(
    null
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  // =======================================================
  // LOAD STATISTICS
  // =======================================================

  useEffect(() => {
    let cancelled = false;

    const loadStatistics =
      async () => {
        try {
          setLoading(true);

          // =================================================
          // GET SINGLE STATISTICS DOCUMENT
          // =================================================

          const response =
            await fetch(
              "/api/statistics",
              {
                method: "GET",
                cache: "no-store",
                headers: {
                  Accept:
                    "application/json",
                },
              }
            );

          // =================================================
          // SAFE RESPONSE PARSING
          // =================================================

          const data =
            await parseApiResponse(
              response
            );

          // =================================================
          // HTTP ERROR
          // =================================================

          if (!response.ok) {
            throw new Error(
              data.message ||
                `Failed to load statistics. HTTP ${response.status}`
            );
          }

          // =================================================
          // API ERROR
          // =================================================

          if (!data.success) {
            throw new Error(
              data.message ||
                "Failed to load statistics."
            );
          }

          // =================================================
          // NO DATA
          // =================================================

          if (!data.data) {
            throw new Error(
              "Statistics data was not returned by the API."
            );
          }

          // =================================================
          // UPDATE STATE
          // =================================================

          if (!cancelled) {
            setStatistics(
              data.data
            );

            setPreviewData(
              data.data
            );
          }
        } catch (error) {
          console.error(
            "LOAD STATISTICS ERROR:",
            error
          );

          if (!cancelled) {
            toast.error(
              error instanceof Error
                ? error.message
                : "Failed to load statistics."
            );
          }
        } finally {
          if (!cancelled) {
            setLoading(false);
          }
        }
      };

    loadStatistics();

    return () => {
      cancelled = true;
    };
  }, [id]);

  // =========================================================
  // PREVIEW CHANGE
  // =========================================================

  const handlePreviewChange =
    useCallback(
      (
        data: Partial<StatisticsData>
      ) => {
        setPreviewData(
          (previous) => {
            if (!previous) {
              return previous;
            }

            return {
              ...previous,
              ...data,
            };
          }
        );
      },
      []
    );

  // =========================================================
  // UPDATE SUCCESS
  // =========================================================

  const handleSuccess =
    useCallback(
      (
        updatedData: StatisticsData
      ) => {
        // ================================================
        // UPDATE LOCAL STATE FIRST
        // ================================================

        setStatistics(
          updatedData
        );

        setPreviewData(
          updatedData
        );

        // ================================================
        // SUCCESS MESSAGE
        // ================================================

        toast.success(
          "Statistics updated successfully."
        );

        // ================================================
        // GO BACK
        // ================================================

        router.push(
          "/dashboard/home/statistics"
        );

        router.refresh();
      },
      [router]
    );

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#030817]
        "
      >
        <Loader2
          size={35}
          className="
            animate-spin
            text-cyan-400
          "
        />
      </div>
    );
  }

  // =========================================================
  // NO DATA
  // =========================================================

  if (
    !statistics ||
    !previewData
  ) {
    return (
      <div
        className="
          flex
          min-h-screen
          flex-col
          items-center
          justify-center
          bg-[#030817]
          px-6
          text-center
        "
      >
        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            border
            border-red-400/20
            bg-red-400/10
            text-red-400
          "
        >
          <BarChart3
            size={30}
          />
        </div>

        <h2
          className="
            mt-5
            text-xl
            font-bold
            text-white
          "
        >
          Statistics Not Found
        </h2>

        <p
          className="
            mt-2
            max-w-md
            text-sm
            text-slate-400
          "
        >
          The Statistics section could
          not be loaded from the API.
        </p>

        <button
          type="button"
          onClick={() =>
            router.push(
              "/dashboard/home/statistics"
            )
          }
          className="
            mt-6
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-cyan-400
            px-5
            py-3
            text-sm
            font-semibold
            text-slate-950
            transition
            hover:bg-cyan-300
          "
        >
          <ArrowLeft
            size={17}
          />

          Back to Statistics
        </button>
      </div>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div
      className="
        min-h-screen
        bg-[#030817]
        p-4
        sm:p-6
        lg:p-8
      "
    >
      {/* =====================================================
          BACK BUTTON
      ===================================================== */}

      <button
        type="button"
        onClick={() =>
          router.push(
            "/dashboard/home/statistics"
          )
        }
        className="
          mb-6
          flex
          items-center
          gap-2
          text-sm
          font-medium
          text-slate-400
          transition
          hover:text-cyan-400
        "
      >
        <ArrowLeft
          size={17}
        />

        Back to Statistics
      </button>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          mb-6
          rounded-3xl
          border
          border-white/10
          bg-[#080d20]
          p-6
        "
      >
        <div
          className="
            flex
            items-center
            gap-4
          "
        >
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              bg-cyan-400/10
              text-cyan-400
            "
          >
            <BarChart3
              size={25}
            />
          </div>

          <div>
            <h1
              className="
                text-3xl
                font-bold
                text-white
              "
            >
              Edit Statistics
            </h1>

            <p
              className="
                mt-1
                text-sm
                text-slate-400
              "
            >
              Update the Statistics
              section of the website.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          FORM + PREVIEW
      ===================================================== */}

      <div
        className="
          grid
          gap-6
          xl:grid-cols-2
        "
      >
        {/* ===================================================
            FORM
        =================================================== */}

        <div
          className="
            rounded-3xl
            border
            border-white/10
            bg-[#080d20]
            p-6
          "
        >
          <StatisticsForm
            initialData={
              statistics
            }
            onDataChange={
              handlePreviewChange
            }
            onSuccess={
              handleSuccess
            }
          />
        </div>

        {/* ===================================================
            PREVIEW
        =================================================== */}

        <div
          className="
            h-fit
            rounded-3xl
            border
            border-white/10
            bg-[#080d20]
            p-6
            xl:sticky
            xl:top-6
          "
        >
          <StatisticsPreview
            data={previewData}
          />
        </div>
      </div>
    </div>
  );
}