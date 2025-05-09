import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { eden } from "@/lib/eden";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export function SectionCards() {
  const query = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      try {
        const res = await eden.api.dashboard.index.get();

        return {
          ...res.data.data,
          mostRecentlyViewed: localStorage.getItem("recent")
            ? JSON.parse(localStorage.getItem("recent") as string)?.[0]
            : null,
        };
      } catch (error) {}
    },
  });

  const shortText = (value: string) => {
    return value?.length > 32 ? `${value.slice(0, 32)}...` : value;
  };

  const shortedLastEditedNote = useMemo(
    () => shortText(query.data?.lastEditedNote?.title),
    [query.data?.lastEditedNote],
  );
  const mostRecentlyViewedNote = useMemo(
    () => shortText(query.data?.mostRecentlyViewed?.title),
    [query.data?.mostRecentlyViewed],
  );

  if (query.isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Notes</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {query.data.totalNotes}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Total notes created
          </div>
          <div className="text-muted-foreground">
            Total number of notes created in the system
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Notes Created This Month</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {query.data.totalNotesThisMonth}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            New notes added this month
          </div>
          <div className="text-muted-foreground">
            Reflects notes created in the current month
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Last Edited Note</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            "{shortedLastEditedNote}"
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Recently edited note
          </div>
          <div className="text-muted-foreground">
            This note was last updated on{" "}
            {new Date(query.data.lastEditedNote.updatedAt).toLocaleString()}
          </div>
        </CardFooter>
      </Card>
      {query.data.mostRecentlyViewed && (
        <Card className="@container/card">
          <CardHeader className="relative">
            <CardDescription>Most Recently Viewed</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              "{mostRecentlyViewedNote}"
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Last viewed note
            </div>
            <div className="text-muted-foreground">
              This note was last viewed on{" "}
              {new Date(
                query.data.mostRecentlyViewed.viewedAt,
              ).toLocaleString()}
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
