import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Welcome() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user || !user.email || !user.token) {
      navigate("/login", { replace: true });
      return;
    }
    setUserName(user.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <Navbar />
      <section className="flex min-h-screen items-center h-full sm:p-16 dark:bg-gray-900 dark:text-gray-100">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
          <p className="text-3xl">
            Welcome to our page! <br />{" "}
            <span className="text-purple-500 text-base font-medium">
              {username}
            </span>
          </p>
          <button
            onClick={onClickLogout}
            className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900"
          >
            Logout
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Welcome;
