import React, { useRef, useState, useEffect } from "react";
import { CheckIcon, PencilIcon, TrashIcon, CheckCircleIcon } from "./Icons";

const ListItem = ({ item, projectName, showBadge, onToggle, onDelete, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(item.title);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, [editing]);

  const commit = () => {
    setEditing(false);
    if (value.trim() && value.trim() !== item.title) {
      onEdit(item.id, value.trim());
    } else {
      setValue(item.title);
    }
  };

  if (editing) {
    return (
      <li className="bg-[#232b2d] border border-[#75da8b]/60 rounded-xl px-4 py-2.5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            commit();
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={commit}
            className="w-full bg-transparent text-white py-1.5 focus:outline-none"
          />
        </form>
      </li>
    );
  }

  return (
    <li className="group flex items-center gap-3 bg-[#232b2d] border border-white/10 hover:border-[#75da8b]/40 rounded-xl px-4 py-3 transition">
      <button
        onClick={() => onToggle(item.id)}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition ${
          item.isComplete
            ? "bg-[#75da8b] border-[#75da8b] text-[#06252e]"
            : "border-[#75da8b] text-transparent hover:bg-[#75da8b]/10"
        }`}
        title={item.isComplete ? "Mark as pending" : "Mark as done"}
      >
        <CheckIcon className="w-3.5 h-3.5" />
      </button>

      <span
        className={`flex-1 min-w-0 truncate ${
          item.isComplete ? "line-through text-white/40" : "text-white/90"
        }`}
      >
        {item.title}
      </span>

      {showBadge && projectName && (
        <span className="hidden sm:inline-flex text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#064c5f] text-[#75da8b] shrink-0">
          {projectName}
        </span>
      )}

      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={() => {
            setValue(item.title);
            setEditing(true);
          }}
          className="p-2 rounded-lg text-white/40 hover:text-[#75da8b] hover:bg-white/5 transition"
          title="Edit"
        >
          <PencilIcon className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-white/5 transition"
          title="Delete"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </li>
  );
};

const TodoLists = ({ items, projects, showBadge, onToggle, onDelete, onEdit }) => {
  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
        <span className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#75da8b]">
          <CheckCircleIcon className="w-8 h-8" />
        </span>
        <p className="text-white/60 font-medium">Nothing here yet</p>
        <p className="text-white/40 text-sm max-w-xs">
          Add a task above, or switch to a different project or filter to see
          more.
        </p>
      </div>
    );
  }

  const projectName = (id) => {
    const project = projects.find((p) => p.id === id);
    return project ? project.name : null;
  };

  return (
    <ol className="space-y-2.5">
      {items.map((item) => (
        <ListItem
          key={item.id}
          item={item}
          projectName={projectName(item.projectId)}
          showBadge={showBadge}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ol>
  );
};

export default TodoLists;
