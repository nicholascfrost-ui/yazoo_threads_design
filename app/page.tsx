import Nav from "./components/Nav";
import ScrollFix from "./components/ScrollFix";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Manifesto from "./components/Manifesto";
import Marquee from "./components/Marquee";
import FieldGuide from "./components/FieldGuide";
import Configurator from "./components/Configurator";
import Spread from "./components/Spread";
import Popup from "./components/Popup";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <ScrollFix />
      <Nav />
      <Hero />
      <Stats />
      <Manifesto />
      <Marquee />
      <FieldGuide />
      <Configurator />
      <Spread />
      <Popup />
      <Footer />
    </>
  );
}
