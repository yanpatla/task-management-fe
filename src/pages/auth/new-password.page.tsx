import NewPasswordForm from "@/components/auth/NewPasswordForm";
import NewPasswordToken from "@/components/auth/NewPasswordToken";
import React, { useState } from "react";
import type { ConfirmToken } from "../../types";

export default function NewPasswordPage() {
  const [token, setToken] = useState<ConfirmToken["token"]>("");
  const [isValidToken, setIsValidToken] = useState<boolean>(false);
  return (
    <>
      <h1 className="text-5xl font-black text-white">Restore Password</h1>
      <p className="text-2xl font-light text-white mt-5">
        Insert code {""}
        <span className=" text-fuchsia-500 font-bold">got by Email</span>
      </p>
      {!isValidToken ? (
        <NewPasswordToken
          token={token}
          setToken={setToken}
          setIsValidToken={setIsValidToken}
        />
      ) : (
        <NewPasswordForm token={token} />
      )}
    </>
  );
}
