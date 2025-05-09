import { Button } from "~/common/components/ui/button";
import { Form, Link } from "react-router";
import InputPair from "~/common/components/input-pair";
import type { Route } from "./+types/login-page";
import AuthButtons from "../components/auth-buttons";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Login | wemake" }];
};

export default function LoginPage() {
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <Button variant={"outline"} asChild className="absolute top-10 right-8">
        <Link to="/auth/join">Join</Link>
      </Button>
      <div className="flex items-center flex-col justify-center w-full gap-10">
        <h1 className="text-4xl font-semibold">Login to your account!</h1>
        <Form className="w-full max-w-sm space-y-5">
          <InputPair
            id="email"
            label="Email"
            description="Enter your email"
            name="email"
            required
            type="email"
          />
          <InputPair
            id="password"
            label="Password"
            description="Enter your password"
            name="password"
            required
            type="password"
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
          <AuthButtons />
        </Form>
      </div>
    </div>
  );
}
