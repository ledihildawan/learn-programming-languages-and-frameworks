import InputPair from "~/common/components/input-pair";
import type { Route } from "./+types/otp-start-page";
import { Form } from "react-router";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Start OTP | wemake" }];
};

export default function OtpStartPage() {
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <div className="flex items-center flex-col justify-center w-full gap-10">
        <div className="text-center">
          <h1 className="text-4xl font-semibold">Login with OTP</h1>
          <p className="text-sm text-muted-foreground">
            We will send you a 4-digit code to verify your account
          </p>
        </div>
        <Form className="w-full max-w-sm space-y-5">
          <InputPair
            id="email"
            label="Email"
            description="Enter your email"
            name="email"
            required
            type="email"
          />
          <Button type="submit" className="w-full">
            Send OTP
          </Button>
        </Form>
      </div>
    </div>
  );
}
