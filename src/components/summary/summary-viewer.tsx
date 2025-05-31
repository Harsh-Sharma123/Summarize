"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import NavigationControls from "./navigation-controls";
import ProgressBar from "./progress-bar";
import ContentSection from "./content-section";

export const parseSection = (
  section: string
): { title: string; points: string[] } => {
  const [title, ...content] = section.split("\n");

  const cleanTitle = title.startsWith("#")
    ? title.substring(1).trim()
    : title.trim();

  const points: string[] = [];
  let currentPoint = "";

  content.forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith("•")) {
      if (currentPoint) points.push(currentPoint.trim());
      currentPoint = trimmedLine;
    } else if (!trimmedLine) {
      if (currentPoint) points.push(currentPoint.trim());
      currentPoint = "";
    } else {
      currentPoint += " " + trimmedLine;
    }
  });

  if (currentPoint) points.push(currentPoint.trim());

  return {
    title: cleanTitle,
    points: points.filter(
      (point) => point && !point.startsWith("#") && !point.startsWith("[Choose")
    ),
  };
};

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col gap-2 mb-2 sticky top-0 pt-2 pb-4 bg-background/80 backdrop-blur-xs z-10">
      <h2 className="text-3xl lg:text-4xl text-center font-bold flex justify-center items-center">
        {title}
      </h2>
    </div>
  );
};

export default function SummaryViewer({ summary }: { summary: string }) {
  const [currentSection, setCurrentSection] = useState(0);

  const sectionSelect = (index: number) => {
    setCurrentSection(Math.min(Math.max(index, 0), sections.length - 1));
  };

  const handlePrevious = () => {
    setCurrentSection((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentSection((next) => Math.min(next + 1, sections.length - 1));
  };

  const sections = summary
    .split("\n#")
    .map((section) => section.trim())
    .filter(Boolean)
    .map(parseSection);
  return (
    <Card className="relative px-2 h-[500px] sm:h-[600px] lg:h-[700px] w-full xl:w-[600px] overflow-hidden bg-linear-to-br from-background via-background/95 to-rose-500/5 backdrop-blur-lg shadow-2xl rounded-3xl border border-rose-500/10">
      <ProgressBar currentSection={currentSection} sections={sections} />
      <div className="h-full overflow-y-auto scrollbar-hide pt-12 sm:pt-16 sm:pb-24">
        <div className="px-4 sm:px-6">
          <SectionTitle title={sections[currentSection]?.title || ""} />
          <ContentSection
            title={sections[currentSection]?.title || ""}
            points={sections[currentSection]?.points || []}
          />
        </div>
      </div>
      <NavigationControls
        onPrevious={handlePrevious}
        currentSection={currentSection}
        totalSections={sections.length}
        onSectionSelect={sectionSelect}
        onNext={handleNext}
      />
    </Card>
  );
}
