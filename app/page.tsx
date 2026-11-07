"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useState, useRef, useEffect } from "react";
import { isOwner, OWNER_ADDRESS, OWNER_LINKS } from "@/lib/owner";
import { callFullAuto, callMetaIntelligence } from "@/lib/otto";
import { createSpiderSwarm, type SpiderSwarm } from "@/lib/spider";
import { generateGeniusStrategy, type GeniusStrategy } from "@/lib/genius";
import { Terminal, Zap, Bot, Users, Crosshair, Brain } from "lucide-react";

type LogEntry = {
  id: string;
  type: "system" | "user" | "result" | "error";
  text: string;
  data?: any;
};

export default function CommandCenter() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: "boot",
      type: "system",
      text: `Agentic Spider Command Center online. Owner locked to ${OWNER_ADDRESS.slice(0, 6)}…${OWNER_ADDRESS.slice(-4)} | Farcaster ${OWNER_LINKS.farcaster} | X ${OWNER_LINKS.x}`,
    },
  ]);
  const [swarm, setSwarm] = useState<SpiderSwarm | null>(null);
  const [strategy, setStrategy] = useState<GeniusStrategy | null>(null);
  const [priceCap, setPriceCap] = useState(0.05);
  const bottomRef = useRef<HTMLDivElement>(null);

  const owner = isOwner(address);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  function addLog(entry: Omit<LogEntry, "id">) {
    setLogs((prev) => [...prev, { ...entry, id: `${Date.now()}-${Math.random()}` }]);
  }

  async function handleCommand(raw: string) {
    const line = raw.trim();
    if (!line) return;

    addLog({ type: "user", text: line });
    setInput("");

    const [cmd, ...rest] = line.split(/\s+/);
    const arg = rest.join(" ").trim();

    try {
      if (cmd === "/connect") {
        if (isConnected) {
          addLog({ type: "system", text: `Already connected: ${address}` });
        } else {
          const c = connectors[0];
          if (c) connect({ connector: c });
          else addLog({ type: "error", text: "No wallet connector found" });
        }
        return;
      }

      if (cmd === "/disconnect") {
        disconnect();
        addLog({ type: "system", text: "Disconnected" });
        return;
      }

      if (cmd === "/cap" && arg) {
        const v = parseFloat(arg);
        if (!isNaN(v) && v > 0) {
          setPriceCap(v);
          addLog({ type: "system", text: `Session price cap set to $${v}` });
        }
        return;
      }

      if (cmd === "/full-auto") {
        if (!arg) {
          addLog({ type: "error", text: "Usage: /full-auto <ask>" });
          return;
        }
        addLog({ type: "system", text: `Full Auto → "${arg}" (cap $${priceCap})…` });
        const res = await callFullAuto(arg, priceCap);
        addLog({ type: "result", text: "Full Auto result", data: res });
        return;
      }

      if (cmd === "/meta") {
        if (!arg) {
          addLog({ type: "error", text: "Usage: /meta <ask>" });
          return;
        }
        addLog({ type: "system", text: `Meta-Intelligence → "${arg}"...` });
        const res = await callMetaIntelligence(arg, priceCap);
        addLog({ type: "result", text: "Meta recommendations", data: res });
        return;
      }

      if (cmd === "/spider") {
        if (!arg) {
          addLog({ type: "error", text: "Usage: /spider <topic>" });
          return;
        }
        const s = createSpiderSwarm(arg);
        setSwarm(s);
        addLog({
          type: "system",
          text: `Spider swarm launched for "${arg}" — ${s.tasks.length} crawler subagents`,
          data: s,
        });
        // Fire parallel meta/full-auto style calls in production
        return;
      }

      if (cmd === "/genius") {
        if (!arg) {
          addLog({ type: "error", text: "Usage: /genius <goal>" });
          return;
        }
        const g = generateGeniusStrategy(arg);
        setStrategy(g);
        addLog({ type: "result", text: "Genius Strategy generated", data: g });
        return;
      }

      if (cmd === "/optimize") {
        addLog({
          type: "system",
          text: "Optimizer: reviewing latest spider + strategy context…",
        });
        addLog({
          type: "result",
          text: "Optimization pass complete (scaffold). Wire scoring + re-ranking next.",
        });
        return;
      }

      if (cmd === "/collab") {
        if (arg.startsWith("create")) {
          const roomId = `room-${Date.now().toString(36)}`;
          addLog({
            type: "system",
            text: `Collaboration room created: ${roomId} — share this ID to invite agents/humans`,
          });
        } else if (arg.startsWith("join")) {
          const id = arg.replace(/^join\s+/, "");
          addLog({ type: "system", text: `Joined collaboration room: ${id}` });
        } else {
          addLog({ type: "error", text: "Usage: /collab create | /collab join <id>" });
        }
        return;
      }

      if (cmd === "/receipts") {
        addLog({ type: "system", text: "Receipts: (none stored yet — will appear after live x402 calls)" });
        return;
      }

      if (cmd === "/help") {
        addLog({
          type: "system",
          text: "Commands: /connect /full-auto /meta /spider /genius /optimize /collab /receipts /cap /help",
        });
        return;
      }

      // Natural language fallback → treat as Full Auto
      addLog({ type: "system", text: `Interpreting as Full Auto: "${line}"` });
      const res = await callFullAuto(line, priceCap);
      addLog({ type: "result", text: "Result", data: res });
    } catch (e: any) {
      addLog({ type: "error", text: e.message || String(e) });
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-surface/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/20 text-accent">
              <Zap size={18} />
            </div>
            <div>
              <h1 className="text-sm font-semibold tracking-tight">Agentic Spider</h1>
              <p className="text-xs text-muted">Command Center · Genius Strategy</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            {isConnected ? (
              <>
                <span className={`rounded-full px-2.5 py-1 ${owner ? "bg-emerald-500/15 text-emerald-400" : "bg-zinc-800 text-muted"}`}>
                  {owner ? "OWNER" : "CONNECTED"} · {address?.slice(0, 6)}…{address?.slice(-4)}
                </span>
                <button
                  onClick={() => disconnect()}
                  className="rounded-md border border-zinc-700 px-2.5 py-1 hover:bg-zinc-800"
                >
                  Disconnect
                </button>
              </>
            ) : (
              <button
                onClick={() => connectors[0] && connect({ connector: connectors[0] })}
                className="rounded-md bg-accent px-3 py-1.5 font-medium text-white hover:bg-accent/90"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 p-4 md:flex-row">
        {/* Terminal */}
        <section className="flex flex-1 flex-col rounded-xl border border-zinc-800 bg-surface">
          <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-2 text-xs text-muted">
            <Terminal size={14} />
            <span>Command Stream</span>
            <span className="ml-auto">cap ${priceCap}</span>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4 font-mono text-sm">
            {logs.map((l) => (
              <div key={l.id} className="leading-relaxed">
                {l.type === "user" && (
                  <span className="text-accent2">› {l.text}</span>
                )}
                {l.type === "system" && (
                  <span className="text-muted">{l.text}</span>
                )}
                {l.type === "error" && (
                  <span className="text-red-400">! {l.text}</span>
                )}
                {l.type === "result" && (
                  <div>
                    <div className="text-emerald-400">{l.text}</div>
                    {l.data && (
                      <pre className="mt-1 max-h-64 overflow-auto rounded-lg bg-black/40 p-3 text-xs text-zinc-300">
                        {JSON.stringify(l.data, null, 2)}
                      </pre>
                    )}
                  </div>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand(input);
            }}
            className="border-t border-zinc-800 p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="/full-auto crypto news for bitcoin   or   /genius scale Base yield safely"
              className="command-input w-full rounded-lg border border-zinc-700 bg-black/30 px-4 py-3 text-sm placeholder:text-zinc-600"
              autoFocus
            />
          </form>
        </section>

        {/* Side panels */}
        <aside className="flex w-full flex-col gap-4 md:w-80">
          {/* Genius Strategy */}
          <div className="rounded-xl border border-zinc-800 bg-surface p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium">
              <Brain size={16} className="text-accent" />
              Genius Strategy
            </div>
            {strategy ? (
              <div className="space-y-2 text-xs">
                <div className="font-medium text-accent2">{strategy.goal}</div>
                <div className="text-muted">{strategy.thesis}</div>
                <div className="flex gap-2">
                  <span className="rounded bg-zinc-800 px-2 py-0.5">{strategy.timeHorizon}</span>
                  <span className="rounded bg-zinc-800 px-2 py-0.5">{strategy.riskLevel}</span>
                </div>
                <div className="pt-1">
                  <div className="mb-1 text-muted">Next actions</div>
                  <ul className="list-inside list-disc space-y-0.5">
                    {strategy.nextActions.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-xs text-muted">Run <code className="text-accent2">/genius &lt;goal&gt;</code> to generate a strategy blueprint.</p>
            )}
          </div>

          {/* Spider */}
          <div className="rounded-xl border border-zinc-800 bg-surface p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium">
              <Crosshair size={16} className="text-accent2" />
              Spider Swarm
            </div>
            {swarm ? (
              <div className="space-y-2 text-xs">
                <div className="text-muted">Topic: {swarm.topic}</div>
                {swarm.tasks.map((t) => (
                  <div key={t.id} className="flex items-center justify-between rounded bg-black/30 px-2 py-1.5">
                    <span className="truncate">{t.id}</span>
                    <span className="text-muted">{t.status}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted">Run <code className="text-accent2">/spider &lt;topic&gt;</code> to launch crawler subagents.</p>
            )}
          </div>

          {/* Collab */}
          <div className="rounded-xl border border-zinc-800 bg-surface p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium">
              <Users size={16} className="text-emerald-400" />
              Collaboration
            </div>
            <p className="text-xs text-muted">
              <code className="text-accent2">/collab create</code> · <code className="text-accent2">/collab join &lt;id&gt;</code>
            </p>
          </div>

          {/* Owner badge */}
          <div className="rounded-xl border border-dashed border-zinc-700 p-4 text-center text-xs text-muted">
            <Bot size={18} className="mx-auto mb-2 opacity-60" />
            Owner locked<br />
            <span className="font-mono text-[10px]">{OWNER_ADDRESS}</span>
          </div>
        </aside>
      </main>
    </div>
  );
}
