import { FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function EmptySummary() {
  return (
    <div className="text-center py-12">
      <div className="flex flex-col items-center gap-4">
        <FileText className="w-16 h-16 text-gray-400" />

        <h3 className="text-xl text-gray-600 font-seimbold">No Summaries</h3>
        <p className="text-gray-500 max-w-md">
          Upload your first PDF to get AI-powered summaries.
        </p>
        <Link href="/upload">
          <Button
            className="mt-4 text-white bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 hover:no-underline"
            variant={"link"}
          >
            Create Your first Summary
          </Button>
        </Link>
      </div>
    </div>
  );
}
