import BgGradient from "@/components/common/bg-gradient";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center">
      <div className="py-6 lg:py-8 px-4 sm:px-6 lg:px-8 lg:pt-12 mx-auto max-w-5xl">
        <BgGradient className="from-rose-400 via-via-300 to-orange-200" />
        <SignUp />
      </div>
    </div>
  );
}
