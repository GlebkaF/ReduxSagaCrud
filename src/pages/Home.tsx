import { FC } from "react";

const Home: FC<{}> = () => {
  return (
    <div
      style={{
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "500px",
        fontSize: "30px",
      }}
    >
      Страница с доступом без авторизации<br></br>Авторизуйтесь, чтобы работать
      с постами
    </div>
  );
};

export default Home;
