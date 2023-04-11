import { useSetRecoilState } from "recoil";
import { ITodos, todoState } from "../atom";

function Todo({ text, category, id }: ITodos) {
  const setTodos = useSetRecoilState(todoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setTodos((pre) => {
      const targetIndex = pre.findIndex((todo) => todo.id === id);
      const oldTodos = pre[targetIndex];
      const newTodos = { text, id, category: name as ITodos["category"] };
      console.log(oldTodos);
      console.log(newTodos);
      return [
        ...pre.slice(0, targetIndex),
        newTodos,
        ...pre.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <li>
      <div>{text}</div>
      {category !== "DOING" && (
        <button name="DOING" onClick={onClick}>
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
