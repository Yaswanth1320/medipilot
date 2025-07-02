import { PricingTable } from "@clerk/nextjs";

function page() {
  return (
    <div className="h-[91vh] pt-15">
      <h2 className="text-bold text-3xl mb-4 text-white">Choose the plan</h2>
      <PricingTable />
    </div>
  );
}

export default page;
