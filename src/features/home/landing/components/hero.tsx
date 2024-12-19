import Link from "next/link";

import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Streamline Your Projects
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
              Effortlessly manage your projects, collaborate with your team, and
              meet deadlines with ease.
            </p>
          </div>
          <div className="space-x-4">
            <Button asChild>
              <Link href="/sign-up">Get Started</Link>
            </Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
