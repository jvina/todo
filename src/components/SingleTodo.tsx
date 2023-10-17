import React, { useState } from  "react"
import { Todo } from "../models/model";
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import {  MdDone } from "react-icons/md";
import "./styles.css";

type Props = {
  todo: Todo,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>, 
  todos: Array<Todo>
}

const SingleTodo = ({todo, todos, setTodos}: Props) => {
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
    <form className='todos__single' onSubmit={(e) => handleEdit(todo.id, e)}>
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
  );
}

export default SingleTodo