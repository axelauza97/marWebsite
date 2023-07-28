import React from "react";

import { json, redirect } from "react-router-dom";
import AuthenticationForm from "../components/Forms/AuthenticationForm";

function Authentication() {
  return <AuthenticationForm />;
}

export default Authentication;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  let mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode." }, { status: 422 });
  }
  if (mode === "signup") {
    mode = "user/create/";
  } else if (mode === "login") {
    mode = "login/";
  }
  const data = await request.formData();
  const authData = {
    username: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch("http://127.0.0.1:8000/api/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const resData = await response.json();
  const tokens = resData.data;

  localStorage.setItem("token", tokens.access);
  localStorage.setItem("token_refresh", tokens.refresh);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 24);
  localStorage.setItem("expiration", expiration.toISOString());

  return redirect("/");
}
