// src/pages/Home.js
import React from "react";
import HeroSection from "../components/user/HeroSection";
import StructureSection from "../components/user/StructureSection";
import ProgramKerjaSection from "../components/user/ProgramKerjaSection";
import KegiatanSection from "../components/user/KegiatanSection";
import EkskulSection from "../components/user/EkskulSection";
import InformasiSection from "../components/user/InformasiSection";
import SaranSection from "../components/user/SaranSection";

function Home() {
  return (
    <div>
      <HeroSection />
      <StructureSection />
      <ProgramKerjaSection />
      <KegiatanSection />
      <EkskulSection />
      <InformasiSection />
      <SaranSection />
    </div>
  );
}

export default Home;
