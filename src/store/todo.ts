import { create } from "zustand";

import { Todo } from "../types/todo";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

type Store = {
  todos: Todo[];
  searchQuery: string;
  fetchTodos(): Promise<void>;
  toggleTodo(id: number): void;
  removeTodo(id: number): void;
  setSearchQuery(query: string): void;
  filteredTodos(): Todo[];
};

export const useTodoStore = create<Store>((set, get) => ({
  todos: [],
  searchQuery: "",
  fetchTodos: async () => {
    const response = await fetch(API_URL);

    const data: Todo[] = await response.json();

    const todos = data
      .map((todo) => ({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
      }))
      .slice(0, 10);

    set({ todos });
  },
  toggleTodo: (id: number) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  },
  removeTodo: (id: number) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },
  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },
  filteredTodos: () => {
    const { todos, searchQuery } = get();

    return todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  },
}));
