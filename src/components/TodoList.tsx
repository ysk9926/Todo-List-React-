import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { todoState } from "../atom";
import CreateTodos from "./CreateTodos";
import Todo from "./Todo";

function TodoList() {
  const todos = useRecoilValue(todoState);

  return (
    <>
      <CreateTodos />
      <ul>
        {todos.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </ul>
    </>
  );
}

export default TodoList;
