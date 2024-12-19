import Link from "next/link";

import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="w-full bg-primary py-12 text-primary-foreground md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Ready to Streamline Your Projects?
          </h2>
          <p className="mx-auto max-w-[700px] text-primary-foreground/90 md:text-xl">
            Start your free trial today and experience the power of efficient
            project management.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href={"/sign-up"}>Start Free Trial</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
