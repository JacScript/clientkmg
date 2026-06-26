import React from "react";

const stats = [
  { value: "80%", label: "Recycled aluminum in every new capsule" },
  { value: "100+", label: "Boutiques offering free capsule recycling" },
  { value: "30%", label: "Of coffee sourced through our farmer programs" },
];

const NespressoSustainability = () => {
  return (
    <section className="bg-[#10140F] px-6 py-20 text-white lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#8FA37A]">
            Sustainability
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Good coffee should be good for the planet too.
          </h2>
          <p className="mt-4 text-gray-400">
            From farm to cup, we're working toward capsules made entirely from
            recycled aluminum and a coffee supply chain that gives back to the
            communities that grow it.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="border-t border-white/10 pt-6">
              <p className="text-4xl font-bold text-[#8FA37A]">{stat.value}</p>
              <p className="mt-2 text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NespressoSustainability;