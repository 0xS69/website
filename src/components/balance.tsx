"use client";

import { GetBalance } from "~/lib/solana";
import { useEffect, useState } from "react";

export default function Balance() {
  const [value, setValue] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetBalance();
      if (data) setValue(data);
    };

    fetchData();
  }, []);

  return (
    <div className="md:absolute md:bottom-15 bottom-8 w-full md:w-max md:right-12 flex flex-col md:text-left text-center">
      <span className="md:text-8xl text-6xl text-[var(--so)] leading-[4.5rem]">
        {value !== null ? value.toFixed(3) : "0.000"}
      </span>
      <span className="uppercase pl-1">Recovered</span>
    </div>
  );
}
