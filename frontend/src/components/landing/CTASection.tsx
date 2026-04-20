import { Button } from "@/components/ui/button";
import { ArrowRight, Bot } from "lucide-react";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="glass-card max-w-3xl mx-auto p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 rounded-xl p-px bg-gradient-to-r from-primary via-accent to-primary opacity-50" />
          <div className="absolute inset-px rounded-xl bg-card" />

          <div className="relative z-10">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              Your voice should{" "}
              <span className="gradient-text">work while you sleep.</span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8 text-sm">
              Mint on Sui. Deploy an agent. Earn per call — license or x402 micropayment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/upload">
                <Button variant="gradient" size="xl">
                  Create Your Voice
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/deploy">
                <Button size="xl" className="bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20">
                  <Bot className="h-5 w-5" />
                  Deploy an Agent
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
