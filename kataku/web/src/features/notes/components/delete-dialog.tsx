import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";

export type DeleteDialogClickEvent = "cancel" | "delete";

export function DeleteDialog({
  open,
  onClick,
  isPending,
}: {
  open: boolean;
  onClick: (action: DeleteDialogClickEvent) => void;
  isPending: boolean;
}) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Note?</AlertDialogTitle>
          <AlertDialogDescription className="leading-6">
            Are you sure you want to delete this note? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onClick("cancel")}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => onClick("delete")}>
            {isPending && <Loader2 className="animate-spin" />}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
