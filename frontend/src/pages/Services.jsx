import React from "react";
import Navbar from "../components/Navbar";
import PageWrapper from "../components/PageWrapper";
import Reveal from "../components/Reveal";

const services = [
  { title: "Code Editor", desc: "Write and edit code in real-time." },
  { title: "Run Code", desc: "Execute code instantly." },
  { title: "Project Management", desc: "Save and manage projects." },
];

const Services = () => {
  return (
    <>
      <Navbar />
      <PageWrapper>
        <div className="min-h-screen bg-[#0f0e0e] text-white px-6 md:px-20 py-10">

          <h1 className="text-4xl font-bold text-center mb-10">
            Our Services
          </h1>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <Reveal key={i}>
                <div className="bg-[#1a1a1a] p-6 rounded-2xl shadow-lg hover:scale-105 transition">
                  <h2 className="text-xl font-semibold mb-2">{s.title}</h2>
                  <p className="text-gray-400">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </PageWrapper>
    </>
  );
};

export default Services;