import { useRecoilState, useRecoilValue } from "recoil";
import { categories, categoryState } from "../atom";
import { useForm } from "react-hook-form";

interface INewCategory {
  newCategory: string;
}

function Category() {
  const { register, handleSubmit } = useForm<INewCategory>();
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as categories);
  };
  const onValid = () => {
    setCategory((pre) => {
      return { ...pre, ["newCategory"]: [] };
    });
  };

  return (
    <>
      <select value={category} onInput={onInput}>
        <option value="TO_DO">TO_DO</option>
        <option value="DOING">DOING</option>
        <option value="DONE">DONE</option>
      </select>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("newCategory")} />
        <button>CREATE</button>
      </form>
    </>
  );
}

export default Category;
