import { useSetRecoilState } from "recoil";
import { ITodos, todoState } from "../atom";

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

  return (
    <li>
      <div>{text}</div>
      {category !== "DOING" && (
        <button name="DOING" onClick={onClick}>
          {/* category의 속성 값이 다를떄 보여준다  */}
          Doing
        </button>
      )}
      {category !== "TO_DO" && (
        <button name="TO_DO" onClick={onClick}>
          To Do
        </button>
      )}
      {category !== "DONE" && (
        <button name="DONE" onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default Todo;
