import Home from "@/components/Home";
import Destinations from "@/components/Destinations";
import Membersec from "@/components/Membersec";
import About from "@/components/About";
import Clientsec from "@/components/Clientsec";
import Properties from "@/components/Properties";
import Bannersec from "@/components/Bannersec";
import Getstarted from "@/components/Getstarted";
import Activities from "@/components/Activities";
import Overview from "@/components/Overview";

function page() {
  return (
    <>
      <Home />
      <Overview />
      <About />
      <Membersec />
      <Properties />
      <Getstarted />
      <Destinations />
      <Bannersec />
      <Clientsec />
      <Activities />
    </>
  );
}

export default page;
