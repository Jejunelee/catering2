import Header from "@/app/components/landing/Header";
import Hero from "@/app/components/landing/Hero";
import Section from "@/app/components/landing/Section";
import Quotes from "@/app/components/landing/Quotes";
import EventGallery from "@/app/components/landing/EventGallery";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <Hero />
      <Section />
      <Quotes />
      <EventGallery />
    </div>
  );
}