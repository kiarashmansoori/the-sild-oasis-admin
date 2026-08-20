"use client";
import { all } from "axios";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function SalesChart({ bookings, numDays }) {
  const { resolvedTheme } = useTheme();
  const colors =
    resolvedTheme === "dark"
      ? {
          totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
          extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
          text: "#e5e7eb",
          background: "#18212f",
        }
      : {
          totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
          extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
          text: "#374151",
          background: "#fff",
        };
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.createdAt)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.createdAt)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    };
  });

  return (
    <div className="col-span-full dark:bg-zinc-700 rounded-md flex flex-col gap-3 p-5">
      <h2 className="text-3xl font-semibold mb-4">
        Sales{" "}
        <span className="text-lg">
          from {format(allDates.at(0), "MMM dd yyyy")} &mdash;{" "}
          {format(allDates.at(-1), "MMM dd yyyy")}
        </span>
      </h2>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            domain={[0, "dataMax"]}
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total sales"
            unit="$"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extera sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesChart;
