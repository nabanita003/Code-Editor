import Navbar from "../components/Navbar";
import PageWrapper from "../components/PageWrapper";
import Reveal from "../components/Reveal";

const About = () => {
  return (
    <>
      <Navbar />
      <PageWrapper>
        <div className="min-h-screen bg-[#0f0e0e] text-white px-6 md:px-20 py-10">

          <Reveal>
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-10">
              About Us
            </h1>
          </Reveal>

          <Reveal>
            <p className="text-gray-400 text-lg text-center max-w-3xl mx-auto">
              We provide a powerful online coding platform where users can write,
              execute, and manage projects seamlessly.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {["Fast Execution", "Secure Storage", "Multi-language Support"].map((item, i) => (
              <Reveal key={i}>
                <div className="bg-[#1a1a1a] p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition">
                  <h2 className="text-xl font-semibold mb-2">{item}</h2>
                  <p className="text-gray-400">High performance and reliability.</p>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </PageWrapper>
    </>
  );
};

export default About;