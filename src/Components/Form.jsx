import React, { useState } from "react";
import Swal from "sweetalert2";
import { PlusIcon, FolderIcon } from "./Icons";

const Form = ({ onAddTodo, projects, defaultProjectId }) => {
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState(defaultProjectId || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      Swal.fire({
        icon: "error",
        title: "Empty task",
        text: "Please write something first.",
        confirmButtonColor: "#75da8b",
        background: "#2F363F",
        color: "#fff",
      });
      return;
    }
    onAddTodo(title.trim(), projectId);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 px-4 py-3 rounded-xl bg-[#232b2d] border border-white/10 placeholder:text-white/40 text-white focus:outline-none focus:ring-2 focus:ring-[#75da8b]/60 transition"
      />

      <div className="flex items-center gap-3">
        <div className="relative">
          <FolderIcon className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            className="appearance-none pl-9 pr-8 py-3 rounded-xl bg-[#232b2d] border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#75da8b]/60 transition cursor-pointer"
          >
            {projects.map((project) => (
              <option key={project.id} value={project.id} className="bg-[#232b2d]">
                {project.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-12 h-12 rounded-xl bg-[#75da8b] text-[#06252e] flex items-center justify-center hover:bg-[#8be4a0] transition shrink-0"
          title="Add task"
        >
          <PlusIcon className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export default Form;
