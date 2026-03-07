import Header from "@/app/events/components/Header"
import Section1 from "@/app/events/components/Section1"
import Section2 from "@/app/events/components/Section2"
import Section3 from "@/app/events/components/Section3"
import Section4 from "@/app/events/components/Section4"
export default function Events() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
    </div>
  );
}