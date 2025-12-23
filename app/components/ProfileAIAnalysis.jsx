"use client";

import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import ReactMarkdown from "react-markdown";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const LABELS = {
  consistency: "Consistency",
  projectQuality: "Project Quality",
  openSource: "Open Source",
  documentation: "Documentation",
  branding: "Personal Branding",
  hiringReadiness: "Hiring Readiness",
};

const ProfileAIAnalysis = ({ analysis }) => {
  if (!analysis) return null;

  const { verdict, scores, missing, plan } = analysis;
  if (!verdict || !scores) return null;

  const entries = Object.entries(scores);
  const weakest = entries.reduce((a, b) => (a[1] < b[1] ? a : b));

  return (
    <div className="space-y-12">

      {/* ================= HERO VERDICT ================= */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-600 text-slate-100 rounded-3xl p-10">
        <span className="inline-block bg-indigo-500/20 text-indigo-300 px-4 py-1 rounded-full text-sm font-bold">
          Level: {verdict.level}
        </span>

        <p className="mt-6 text-lg font-medium leading-relaxed max-w-3xl text-slate-200">
          {verdict.summary}
        </p>
      </section>

      {/* ================= SIGNAL SCORES ================= */}
      <section>
        <h2 className="text-xl mb-4 font-bold text-indigo-300">
          Profile Health Signals
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {entries.map(([k, v]) => {
            const isWeakest = k === weakest[0];

            return (
              <div
                key={k}
                className={`p-5 rounded-2xl border text-center transition ${
                  isWeakest
                    ? "bg-red-500/10 border-red-400 text-red-300"
                    : "bg-slate-800/80 border-slate-600 text-slate-100"
                }`}
              >
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  {LABELS[k]}
                </p>

                <p className="text-3xl font-black mt-1">{v}/10</p>

                {isWeakest && (
                  <p className="mt-2 text-xs font-semibold text-red-300">
                    Primary Weakness
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= RADAR ================= */}
      <section className="p-8 rounded-3xl border bg-slate-900/90 text-slate-100 border-slate-700">
        <h2 className="text-xl font-black mb-6 text-indigo-300">
          Skill Distribution Overview
        </h2>

        <Radar
          data={{
            labels: entries.map(([k]) => LABELS[k]),
            datasets: [
              {
                data: entries.map(([, v]) => v),
                fill: true,
                backgroundColor: "rgba(129,140,248,0.25)",
                borderColor: "#818cf8",
                pointBackgroundColor: "#818cf8",
                pointBorderColor: "#020617",
                pointHoverBackgroundColor: "#020617",
                pointHoverBorderColor: "#818cf8",
              },
            ],
          }}
          options={{
            scales: {
              r: {
                min: 0,
                max: 10,
                ticks: {
                  stepSize: 2,
                  color: "#c7d2fe",
                  backdropColor: "transparent",
                },
                grid: {
                  color: "rgba(148,163,184,0.25)",
                },
                angleLines: {
                  color: "rgba(148,163,184,0.35)",
                },
                pointLabels: {
                  color: "#e0e7ff",
                  font: { size: 12, weight: "600" },
                },
              },
            },
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: "#020617",
                titleColor: "#e0e7ff",
                bodyColor: "#c7d2fe",
                borderColor: "#6366f1",
                borderWidth: 1,
              },
            },
          }}
        />
      </section>

      {/* ================= GAPS ================= */}
      <Section title="What Is Missing (Critical Gaps)">
        <ReactMarkdown>{missing}</ReactMarkdown>
      </Section>

      {/* ================= PLAN ================= */}
      <Section title="30-Day Improvement Plan">
        <ReactMarkdown>{plan}</ReactMarkdown>
      </Section>
    </div>
  );
};

const Section = ({ title, children }) => (
  <section className="rounded-3xl p-8 border bg-slate-800/80 border-slate-600 text-slate-100">
    <h2 className="text-xl font-black mb-4 text-indigo-300">
      {title}
    </h2>

    <div className="prose prose-invert max-w-none text-slate-200">
      {children}
    </div>
  </section>
);

export default ProfileAIAnalysis;
