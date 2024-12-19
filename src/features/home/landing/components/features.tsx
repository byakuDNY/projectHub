import { CheckCircle } from "lucide-react";

const Features = () => {
  const features = [
    "Task Management",
    "Team Collaboration",
    "Time Tracking",
    "Resource Allocation",
    "Gantt Charts",
    "Reporting & Analytics",
  ];

  return (
    <section className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Features
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-4">
              <CheckCircle className="text-green-500" />
              <span className="text-xl font-semibold">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
