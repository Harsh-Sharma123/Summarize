import { ExternalLink, FileText } from "lucide-react";
import { Button } from "../ui/button";
import DownloadSummaryButton from "./download-summary-button";

export default function SourceInfo({
  filename,
  originalFileUrl,
  title,
  summaryText,
  createdAt,
}: {
  filename: string;
  originalFileUrl: string;
  title: string;
  summaryText: string;
  createdAt: string;
}) {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <div className="flex items-center justify-center gap-2">
        <FileText className="h-4 w-4 text-rose-400" />
        <span>Source : {filename}</span>
      </div>
      <div className="flex gap-2">
        <Button
          variant={"ghost"}
          size="sm"
          className="h-8 px-3 text-rose-600 hover:text-rose-700 hover:bg-rose-50"
          asChild
        >
          <a href={originalFileUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-1" />
            View Original
          </a>
        </Button>
        <DownloadSummaryButton
          title={title}
          originalFileUrl={originalFileUrl}
          summaryText={summaryText}
          fileName={filename}
          createdAt={createdAt}
        />
      </div>
    </div>
  );
}
