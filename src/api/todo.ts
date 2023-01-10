// Hook
import { useAxios } from "hook/useAxios";

// Type
import { TodoType } from "type/todo";

const getTodoList = async () => {
  const authorization = localStorage.getItem("token") || '';
  const res = await useAxios.get(TODO_URL.TODOS, authorization);
  return res.data as TodoType[];
};

const getTodo = async (todoId: string) => {

  const authorization = localStorage.getItem("token") || '';
  const res = await useAxios.get(`${TODO_URL.TODOS}/${todoId}`, authorization);
  return res.data as TodoType;
};

const createTodo = async (todoInfo: TodoType) => {

  const authorization = localStorage.getItem("token") || '';
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
  
  const authorization = localStorage.getItem("token") || '';
  const updatedAt = new Date().toISOString();

  const res = await useAxios.put(
    `${TODO_URL.TODOS}/${todoInfo.id}`,
    { ...todoInfo, updatedAt },
    authorization
  );
  return res.data as TodoType;
};

const deleteTodo = async (todoId: string) => {

  const authorization = localStorage.getItem("token") || '';
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
