import React, { useState } from "react";
import Navbar from "../components/Navbar";
import PageWrapper from "../components/PageWrapper";
import { toast } from "react-toastify";
import { api_base_url } from "../helper";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${api_base_url}/contact/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (data.success) {
        toast.success(data.msg);
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Navbar />
      <PageWrapper>
        <div className="min-h-screen bg-[#0f0e0e] text-white flex items-center justify-center px-6">

          <div className="bg-[#1a1a1a] p-8 rounded-2xl shadow-lg w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Contact Us</h1>

            <input
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
              type="text"
              placeholder="Your Name"
              className="w-full p-3 mb-4 rounded bg-[#2a2a2a]"
            />

            <input
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
              type="email"
              placeholder="Your Email"
              className="w-full p-3 mb-4 rounded bg-[#2a2a2a]"
            />

            <textarea
              value={form.message}
              onChange={(e) => setForm({...form, message: e.target.value})}
              placeholder="Your Message"
              className="w-full p-3 mb-4 rounded bg-[#2a2a2a] resize-none h-30"
            />

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-500 hover:bg-blue-600 p-3 rounded transition"
            >
              Send Message
            </button>
          </div>

        </div>
      </PageWrapper>
    </>
  );
};

export default Contact;