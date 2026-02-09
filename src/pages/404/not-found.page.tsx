import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <>
      <h1 className="font-black text-center text-4xl text-white">
        Page not Found
      </h1>
      <p className="mt-10 text-center text-white">
        Go back to {' '}
        <Link className="text-fuchsia-500" to={"/"}>Projects</Link>
      </p>
    </>
  );
}
