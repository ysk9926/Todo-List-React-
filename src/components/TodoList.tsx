import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { todoSelector, todoState } from "../atom";
import CreateTodos from "./CreateTodos";
import Todo from "./Todo";
import Category from "./Category";

function TodoList() {
  const todos = useRecoilValue(todoSelector);
  // 현재 컴포넌트에서는 todos의 state값을 수정할 필요없이 가져오기만 하기위해 useRecoilValue을 사용한다
  return (
    <>
      <Category />
      <CreateTodos />
      <ul>
        {todos.map((todo) => (
          // map 함수를 사용해서 배열안의 모든 요소들에게 적용시킨다
          <Todo key={todo.id} {...todo} />
          // {...todo}는 todo의 모든 객체를 props로 전달하기위해 사용된다
        ))}
      </ul>
    </>
  );
}

export default TodoList;
