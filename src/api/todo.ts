import { useAxios } from "hook/useAxios";
import { TodoType } from "type/todo";

const authorization = localStorage.getItem("token") as string;

const getTodoList = async () => {
  const res = await useAxios.get(TODO_URL.TODOS, authorization);
  return res.data  as TodoType[];
};

const getTodo = async (todoId: string) => {
  const res = await useAxios.get(`${TODO_URL.TODOS}/${todoId}`, authorization);
  return res.data as TodoType;
};

const createTodo = async (todoInfo: TodoType) => {
  const createdAt = new Date().toISOString();
  const updatedAt = new Date().toISOString();

  const res = await useAxios.post(
    TODO_URL.TODOS,
    { ...todoInfo, createdAt, updatedAt },
    authorization
  );
  return res.data  as TodoType;
};

const updateTodo = async (todoInfo: TodoType) => {
  const updatedAt = new Date().toISOString();

  const res = await useAxios.put(
    `${TODO_URL.TODOS}/${todoInfo.id}`,
    { ...todoInfo, updatedAt },
    authorization
  );
  return res.data as TodoType;
};

const deleteTodo = async (todoId: string) => {
  const res = await useAxios.del(`${TODO_URL.TODOS}/${todoId}`, authorization);
  return res.data;
};

export const TODO_API = {
  getTodoList,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};

const TODO_URL = {
  TODOS: "/todos",
};
