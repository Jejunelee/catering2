import Header from "@/app/gifts/components/Header"
import Section1 from "@/app/gifts/components/Section1"
import Section2 from "@/app/gifts/components/Section2"


export default function Gifts() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />
      <Section1 />
      <Section2 />
    </div>
  );
}