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

export type DeleteDialogClickEvent = "cancel" | "delete";

export function DeleteDialog({
  open,
  onClick,
}: {
  open: boolean;
  onClick: (action: DeleteDialogClickEvent) => void;
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
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
