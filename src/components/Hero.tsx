import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold text-primary-foreground sm:text-5xl lg:text-6xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Fill Forms Instantly with AI-Powered Suggestions
          </h1>
          <p className="mb-8 text-lg text-primary-foreground/90 sm:text-xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Accelerate your form filling with AI-powered suggestions. Save time, reduce errors, and enhance productivity.
          </p>
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <Button variant="hero" size="xl" className="gap-2">
              <Download className="h-5 w-5" />
              Download Extension
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-white/10 blur-3xl"></div>
    </section>
  );
};
