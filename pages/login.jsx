import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { loginUser } from "../lib/auth";
import Link from "next/link";

const initialValues = {
  email: "gee@pornhub.gov",
  password: "12345",
};

function Login() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  const onSubmit = (values) => {
    loginUser(values).then((result) => {
      if (result.message === "success") {
        router.push("/profile");
      } else {
        setMessage(result.message);
      }
    });
  };
  return (
    <>
      {message && <div>{message}</div>}
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <Field name="email" id="email" type="email" placeholder="Email:" />
          <br />
          <br />
          <Field
            name="password"
            id="password"
            type="password"
            placeholder="Password:"
          />
          <br />
          <br />
          <button type="submit">Login</button>
        </Form>
      </Formik>
      <Link href="/profile">
        <a>Profile</a>
      </Link>
    </>
  );
}

export default Login;
