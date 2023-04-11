import { useForm } from "react-hook-form";
import { ITodos, todoState } from "../atom";
import { useSetRecoilState } from "recoil";

interface Iform {
  todo: string;
}

function CreateTodos() {
  const setTodos = useSetRecoilState(todoState);
  const { register, handleSubmit, setValue } = useForm<Iform>();
  const handleValid = ({ todo }: Iform) => {
    setTodos((pre) => [
      { text: todo, id: Date.now(), category: "TO_DO" },
      ...pre,
    ]);
    setValue("todo", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input {...register("todo")} />
      <button>ADD</button>
    </form>
  );
}

export default CreateTodos;
