export default function HeroLoading() {
  return (
    <div
      className="
        overflow-hidden

        rounded-3xl

        border
        border-slate-800

        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-slate-950

        shadow-[0_20px_60px_rgba(0,0,0,0.35)]
      "
    >
      {/* Header */}

      <div className="border-b border-slate-800 p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div className="space-y-3">
            <div className="h-7 w-52 animate-pulse rounded-xl bg-slate-800" />

            <div className="h-4 w-80 animate-pulse rounded bg-slate-800" />
          </div>

          <div className="h-12 w-full animate-pulse rounded-2xl bg-slate-800 lg:w-80" />
        </div>

        {/* Statistics */}

        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="
                rounded-2xl

                border
                border-slate-800

                bg-slate-900

                p-4
              "
            >
              <div className="h-3 w-20 animate-pulse rounded bg-slate-800" />

              <div className="mt-4 h-7 w-12 animate-pulse rounded bg-slate-800" />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop */}

      <div className="hidden lg:block">
        <table className="w-full">
          <thead className="border-b border-slate-800 bg-slate-950">
            <tr>
              {[
                "Image",
                "Title",
                "Slide",
                "Status",
                "Created",
                "Actions",
              ].map((item) => (
                <th
                  key={item}
                  className="
                    px-6
                    py-5

                    text-left

                    text-xs
                    font-semibold
                    uppercase
                    tracking-widest

                    text-slate-500
                  "
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {Array.from({ length: 6 }).map((_, index) => (
              <tr
                key={index}
                className="hover:bg-slate-900/60"
              >
                <td className="px-6 py-5">
                  <div className="h-16 w-28 animate-pulse rounded-2xl bg-slate-800" />
                </td>

                <td className="px-6 py-5">
                  <div className="space-y-3">
                    <div className="h-5 w-52 animate-pulse rounded bg-slate-800" />

                    <div className="h-3 w-32 animate-pulse rounded bg-slate-800" />
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div className="h-8 w-12 animate-pulse rounded-xl bg-slate-800" />
                </td>

                <td className="px-6 py-5">
                  <div className="h-8 w-24 animate-pulse rounded-full bg-slate-800" />
                </td>

                <td className="px-6 py-5">
                  <div className="h-5 w-28 animate-pulse rounded bg-slate-800" />
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-3">
                    <div className="h-11 w-11 animate-pulse rounded-xl bg-slate-800" />

                    <div className="h-11 w-11 animate-pulse rounded-xl bg-slate-800" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}

      <div className="space-y-5 p-5 lg:hidden">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="
              overflow-hidden

              rounded-3xl

              border
              border-slate-800

              bg-slate-900
            "
          >
            <div className="h-48 w-full animate-pulse bg-slate-800" />

            <div className="space-y-5 p-5">

              <div className="space-y-3">
                <div className="h-6 w-3/4 animate-pulse rounded bg-slate-800" />

                <div className="h-4 w-1/2 animate-pulse rounded bg-slate-800" />
              </div>

              <div className="grid grid-cols-2 gap-4">

                <div className="rounded-2xl bg-slate-800 p-4">
                  <div className="h-3 w-12 animate-pulse rounded bg-slate-700" />

                  <div className="mt-3 h-6 w-10 animate-pulse rounded bg-slate-700" />
                </div>

                <div className="rounded-2xl bg-slate-800 p-4">
                  <div className="h-3 w-14 animate-pulse rounded bg-slate-700" />

                  <div className="mt-3 h-6 w-20 animate-pulse rounded-full bg-slate-700" />
                </div>

              </div>

              <div className="space-y-3">
                <div className="h-4 w-20 animate-pulse rounded bg-slate-800" />

                <div className="h-5 w-36 animate-pulse rounded bg-slate-800" />
              </div>

              <div className="flex gap-3">
                <div className="h-11 flex-1 animate-pulse rounded-2xl bg-slate-800" />

                <div className="h-11 flex-1 animate-pulse rounded-2xl bg-slate-800" />
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}