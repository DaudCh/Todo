interface Todo {
    id: number;
    title: string;
    completed: boolean;
  }
  
  interface TodoListProps {
    todos: Todo[];
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
  }
  
  export default function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
    return (
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex justify-between items-center p-2 border-b">
            <span className={todo.completed ? 'line-through' : ''}>{todo.title}</span>
            <div>
              <button onClick={() => onToggle(todo.id)} className="mr-2">
                {todo.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => onDelete(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    );
  }
  