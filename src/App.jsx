import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import "./App.css";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import TodoHero from "./Components/TodoHero";
import Form from "./Components/Form";
import TodoLists from "./Components/TodoLists";
import {
  getCurrentUser,
  getUsers,
  getProjects,
  saveProjects,
  getTodos,
  saveTodos,
  logout as clearSession,
  INBOX_PROJECT_ID,
} from "./utils/storage";

const isToday = (iso) => {
  const d = new Date(iso);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
};

const showToast = (title) => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title,
    showConfirmButton: false,
    timer: 1500,
    width: "300px",
    padding: "0.75rem",
    customClass: { popup: "minimal-swal-popup" },
  });
};

function App() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const allUsers = getUsers();
  const user = currentUser
    ? allUsers.find((u) => u.email === currentUser.email) || {
        email: currentUser.email,
        name: currentUser.email.split("@")[0],
      }
    : { email: "guest", name: "Guest" };

  const [todos, setTodos] = useState(() => getTodos(user.email));
  const [projects, setProjects] = useState(() => getProjects(user.email));
  const [selectedProjectId, setSelectedProjectId] = useState(INBOX_PROJECT_ID);
  const [filter, setFilter] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    saveTodos(user.email, todos);
  }, [todos, user.email]);

  useEffect(() => {
    saveProjects(user.email, projects);
  }, [projects, user.email]);

  const scopedTodos = useMemo(() => {
    let list = todos;
    if (selectedProjectId) {
      list = list.filter((t) => t.projectId === selectedProjectId);
    } else if (filter === "today") {
      list = list.filter((t) => isToday(t.createdAt));
    } else if (filter === "completed") {
      list = list.filter((t) => t.isComplete);
    }
    return list;
  }, [todos, selectedProjectId, filter]);

  const visibleTodos = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return scopedTodos;
    return scopedTodos.filter((t) => t.title.toLowerCase().includes(q));
  }, [scopedTodos, search]);

  const total = scopedTodos.length;
  const completed = scopedTodos.filter((t) => t.isComplete).length;
  const remaining = total - completed;

  const activeProject = selectedProjectId
    ? projects.find((p) => p.id === selectedProjectId)
    : null;

  const viewTitle = search.trim()
    ? `Search: "${search.trim()}"`
    : activeProject
    ? activeProject.name
    : filter === "today"
    ? "Today"
    : filter === "completed"
    ? "Completed"
    : "All Tasks";

  const viewSubtitle = search.trim()
    ? `${visibleTodos.length} result${visibleTodos.length === 1 ? "" : "s"}`
    : activeProject
    ? `${total} task${total === 1 ? "" : "s"} in this project`
    : `${total} task${total === 1 ? "" : "s"} in view`;

  const addTodo = (title, projectId) => {
    setTodos((prev) => [
      {
        id: uuidv4(),
        title,
        projectId,
        isComplete: false,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
    showToast("Todo added successfully");
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isComplete: !t.isComplete } : t))
    );
  };

  const editTodo = (id, title) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, title } : t)));
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    showToast("Todo deleted successfully");
  };

  const addProject = (name) => {
    setProjects((prev) => [
      ...prev,
      { id: uuidv4(), name, createdAt: new Date().toISOString() },
    ]);
  };

  const renameProject = (id, name) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, name } : p))
    );
  };

  const deleteProject = (id) => {
    Swal.fire({
      title: "Delete this project?",
      text: "Its tasks will be moved to Inbox.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#75da8b",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
      background: "#2F363F",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        setTodos((prev) =>
          prev.map((t) =>
            t.projectId === id ? { ...t, projectId: INBOX_PROJECT_ID } : t
          )
        );
        if (selectedProjectId === id) setSelectedProjectId(INBOX_PROJECT_ID);
      }
    });
  };

  const selectView = (f) => {
    setFilter(f);
    setSelectedProjectId(null);
  };

  const selectProject = (id) => {
    setSelectedProjectId(id);
    setFilter(null);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Log out?",
      text: "Your tasks are safely saved on this device.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#75da8b",
      confirmButtonText: "Log out",
      background: "#2F363F",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        clearSession();
        navigate("/");
      }
    });
  };

  return (
    <div className="App flex h-screen overflow-hidden">
      <Sidebar
        user={user}
        projects={projects}
        todos={todos}
        selectedProjectId={selectedProjectId}
        filter={filter}
        onSelectView={selectView}
        onSelectProject={selectProject}
        onAddProject={addProject}
        onRenameProject={renameProject}
        onDeleteProject={deleteProject}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          title={viewTitle}
          subtitle={viewSubtitle}
          search={search}
          setSearch={setSearch}
        />

        <main className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="max-w-3xl mx-auto px-6 py-6 space-y-5">
            <TodoHero completed={completed} total={total} remaining={remaining} />

            <Form
              key={selectedProjectId || filter || "add"}
              onAddTodo={addTodo}
              projects={projects}
              defaultProjectId={selectedProjectId || INBOX_PROJECT_ID}
            />

            <TodoLists
              items={visibleTodos}
              projects={projects}
              showBadge={!selectedProjectId}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
