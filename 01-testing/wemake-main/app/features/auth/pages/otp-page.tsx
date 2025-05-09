import InputPair from "~/common/components/input-pair";
import type { Route } from "./+types/otp-page";
import { Form } from "react-router";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Start OTP | wemake" }];
};

export default function OtpPage() {
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <div className="flex items-center flex-col justify-center w-full gap-10">
        <div className="text-center">
          <h1 className="text-4xl font-semibold">Confirm OTP</h1>
          <p className="text-sm text-muted-foreground">
            Enter the 4-digit code we sent you
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
          <InputPair
            id="otp"
            label="OTP"
            description="Enter the 4-digit code we sent you"
            name="otp"
            required
            type="password"
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}
