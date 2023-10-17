import React from "react"
import { Todo } from "../models/model";
import SingleTodo from "./SingleTodo";
import "./styles.css";

interface Props {
    todos: Array<Todo>,
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}
const Todos: React.FC<Props> = ({
    todos,
    setTodos,
}) => {
    return (
        <div>
        {todos.map((t) => (
              <SingleTodo todo={t} key={t.id} todos={todos} setTodos={setTodos} />
            ))}
        </div>
    );
}

export default Todos