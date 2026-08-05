import React, { useState } from "react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  LogoutIcon,
  InboxIcon,
  CalendarIcon,
  CheckCircleIcon,
  ListIcon,
  CheckIcon,
  CloseIcon,
} from "./Icons";

const isToday = (iso) => {
  const d = new Date(iso);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
};

const NavButton = ({ active, icon, label, count, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition ${
      active
        ? "bg-[#064c5f] text-[#75da8b]"
        : "text-white/60 hover:text-white hover:bg-white/5"
    }`}
  >
    {icon}
    <span className="flex-1 text-left">{label}</span>
    {count !== undefined && (
      <span
        className={`text-xs px-2 py-0.5 rounded-full ${
          active ? "bg-[#75da8b] text-[#06252e]" : "bg-white/10 text-white/50"
        }`}
      >
        {count}
      </span>
    )}
  </button>
);

const Sidebar = ({
  user,
  projects,
  todos,
  selectedProjectId,
  filter,
  open,
  onSelectView,
  onSelectProject,
  onAddProject,
  onRenameProject,
  onDeleteProject,
  onLogout,
}) => {
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const totalToday = todos.filter((t) => isToday(t.createdAt)).length;
  const totalCompleted = todos.filter((t) => t.isComplete).length;
  const initials = (user?.name || user?.email || "?")[0]?.toUpperCase() || "?";

  const submitAdd = (e) => {
    e.preventDefault();
    if (newName.trim()) onAddProject(newName.trim());
    setNewName("");
    setAdding(false);
  };

  const submitRename = (e, id) => {
    e.preventDefault();
    if (editingName.trim()) onRenameProject(id, editingName.trim());
    setEditingId(null);
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 h-full w-72 max-w-[85vw] shrink-0 bg-[#1e272e] border-r border-white/10 flex flex-col transition-transform duration-200 ${
        open ? "translate-x-0" : "-translate-x-full"
      } lg:static lg:translate-x-0`}
    >
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="w-11 h-11 rounded-full bg-[#064c5f] text-[#75da8b] font-bold text-lg flex items-center justify-center shrink-0">
            {initials}
          </span>
          <div className="min-w-0">
            <p className="font-semibold truncate capitalize">
              {user?.name || "My Account"}
            </p>
            <p className="text-xs text-white/50 truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-thin p-3 space-y-1">
        <div className="space-y-1 mb-4">
          <NavButton
            active={!selectedProjectId && filter === "all"}
            icon={<ListIcon className="w-5 h-5" />}
            label="All Tasks"
            count={todos.length}
            onClick={() => onSelectView("all")}
          />
          <NavButton
            active={!selectedProjectId && filter === "today"}
            icon={<CalendarIcon className="w-5 h-5" />}
            label="Today"
            count={totalToday}
            onClick={() => onSelectView("today")}
          />
          <NavButton
            active={!selectedProjectId && filter === "completed"}
            icon={<CheckCircleIcon className="w-5 h-5" />}
            label="Completed"
            count={totalCompleted}
            onClick={() => onSelectView("completed")}
          />
        </div>

        <div className="flex items-center justify-between px-3 mb-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
            Projects
          </p>
          <button
            onClick={() => {
              setAdding(true);
              setEditingId(null);
            }}
            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-[#064c5f] hover:text-[#75da8b] text-white/60 flex items-center justify-center transition"
            title="New project"
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>

        {adding && (
          <form onSubmit={submitAdd} className="px-3 pb-1">
            <div className="flex items-center gap-1.5 bg-white/5 border border-[#75da8b]/50 rounded-xl px-2 py-1">
              <input
                autoFocus
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Project name"
                className="flex-1 bg-transparent text-sm py-1 focus:outline-none placeholder:text-white/30"
                onKeyDown={(e) => e.key === "Escape" && setAdding(false)}
              />
              <button type="submit" className="text-[#75da8b]">
                <CheckIcon className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setAdding(false)}
                className="text-white/40 hover:text-white"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        <div className="space-y-0.5">
          {projects.map((project) => {
            const count = todos.filter((t) => t.projectId === project.id).length;
            const active = selectedProjectId === project.id;
            const isInbox = !!project.isInbox;

            if (editingId === project.id) {
              return (
                <form
                  key={project.id}
                  onSubmit={(e) => submitRename(e, project.id)}
                  className="px-1"
                >
                  <div className="flex items-center gap-1.5 bg-white/5 border border-[#75da8b]/50 rounded-xl px-2 py-1">
                    <input
                      autoFocus
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="flex-1 bg-transparent text-sm py-1 focus:outline-none"
                    />
                    <button type="submit" className="text-[#75da8b]">
                      <CheckIcon className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="text-white/40 hover:text-white"
                    >
                      <CloseIcon className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              );
            }

            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project.id)}
                className={`group w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium cursor-pointer transition ${
                  active
                    ? "bg-[#064c5f] text-[#75da8b]"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <InboxIcon className="w-5 h-5 shrink-0" />
                <span className="flex-1 text-left truncate">{project.name}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    active ? "bg-[#75da8b] text-[#06252e]" : "bg-white/10 text-white/50"
                  }`}
                >
                  {count}
                </span>
                <span className="hidden group-hover:flex items-center gap-1">
                  {!isInbox && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingId(project.id);
                          setEditingName(project.name);
                        }}
                        className="text-white/50 hover:text-white"
                        title="Rename"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteProject(project.id);
                        }}
                        className="text-white/50 hover:text-red-400"
                        title="Delete"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </nav>

      <div className="p-3 border-t border-white/10">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition"
        >
          <LogoutIcon className="w-5 h-5" />
          Log out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
