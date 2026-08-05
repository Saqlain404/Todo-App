import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./App.css";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import TodoHero from "./Components/TodoHero";
import Form from "./Components/Form";
import TodoLists from "./Components/TodoLists";

import { useAuth } from "./context/AuthContext";
import * as todosApi from "./api/todo";
import * as projectsApi from "./api/project";

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
  const { user, logout: authLogout } = useAuth();
  const navigate = useNavigate();
  // const currentUser = getCurrentUser();
  // const allUsers = getUsers();
  // const user = currentUser
  //   ? allUsers.find((u) => u.email === currentUser.email) || {
  //       email: currentUser.email,
  //       name: currentUser.email.split("@")[0],
  //     }
  //   : { email: "guest", name: "Guest" };

  const [todos, setTodos] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [filter, setFilter] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([todosApi.getTodos(), projectsApi.getProjects()])
      .then(([todos, projects]) => {
        setTodos(todos);
        setProjects(projects);
      })
      .catch((error) => {
        if (error?.response?.status === 401) authLogout();
      })
      .finally(() => setLoading(false));
  }, [authLogout]);

  useEffect(() => {
    if (!selectedProjectId && projects.length) {
      const inbox = projects.find((p) => p.isInbox);
      setSelectedProjectId(inbox ? inbox.id : projects[0].id);
    }
  }, [projects, selectedProjectId]);

  

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

  const addTodo = async (title, projectId) => {
    const todo = await todosApi.createTodo({ title, projectId });
    setTodos((prev) => [...prev, todo]);
    showToast("Todo added successfully");
  };

  const toggleTodo = async (id) => {
    const cur = todos.find((t) => t.id === id);
    const updated = await todosApi.updateTodo(id, {
      isComplete: !cur.isComplete,
    });
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const editTodo = async (id, title) => {
    const updated = await todosApi.updateTodo(id, { title });
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const deleteTodo = async (id) => {
    await todosApi.deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
    showToast("Todo deleted successfully");
  };

  const addProject = async (name) => {
    const project = await projectsApi.createProject(name);
    setProjects((prev) => [...prev, project]);
  };

  const renameProject = async (id, name) => {
    const updated = await projectsApi.renameProject(id, name);
    setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)));
  };

  const deleteProject = async (id) => {
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        await projectsApi.deleteProject(id);
        setProjects((prev) => prev.filter((p) => p.id !== id));
        setTodos(await todosApi.getTodos()); // tasks were moved to Inbox server-side
        if (selectedProjectId === id) setSelectedProjectId(null);
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

  const handleLogout = async () => {
    Swal.fire({
      title: "Log out?",
      text: "Your tasks are safely saved on this device.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#75da8b",
      confirmButtonText: "Log out",
      background: "#2F363F",
      color: "#fff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await authLogout();
        navigate("/");
      }
    });
  };

  // if (loading) return <Loader/>

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
            <TodoHero
              completed={completed}
              total={total}
              remaining={remaining}
            />

            <Form
              key={selectedProjectId || filter || "add"}
              onAddTodo={addTodo}
              projects={projects}
              defaultProjectId={selectedProjectId}
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
