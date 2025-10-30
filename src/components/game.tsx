import { useState, useEffect, useRef, useCallback } from "react";

interface Bullet {
    x: number;
    y: number;
    vy: number;
}

interface Enemy {
    x: number;
    y: number;
    vy: number;
    w: number;
    h: number;
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number; // seconds remaining
}

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 400;
const SHIP_WIDTH = 40;
const SHIP_HEIGHT = 20;
const SHIP_Y = CANVAS_HEIGHT - 40;
const BULLET_WIDTH = 4;
const BULLET_HEIGHT = 10;

export default function SpaceShooter() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // Core game state
    const [shipX, setShipX] = useState(230);
    const [bullets, setBullets] = useState<Bullet[]>([]);
    const [enemies, setEnemies] = useState<Enemy[]>([]);
    const [particles, setParticles] = useState<Particle[]>([]);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState<number>(() => {
        const v = typeof window !== "undefined" ? window.localStorage.getItem("spaceShooterHighScore") : null;
        return v ? parseInt(v, 10) : 0;
    });
    const [lives, setLives] = useState(3);
    const [gameOver, setGameOver] = useState(false);
    const [running, setRunning] = useState(false);
    const [paused, setPaused] = useState(false);

    // Refs to avoid stale closures inside rAF loop
    const bulletsRef = useRef<Bullet[]>([]);
    const enemiesRef = useRef<Enemy[]>([]);
    const particlesRef = useRef<Particle[]>([]);
    const scoreRef = useRef(0);
    const livesRef = useRef(3);
    const runningRef = useRef(false);
    const pausedRef = useRef(false);
    const shipXRef = useRef(230);

    // Timing / difficulty refs
    const animationRef = useRef<number | null>(null);
    const lastTsRef = useRef<number | null>(null);
    const spawnAccumulatorRef = useRef(0);
    const spawnIntervalRef = useRef(1.0); // seconds, will scale with score
    const enemyBaseSpeedRef = useRef(50); // px/s base, will scale with score
    const fireCooldownRef = useRef(0); // seconds remaining until next shot allowed
    const viewportScaleRef = useRef(1); // cssWidth / CANVAS_WIDTH

    // Sync refs when state changes
    useEffect(() => {
        bulletsRef.current = bullets;
    }, [bullets]);
    useEffect(() => {
        enemiesRef.current = enemies;
    }, [enemies]);
    useEffect(() => {
        particlesRef.current = particles;
    }, [particles]);
    useEffect(() => {
        scoreRef.current = score;
    }, [score]);
    useEffect(() => {
        livesRef.current = lives;
    }, [lives]);
    useEffect(() => {
        runningRef.current = running;
    }, [running]);
    useEffect(() => {
        pausedRef.current = paused;
    }, [paused]);
    useEffect(() => {
        shipXRef.current = shipX;
    }, [shipX]);

    const resetCanvasResolution = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const dpr = window.devicePixelRatio || 1;
        // Compute CSS width responsively (max 500px)
        const parent = canvas.parentElement;
        const available = parent ? parent.clientWidth : CANVAS_WIDTH;
        const cssWidth = Math.max(200, Math.min(available, CANVAS_WIDTH));
        const cssHeight = Math.round(cssWidth * (CANVAS_HEIGHT / CANVAS_WIDTH));
        // Apply CSS size
        canvas.style.width = `${cssWidth}px`;
        canvas.style.height = `${cssHeight}px`;
        // Backing store size for crispness
        canvas.width = Math.floor(cssWidth * dpr);
        canvas.height = Math.floor(cssHeight * dpr);
        // Scale drawing so game uses logical 500x400 units
        const scale = cssWidth / CANVAS_WIDTH;
        viewportScaleRef.current = scale;
        const ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0);
        }
    }, []);

    useEffect(() => {
        resetCanvasResolution();
        const onResize = () => resetCanvasResolution();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [resetCanvasResolution]);

    const startGame = useCallback(() => {
        setBullets([]);
        setEnemies([]);
        setParticles([]);
        setScore(0);
        setLives(3);
        setGameOver(false);
        setPaused(false);
        setRunning(true);

        bulletsRef.current = [];
        enemiesRef.current = [];
        particlesRef.current = [];
        scoreRef.current = 0;
        livesRef.current = 3;
        runningRef.current = true;
        pausedRef.current = false;
        lastTsRef.current = null;
        spawnAccumulatorRef.current = 0;
        spawnIntervalRef.current = 1.0;
        enemyBaseSpeedRef.current = 60;
        fireCooldownRef.current = 0;
        setShipX((prev) => {
            shipXRef.current = prev;
            return prev;
        });
    }, []);

    const togglePause = useCallback(() => {
        if (!runningRef.current || gameOver) return;
        setPaused((p) => !p);
        pausedRef.current = !pausedRef.current;
    }, [gameOver]);

    const clampShipX = (x: number) => Math.max(0, Math.min(CANVAS_WIDTH - SHIP_WIDTH, x));

    const tryFire = useCallback(() => {
        if (!runningRef.current || pausedRef.current) return;
        if (fireCooldownRef.current > 0) return;
        const newBullet: Bullet = {
            x: shipXRef.current + SHIP_WIDTH / 2 - BULLET_WIDTH / 2,
            y: SHIP_Y - BULLET_HEIGHT,
            vy: -360, // px/s upwards
        };
        const next = [...bulletsRef.current, newBullet];
        bulletsRef.current = next;
        setBullets(next);
        fireCooldownRef.current = 0.18; // 180ms
    }, []);

    // Keyboard controls
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Enter" && !runningRef.current && !gameOver) {
                startGame();
                return;
            }
            if (!runningRef.current) return;
            if (e.key === "p" || e.key === "P") {
                togglePause();
                return;
            }
            if (pausedRef.current) return;
            if (e.key === "ArrowLeft") setShipX((x) => clampShipX(x - 24));
            if (e.key === "ArrowRight") setShipX((x) => clampShipX(x + 24));
            if (e.key === " ") tryFire();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [gameOver, startGame, togglePause, tryFire]);

    // Pointer/touch controls on canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        let isPointerDown = false;
        const getCanvasX = (clientX: number) => {
            const rect = canvas.getBoundingClientRect();
            const xCss = clientX - rect.left;
            const scale = viewportScaleRef.current || 1;
            const xGame = xCss / scale;
            return clampShipX(xGame - SHIP_WIDTH / 2);
        };
        const onPointerDown = (e: PointerEvent) => {
            if (!runningRef.current) return;
            isPointerDown = true;
            setShipX(getCanvasX(e.clientX));
            tryFire();
        };
        const onPointerMove = (e: PointerEvent) => {
            if (!isPointerDown || !runningRef.current || pausedRef.current) return;
            setShipX(getCanvasX(e.clientX));
        };
        const onPointerUp = () => {
            isPointerDown = false;
        };
        canvas.addEventListener("pointerdown", onPointerDown);
        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
        return () => {
            canvas.removeEventListener("pointerdown", onPointerDown);
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerup", onPointerUp);
        };
    }, [tryFire]);

    // Animation loop with requestAnimationFrame
    useEffect(() => {
        if (!running) return;
        const tick = (ts: number) => {
            if (!runningRef.current) return;
            if (lastTsRef.current == null) lastTsRef.current = ts;
            const dt = Math.min(0.033, (ts - lastTsRef.current) / 1000); // clamp to ~30fps max step
            lastTsRef.current = ts;

            // cooldowns
            if (fireCooldownRef.current > 0) fireCooldownRef.current = Math.max(0, fireCooldownRef.current - dt);

            if (!pausedRef.current) {
                // Difficulty scaling with score
                const difficulty = Math.min(1, scoreRef.current / 300); // 0..1
                const enemySpeed = 60 + 140 * difficulty; // 60 -> 200 px/s
                const spawnInterval = 1.0 - 0.7 * difficulty; // 1.0s -> 0.3s
                enemyBaseSpeedRef.current = enemySpeed;
                spawnIntervalRef.current = Math.max(0.25, spawnInterval);

                // Move bullets
                const movedBullets = bulletsRef.current
                    .map((b) => ({ ...b, y: b.y + b.vy * dt }))
                    .filter((b) => b.y + BULLET_HEIGHT > 0);

                // Move enemies
                const movedEnemies = enemiesRef.current
                    .map((e) => ({ ...e, y: e.y + enemyBaseSpeedRef.current * dt }));

                // Collisions
                const remainingBullets: Bullet[] = [];
                const usedBulletIdx = new Set<number>();
                let updatedScore = scoreRef.current;
                const remainingEnemies: Enemy[] = [];

                for (let ei = 0; ei < movedEnemies.length; ei++) {
                    const e = movedEnemies[ei];
                    let hitBy = -1;
                    for (let bi = 0; bi < movedBullets.length; bi++) {
                        if (usedBulletIdx.has(bi)) continue;
                        const b = movedBullets[bi];
                        const intersects =
                            b.x < e.x + e.w &&
                            b.x + BULLET_WIDTH > e.x &&
                            b.y < e.y + e.h &&
                            b.y + BULLET_HEIGHT > e.y;
                        if (intersects) {
                            hitBy = bi;
                            break;
                        }
                    }
                    if (hitBy >= 0) {
                        usedBulletIdx.add(hitBy);
                        updatedScore += 10;
                        // particles
                        const px = e.x + e.w / 2;
                        const py = e.y + e.h / 2;
                        const newParticles: Particle[] = Array.from({ length: 8 }, () => {
                            const angle = Math.random() * Math.PI * 2;
                            const speed = 50 + Math.random() * 120;
                            return {
                                x: px,
                                y: py,
                                vx: Math.cos(angle) * speed,
                                vy: Math.sin(angle) * speed,
                                life: 0.4 + Math.random() * 0.4,
                            };
                        });
                        particlesRef.current = [...particlesRef.current, ...newParticles];
                    } else {
                        remainingEnemies.push(e);
                    }
                }
                for (let bi = 0; bi < movedBullets.length; bi++) {
                    if (!usedBulletIdx.has(bi)) remainingBullets.push(movedBullets[bi]);
                }

                // Handle enemies reaching bottom -> lose life
                let updatedLives = livesRef.current;
                const floorY = CANVAS_HEIGHT - SHIP_HEIGHT - 4;
                const filteredEnemies: Enemy[] = [];
                for (const e of remainingEnemies) {
                    if (e.y + e.h >= floorY) {
                        updatedLives = Math.max(0, updatedLives - 1);
                    } else {
                        filteredEnemies.push(e);
                    }
                }

                // Spawn new enemies
                spawnAccumulatorRef.current += dt;
                while (spawnAccumulatorRef.current >= spawnIntervalRef.current) {
                    spawnAccumulatorRef.current -= spawnIntervalRef.current;
                    const w = 30;
                    const h = 20;
                    const x = Math.random() * (CANVAS_WIDTH - w);
                    const y = -h - Math.random() * 50;
                    filteredEnemies.push({ x, y, vy: enemyBaseSpeedRef.current, w, h });
                }

                // Update particles
                const nextParticles: Particle[] = [];
                for (const p of particlesRef.current) {
                    const nx = p.x + p.vx * dt;
                    const ny = p.y + p.vy * dt;
                    const nl = p.life - dt;
                    if (nl > 0) nextParticles.push({ ...p, x: nx, y: ny, life: nl });
                }

                // Commit updates
                bulletsRef.current = remainingBullets;
                enemiesRef.current = filteredEnemies;
                particlesRef.current = nextParticles;
                if (updatedScore !== scoreRef.current) {
                    scoreRef.current = updatedScore;
                    setScore(updatedScore);
                }
                if (updatedLives !== livesRef.current) {
                    livesRef.current = updatedLives;
                    setLives(updatedLives);
                    if (updatedLives <= 0) {
                        setGameOver(true);
                        setRunning(false);
                        runningRef.current = false;
                        // High score
                        const best = Math.max(highScore, scoreRef.current);
                        if (best !== highScore) {
                            setHighScore(best);
                            try {
                                window.localStorage.setItem("spaceShooterHighScore", String(best));
                            } catch {}
                        }
                    }
                }
                // Push arrays to state to trigger redraw
                setBullets(bulletsRef.current);
                setEnemies(enemiesRef.current);
                setParticles(particlesRef.current);
            }

            animationRef.current = window.requestAnimationFrame(tick);
        };
        animationRef.current = window.requestAnimationFrame(tick);
        return () => {
            if (animationRef.current != null) cancelAnimationFrame(animationRef.current);
        };
    }, [running, highScore]);

    // Draw game
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        // background
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        const grad = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
        grad.addColorStop(0, "#050510");
        grad.addColorStop(1, "#000000");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // ground line
        ctx.strokeStyle = "#222";
        ctx.beginPath();
        ctx.moveTo(0, CANVAS_HEIGHT - SHIP_HEIGHT);
        ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT - SHIP_HEIGHT);
        ctx.stroke();

        // ship
        ctx.fillStyle = paused ? "#2aff2a" : "lime";
        ctx.fillRect(shipX, SHIP_Y, SHIP_WIDTH, SHIP_HEIGHT);

        // bullets
        ctx.fillStyle = "#ff5555";
        for (const b of bullets) {
            ctx.fillRect(b.x, b.y, BULLET_WIDTH, BULLET_HEIGHT);
        }

        // enemies
        ctx.fillStyle = "#ffd54a";
        for (const e of enemies) {
            ctx.fillRect(e.x, e.y, e.w, e.h);
        }

        // particles
        for (const p of particles) {
            const alpha = Math.max(0, Math.min(1, p.life));
            ctx.fillStyle = `rgba(255,255,255,${alpha})`;
            ctx.fillRect(p.x, p.y, 2, 2);
        }

        // HUD text
        ctx.fillStyle = "white";
        ctx.font = "14px Arial";
        ctx.fillText(`Score: ${score}`, 10, 20);
        ctx.fillText(`High: ${highScore}`, 100, 20);
        ctx.fillText(`Lives: ${lives}`, 190, 20);

        if (paused && running && !gameOver) {
            ctx.fillStyle = "rgba(0,0,0,0.4)";
            ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            ctx.fillStyle = "white";
            ctx.font = "bold 20px Arial";
            ctx.fillText("Paused", CANVAS_WIDTH / 2 - 36, CANVAS_HEIGHT / 2);
        }
    }, [shipX, bullets, enemies, particles, score, highScore, lives, paused, running, gameOver]);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background: "black",
                flexDirection: "column",
                gap: "8px",
            }}
        >
            <canvas
                ref={canvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                style={{
                    border: "2px solid white",
                    background: "black",
                    width: "100%",
                    maxWidth: `${CANVAS_WIDTH}px`,
                    height: "auto",
                    touchAction: "none",
                }}
            />

            <div style={{ display: "flex", gap: 8 }}>
                {!running && !gameOver && (
                    <button
                        onClick={startGame}
                        style={{
                            padding: "8px 16px",
                            fontSize: "14px",
                            cursor: "pointer",
                            color: "white",
                            border: "2px solid white",
                            background: "transparent",
                            borderRadius: 6,
                        }}
                    >
                        Start Game 🚀
                    </button>
                )}

                {running && !gameOver && (
                    <button
                        onClick={togglePause}
                        style={{
                            padding: "8px 16px",
                            fontSize: "14px",
                            cursor: "pointer",
                        }}
                    >
                        {paused ? "Resume" : "Pause"}
                    </button>
                )}

                {gameOver && (
                    <button
                        onClick={startGame}
                        style={{
                            padding: "8px 16px",
                            fontSize: "14px",
                            cursor: "pointer",
                            color: "white",
                            border: "2px solid white",
                            background: "transparent",
                            borderRadius: 6,
                        }}
                    >
                        Restart ↻
                    </button>
                )}
            </div>

            {gameOver && (
                <div style={{ marginTop: "6px", color: "white", textAlign: "center" }}>
                    <div style={{ fontSize: 18, marginBottom: 4 }}>💥 Game Over 💥</div>
                    <div>Score: {score} · High: {Math.max(highScore, score)}</div>
                </div>
            )}
        </div>
    );
}
