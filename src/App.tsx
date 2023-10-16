import React, {useState} from 'react';
import './App.css';
import InputField from './components/InputField';
import { Todo } from './models/model';
import Todos from './components/Todos';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([])
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, {id: Date.now(), todo, isDone: false}])
      setTodo("");
    }
  }
  return (
    <div className="App">
      Taskify
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <Todos todos={todos}/>
    </div>
  );
}

export default App;