import { useSetRecoilState } from "recoil";
import { ITodos, categories, todoState } from "../atom";
import styled from "styled-components";

const List = styled.li`
  padding-bottom: 10px;
  display: flex;
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 200px;
    width: 100px;
    height: 30px;
    overflow-x: hidden;
    background-color: white;
    margin-right: 20px;
    color: ${(props) => props.theme.titleClolr};
    font-weight: 600;
  }
`;

const Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 20px;
  margin-right: 10px;
  color: white;
  padding: 3px 10px;
  color: ${(props) => props.theme.titleClolr};
  background-color: ${(props) => props.theme.textColor};

  &:hover {
    color: whitesmoke;
    background-color: ${(props) => props.theme.subBgColor};
  }
`;

function Todo({ text, category, id }: ITodos) {
  const setTodos = useSetRecoilState(todoState);
  // useSetRecoilState를 사용해 atom에 존재하는 state에 value값을 수정할수있다
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // react에서는 event값을 불러오려면 event: React.(이벤트)<HTML요소이름>식으로 작성해주어야한다
    const {
      currentTarget: { name },
    } = event;
    // event.currentTarget에 name 속성값을 가져온다
    setTodos((pre) => {
      const targetIndex = pre.findIndex((todo) => todo.id === id);
      // 우리가 누른 버튼의 요소를 찾기위해 pre배열에서 지금 누른 버튼의 id와 같은 요소의 위치를 찾는다
      const oldTodos = pre[targetIndex];
      // 찾아온 index값을 사용해 예전 todo를 지정한다
      const newTodos = { text, id, category: name as ITodos["category"] };
      // 카테고리 값을 위에 이벤트에서 받은 name속성값으로 수정해서 새로운 todo를 만든다
      return [
        ...pre.slice(0, targetIndex),
        newTodos,
        ...pre.slice(targetIndex + 1),
      ];
      // slice를 사용해서 targetIndex 전 배열 + 새로운 todo + targetIndex 후 배열로 조합해 새로운 todos를 만든다
    });
  };
  const onDelete = () => {
    setTodos((pre) => {
      const targetIndex = pre.findIndex((todo) => todo.id === id);
      return [...pre.slice(0, targetIndex), ...pre.slice(targetIndex + 1)];
    });
  };

  return (
    <List>
      {category !== categories.DOING && (
        <Btn name={categories.DOING} onClick={onClick}>
          {/* category의 속성 값이 다를떄 보여준다  */}
          Doing
        </Btn>
      )}
      {category !== categories.TO_DO && (
        <Btn name={categories.TO_DO} onClick={onClick}>
          To Do
        </Btn>
      )}
      {category !== categories.DONE && (
        <Btn name={categories.DONE} onClick={onClick}>
          Done
        </Btn>
      )}
      <span>{text}</span>
      <Btn onClick={onDelete}>X</Btn>
    </List>
  );
}

export default Todo;
