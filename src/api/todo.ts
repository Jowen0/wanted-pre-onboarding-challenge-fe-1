// Util
import { axiosInstance } from "util/axios";

// Type
import { TodoType } from "type/todo";

const getTodoList = async (): Promise<TodoType[]> => {
  
  const res = await axiosInstance.get(TODO_URL.TODOS);
  return res.data.data;
};

const getTodo = async (todoId: string): Promise<TodoType> => {

  const res = await axiosInstance.get(`${TODO_URL.TODOS}/${todoId}`);
  return res.data.data;
};

const createTodo = async (todoInfo: TodoType): Promise<TodoType> => {

  const createdAt = new Date();
  const updatedAt = new Date();

  const res = await axiosInstance.post(TODO_URL.TODOS, { ...todoInfo, id:'', createdAt, updatedAt });
  return res.data.data;
};

const updateTodo = async (todoInfo: TodoType): Promise<TodoType> => {

  const updatedAt = new Date();

  const res = await axiosInstance.put(`${TODO_URL.TODOS}/${todoInfo.id}`, { ...todoInfo, updatedAt });
  return res.data.data;
};

const deleteTodo = async (todoId: string): Promise<{ data: null }> => {

  const res = await axiosInstance.delete(`${TODO_URL.TODOS}/${todoId}`);
  return res.data.data;
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
