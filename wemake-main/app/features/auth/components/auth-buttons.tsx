import { GithubIcon, LockIcon, MailIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { Separator } from "~/common/components/ui/separator";
import { Link } from "react-router";
export default function AuthButtons() {
  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="w-full flex flex-col items-center gap-2">
        <Separator className="w-full" />
        <span className="text-xs text-muted-foreground uppercase font-semibold">
          Or continue with
        </span>
        <Separator className="w-full" />
      </div>
      <div className="w-full flex flex-col gap-2">
        <Button variant={"outline"} className="w-full" asChild>
          <Link to="/auth/social/email/start">
            <MailIcon className="w-4 h-4" />
            Email
          </Link>
        </Button>
        <Button variant={"outline"} className="w-full" asChild>
          <Link to="/auth/social/github/start">
            <GithubIcon className="w-4 h-4" />
            Github
          </Link>
        </Button>
        <Button variant={"outline"} className="w-full" asChild>
          <Link to="/auth/otp/start">
            <LockIcon className="w-4 h-4" />
            OTP
          </Link>
        </Button>
      </div>
    </div>
  );
}
