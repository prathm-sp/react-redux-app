import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { RootState } from "../app/store";
import { setEmail, setPassword } from "../features/user/userSlice";
import { Component } from "react";
import ErrorCard from "../components/ErrorCard";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Use the below credential for successful login.
// {
//   "email": "eve.holt@reqres.in",
//   "password": "cityslicka"
// }

interface IProps {
  email: string;
  password: string;
  setEmail: (value: string) => any;
  setPassword: (value: string) => any;
}

interface IState {
  errors: any;
}

const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const isValidEmail = (email: string) => emailPattern.test(email);

class Login extends Component<IProps, IState> {
  state = {
    errors: {
      email: {},
      password: {},
      apiErrors: {},
    },
  };

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user && user.email && user.token) {
      window.location.replace("/welcome");
      return;
    }
  }

  validateBeforeSubmit = () => {
    const { email, password } = this.props;
    let isValid = true;
    if (!email) {
      isValid = false;
      this.setState((prevState: IState) => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          email: { message: "Email is a required field" },
        },
      }));
    } else if (!isValidEmail(email)) {
      isValid = false;
      this.setState((prevState: IState) => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          email: { message: "Please enter a valid Email" },
        },
      }));
    } else {
      this.setState((prevState: IState) => ({
        ...prevState,
        errors: { ...prevState.errors, email: {} },
      }));
    }
    if (!password) {
      isValid = false;
      this.setState((prevState: IState) => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          password: { message: "Password is a required field" },
        },
      }));
    } else {
      this.setState((prevState: IState) => ({
        ...prevState,
        errors: { ...prevState.errors, password: {} },
      }));
    }
    return isValid;
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = this.validateBeforeSubmit();
    if (isValid) {
      this.setState({ errors: {} });
      const payload = {
        email: this.props.email,
        password: this.props.password,
      };
      axios
        .post("https://reqres.in/api/login", payload)
        .then((res: any) => {
          if (res?.data && res.data.token) {
            localStorage.setItem(
              "user",
              JSON.stringify({ token: res.data.token, email: this.props.email })
            );
            window.location.replace("/welcome");
          } else {
            this.setState({
              errors: {
                apiErrors: {
                  message:
                    "Something went wrong. Make sure you are using reqres API credentials.",
                },
              },
            });
          }
        })
        .catch((e) => {
          console.log(e);
          this.setState({
            errors: {
              apiErrors: {
                message:
                  "Something went wrong. Make sure you are using reqres API credentials.",
              },
            },
          });
        });
    }
  };

  render() {
    const { email, password, setEmail, setPassword } = this.props;

    return (
      <>
        <Navbar />
        <div className="bg-grey-lighter min-h-screen flex flex-col">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <form
              onSubmit={this.handleSubmit}
              className="bg-white px-6 py-8 rounded shadow-md text-black w-full"
            >
              <h1 className="mb-8 text-3xl text-center">Sign In</h1>
              <input
                type="email"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                placeholder="Email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-lime-500 text-white hover:bg-lime-500 focus:outline-none my-1"
              >
                Sign In
              </button>
              <div className="mt-4">
                <ErrorCard errors={this.state.errors} />
              </div>
            </form>
            <div className="text-grey-dark mt-6">
              Didn't have an account?{" "}
              <Link
                className="no-underline border-b border-blue text-blue"
                to="/register"
              >
                Sign Up
              </Link>
              .
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: any) => {
  const { email, password } = state.user;
  return {
    email,
    password,
  };
};

const mapDispatchToProps = { setEmail, setPassword };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
