import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import type { Route } from "./+types/team-page";
import { Hero } from "~/common/components/hero";
import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";

export const meta: Route.MetaFunction = () => [
  { title: "Team Details | wemake" },
];

export default function TeamPage() {
  return (
    <div className="space-y-20">
      <Hero title="Join Debora's Team" />
      <div className="grid grid-cols-6 gap-40 items-start">
        <div className="col-span-4 grid grid-cols-4 gap-5">
          {[
            {
              title: "Product Name",
              value: "Doggie Social",
            },
            {
              title: "Stage",
              value: "MVP",
            },
            {
              title: "Team size",
              value: "10",
            },
            {
              title: "Available equity",
              value: "50%",
            },
          ].map((item) => (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {item.title}
                </CardTitle>
                <CardContent className="p-0 font-bold text-2xl">
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                </CardContent>
              </CardHeader>
            </Card>
          ))}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Looking for
              </CardTitle>
              <CardContent className="p-0 font-bold text-2xl">
                {[
                  "Product Manager",
                  "Full Stack Developer",
                  "UI/UX Designer",
                  "Frontend Developer",
                ].map((item) => (
                  <Badge variant="secondary">{item}</Badge>
                ))}
              </CardContent>
            </CardHeader>
          </Card>
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Idea Description
              </CardTitle>
              <CardContent className="p-0 font-medium text-lg">
                <p>
                  Doggie Social is a social media platform for dogs. It allows
                  dogs to connect with each other and share their experiences.
                </p>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
        <aside className="col-span-2 space-y-5 border rounded-lg p-6 shadow-sm">
          <div className="flex gap-5">
            <Avatar className="size-14">
              <AvatarImage src="https://github.com/debora-k.png" />
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h4 className="font-medium text-lg">Debora</h4>
              <Badge variant="secondary">Enterpreneur</Badge>
            </div>
          </div>
          <Form className="space-y-5">
            <InputPair
              label="Introduce yourself"
              name="introduction"
              id="introduction"
              type="text"
              description="Introduce yourself to the team."
              placeholder="e.g. I'm a product manager with 5 years of experience in the industry."
              required
              textArea
            />
            <Button type="submit" className="w-full">
              Get in touch
            </Button>
          </Form>
        </aside>
      </div>
    </div>
  );
}
