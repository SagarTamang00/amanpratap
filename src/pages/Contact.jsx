import React, { useEffect, useState } from "react";

const Contact = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: "var(--color-bg-section)" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p
            className="uppercase tracking-[4px] text-xs sm:text-sm mb-3"
            style={{ color: "var(--color-accent)" }}
          >
            Contact
          </p>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold"
            style={{ color: "var(--color-heading)" }}
          >
            Let’s Work Together
          </h2>

          <p
            className="max-w-2xl mx-auto mt-4 text-sm sm:text-base leading-relaxed px-2"
            style={{ color: "var(--color-body)" }}
          >
            Connect with Nepali film director
            <span
              className="font-semibold ml-1"
              style={{ color: "var(--color-primary)" }}
            >
              Aman Pratap Adhikary
            </span>
            for collaborations, film projects, creative partnerships, or media
            inquiries.
          </p>
        </div>

        {/* Main Card */}
        <div
          className={`grid lg:grid-cols-5 rounded-3xl overflow-hidden transition-all duration-1000 ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{
            backgroundColor: "var(--color-bg)",
            boxShadow: "var(--shadow)",
          }}
        >

          {/* Left Info */}
          <div
            className="lg:col-span-2 p-8 sm:p-10"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">
              Contact Info
            </h3>

            <div className="space-y-6">

              <div>
                <p
                  className="text-xs uppercase tracking-[3px] mb-2"
                  style={{ color: "var(--color-accent-light)" }}
                >
                  Email
                </p>

                <a
                  href="mailto:aman@example.com"
                  className="text-white text-sm sm:text-base hover:underline break-all"
                >
                  aman@example.com
                </a>
              </div>

              <div>
                <p
                  className="text-xs uppercase tracking-[3px] mb-2"
                  style={{ color: "var(--color-accent-light)" }}
                >
                  Phone
                </p>

                <a
                  href="tel:+9779800000000"
                  className="text-white text-sm sm:text-base hover:underline"
                >
                  +977 9800000000
                </a>
              </div>

              <div>
                <p
                  className="text-xs uppercase tracking-[3px] mb-2"
                  style={{ color: "var(--color-accent-light)" }}
                >
                  Location
                </p>

                <p className="text-white text-sm sm:text-base">
                  Kathmandu, Nepal
                </p>
              </div>

              {/* Social */}
              <div className="pt-4">
                <p
                  className="text-xs uppercase tracking-[3px] mb-3"
                  style={{ color: "var(--color-accent-light)" }}
                >
                  Follow
                </p>

                <div className="flex flex-wrap gap-3">
                  {["Instagram", "Facebook", "YouTube"].map((social) => (
                    <a
                      key={social}
                      href="/"
                      className="px-4 py-2 rounded-full text-xs sm:text-sm transition-all duration-300 hover:scale-105"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.1)",
                        color: "#fff",
                        border: "1px solid rgba(255,255,255,0.15)",
                      }}
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 p-8 sm:p-10">
            <h3
              className="text-2xl font-bold mb-8"
              style={{ color: "var(--color-heading)" }}
            >
              Send Message
            </h3>

            <form className="space-y-5">

              {/* Name + Email */}
              <div className="grid sm:grid-cols-2 gap-5">

                <div>
                  <label
                    className="block mb-2 text-sm font-medium"
                    style={{ color: "var(--color-heading)" }}
                  >
                    Full Name
                  </label>

                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl border outline-none text-sm transition-all duration-300 focus:scale-[1.01]"
                    style={{
                      borderColor: "var(--border)",
                      color: "var(--color-body)",
                    }}
                  />
                </div>

                <div>
                  <label
                    className="block mb-2 text-sm font-medium"
                    style={{ color: "var(--color-heading)" }}
                  >
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl border outline-none text-sm transition-all duration-300 focus:scale-[1.01]"
                    style={{
                      borderColor: "var(--border)",
                      color: "var(--color-body)",
                    }}
                  />
                </div>
              </div>

              {/* Subject Select */}
              <div>
                <label
                  className="block mb-2 text-sm font-medium"
                  style={{ color: "var(--color-heading)" }}
                >
                  Subject
                </label>

                <select
                  className="w-full px-4 py-3 rounded-xl border outline-none text-sm transition-all duration-300"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--color-body)",
                    backgroundColor: "var(--color-bg)",
                  }}
                >
                  <option>Select Subject</option>
                  <option>Film Collaboration</option>
                  <option>Music Video Project</option>
                  <option>Interview Request</option>
                  <option>Creative Partnership</option>
                  <option>Brand Collaboration</option>
                  <option>Media Inquiry</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  className="block mb-2 text-sm font-medium"
                  style={{ color: "var(--color-heading)" }}
                >
                  Description
                </label>

                <textarea
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full px-4 py-3 rounded-xl border outline-none resize-none text-sm transition-all duration-300 focus:scale-[1.01]"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--color-body)",
                  }}
                ></textarea>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: "var(--color-accent)",
                  color: "#fff",
                }}
              >
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;