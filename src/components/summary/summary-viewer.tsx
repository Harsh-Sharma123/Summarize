"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const parseSection = (section: string) => {
  const [title, ...content] = section.split("\n");
  const cleanTitle = title.startsWith("#")
    ? title.substring(1).trim()
    : title.trim();

  //   console.log(typeof content);

  const points: String[] = [];

  let currentPoint = "";
  content.forEach((line) => {
    const trimmedline = line.trim();
    if (trimmedline.startsWith("•")) {
      if (currentPoint) points.push(currentPoint.trim());
      currentPoint = trimmedline;
    } else if (!trimmedline) {
      if (currentPoint) points.push(currentPoint.trim());
      currentPoint = "";
    }
    currentPoint += " " + trimmedline;
  });

  if (currentPoint) points.push(currentPoint.trim());

  return {
    title: cleanTitle,
    points: points.filter(
      (point) => point && !point.startsWith("#") && !point.startsWith("[Choose")
    ),
  };
};

export default function SummaryViewer({ summary }: { summary: string }) {
  const [currentSection, setCurrentSection] = useState(0);
  const sections = summary
    .split("\n#")
    .map((section) => section.trim())
    .filter(Boolean)
    .map(parseSection);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{sections[currentSection].title}</CardTitle>
      </CardHeader>
      <CardContent>
        {JSON.stringify(sections[currentSection].points)}
      </CardContent>
    </Card>
  );
}
