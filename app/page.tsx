
import FilterButton from "./components/homepage/FilterButton";
import HeroSection from "./components/homepage/HeroSection";
import RecentUpdates from "./components/homepage/RecentUpdates";


export default function Home() {

  return (
    <div style={{marginBottom: "1rem"}}>
      <HeroSection />
      <RecentUpdates />
    </div>
  )
}
