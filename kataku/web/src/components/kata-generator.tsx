import { eden } from "@/lib/eden";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export interface KataGenerator {
  title: string;
  content: string;
}

export interface KataGeneratorProps {
  onGenerated: (data: KataGenerator) => void;
}

export default function KataGeneratorButton({
  onGenerated,
}: KataGeneratorProps) {
  const [idea, setIdea] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await eden.ai["kata-generator"].post({
        content: idea.trim() || "Poem about the moon",
      });

      onGenerated({
        title: res.data?.generatedTitle,
        content: res.data?.generatedContent,
      });

      setIsOpen(false);
    },
    onSuccess: async () => {},
    onError: () => {
      toast.error("Oops, something went wrong on the server's end!");
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Sparkles />
          <span>KataGenerator</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>KataGenerator</DialogTitle>
          <DialogDescription>
            Just drop an idea, and we’ll turn it into a piece of writing for you
            — easy, fast, and fun.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Label htmlFor="idea" className="text-right">
            Idea
          </Label>
          <Textarea
            id="idea"
            placeholder="Poem about the moon"
            rows={480}
            onChange={(e) => setIdea(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
          >
            {mutation.isPending && <Loader2 className="animate-spin" />}
            <span>Generate Writing</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
