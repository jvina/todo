import React, { useState } from  "react"
import { Todo } from "../models/model";
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import {  MdDone } from "react-icons/md";
import "./styles.css";
import { Draggable } from "react-beautiful-dnd";

const SingleTodo: React.FC<{
  todo: Todo;
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  index: number;
}> = ({todo, todos, setTodos, index}) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<string>(todo.todo)

  const handleDone = (id: number) => {
    setTodos(todos.map(todo => todo.id == id ? {...todo, isDone: !todo.isDone} : todo))
  };
  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }
  const handleEdit = (id: number, e:React.FormEvent) => {
    e.preventDefault();
    setTodos(todos.map((todo) => (todo.id == id ? {...todo, todo: editTodo} : todo)))
    setEdit(false)
  }
  
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form 
          className={`todos__single ${snapshot.isDragging ? 'drag' : ''}`} 
          onSubmit={(e) => handleEdit(todo.id, e)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          >
        {
          edit ? (
            <input value={editTodo} onChange={(e) => setEditTodo(e.target.value)} className='todos__single-text' />
          ) : todo.isDone ? 
          (<s className="todos__single--text">{todo.todo}</s>) : 
          (<span className="todos__single--text">{todo.todo}</span>)
        }
        <div>
          <span className="icon" onClick={() => {
            if (!edit && !todo.isDone){
                setEdit(!edit)
            }
          }}>
          <AiFillEdit /></span>
          <span className="icon" onClick={() => handleDelete(todo.id)}><AiFillDelete /></span>
          <span className="icon" onClick={() => handleDone(todo.id)}><MdDone /></span>
        </div>
      </form>
      )}
    </Draggable>
  );
}

export default SingleTodo