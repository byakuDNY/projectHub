import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: "$9.99",
      features: ["5 Projects", "10 Team Members", "Basic Analytics"],
    },
    {
      name: "Pro",
      price: "$19.99",
      features: [
        "Unlimited Projects",
        "Unlimited Team Members",
        "Advanced Analytics",
        "Priority Support",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "All Pro Features",
        "Dedicated Account Manager",
        "Custom Integrations",
        "On-Premise Option",
      ],
    },
  ];

  return (
    <section className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Pricing Plans
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="mb-4 text-3xl font-bold">{plan.price}</p>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Choose Plan</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
