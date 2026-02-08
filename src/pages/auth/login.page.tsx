import { useForm } from "react-hook-form";
import type { UserLoginForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authenticateUser } from "@/api/auth.api";
import { toast } from "react-toastify";

export default function LoginPage() {
  const navigate = useNavigate();
  const initialValues: UserLoginForm = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserLoginForm>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      reset();  
      navigate("/");
    },
  });
  const handleLogin = (formData: UserLoginForm) => mutate(formData);

  return (
    <>
      <h1 className="text-5xl font-black text-white">Login</h1>
      <p className="text-2xl font-light text-white mt-5">
        Start to planning your project {""}
        <span className=" text-fuchsia-500 font-bold">loging In </span>
      </p>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 mt-10 bg-white"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label htmlFor="email" className="font-normal text-2xl">
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="Registered email"
            className="w-full p-3 border-gray-300 border"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label htmlFor="password" className="font-normal text-2xl">
            Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="Your password"
            className="w-full p-3 border-gray-300 border"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Sign in"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-black text-xl cursor-pointer"
        />
      </form>
      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          className="text-center text-gray-300 font-normal"
          to={"/auth/register"}
        >
          Don't you have an account yet?
        </Link>
        <Link
          className="text-center text-gray-300 font-normal"
          to={"/auth/forgot-password"}
        >
          Forgot your password? Restore
        </Link>
      </nav>
    </>
  );
}
