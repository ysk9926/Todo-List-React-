import { useForm } from "react-hook-form";
import styled from "styled-components";

const MainForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ErrorMessage = styled.span`
  color: white;
`;

interface Iform {
  email: string;
  name: string;
  password: string;
  password1: string;
}

function TodoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Iform>();
  const onValid = (data: Iform) => {
    if (errors.password !== errors.password1) {
      setError("password1", { message: "비밀번호가 일치하지 않습니다" });
    }
  };
  console.log(errors);
  return (
    <div>
      <MainForm onSubmit={handleSubmit(onValid)}>
        <input
          {...register("email", {
            required: "write here",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "네이버 이메일만 사용가능합니다",
            },
          })}
          placeholder="Email"
        />
        <ErrorMessage>{errors?.email?.message}</ErrorMessage>
        <input
          {...register("name", {
            required: "write here",
            validate: {
              noKim: (value) =>
                value.includes("김") ? "김은 포함될 수 없습니다" : true,
            },
          })}
          placeholder="Name"
        />
        <ErrorMessage>{errors?.name?.message}</ErrorMessage>
        <input
          {...register("password", {
            required: "write here",
            minLength: {
              value: 5,
              message: "비밀번호가 너무 짧습니다",
            },
          })}
          placeholder="password"
        />
        <ErrorMessage>{errors?.password?.message}</ErrorMessage>
        <input
          {...register("password1", {
            required: "write here",
            minLength: {
              value: 5,
              message: "비밀번호가 너무 짧습니다",
            },
          })}
          placeholder="password"
        />
        <ErrorMessage>{errors?.password1?.message}</ErrorMessage>
        <button>ADD</button>
      </MainForm>
    </div>
  );
}

export default TodoList;
