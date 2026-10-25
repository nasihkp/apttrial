import React, { useState } from 'react';
import { RESEARCH_PAPERS } from '../data/mockDatasets';
import { BookOpen, FileText, Download, HelpCircle, Sparkles, Check, ChevronRight } from 'lucide-react';

export const ResearchLibraryView: React.FC = () => {
  const [selectedPaper, setSelectedPaper] = useState(RESEARCH_PAPERS[0]);

  const vivaQuestions = [
    {
      q: "What is the main problem AEGIS-PROV solves?",
      a: "Detecting stealthy Advanced Persistent Threats (APTs) in enterprise audit logs. Traditional tools fail because APTs mimic normal admin behavior ('living-off-the-land') and spread actions across long time horizons. We build whole-system provenance graphs and use a hybrid deep learning model (GAT + GRU + VGAE) to learn normal causality and detect anomalous multi-step campaigns with FPR < 0.1%."
    },
    {
      q: "How does each neural network component contribute to detection?",
      a: "1. Relation-Aware GAT: Encodes structural spatial dependencies across 8 distinct OS relation types (fork, execve, read, write, connect, recv, send, unlink).\n2. Temporal GRU: Maintains chronological memory across history snapshots G_(t-w)...G_(t-1) to track persistent entity behavior.\n3. VGAE & Directed Decoder: Learns a smooth latent distribution and predicts directed candidate links in arriving window G_t. High negative log-likelihood (edge surprise) flags stealthy zero-day attacks."
    },
    {
      q: "Why is the asymmetric directed edge decoder critical?",
      a: "Standard VGAE decoders use symmetric inner-products (z_u^T z_v = z_v^T z_u), losing causality. In operating systems, Process -> File write is completely different from File -> Process read. Our decoder concatenates [z_u || W_r e_r || z_v] into an MLP, preserving directionality."
    },
    {
      q: "How is the operational threshold calibrated to prevent alert fatigue?",
      a: "The model is trained 100% on benign operational telemetry. Threshold tau is frozen at the (1 - target_fpr)*100 percentile of benign validation residuals (e.g. 99.9th percentile for FPR <= 0.1%), ensuring strict operational discipline in SOC environments."
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-slate-100 font-mono">
              Research Foundation & Technical Knowledge Base
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Ground truth datasets from DARPA Transparent Computing E3 and theoretical foundation from 23 indexed peer-reviewed cybersecurity research papers.
          </p>
        </div>

        <div className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
          DARPA TC E3 &bull; CADETS / THEIA / TRACE
        </div>
      </div>

      {/* Grid: Papers Explorer + Viva Voce Cheat Sheet */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Papers List (1 Col) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="text-xs font-bold text-slate-200 font-mono flex items-center justify-between border-b border-slate-800 pb-2">
            <span>KEY REPOSITORY PAPERS</span>
            <span className="text-slate-400 font-normal">({RESEARCH_PAPERS.length} Selected)</span>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {RESEARCH_PAPERS.map((paper, idx) => {
              const isSelected = selectedPaper.title === paper.title;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedPaper(paper)}
                  className={`p-3 rounded-lg border cursor-pointer transition ${
                    isSelected 
                      ? 'bg-cyan-950/40 border-cyan-500/80 text-cyan-200' 
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-semibold line-clamp-2">
                    {paper.title}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-1.5">
                    <span>{paper.topic}</span>
                    <span className="text-cyan-400/90">{paper.filename.split('.').pop()?.toUpperCase()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Paper Details + Viva Voce (2 Cols) */}
        <div className="lg:col-span-2 space-y-5">
          {/* Paper Synopsis */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 uppercase">
                  {selectedPaper.topic}
                </span>
                <h3 className="text-base font-bold text-slate-100 mt-2 font-mono">
                  {selectedPaper.title}
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Published In: {selectedPaper.authors}
                </p>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-400">
                <FileText className="w-5 h-5 text-cyan-400" />
              </div>
            </div>

            <div className="border-t border-slate-800/80 pt-3">
              <span className="text-xs font-bold font-mono text-slate-300 block mb-1">
                Core Conceptual Contribution:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/70 p-3 rounded-lg border border-slate-800 font-mono">
                {selectedPaper.keyIdea}
              </p>
            </div>
          </div>

          {/* Viva Voce Defense Cheat Sheet */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-bold text-slate-100 font-mono uppercase tracking-wider">
                System Defense &amp; Viva Voce Technical Cheat Sheet
              </h3>
            </div>

            <div className="space-y-3">
              {vivaQuestions.map((item, i) => (
                <div key={i} className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3 text-xs">
                  <div className="font-bold text-cyan-300 font-mono mb-1.5 flex items-start gap-1.5">
                    <span className="text-cyan-500">Q{i + 1}:</span>
                    <span>{item.q}</span>
                  </div>
                  <div className="text-slate-300 leading-relaxed font-sans pl-5 whitespace-pre-line text-[12px]">
                    {item.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
