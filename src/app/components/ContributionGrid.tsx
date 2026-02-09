"use client";

import { useEffect, useState, useMemo } from "react";

const MONTHS_ES = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
];

/* Glass-themed contribution levels */
const LEVEL_BG = [
  "bg-white/[0.06]",
  "bg-emerald-500/25",
  "bg-emerald-500/45",
  "bg-emerald-400/65",
  "bg-emerald-400",
];
const FUTURE_BG = "bg-white/[0.03]";

function toDateStr(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

interface ApiDay {
  date: string;
  count: number;
  level: number;
}

export default function ContributionGrid() {
  const [contribs, setContribs] = useState<Map<string, ApiDay>>(new Map());
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch("https://github-contributions-api.jogruber.de/v4/Z1Code?y=2026")
      .then((r) => r.json())
      .then((json) => {
        const map = new Map<string, ApiDay>();
        if (json.contributions) {
          for (const c of json.contributions) map.set(c.date, c);
        }
        setContribs(map);
        setTotal(json.total?.["2026"] ?? 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const today = useMemo(() => toDateStr(new Date()), []);

  const { weeks, monthLabels } = useMemo(() => {
    const yearStart = new Date(2026, 0, 1);
    const yearEnd = new Date(2026, 11, 31);

    /* Align grid to the Sunday on or before Jan 1 */
    const gridStart = new Date(yearStart);
    gridStart.setDate(gridStart.getDate() - gridStart.getDay());

    const weeks: ({ date: string; isPast: boolean } | null)[][] = [];
    const monthLabels: { label: string; col: number }[] = [];
    let prevMonth = -1;
    const cursor = new Date(gridStart);

    while (true) {
      const week: ({ date: string; isPast: boolean } | null)[] = [];
      let hasDay = false;

      for (let d = 0; d < 7; d++) {
        const day = new Date(cursor);
        day.setDate(day.getDate() + d);
        if (day.getFullYear() === 2026) {
          const ds = toDateStr(day);
          week.push({ date: ds, isPast: ds <= today });
          hasDay = true;
        } else {
          week.push(null);
        }
      }

      if (!hasDay) break;

      /* Track month labels */
      const first = week.find((d) => d !== null);
      if (first) {
        const m = parseInt(first.date.split("-")[1], 10) - 1;
        if (m !== prevMonth) {
          monthLabels.push({ label: MONTHS_ES[m], col: weeks.length });
          prevMonth = m;
        }
      }

      weeks.push(week);
      cursor.setDate(cursor.getDate() + 7);
    }

    return { weeks, monthLabels };
  }, [today]);

  /* ── Loading skeleton ── */
  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-emerald-400" />
      </div>
    );
  }

  /* cell = 10px, gap = 2px → step = 12px */
  const step = 12;
  const labelW = 30;

  return (
    <div>
      {/* Total */}
      <div className="mb-3 text-[12px] text-white/40">
        <span className="font-semibold text-emerald-400/90">
          {total.toLocaleString()}
        </span>{" "}
        contribuciones en 2026
      </div>

      {/* Scrollable grid */}
      <div className="overflow-x-auto">
        <div className="inline-block" style={{ paddingLeft: labelW }}>
          {/* Month labels */}
          <div className="relative mb-1 h-4">
            {monthLabels.map((m, i) => (
              <span
                key={i}
                className="absolute text-[10px] font-medium text-white/35"
                style={{ left: m.col * step }}
              >
                {m.label}
              </span>
            ))}
          </div>

          {/* Grid body */}
          <div className="relative">
            {/* Day labels (Lun, Mié, Vie) */}
            {[1, 3, 5].map((row) => (
              <span
                key={row}
                className="absolute text-[9px] leading-none text-white/25"
                style={{
                  left: -labelW,
                  top: row * step,
                  height: 10,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"][row]}
              </span>
            ))}

            {/* Week columns */}
            <div className="flex" style={{ gap: 2 }}>
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col" style={{ gap: 2 }}>
                  {week.map((cell, di) => {
                    if (!cell) {
                      return (
                        <div
                          key={di}
                          style={{ width: 10, height: 10 }}
                        />
                      );
                    }

                    const entry = contribs.get(cell.date);
                    const level = entry?.level ?? 0;
                    const count = entry?.count ?? 0;
                    const isToday = cell.date === today;

                    const bg = cell.isPast ? LEVEL_BG[level] : FUTURE_BG;

                    return (
                      <div
                        key={di}
                        className={`rounded-[2px] ${bg} ${
                          isToday ? "ring-1 ring-emerald-400/50" : ""
                        }`}
                        style={{ width: 10, height: 10 }}
                        title={
                          cell.isPast
                            ? `${cell.date}: ${count} contribuciones`
                            : cell.date
                        }
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] text-white/30">
        <span>Menos</span>
        {LEVEL_BG.map((bg, i) => (
          <div
            key={i}
            className={`rounded-[2px] ${bg}`}
            style={{ width: 10, height: 10 }}
          />
        ))}
        <span>Más</span>
      </div>
    </div>
  );
}
