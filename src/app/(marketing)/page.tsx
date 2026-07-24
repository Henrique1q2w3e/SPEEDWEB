import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Services } from "@/components/home/Services";
import { Differentials } from "@/components/home/Differentials";
import { Values } from "@/components/home/Values";
import { HowItWorks } from "@/components/home/HowItWorks";
import { TechStack } from "@/components/home/TechStack";
import { BudgetAndLeadFlow } from "@/components/forms/BudgetAndLeadFlow";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Differentials />
      <Values />
      <HowItWorks />
      <BudgetAndLeadFlow />
      <TechStack />
    </>
  );
}
