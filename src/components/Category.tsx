import { useRecoilState, useRecoilValue } from "recoil";
import { categories, categoryState, customCategoryState } from "../atom";
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface INewCategory {
  newCategory: string;
}

const Select = styled.select`
  position: relative;
  display: flex;
  border-radius: 0.25em;
  overflow: hidden;
  border: none;
  background-color: #aaaaaa;
  &:focus {
    outline: none;
  }
`;

const CreateCat = styled.input`
  margin: 0px 10px;
  width: 100px;
  text-align: center;
  border: none;
  border-bottom: solid #aaaaaa 1px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  position: relative;
  background-color: #aaaaaa5a;
  color: ${(props) => props.theme.subBgColor};
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${(props) => props.theme.subBgColor};
  }
`;

const Btn = styled.button`
  border: none;
  background-color: ${(props) => props.theme.accentColor};
  padding: 3px 5px;
  border-radius: 5px;
  font-weight: 600;
`;

function Category() {
  const { register, handleSubmit, setValue } = useForm<INewCategory>();
  const [customCat, setCustomCat] = useRecoilState(customCategoryState);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as categories);
  };
  const onValid = ({ newCategory }: INewCategory) => {
    setCustomCat((pre) => [...pre, { category: newCategory, id: Date.now() }]);
    setValue("newCategory", "");
  };

  return (
    <>
      <Select value={category} onInput={onInput}>
        <option value="TO_DO">TO_DO</option>
        <option value="DOING">DOING</option>
        <option value="DONE">DONE</option>
        {customCat.map((newCat) => (
          <option value={newCat.category}>{newCat.category}</option>
        ))}
      </Select>
      <form onSubmit={handleSubmit(onValid)}>
        <CreateCat {...register("newCategory")} />
        <Btn>CREATE</Btn>
      </form>
    </>
  );
}

export default Category;
