import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom, todoSelector, todoState } from "../atom";
import CreateTodos from "./CreateTodos";
import Todo from "./Todo";
import Category from "./Category";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ContainerHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
`;

const CatgoryBox = styled.div`
  display: flex;
`;

const ToDoList = styled.ul`
  list-style: none;
`;
const Btn = styled.button`
  position: absolute;
  bottom: 50px;
  right: 30px;
  border: none;
  background: none;
  div {
    position: relative;
    width: 50px;
    height: 22px;
    background-color: ${(props) => props.theme.btnBgColor};
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;
    letter-spacing: 0.5px;
    border-top: 0.5px solid rgba(255, 255, 255, 0.35);
    border-left: 0.5px solid rgba(255, 255, 255, 0.35);
    padding-left: 20px;
    transition: 0.5s ease-in-out;
  }
  div:hover {
    padding-left: 0px;
    padding-right: 10px;
    color: rgba(255, 255, 255, 1);
    span {
      left: calc(100% - 25px);
      background-color: ${(props) => props.theme.btnRight};
    }
  }
  span {
    position: absolute;
    left: 5px;
    width: 15px;
    height: 15px;
    background-color: ${(props) => props.theme.btnLeft};
    border-radius: 50%;
    transition: 0.5s ease-in;
  }
`;

function TodoList() {
  const todos = useRecoilValue(todoSelector);
  const isDark = useSetRecoilState(isDarkAtom);
  const isDarkMode = () => {
    isDark((prev) => !prev);
  };
  // 현재 컴포넌트에서는 todos의 state값을 수정할 필요없이 가져오기만 하기위해 useRecoilValue을 사용한다
  return (
    <Container>
      <ContainerHeader>
        <CatgoryBox>
          <Category />
        </CatgoryBox>
        <CreateTodos />
      </ContainerHeader>
      <ToDoList>
        {todos.map((todo) => (
          // map 함수를 사용해서 배열안의 모든 요소들에게 적용시킨다
          <Todo key={todo.id} {...todo} />
          // {...todo}는 todo의 모든 객체를 props로 전달하기위해 사용된다
        ))}
      </ToDoList>
      <Btn onClick={isDarkMode}>
        <div>
          <span></span>
        </div>
      </Btn>
    </Container>
  );
}

export default TodoList;
