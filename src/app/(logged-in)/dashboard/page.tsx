import BgGradient from "@/components/common/bg-gradient";
import EmptySummary from "@/components/summary/empty-summary";
import SummaryCard from "@/components/summary/summary-card";
import { Button } from "@/components/ui/button";
import { Getsummaries } from "@/lib/summaries";
import { auth, currentUser } from "@clerk/nextjs/server";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const uploadLimit = 5;

  const user = await currentUser();

  const userId = user?.id;

  if (!userId) {
    return redirect("/sign-in");
  }

  const summaries = await Getsummaries(userId);
  //   console.log(summaries);

  return (
    <main className="min-h-screen">
      <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200" />
      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-2 py-12 sm:py-24">
          <div className="flex gap-4 mb-8 justify-between">
            <div className="flex flex-col gap-2">
              <h2 className="text-4xl font-bold trackinng0tight bg-linear-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent">
                Your Summaries
              </h2>
              <p className="text-gray-600">
                Transform your PDFs into consise, actionable insights
              </p>
            </div>

            <Button
              variant={"link"}
              className="bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 hover:scale-105 transition-all duration-300 group hover:no-underline"
            >
              <Link href="/upload" className="flex items-center text-white">
                <Plus className="w-5 h-5 mr-2" />
                New Summary
              </Link>
            </Button>
          </div>

          <div className="mb-6">
            <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 text-rose-800">
              <p className="text-sm">
                You've reached the limit of 5 uploads on the Basic Plan.
                <Link
                  href="/#pricing"
                  className="text-rose-800 underline font-medium underline-offset-4 inine-flex items-center"
                >
                  Click here to upgrade to Pro{" "}
                  <ArrowRight className="w-4 h-4 inline" />
                </Link>{" "}
                for unlimited uploads.
              </p>
            </div>
          </div>

          {summaries.length === 0 ? (
            <EmptySummary />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
              {summaries.map((summary, ind) => (
                <SummaryCard key={ind} summary={summary} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
