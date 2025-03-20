import { Form, Link } from "react-router";
import type { Route } from "./+types/join-page";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import AuthButtons from "../components/auth-buttons";

export const meta: Route["MetaFunction"] = () => {
  return [{ title: "Join | wemake" }];
};

export default function JoinPage() {
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <Button variant={"outline"} asChild className="absolute top-10 right-8">
        <Link to="/auth/login">Login</Link>
      </Button>
      <div className="flex items-center flex-col justify-center w-full gap-10">
        <h1 className="text-4xl font-semibold">Create an account</h1>
        <Form className="w-full max-w-sm space-y-5">
          <InputPair
            id="name"
            label="Name"
            description="Enter your name"
            name="name"
            required
            type="text"
            placeholder="Enter your name"
          />
          <InputPair
            id="username"
            label="Username"
            description="Enter your username"
            name="username"
            required
            type="text"
            placeholder="e.g. john_doe"
          />
          <InputPair
            id="email"
            label="Email"
            description="Enter your email"
            name="email"
            required
            type="email"
            placeholder="e.g. john@gmail.com"
          />
          <InputPair
            id="password"
            label="Password"
            description="Enter your password"
            name="password"
            required
            type="password"
            placeholder="Enter your password"
          />
          <Button type="submit" className="w-full">
            Join
          </Button>
          <AuthButtons />
        </Form>
      </div>
    </div>
  );
}
