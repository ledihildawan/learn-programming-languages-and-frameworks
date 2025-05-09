import { Form, Link, Outlet, NavLink } from "react-router";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/common/components/ui/dialog";
import { Badge } from "~/common/components/ui/badge";
import { Textarea } from "~/common/components/ui/textarea";
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/common/components/ui/button";

export default function ProfileLayout() {
  return (
    <div className="space-y-10">
      <div className="flex items-center gap-4">
        <Avatar className="size-40">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>N</AvatarFallback>
        </Avatar>
        <div className="space-y-3">
          <div className="flex gap-2">
            <h1 className="text-2xl font-semibold">Debora Kwon</h1>
            <Button variant="outline" asChild>
              <Link to="/my/settings">Edit Profile</Link>
            </Button>
            <Button variant="secondary">Follow</Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary">Message</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Message</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  <span className="text-sm text-muted-foreground">
                    Send a message to Debora
                  </span>
                  <Form className="space-y-4">
                    <Textarea
                      placeholder="Message"
                      className="resize-none"
                      rows={4}
                    />
                    <Button type="submit">Send</Button>
                  </Form>
                </DialogDescription>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-sm text-muted-foreground">@debora-k</span>
            <Badge variant="secondary">Full Stack Developer</Badge>
            <Badge variant="secondary">123 followers</Badge>
            <Badge variant="secondary">123 following</Badge>
          </div>
        </div>
      </div>
      <div className="flex gap-5">
        {[
          { label: "About", to: "/users/username" },
          { label: "Products", to: "/users/username/products" },
          { label: "Posts", to: "/users/username/posts" },
        ].map((item) => (
          <NavLink
            end
            key={item.label}
            className={({ isActive }) =>
              cn(
                buttonVariants({ variant: "outline" }),
                isActive && "bg-accent text-foreground"
              )
            }
            to={item.to}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
      <div className="max-w-screen-md">
        <Outlet />
      </div>
    </div>
  );
}
