"use client"

import { ChartAreaInteractive } from "@/src/components/chart-area-interactive"
import { SectionCards } from "@/src/components/section-cards"

import data from "../data.json"

export default function Page() {
  return (
    <>
      <SectionCards />

      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>

    </>
  )
}
