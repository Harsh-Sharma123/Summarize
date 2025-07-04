import Link from "next/link";
import { Card } from "../ui/card";
import DeleteButton from "./delete-button";
import { ExternalLink, FileText } from "lucide-react";
import { cn, formatFileName } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { MotionDiv } from "../common/motion-wrapper";
import { ItemVariants } from "../../../utils/constants";

const SummaryHeader = ({
  fileUrl,
  title,
  createdAt,
}: {
  fileUrl: string;
  title: string;
  createdAt: string;
}) => {
  return (
    <div className="flex items-start gap-2 sm:gap4">
      <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-rose-400 mt-2" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center">
          <h3 className="text-base xl:text-lg font-semibold text-gray-900 truncate w-4/5 hover:underline">
            {title || formatFileName(fileUrl)}
          </h3>
          <ExternalLink className="w-4 h-4 ml-1" />
        </div>
        <p className="text-sm text-gray-500">
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <span
      className={cn(
        "px-3 py-1 text-xs font-medium rounded-full capitalize",
        status === "completed"
          ? "bg-green-100 text-green-400"
          : "bg-yellow-100 text-yellow-800"
      )}
    >
      {status}
    </span>
  );
};

export default function SummaryCard({ summary }: { summary: any }) {
  return (
    <MotionDiv
      variants={ItemVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        scale: 1.02,
        transition: {
          duration: 0.2,
          ease: "easeOut",
        },
      }}
    >
      <Card className="relative w-full">
        <div className="flex flex-col gap-3 sm:gap-4  p-4 sm:p-6">
          <div className="flex justify-between">
            <Link href={`/summaries/${summary.id}`} className="block">
              <SummaryHeader
                fileUrl={summary.original_file_url}
                title={summary.title}
                createdAt={summary.created_at}
              />
            </Link>
            <DeleteButton summaryId={summary.id} />
          </div>
          <p className="text-gray-600 line-clamp-2 text-sm sm:text-base pl-2">
            {summary.summary_text}
          </p>

          <div className="flex justify-between items-center mt-2 sm:mt-4">
            <StatusBadge status={summary.status} />
          </div>
        </div>
      </Card>
    </MotionDiv>
  );
}
