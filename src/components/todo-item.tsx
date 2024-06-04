import { useTodoStore } from "../store/todo";
import { Todo } from "../types/todo";

import { Trash2 } from "lucide-react";

interface TodoItemProps {
  todo: Todo;
}
export function TodoItem({ todo }: TodoItemProps) {
  const [toggleTodo, removeTodo] = useTodoStore((state) => [
    state.toggleTodo,
    state.removeTodo,
  ]);

  function handleToggleTodo(id: number) {
    toggleTodo(id);
  }

  function handleRemoveTodo(id: number) {
    removeTodo(id);
  }

  return (
    <li key={todo.id} className="flex items-center p-4 bg-zinc-800 rounded-md">
      <input
        type="checkbox"
        className="size-5 cursor-pointer"
        checked={todo.completed}
        onChange={() => handleToggleTodo(todo.id)}
      />
      <span className="ml-5">{todo.title}</span>

      <div className="flex items-center gap-2 ml-auto">
        <button
          title="Remove todo"
          type="button"
          onClick={() => handleRemoveTodo(todo.id)}
        >
          <Trash2 className="size-5 text-red-400" />
        </button>
      </div>
    </li>
  );
}
