"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

import { useLoginMutation } from "@/lib/Features/products/productSlice";
import { setCredential } from "@/lib/Store/auth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const loginValidation = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const [error, setError] = useState<String | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof loginValidation>>({
    resolver: zodResolver(loginValidation),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof loginValidation>) => {
    setError(null);
    try {
      const res = await login({ email: value.email }).unwrap();
      dispatch(
        setCredential({
          token: res.token,
          isLoggedIn: true,
          email: value.email,
        }),
      );
      router.push("/");
    } catch (error: any) {
      setError(error?.data?.message || "Login failed!!");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Email</FormLabel> */}
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter Your email Number"
                  {...field}
                  className="px-6 bg-transparent border-[#4E6E5D]"
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && (
          <h1 className="text-red-500 font-bold text-center animate-bounce">
            OOPS! Please Try Again
          </h1>
        )}
        <Button
          type="submit"
          className="w-full flex justify-center items-center mt-3 bg-[#4E6E5D]"
        >
          {isLoading ? (
            <>
              <div className="w-6 h-6 border-2 border-t-[#AD8A64] rounded-full animate-spin "></div>
              <div className="text-">Loading..</div>
            </>
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
