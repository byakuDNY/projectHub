import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "This tool has revolutionized how we manage our projects. Highly recommended!",
      author: "Jane Doe, CEO of TechCorp",
    },
    {
      quote:
        "The ease of use and powerful features make this the best project management tool we've used.",
      author: "John Smith, Project Manager at InnovateCo",
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <blockquote className="mb-4 text-lg">
                  &quot{testimonial.quote}&quot
                </blockquote>
                <p className="text-right font-semibold">
                  - {testimonial.author}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
