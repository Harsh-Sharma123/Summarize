import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <Card className="relative px-2 h-[500px] sm:h-[600px] lg:h-[700px] w-full xl:w-[600px] overflow-hidden bg-linear-to-br from-background via-background/95 to-rose-500/5 backdrop-blur-lg shadow-2xl rounded-3xl border border-rose-500/10">
      <div className="absolute top-0 left-0 right-0 z-20 bg-background/80 backdrop-blur-xs pt-4 pb-2 border-b border-rose-500/10">
        <div className="px-4 flex gap-1.5">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="h-1.5 flex-1 rounded-full bg-rose-500/10 overflow-hidden"
            >
              <div
                className={cn(
                  "h-full bg-linear-to-r from-gray-500 to-rose-600 animate-pulse",
                  index === 0 ? "w-full" : "w-0"
                )}
              ></div>
            </div>
          ))}
        </div>
      </div>

      {/* Loading Content */}
      <div className="h-full overflow-y-auto scrollbar-hide pt-16 pb-24">
        <div className="px-6">
          <div className="flex flex-col gap-2 m-6 sticky top-0 pt-2 pb-4 bg-background/80 backdrop-blur-xs z-10">
            <Skeleton className="h-12 w-3/4 mx-ato bg-rose-500/10" />
          </div>
        </div>

        <div className="space-y-4">
          {[1, 2, 3, 4].map((_, index) => (
            <div
              key={index}
              className="group relative bg-linear-to-r from-gray-500[0.08] to-gray-600/[0.03] p-4 rounded-2xl border bobrder-gray-500/10"
            >
              <div className="relative flex gap-4 items-center">
                <div className="flex items-center">
                  <Skeleton className="h-8 w-8 rounded-full bg-rose-500/10" />
                </div>
                <div className="flex-1">
                  <Skeleton className="h-6 w-full bg-rose-500/10" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
