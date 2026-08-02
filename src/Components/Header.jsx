import React from "react";
import { SearchIcon } from "./Icons";

const Header = ({ title, subtitle, search, setSearch }) => {
  return (
    <header className="sticky top-0 z-40 h-16 bg-[#2c3335]/95 backdrop-blur-md border-b border-white/10 flex items-center justify-between gap-4 px-6">
      <div className="min-w-0">
        <h1 className="text-xl font-bold leading-tight truncate">{title}</h1>
        {subtitle && (
          <p className="text-xs text-white/50 truncate">{subtitle}</p>
        )}
      </div>

      <div className="relative w-full max-w-xs">
        <SearchIcon className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#75da8b]/60 transition"
        />
      </div>
    </header>
  );
};

export default Header;
