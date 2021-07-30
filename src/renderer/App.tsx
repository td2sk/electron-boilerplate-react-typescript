import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Hello from "./components/Hello";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={Hello} />
        <Route component={() => <Redirect to="/" />} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
