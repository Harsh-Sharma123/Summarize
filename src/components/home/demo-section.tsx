import { Pizza } from "lucide-react";
import SummaryViewer from "../summary/summary-viewer";
import { MotionDiv, MotionH3 } from "../common/motion-wrapper";

const SUMMARY = `
🚀 Next.js: The React Framework That Does It All
•🎯Next.js makes web apps faster, smarter, and easier to build — all in one seamless framework.
•📌From SEO to server-side rendering, it powers modern web experiences like a pro.

#Document Details
•📄Type: Web Development Framework Overview
•👥For: Developers, Designers, and Tech Teams

#Key Highlights
•🚀Blazing-fast performance with server-side rendering (SSR) and static site generation (SSG)
•⭐Built-in routing, image optimization, and API routes out of the box
•💫Incredible developer experience with full TypeScript support and hot reloading


#Why It Matters
•💡Next.js isn’t just a framework — it’s a full-stack toolkit. It simplifies the complex parts of web development (like SSR and routing) and lets you focus on building great user experiences. Whether you're launching a startup or scaling a global product, Next.js gives you speed and flexibility.

#Main Points
•🎯Main insight or finding: Next.js combines client-side and server-side power in one framework
•💪Key strength or advantage: Automatic code splitting + optimized performance = lightning-fast load times
•🔥Important outcome or result: Websites rank higher, load faster, and deliver better UX across the board

#Pro Tips
•⭐Use getStaticProps and getServerSideProps to control when and how your pages are rendered
•💎Take advantage of next/image to serve responsive images with automatic optimization
•🌟Deploy easily with Vercel for seamless CI/CD and global edge network performance

#3 Key Terms to Know
•📚SSR (Server-Side Rendering): Pages are rendered on the server at request time — great for dynamic content
•🔍SSG (Static Site Generation): Pages are pre-rendered at build time — perfect for blogs, docs, and marketing sites

#Bottom Line
•💫Next.js is the go-to React framework for building modern, high-performance web apps — fast, scalable, and ready for anything.
`;

export default function DemoSection() {
  return (
    <section className="relative">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem]
        -translate-x-1/2 bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%,74.1% 44.1%)",
            }}
          ></div>
        </div>

        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-gray-100/80 backdrop-blue-xs border border-gray-500/20 mb-4">
            <Pizza className="w-6 h-6 text-rose-500" />
          </div>
          <MotionH3
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6 text-center"
          >
            Watch how Summarize transforms{" "}
            <span className="bg-linear-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent">
              {" "}
              this Next.js course PDF
            </span>{" "}
            into an easy-to-read summary!
          </MotionH3>
        </div>

        <div className="flex justify-center items-center mt-8 px-2 sm:px-4 lg:px-6">
          <MotionDiv
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <SummaryViewer summary={SUMMARY} />
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
