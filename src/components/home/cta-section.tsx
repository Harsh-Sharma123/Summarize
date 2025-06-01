import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { MotionDiv, MotionSection } from "../common/motion-wrapper";
import { ContainerVariants } from "../../../utils/constants";

export default function CTASection() {
  return (
    <MotionSection
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, staggerChildren: 0.2, delayChildren: 0.2 }}
      className="bg-gray-50 py-12"
    >
      <div className="py-12 lg:py-24 px-4 sm:px-6 lg:px-8 lg:pt-12 mx-auto max-w-5xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Save Hours of Reading Time ?
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Transform lengthy documents into clear, actionable insights with
              our AI-powered summarise
            </p>
          </div>

          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
            <div className="">
              <Button
                size="lg"
                variant={"link"}
                className="w-full min-[400px]:w-auto bg-linear-to-r  from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900 hover:text-white text-white transition-all duration-300"
              >
                <Link
                  href="/#pricing"
                  className="flex items-center justify-center !decoration-none"
                >
                  Get Started{" "}
                  <ArrowRight
                    size={18}
                    className="animate-pulse ml-2 h-4 w-4"
                  ></ArrowRight>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
