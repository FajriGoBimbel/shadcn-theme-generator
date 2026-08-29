import { useState, useEffect, useCallback, useRef } from "react";
import { Trophy, Timer, Zap, RotateCcw, Play, Target, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * Color Match — a "spot the difference" color perception game.
 *
 * A target color is shown. The player must find the one tile in the grid
 * whose color exactly matches the target. All other tiles are slightly
 * off. As the level rises the grid grows and the color difference shrinks,
 * so it gets progressively harder. Fits the theme-generator vibe: it's all
 * about training your eye for subtle color differences (OKLCH under the hood).
 */

type GameStatus = "idle" | "playing" | "over";

const ROUND_TIME = 20; // seconds per game

interface Round {
  size: number; // grid is size x size
  colors: string[]; // oklch strings, one per tile
  target: string; // the target oklch color
  answerIndex: number; // index of the matching tile
}

/** Random number in [min, max) */
function rand(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Build a round for the given level. Higher level => bigger grid and
 * smaller lightness/chroma delta between the odd tile and the rest.
 */
function makeRound(level: number): Round {
  // Grid grows from 2x2 up to 6x6.
  const size = Math.min(2 + Math.floor(level / 2), 6);
  const count = size * size;

  // Base color for this round.
  const baseL = rand(0.45, 0.8);
  const baseC = rand(0.08, 0.22);
  const baseH = rand(0, 360);
  const base = `oklch(${baseL.toFixed(3)} ${baseC.toFixed(3)} ${baseH.toFixed(2)})`;

  // The delta shrinks as the level rises — starts obvious, ends brutal.
  const delta = Math.max(0.16 - level * 0.011, 0.028);

  // Randomly nudge lightness OR chroma so it's not always the same cue.
  const nudgeLightness = Math.random() > 0.5;
  const oddL = nudgeLightness
    ? Math.min(Math.max(baseL + (Math.random() > 0.5 ? delta : -delta), 0.15), 0.92)
    : baseL;
  const oddC = nudgeLightness
    ? baseC
    : Math.max(baseC + (Math.random() > 0.5 ? delta * 1.4 : -delta * 1.4), 0.02);
  const odd = `oklch(${oddL.toFixed(3)} ${oddC.toFixed(3)} ${baseH.toFixed(2)})`;

  // The target the player must find is the ODD one out.
  const answerIndex = Math.floor(Math.random() * count);
  const colors = Array.from({ length: count }, (_, i) =>
    i === answerIndex ? odd : base
  );

  return { size, colors, target: odd, answerIndex };
}

export function ColorMatchGame() {
  const [status, setStatus] = useState<GameStatus>("idle");
  const [round, setRound] = useState<Round | null>(null);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
  const [best, setBest] = useState(0);
  const [wrongIndex, setWrongIndex] = useState<number | null>(null);
  const [justScored, setJustScored] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Load best score once.
  useEffect(() => {
    try {
      const saved = localStorage.getItem("color-match-best");
      if (saved) setBest(parseInt(saved, 10) || 0);
    } catch {
      // ignore
    }
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const endGame = useCallback(() => {
    stopTimer();
    setStatus("over");
  }, [stopTimer]);

  // When the game ends, persist the best score.
  useEffect(() => {
    if (status !== "over") return;
    setBest((b) => {
      const next = Math.max(b, score);
      if (next !== b) {
        try {
          localStorage.setItem("color-match-best", String(next));
        } catch {
          // ignore
        }
      }
      return next;
    });
  }, [status, score]);

  const startGame = useCallback(() => {
    setLevel(1);
    setScore(0);
    setStreak(0);
    setWrongIndex(null);
    setTimeLeft(ROUND_TIME);
    setRound(makeRound(1));
    setStatus("playing");
  }, []);

  // Countdown timer while playing.
  useEffect(() => {
    if (status !== "playing") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => Math.max(t - 1, 0));
    }, 1000);
    return () => stopTimer();
  }, [status, stopTimer]);

  // End the game once the timer hits zero.
  useEffect(() => {
    if (status === "playing" && timeLeft <= 0) {
      endGame();
    }
  }, [status, timeLeft, endGame]);

  const handlePick = useCallback(
    (index: number) => {
      if (status !== "playing" || !round) return;

      if (index === round.answerIndex) {
        // Correct! Score scales with level and streak, plus a small time bonus.
        const gained = 10 + level * 2 + streak * 3;
        setScore((s) => s + gained);
        setStreak((s) => s + 1);
        setLevel((l) => l + 1);
        setTimeLeft((t) => Math.min(t + 2, ROUND_TIME)); // reward: +2s
        setJustScored(true);
        setTimeout(() => setJustScored(false), 400);
        setRound(makeRound(level + 1));
      } else {
        // Wrong — lose the streak and a few seconds.
        setStreak(0);
        setWrongIndex(index);
        setTimeout(() => setWrongIndex(null), 400);
        setTimeLeft((t) => Math.max(t - 3, 0));
      }
    },
    [status, round, level, streak]
  );

  const timePct = (timeLeft / ROUND_TIME) * 100;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-2xl border bg-card shadow-lg overflow-hidden">
        {/* Header / HUD */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-muted/40 px-5 py-3.5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Target className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-none text-card-foreground">
                Color Match
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Spot the odd color out
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gap-1 tabular-nums">
              <Zap className="h-3 w-3 text-primary" />
              Lv {level}
            </Badge>
            <Badge
              className={cn(
                "gap-1 tabular-nums transition-transform",
                justScored && "scale-110"
              )}
            >
              <Trophy className="h-3 w-3" />
              {score}
            </Badge>
            {streak > 1 && (
              <Badge variant="outline" className="gap-1 tabular-nums text-orange-500 border-orange-500/40">
                <Flame className="h-3 w-3" />
                {streak}x
              </Badge>
            )}
          </div>
        </div>

        {/* Timer bar */}
        <div className="h-1.5 w-full bg-muted">
          <div
            className={cn(
              "h-full transition-[width] duration-1000 ease-linear",
              timePct > 50 ? "bg-primary" : timePct > 25 ? "bg-yellow-500" : "bg-destructive"
            )}
            style={{ width: `${status === "playing" ? timePct : 100}%` }}
          />
        </div>

        <div className="p-6">
          {status === "idle" && (
            <div className="flex flex-col items-center text-center py-10">
              <div className="mb-5 grid grid-cols-3 gap-1.5">
                {["oklch(0.6 0.18 20)", "oklch(0.6 0.18 20)", "oklch(0.68 0.18 20)", "oklch(0.6 0.18 20)", "oklch(0.6 0.18 20)", "oklch(0.6 0.18 20)"].map((c, i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-lg animate-float-slow"
                    style={{ backgroundColor: c, animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
              <h3 className="text-lg font-bold text-card-foreground mb-2">
                Can you spot the difference?
              </h3>
              <p className="max-w-sm text-sm text-muted-foreground mb-6">
                One tile has a slightly different color than the rest. Find it before
                time runs out. Each correct pick adds time and levels you up — the
                colors get harder to tell apart as you climb.
              </p>
              <Button size="lg" className="gap-2" onClick={startGame}>
                <Play className="h-4 w-4" />
                Play
              </Button>
              {best > 0 && (
                <p className="mt-4 text-xs text-muted-foreground">
                  Personal best: <span className="font-semibold text-foreground">{best}</span>
                </p>
              )}
            </div>
          )}

          {status === "playing" && round && (
            <div className="flex flex-col items-center">
              <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
                <Timer className="h-3.5 w-3.5" />
                <span className="tabular-nums font-medium text-foreground">{timeLeft}s</span>
                left · tap the tile that stands out
              </div>

              <div
                className="grid gap-2 w-full max-w-sm"
                style={{ gridTemplateColumns: `repeat(${round.size}, minmax(0, 1fr))` }}
              >
                {round.colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => handlePick(i)}
                    aria-label={`Color tile ${i + 1}`}
                    className={cn(
                      "aspect-square rounded-lg transition-all duration-150 outline-none",
                      "hover:scale-105 hover:z-10 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-ring",
                      "active:scale-95 cursor-pointer",
                      wrongIndex === i && "animate-shake ring-2 ring-destructive"
                    )}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          )}

          {status === "over" && (
            <div className="flex flex-col items-center text-center py-8">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Trophy className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-card-foreground mb-1">
                {score > 0 && score >= best ? "New personal best!" : "Time's up!"}
              </h3>
              <p className="text-sm text-muted-foreground mb-1">
                You reached level <span className="font-semibold text-foreground">{level}</span>
              </p>
              <div className="my-4 flex items-center gap-6">
                <div>
                  <p className="text-3xl font-bold tabular-nums text-card-foreground">{score}</p>
                  <p className="text-xs text-muted-foreground">Score</p>
                </div>
                <div className="h-10 w-px bg-border" />
                <div>
                  <p className="text-3xl font-bold tabular-nums text-primary">{best}</p>
                  <p className="text-xs text-muted-foreground">Best</p>
                </div>
              </div>
              <Button size="lg" className="gap-2" onClick={startGame}>
                <RotateCcw className="h-4 w-4" />
                Play again
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
