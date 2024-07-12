import React from "react";
import { useSelector } from "react-redux";

export default function Main() {
  const token = useSelector((state) => state.auth.token);
  console.log(token);

  return (
    <div>
      <h1>user dashboard page</h1>
      <h1>TOKEN = {token}</h1>
    </div>
  );
}
