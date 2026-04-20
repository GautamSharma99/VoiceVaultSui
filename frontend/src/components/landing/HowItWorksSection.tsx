import { Upload, Link2, Bot, Coins, ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Upload,
    title: "Upload Your Voice",
    description: "Record or upload audio samples. AI builds your custom voice model.",
  },
  {
    step: "02",
    icon: Link2,
    title: "Mint On-Chain",
    description: "Register as a VoiceIdentity NFT on Sui. Instantly discoverable globally.",
  },
  {
    step: "03",
    icon: Bot,
    title: "Deploy an Agent",
    description: "Pick a template, configure LLM + price per call. Go live in seconds.",
  },
  {
    step: "04",
    icon: Coins,
    title: "Earn Per Call",
    description: "Full licenses, x402 micropayments, per-call fees — all split on-chain automatically.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
            How <span className="gradient-text">VoiceVault</span> Works
          </h2>
          <p className="text-muted-foreground text-sm">Voice to earning agent in four steps</p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-secondary/20 -translate-y-1/2" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="glass-card p-6 text-center relative z-10 h-full">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-background px-3 py-1 rounded-full border border-primary/30">
                    <span className="font-display text-sm font-bold text-primary">{step.step}</span>
                  </div>
                  <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 mb-4 mt-4">
                    <step.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-display text-base font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-20">
                    <ArrowRight className="h-5 w-5 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
