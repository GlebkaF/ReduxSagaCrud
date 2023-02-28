import NavBar from "../NavBar";

type AppProps = {
  children: string | JSX.Element | JSX.Element[] | any;
};

function App({ children }: AppProps) {
  return (
    <div>
      <NavBar />
      <div>{children}</div>
    </div>
  );
}

export default App;
