import React from "react";
import { SearchIcon, MenuIcon } from "./Icons";

const Header = ({ title, subtitle, search, setSearch, onToggleSidebar }) => {
  return (
    <header className="sticky top-0 z-30 h-16 bg-[#2c3335]/95 backdrop-blur-md border-b border-white/10 flex items-center justify-between gap-3 px-4 sm:px-6">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden w-10 h-10 shrink-0 -ml-1.5 flex items-center justify-center rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition"
          title="Menu"
          aria-label="Open menu"
        >
          <MenuIcon className="w-5 h-5" />
        </button>
        <div className="min-w-0">
          <h1 className="text-xl font-bold leading-tight truncate">{title}</h1>
          {subtitle && (
            <p className="hidden sm:block text-xs text-white/50 truncate">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="relative w-full max-w-[130px] sm:max-w-xs flex-1 sm:flex-none min-w-0">
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
