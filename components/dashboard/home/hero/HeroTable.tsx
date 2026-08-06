"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Search,
  LayoutGrid,
  Layers3,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

import HeroLoading from "./HeroLoading";
import HeroEmpty from "./HeroEmpty";
import HeroTableRow from "./HeroTableRow";

interface Hero {
  _id: string;
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
  createdAt: string;
}

export default function HeroTable() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const getHeroes = useCallback(async () => {
  try {
    setLoading(true);

    const res = await fetch("/api/hero", {
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    setHeroes(data);
  } catch (error) {
    console.error(error);
    toast.error("Failed to load hero.");
  } finally {
    setLoading(false);
  }
}, []);

  useEffect(() => {
  async function loadHeroes() {
    try {
      setLoading(true);

      const res = await fetch("/api/hero", {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setHeroes(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load hero.");
    } finally {
      setLoading(false);
    }
  }

  loadHeroes();
}, []);

  const filteredHeroes = useMemo(() => {
    return heroes.filter((hero) =>
      hero.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [heroes, search]);

  const handleDelete = async (id: string) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this Hero?"
      );

      if (!confirmDelete) return;

      const res = await fetch(`/api/hero/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      toast.success(result.message);

      getHeroes();
    } catch (error) {
      console.error(error);
      toast.error("Delete failed.");
    }
  };

  if (loading) {
    return <HeroLoading />;
  }

  if (filteredHeroes.length === 0) {
    return <HeroEmpty />;
  }

  return (

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

      p-6
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
      {/* Left */}

      <div>
        <h2 className="text-3xl font-bold text-white">
          Hero Slides
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Manage homepage hero banners and
          promotional slides.
        </p>
      </div>

      {/* Search */}

      <div className="relative w-full lg:max-w-md">

        <Search
          size={18}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-500
          "
        />

        <input
          type="text"
          placeholder="Search hero..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            h-12
            w-full

            rounded-2xl

            border
            border-slate-700

            bg-slate-900

            pl-11
            pr-4

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

    {/* Statistics */}

    <div
      className="
        mt-8

        grid
        grid-cols-2

        gap-5

        xl:grid-cols-4
      "
    >

      {/* Total */}

      <div
        className="
          rounded-3xl

          border
          border-slate-800

          bg-slate-900

          p-5
        "
      >
        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-slate-400">
              Total Slides
            </p>

            <h3 className="mt-3 text-3xl font-bold text-white">
              {heroes.length}
            </h3>

          </div>

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center

              rounded-2xl

              bg-cyan-500/10

              text-cyan-400
            "
          >
            <LayoutGrid size={22} />
          </div>

        </div>
      </div>

      {/* Active */}

      <div
        className="
          rounded-3xl

          border
          border-slate-800

          bg-slate-900

          p-5
        "
      >
        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-slate-400">
              Active
            </p>

            <h3 className="mt-3 text-3xl font-bold text-emerald-400">
              {
                heroes.filter(
                  (hero) => hero.isActive
                ).length
              }
            </h3>

          </div>

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center

              rounded-2xl

              bg-emerald-500/10

              text-emerald-400
            "
          >
            <CheckCircle2 size={22} />
          </div>

        </div>
      </div>

      {/* Inactive */}

      <div
        className="
          rounded-3xl

          border
          border-slate-800

          bg-slate-900

          p-5
        "
      >
        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-slate-400">
              Inactive
            </p>

            <h3 className="mt-3 text-3xl font-bold text-red-400">
              {
                heroes.filter(
                  (hero) => !hero.isActive
                ).length
              }
            </h3>

          </div>

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center

              rounded-2xl

              bg-red-500/10

              text-red-400
            "
          >
            <XCircle size={22} />
          </div>

        </div>
      </div>

      {/* Showing */}

      <div
        className="
          rounded-3xl

          border
          border-slate-800

          bg-slate-900

          p-5
        "
      >
        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-slate-400">
              Showing
            </p>

            <h3 className="mt-3 text-3xl font-bold text-cyan-400">
              {filteredHeroes.length}
            </h3>

          </div>

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center

              rounded-2xl

              bg-cyan-500/10

              text-cyan-400
            "
          >
            <Layers3 size={22} />
          </div>

        </div>
      </div>

    </div>
  </div>
  {/* Desktop Table */}

<div className="hidden overflow-x-auto xl:block">
  <table className="w-full">
    <thead
      className="
        border-y
        border-slate-800
        bg-slate-900/80
      "
    >
      <tr>
        <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
          Hero
        </th>

        <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
          Title
        </th>

        <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
          Status
        </th>

        <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
          Created
        </th>

        <th className="px-6 py-5 text-center text-xs font-semibold uppercase tracking-wider text-slate-400">
          Actions
        </th>
      </tr>
    </thead>

    <tbody>
      {filteredHeroes.map((hero) => (
        <HeroTableRow
          key={hero._id}
          hero={hero}
          onDelete={handleDelete}
        />
      ))}
    </tbody>
  </table>
</div>
{/* Mobile */}

<div className="space-y-5 p-5 xl:hidden">
  {filteredHeroes.map((hero) => (
    <div
      key={hero._id}
      className="
        overflow-hidden

        rounded-3xl

        border
        border-slate-800

        bg-slate-900

        shadow-lg
      "
    >
      <div className="relative h-52">
        <img
          src={hero.backgroundImage}
          alt={hero.title}
          className="h-full w-full object-cover"
        />

        <div className="absolute left-4 top-4 rounded-full bg-cyan-500 px-3 py-1 text-xs font-semibold text-white">
          Slide #{hero.slideNumber}
        </div>
      </div>

      <div className="space-y-4 p-5">

        <div>
          <h3 className="text-lg font-bold text-white">
            {hero.title}
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            {hero.tagline}
          </p>
        </div>

        <div className="flex items-center justify-between">

          {hero.isActive ? (
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
              Active
            </span>
          ) : (
            <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
              Inactive
            </span>
          )}

          <span className="text-sm text-slate-500">
            {new Date(hero.createdAt).toLocaleDateString()}
          </span>

        </div>

        <div className="flex gap-3">

          <button
            onClick={() =>
              location.href = `/dashboard/home/hero/edit/${hero._id}`
            }
            className="
              flex-1

              rounded-xl

              bg-cyan-500

              py-3

              text-sm
              font-semibold
              text-white

              transition

              hover:bg-cyan-600
            "
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(hero._id)}
            className="
              flex-1

              rounded-xl

              bg-red-500

              py-3

              text-sm
              font-semibold
              text-white

              transition

              hover:bg-red-600
            "
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  ))}
</div>
</div>
);
}