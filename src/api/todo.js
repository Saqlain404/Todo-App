import api from "./client";

const mapTodo = (todo) => ({ ...todo, projectId: todo.project });

export const getTodos = async () => {
    const {data} = await api.get("/todos");
    return data.map(mapTodo);
};

export const createTodo = async ({title, projectId}) => {
    const {data} = await api.post("/todos", { title, project: projectId });
    return mapTodo(data);
};

export const updateTodo = async (_id, patch) => {
    const {data} = await api.put(`/todos/${_id}`, patch);
    return mapTodo(data);
};

export const deleteTodo = async (id) => {
    const {data} = await api.delete(`/todos/${id}`);
    return mapTodo(data);
}
