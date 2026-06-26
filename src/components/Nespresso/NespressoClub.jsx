import React from "react";
import { IoMdGift, IoMdCafe, IoMdRefreshCircle } from "react-icons/io";

const perks = [
  {
    icon: IoMdCafe,
    title: "Free tasting sessions",
    description: "Book a complimentary coffee tasting at any boutique near you.",
  },
  {
    icon: IoMdRefreshCircle,
    title: "Easy recycling",
    description: "Return used capsules in our prepaid recycling bags, anytime.",
  },
  {
    icon: IoMdGift,
    title: "Member rewards",
    description: "Earn points on every order toward machines and accessories.",
  },
];

const NespressoClub = () => {
  return (
    <section className="bg-[#F5EFE6] px-6 py-20 text-[#15110D] lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#9C6B2E]">
            Nespresso Club
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Membership that brews more than coffee.
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {perks.map((perk) => {
            const Icon = perk.icon;
            return (
              <div key={perk.title} className="rounded-2xl bg-white p-6 shadow-sm">
                <Icon className="text-3xl text-[#9C6B2E]" />
                <h3 className="mt-4 font-semibold">{perk.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{perk.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NespressoClub;