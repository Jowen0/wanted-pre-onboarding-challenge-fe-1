import { useQuery, useMutation } from "@tanstack/react-query";

// Util
import { axiosInstance } from "util/axios";

// Hook
import { useTodos } from "hook/todo/useTodos";

// Type
import { TodoType } from "type/todo";

export const useGetTodos = () => {

  return useQuery({
    queryKey: TODO_KEY.TODOS,
    queryFn: () => getTodoList(),
  });
};

const getTodoList = async (): Promise<TodoType[]> => {
  const res = await axiosInstance.get(TODO_URL.TODOS);
  return res.data.data;
};

export const useGetTodo = (todoId: string) => {

  return useQuery({
    queryKey: [...TODO_KEY.TODO, todoId],
    queryFn: () => getTodoById(todoId),
  });
};

const getTodoById = async (todoId: string): Promise<TodoType> => {
  const res = await axiosInstance.get(`${TODO_URL.TODOS}/${todoId}`);
  return res.data.data;
};

export const useCreateTodo = () => {

  const { invalidateQueryTodos } = useTodos();

  return useMutation({
    mutationFn: (todoInfo: TodoType) => createTodo(todoInfo),
    onSettled: () => {
      invalidateQueryTodos();
    },
  });
};

const createTodo = async (todoInfo: TodoType): Promise<TodoType> => {

  const createdAt = new Date();
  const updatedAt = new Date();

  const res = await axiosInstance.post(TODO_URL.TODOS, { ...todoInfo, id: '', createdAt, updatedAt });
  return res.data.data;
};

export const useUpdateTodo = () => {

  const { invalidateQueryTodos } = useTodos();

  return useMutation({
    mutationFn: (todoInfo: TodoType) => updateTodo(todoInfo),
    onSettled: () => {
      invalidateQueryTodos();
    },
  });
};

const updateTodo = async (todoInfo: TodoType): Promise<TodoType> => {

  const updatedAt = new Date();

  const res = await axiosInstance.put(`${TODO_URL.TODOS}/${todoInfo.id}`, { ...todoInfo, updatedAt });
  return res.data.data;
};

export const useDeleteTodo = () => {

  const { invalidateQueryTodos } = useTodos();

  return useMutation({
    mutationFn: (todoId: string) => deleteTodo(todoId),
    onSettled: () => {
      invalidateQueryTodos();
    },
  });
};

const deleteTodo = async (todoId: string): Promise<{ data: null }> => {

  const res = await axiosInstance.delete(`${TODO_URL.TODOS}/${todoId}`);
  return res.data.data;
};

const TODO_URL = {
  TODOS: "/todos",
};


export const TODO_KEY = {
  TODO: ["todo"],
  TODOS: ["todos"],
};