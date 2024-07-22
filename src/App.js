import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import { useState, useEffect} from "react";
import axios from "axios";

function App() {

  // destructure values of useState (initially set to null)
  const [currentUser, setCurrentUser] = useState(null);

  // get current user from API
  const handleMount = async () => {
    try {
      const { data } = await axios.get("dj-rest-auth/user/");
      setCurrentUser(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  // run handleMount when component is mounted
  useEffect(() => {
    handleMount();
  }, []);

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
      <Switch>
          <Route exact path="/" render={() => <h1>Home page</h1>} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route render={() => <h1>Oops! Page not found</h1>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;