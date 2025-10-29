import { Card, CardContent } from "@/components/ui/card";
import { Wand2, Brain, Lock, Users, Lightbulb } from "lucide-react";

const features = [
  {
    icon: Wand2,
    title: "Instant Field Recognition",
    description: "Detects and fills form fields across websites automatically",
  },
  {
    icon: Brain,
    title: "AI Smart Suggestions",
    description: "Generate personalized responses for open-ended fields",
  },
  {
    icon: Lock,
    title: "Privacy-First Security",
    description: "Your data stays private on your device",
  },
  {
    icon: Users,
    title: "Multiple Profiles",
    description: "Manage personal and professional profiles easily",
  },
  {
    icon: Lightbulb,
    title: "Context Understanding",
    description: "AI understands context for natural suggestions",
  },
];

export const Features = () => {
  return (
    <section className="bg-gradient-subtle py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              Powerful Features
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to fill forms faster and smarter
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="group border-none bg-card shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent transition-all duration-300 group-hover:scale-110">
                      <Icon className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
