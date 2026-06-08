import Courses from "../../components/landing/Courses";
import CTA from "../../components/landing/CTA";
import Hero from "../../components/landing/Hero";
import Notebooks from "../../components/landing/Notebooks";
import Playlists from "../../components/landing/Playlists";
import Stats from "../../components/landing/Stats";
import Teacher from "../../components/landing/Teacher";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Stats />
        <Playlists />
        <Courses />
        <Notebooks />
        <Teacher />
        <CTA />
      </main>
    </>
  );
}
