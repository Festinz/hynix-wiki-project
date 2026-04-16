"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Step = "thermal" | "implant" | "anneal";

const steps: Record<
  Step,
  {
    label: string;
    title: string;
    color: string;
    summary: string;
    bullets: string[];
  }
> = {
  thermal: {
    label: "Thermal Diffusion",
    title: "열로 퍼뜨리는 방식",
    color: "#38bdf8",
    summary: "초기 도핑 공정은 고온에서 불순물이 자연스럽게 퍼지도록 두는 thermal diffusion이 많았습니다.",
    bullets: [
      "시간과 온도로만 간접 제어하므로 깊이와 농도 분리가 어렵습니다.",
      "등방성이라 수직뿐 아니라 수평으로도 퍼져 lateral diffusion이 커집니다.",
      "큰 feature size 시대에는 단순하고 유효했지만, 미세 MOSFET에는 한계가 컸습니다.",
    ],
  },
  implant: {
    label: "Ion Implantation",
    title: "에너지와 dose를 따로 잡는 방식",
    color: "#818cf8",
    summary: "현대 공정은 원하는 깊이와 dose를 더 정밀하게 제어하기 위해 이온주입 중심으로 이동했습니다.",
    bullets: [
      "가속 에너지로 주입 깊이를, dose로 농도를 상대적으로 독립 제어할 수 있습니다.",
      "수직 주입이라 lateral diffusion을 크게 줄일 수 있습니다.",
      "대신 이온 충돌로 격자 손상이 생겨 후속 annealing이 필수입니다.",
    ],
  },
  anneal: {
    label: "Annealing / RTA",
    title: "손상 복구와 활성화",
    color: "#22c55e",
    summary: "이온주입 뒤에는 손상된 격자를 회복시키고 dopant를 활성화하기 위해 annealing이 붙습니다.",
    bullets: [
      "furnace anneal보다 RTA가 주류인 이유는 activation은 확보하고 재확산은 줄이기 위해서입니다.",
      "열산화는 손상이라기보다 Si가 소비되며 형상이 바뀌는 문제로 읽는 편이 정확합니다.",
      "결국 diffusion 파트는 열산화, 도핑, ion implantation, annealing을 하나의 흐름으로 봐야 합니다.",
    ],
  },
};

export default function DiffusionProcessExplorer() {
  const [step, setStep] = useState<Step>("implant");
  const current = steps[step];

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/60 p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-200">Diffusion → Ion Implantation → Annealing</h3>
          <p className="mt-1 text-[11px] leading-5 text-gray-500">
            확산 파트는 단독 공정이 아니라 열산화, 도핑, 이온주입, 열처리까지 이어지는 흐름으로 봐야 이해가 선명해집니다.
          </p>
        </div>
        <div className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-gray-400">
          현대 주류: Ion Implantation + RTA
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {(Object.keys(steps) as Step[]).map((key) => (
          <button
            key={key}
            onClick={() => setStep(key)}
            className={`rounded-xl border px-4 py-2.5 text-xs font-medium transition-all ${
              step === key ? "text-white" : "text-gray-400 hover:text-gray-200"
            }`}
            style={{
              borderColor: step === key ? `${steps[key].color}55` : "rgba(255,255,255,0.08)",
              backgroundColor: step === key ? `${steps[key].color}18` : "rgba(255,255,255,0.02)",
            }}
          >
            {steps[key].label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-gray-800 bg-black/20 p-4">
          <svg viewBox="0 0 320 220" className="w-full">
            <rect x="18" y="150" width="284" height="38" rx="8" fill="#1e293b" stroke="#334155" />
            <text x="160" y="173" textAnchor="middle" fill="#cbd5e1" fontSize="11">
              실리콘 웨이퍼
            </text>

            <line x1="72" y1="58" x2="72" y2="116" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#diff-arrow)" />
            <line x1="160" y1="58" x2="160" y2="116" stroke="#818cf8" strokeWidth="3" markerEnd="url(#diff-arrow)" />
            <line x1="248" y1="58" x2="248" y2="116" stroke="#22c55e" strokeWidth="3" markerEnd="url(#diff-arrow)" />

            <defs>
              <marker id="diff-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8" fill="#94a3b8" />
              </marker>
            </defs>

            <text x="72" y="42" textAnchor="middle" fill="#38bdf8" fontSize="10">
              Thermal Diffusion
            </text>
            <text x="160" y="42" textAnchor="middle" fill="#818cf8" fontSize="10">
              Ion Implantation
            </text>
            <text x="248" y="42" textAnchor="middle" fill="#22c55e" fontSize="10">
              Annealing / RTA
            </text>

            <motion.ellipse
              cx="72"
              cy="122"
              rx="34"
              ry="18"
              fill="#38bdf8"
              opacity={step === "thermal" ? 0.35 : 0.16}
              animate={{ ry: step === "thermal" ? [16, 20, 16] : 18 }}
              transition={{ repeat: Infinity, duration: 1.8 }}
            />
            <motion.rect
              x="148"
              y="112"
              width="24"
              height="40"
              rx="4"
              fill="#818cf8"
              opacity={step === "implant" ? 0.45 : 0.18}
              animate={{ y: step === "implant" ? [110, 114, 110] : 112 }}
              transition={{ repeat: Infinity, duration: 1.3 }}
            />
            <motion.path
              d="M228 124 C236 112, 260 112, 268 124 C260 136, 236 136, 228 124"
              fill="#22c55e"
              opacity={step === "anneal" ? 0.42 : 0.18}
              animate={{ scale: step === "anneal" ? [0.96, 1.03, 0.96] : 1, transformOrigin: "248px 124px" }}
              transition={{ repeat: Infinity, duration: 1.6 }}
            />

            <text x="72" y="132" textAnchor="middle" fill="#bae6fd" fontSize="9">
              열로 안쪽까지 퍼짐
            </text>
            <text x="160" y="132" textAnchor="middle" fill="#c7d2fe" fontSize="9">
              깊이와 dose 제어
            </text>
            <text x="248" y="132" textAnchor="middle" fill="#bbf7d0" fontSize="9">
              손상 복구 + 활성화
            </text>
          </svg>
        </div>

        <div className="space-y-3">
          <div
            className="rounded-2xl border p-4"
            style={{ borderColor: `${current.color}35`, backgroundColor: `${current.color}10` }}
          >
            <p className="text-xs font-semibold" style={{ color: current.color }}>
              {current.title}
            </p>
            <p className="mt-2 text-sm leading-6 text-gray-200">{current.summary}</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-gray-950/40 p-4 text-[11px] leading-6 text-gray-300">
            {current.bullets.map((bullet) => (
              <p key={bullet}>- {bullet}</p>
            ))}
          </div>

          <div className="rounded-xl border border-cyan-500/15 bg-cyan-950/10 p-4 text-[11px] leading-6 text-gray-300">
            <p className="font-semibold text-cyan-400">핵심 비교</p>
            <p className="mt-2">Thermal diffusion은 시간과 온도로 간접 제어하고, ion implantation은 energy와 dose로 직접 제어합니다.</p>
            <p>그래서 미세화 시대에는 정확한 농도/깊이 제어와 lateral diffusion 억제를 위해 ion implantation이 대세가 됐습니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
