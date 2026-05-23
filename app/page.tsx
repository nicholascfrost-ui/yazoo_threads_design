import Nav from "./components/Nav";
import ScrollFix from "./components/ScrollFix";
import Hero from "./components/Hero";
import Manifesto from "./components/Manifesto";
import Stats from "./components/Stats";
import Marquee from "./components/Marquee";
import FieldGuide from "./components/FieldGuide";
import Brands from "./components/Brands";
import Configurator from "./components/Configurator";
import Popup from "./components/Popup";
import PhotoGallery from "./components/PhotoGallery";
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
      <Brands />
      <Configurator />
      <Popup />
      <PhotoGallery />
      <Footer />
    </>
  );
}
