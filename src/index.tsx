import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { darkTheme, lightTheme } from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <div>
    <RecoilRoot>
      {/* RecoilRoot를 사용해서 안에있는 컴포넌트에서 state값을 편하게 공유가능 */}
      <ThemeProvider theme={lightTheme}>
        {/* ThemeProvider는 전체 컴포넌트에 theme을 적용할수있게 도와준다 */}
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </div>
);
