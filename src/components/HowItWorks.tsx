import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    number: "01",
    title: "Install Extension",
    description: "Add to Chrome in one click",
  },
  {
    number: "02",
    title: "Set Up Profile",
    description: "Enter your details once in the popup",
  },
  {
    number: "03",
    title: "Auto-Fill Forms",
    description: "Watch fields fill automatically as you browse",
  },
];

export const HowItWorks = () => {
  return (
    <section className="bg-background py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="border-none bg-card shadow-md transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-8 text-center">
                    <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent text-2xl font-bold text-accent-foreground">
                      {step.number}
                    </div>
                    <h3 className="mb-3 text-xl font-semibold text-card-foreground">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
                
                {/* Connector line (hidden on last item and mobile) */}
                {index < steps.length - 1 && (
                  <div className="absolute top-1/2 left-full hidden h-0.5 w-full -translate-y-1/2 bg-border md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
