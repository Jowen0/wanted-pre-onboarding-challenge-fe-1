import { useAxios } from "hook/useAxios";
import { TodoType } from "type/todo";

const authorization = localStorage.getItem('token') as string;

const getTodoList = async () => {
    const res = await useAxios.get(TODO_URL.TODOS, authorization);
    return JSON.parse(res.data);
};

const getTodo = async (todoId: string) => {
    const res = await useAxios.get(`${TODO_URL.TODOS}/${todoId}`, authorization);
    return JSON.parse(res.data);
};

const createTodo = async (todoInfo: TodoType) => {
    const res = await useAxios.post(TODO_URL.TODOS, todoInfo, authorization);
    return JSON.parse(res.data);
};

const updateTodo = async (todoInfo: TodoType) => {
    const res = await useAxios.put(`${TODO_URL.TODOS}/${todoInfo.id}`, todoInfo, authorization);
    return JSON.parse(res.data);
};

const deleteTodo = async (todoId: string) => {
    const res = await useAxios.del(`${TODO_URL.TODOS}/${todoId}`, authorization);
    return JSON.parse(res.data);
};

export const TODO_API = {
    getTodoList,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo,
};

const TODO_URL = {
    TODOS: '/todos',
};