import Header from "@/app/components/landing/Header";
import Hero from "@/app/components/landing/Hero";
import Section from "@/app/components/landing/Section";
import Quotes from "@/app/components/landing/Quotes";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />
      <Hero />
      <Section />
      <Quotes />
    </div>
  );
}