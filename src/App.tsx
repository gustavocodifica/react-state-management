import { useEffect } from "react";
import { useTodoStore } from "./store/todo";
import { TodoItem } from "./components/todo-item";

export default function App() {
  const fetchPokemons = useTodoStore((state) => state.fetchTodos);

  const [setSearchQuery, filteredTodos] = useTodoStore((state) => [
    state.setSearchQuery,
    state.filteredTodos,
  ]);

  const todos = filteredTodos();

  function handleSearchQueryChange(value: string) {
    setSearchQuery(value);
  }

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  return (
    <div className="min-h-screen w-full flex flex-col gap-4 items-center justify-center bg-zinc-900">
      <div className="max-w-3xl w-full space-y-4">
        <h1 className="text-2xl font-bold">Todo App</h1>

        <div className="w-ful border-2 border-zinc-600 px-4 py-3 rounded-md focus-within:border-indigo-700">
          <input
            type="text"
            placeholder="Seach a todo..."
            className="w-full bg-transparent outline-none placeholder-zinc-500"
            onChange={(event) => handleSearchQueryChange(event.target.value)}
          />
        </div>
      </div>

      <div className="max-w-3xl w-full flex flex-col gap-4">
        <ul className="flex flex-col gap-3">
          {todos.map((todo) => {
            return <TodoItem key={todo.id} todo={todo} />;
          })}
        </ul>
      </div>
    </div>
  );
}
