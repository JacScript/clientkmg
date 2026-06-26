import React, { useState } from "react";

const NespressoNewsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="bg-[#1B1410] px-6 py-20 text-white lg:px-12">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Stay close to the craft.</h2>
        <p className="mt-4 text-gray-400">
          New blends, limited editions, and machine launches — straight to your
          inbox.
        </p>

        {submitted ? (
          <p className="mt-8 font-semibold text-[#C9A24B]">
            You're on the list. Talk soon.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-full border border-white/20 bg-transparent px-5 py-3 text-white placeholder-gray-500 outline-none focus:border-[#C9A24B] sm:w-80"
            />
            <button
              type="submit"
              className="rounded-full bg-[#C9A24B] px-7 py-3 font-semibold text-[#15110D] transition hover:bg-[#dab564]"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default NespressoNewsletter;