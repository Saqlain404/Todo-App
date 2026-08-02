export const USERS_KEY = "users";
export const CURRENT_USER_KEY = "currentUser";

const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getUsers = () => {
  const users = read(USERS_KEY, []);
  if (users.length === 0) {
    const legacy = read("user", null);
    if (legacy && legacy.email) {
      users.push({
        name: legacy.email.split("@")[0],
        email: legacy.email,
        password: legacy.password,
        createdAt: new Date().toISOString(),
      });
      write(USERS_KEY, users);
    }
  }
  return users;
};

export const saveUsers = (users) => write(USERS_KEY, users);

export const getCurrentUser = () => read(CURRENT_USER_KEY, null);

export const setCurrentUser = (email) =>
  write(CURRENT_USER_KEY, email ? { email } : null);

export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

const todosKey = (email) => `todoItems_${email}`;
const projectsKey = (email) => `projects_${email}`;

export const INBOX_PROJECT_ID = "inbox";

export const getProjects = (email) => {
  const projects = read(projectsKey(email), []);
  if (projects.length === 0) {
    const seed = [
      { id: INBOX_PROJECT_ID, name: "Inbox", createdAt: new Date().toISOString() },
    ];
    write(projectsKey(email), seed);
    return seed;
  }
  return projects;
};

export const saveProjects = (email, projects) =>
  write(projectsKey(email), projects);

export const getTodos = (email) => {
  const todos = read(todosKey(email), []);
  if (todos.length === 0) {
    const legacy = read("todoItems", []);
    if (legacy.length > 0) {
      const migrated = legacy.map((t) => ({
        ...t,
        projectId: t.projectId || INBOX_PROJECT_ID,
        createdAt: t.createdAt || new Date().toISOString(),
      }));
      write(todosKey(email), migrated);
      localStorage.removeItem("todoItems");
      return migrated;
    }
  }
  return todos;
};

export const saveTodos = (email, todos) => write(todosKey(email), todos);
