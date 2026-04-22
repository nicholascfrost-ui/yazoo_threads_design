import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Manifesto from "./components/Manifesto";
import Meter from "./components/Meter";
import Marquee from "./components/Marquee";
import FieldGuide from "./components/FieldGuide";
import Configurator from "./components/Configurator";
import Spread from "./components/Spread";
import Popup from "./components/Popup";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Stats />
      <Manifesto />
      <Meter />
      <Marquee />
      <FieldGuide />
      <Configurator />
      <Spread />
      <Popup />
      <Footer />
    </>
  );
}
