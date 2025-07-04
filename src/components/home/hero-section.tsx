import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowRight, Sparkles, SparklesIcon } from "lucide-react";
import {
  MotionDiv,
  MotionH1,
  MotionH2,
  MotionSection,
  MotionSpan,
} from "../common/motion-wrapper";
import { ContainerVariants, ItemVariants } from "../../../utils/constants";

const ButtonVariants = {
  scale: 1.05,
  transition: {
    type: "spring",
    damping: 10,
    stiffness: 300,
  },
};

export default function HeroSection() {
  return (
    <>
      <MotionSection
        variants={ContainerVariants}
        initial="hidden"
        animate="visible"
        className="relative mx-auto flex flex-col z-0 items-center justify-center py-15 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl"
      >
        <MotionDiv
          variants={ItemVariants}
          className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group hover:cursor-pointer"
        >
          <Badge
            variant={"secondary"}
            className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors duration-200"
          >
            <Sparkles className="h-6 w-6 mr-2 text-rose-500" />
            <p className="text-base text-rose-500">Powered by AI</p>
          </Badge>
        </MotionDiv>

        <MotionH1
          variants={ItemVariants}
          className="font-bold py-6 text-center"
        >
          Tranform PDFs into{" "}
          <span className="relative inline-block">
            <MotionSpan
              whileHover={ButtonVariants}
              className="relative z-10 px-2"
            >
              concise
            </MotionSpan>{" "}
            <span
              className="absolute inset-0 bg-rose-200/50 -rotate-2  rounded-lg transform -skew-y-1"
              aria-hidden="true"
            ></span>{" "}
          </span>
          summaries
        </MotionH1>
        <MotionH2
          variants={ItemVariants}
          className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-2xl text-gray-600"
        >
          Get a beautiful summary reel of your document in seconds
        </MotionH2>
        <MotionDiv variants={ContainerVariants} whileHover={ButtonVariants}>
          <Button
            variant={"link"}
            className="text-white mt-6 text-base sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 lg:mt-16 bg-linear-to-r from-slate-600 to-rose-500 hover:from-rose-500 hover:to-slate-900 hover:no-underline font-bold shadow-lg transition-all duration-300"
          >
            <Link href="" className="flex gap-2 items-center">
              <span>Try Summarize</span>
              <ArrowRight className="animate-pulse" />
            </Link>
          </Button>
        </MotionDiv>
      </MotionSection>
    </>
  );
}
