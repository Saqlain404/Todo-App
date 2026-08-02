import React from "react";
import { CheckCircleIcon, ListIcon } from "./Icons";

const TodoHero = ({ completed, total, remaining }) => {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  const message =
    total === 0
      ? "Ready when you are — add your first task!"
      : pct === 100
      ? "Amazing! Everything is done."
      : pct >= 60
      ? "Great momentum, keep it up!"
      : "You've got this — one task at a time.";

  return (
    <section className="bg-[#232b2d] border border-white/10 rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl font-bold">
              Task Done <span className="text-[#75da8b]">✓</span>
            </h2>
          </div>
          <p className="text-white/50 mb-4">{message}</p>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-2.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#75da8b] transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-[#75da8b] min-w-10 text-right">
              {pct}%
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          <div className="text-center">
            <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#064c5f] text-[#75da8b] text-2xl font-bold">
              {completed}/{total}
            </span>
            <p className="text-xs text-white/50 mt-2 flex items-center justify-center gap-1">
              <CheckCircleIcon className="w-3.5 h-3.5" /> Completed
            </p>
          </div>
          <div className="text-center">
            <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 border border-white/10 text-white text-2xl font-bold">
              {remaining}
            </span>
            <p className="text-xs text-white/50 mt-2 flex items-center justify-center gap-1">
              <ListIcon className="w-3.5 h-3.5" /> Remaining
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TodoHero;
