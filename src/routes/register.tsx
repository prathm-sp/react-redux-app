import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorCard from "../components/ErrorCard";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Use the below credential for successful login.
// {
//     "email": "eve.holt@reqres.in",
//     "password": "pistol"
// }

function Register() {
  const navigate = useNavigate();
  const [errors, setErrors]: any = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors: fieldErrors },
  } = useForm();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user && user.email && user.token) {
      navigate("/welcome", { replace: true });
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (errors?.confirmPassword && errors?.confirmPassword?.message) {
      return;
    }
    setErrors(fieldErrors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldErrors]);

  function onSubmitForm(data: any) {
    if (data?.confirmPassword !== data?.password) {
      setErrors({
        confirmPassword: { message: "Password Mismatching, Please Check" },
      });
      return;
    }
    const payload = {
      email: data.email,
      password: data.password,
    };
    axios
      .post("https://reqres.in/api/register", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res: any) => {
        if (res?.data && res.data.token) {
          localStorage.setItem(
            "user",
            JSON.stringify({ token: res.data.token, email: data.email })
          );
          setErrors({});
          navigate("/welcome");
        } else {
          setErrors({
            apiError: {
              message:
                "Something went wrong. Make sure you are using reqres API credentials.",
            },
          });
        }
      })
      .catch((e) => {
        console.log(e);
        setErrors({
          apiError: {
            message:
              "Something went wrong. Make sure you are using reqres API credentials only.",
          },
        });
      });
  }

  return (
    <>
      <Navbar />
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <form
            onSubmit={handleSubmit(onSubmitForm)}
            className="bg-white px-6 py-8 rounded shadow-md text-black w-full"
          >
            <h1 className="mb-8 font-medium text-3xl text-center">Sign up</h1>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              placeholder="First Name"
              {...register("firstName", {
                required: "First Name is a required field",
              })}
            />
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              {...register("lastName", {
                required: "Last Name is a required field",
              })}
              placeholder="Last Name"
            />
            <input
              type="email"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              {...register("email", {
                required: "Email is a required field",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Please enter a valid Email",
                },
              })}
              placeholder="Email"
              autoComplete="username"
            />
            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              {...register("password", {
                required: "Password is a required field",
              })}
              placeholder="Password"
              autoComplete="current-password"
            />
            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              {...register("confirmPassword", {
                required: "Confirm Password is a required field",
              })}
              placeholder="Confirm Password"
              autoComplete="current-password"
            />
            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-lime-500 text-white hover:bg-lime-500 focus:outline-none my-1"
            >
              Create Account
            </button>
            <div className="mt-4">
              <ErrorCard errors={errors} />
            </div>
          </form>
          <div className="text-grey-dark mt-6">
            Already have an account?{" "}
            <Link
              className="no-underline border-b border-blue text-blue"
              to="/login"
            >
              Sign In
            </Link>
            .
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;
