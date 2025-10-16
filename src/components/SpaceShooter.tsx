import { useState, useEffect, useRef } from "react";

interface Bullet {
    x: number;
    y: number;
}

interface Enemy {
    x: number;
    y: number;
}

export default function SpaceShooter() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [shipX, setShipX] = useState(230);
    const [bullets, setBullets] = useState<Bullet[]>([]);
    const [enemies, setEnemies] = useState<Enemy[]>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [running, setRunning] = useState(false);
    const [youWin, setYouWin] = useState(false);

    const startGame = () => {
        setEnemies(
            Array.from({ length: 5 }, (_, i) => ({
                x: i * 80 + 40,
                y: 20,
            }))
        );
        setBullets([]);
        setScore(0);
        setGameOver(false);
        setYouWin(false);
        setRunning(true);
    };

    // Handle keyboard controls
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (!running) return;
            if (e.key === "ArrowLeft") setShipX((x) => Math.max(0, x - 20));
            if (e.key === "ArrowRight") setShipX((x) => Math.min(460, x + 20));
            if (e.key === " ") setBullets((b) => [...b, { x: shipX + 12, y: 340 }]);
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [shipX, running]);

    // Handle mobile touch controls
    useEffect(() => {
        const handleTouch = (e: TouchEvent) => {
            if (!running) return;
            const touchX = e.touches[0].clientX;
            const screenWidth = window.innerWidth;
            if (touchX < screenWidth / 3) setShipX((x) => Math.max(0, x - 20));
            else if (touchX > (2 * screenWidth) / 3) setShipX((x) => Math.min(460, x + 20));
            else setBullets((b) => [...b, { x: shipX + 12, y: 340 }]);
        };
        window.addEventListener("touchstart", handleTouch);
        return () => window.removeEventListener("touchstart", handleTouch);
    }, [shipX, running]);

    // Main game loop
    useEffect(() => {
        if (!running) return;
        const interval = setInterval(() => {
            setBullets((bullets) =>
                bullets.map((b) => ({ ...b, y: b.y - 10 })).filter((b) => b.y > 0)
            );

            setEnemies((enemies) => {
                const newEnemies = enemies.map((e) => ({ ...e, y: e.y + 2 }));
                if (newEnemies.some((e) => e.y > 360)) {
                    setGameOver(true);
                    setRunning(false);
                }
                return newEnemies;
            });

            // Collision detection
            setEnemies((enemies) => {
                const remainingEnemies = enemies.filter((enemy) => {
                    const hit = bullets.some(
                        (b) =>
                            b.x < enemy.x + 30 &&
                            b.x + 4 > enemy.x &&
                            b.y < enemy.y + 20 &&
                            b.y + 10 > enemy.y
                    );
                    if (hit) setScore((s) => s + 10);
                    return !hit;
                });

                if (remainingEnemies.length === 0 && running) {
                    setRunning(false);
                    setYouWin(true);
                }

                return remainingEnemies;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [bullets, running]);

    // Draw game
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        ctx.clearRect(0, 0, 500, 400);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 500, 400);

        ctx.fillStyle = "lime";
        ctx.fillRect(shipX, 360, 40, 20);

        ctx.fillStyle = "red";
        bullets.forEach((b) => ctx.fillRect(b.x, b.y, 4, 10));

        ctx.fillStyle = "yellow";
        enemies.forEach((e) => ctx.fillRect(e.x, e.y, 30, 20));

        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.fillText(`Score: ${score}`, 10, 20);
    }, [shipX, bullets, enemies, score]);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background: "black",
                flexDirection: "column",
            }}
        >
            <canvas
                ref={canvasRef}
                width={500}
                height={400}
                style={{
                    border: "2px solid white",
                    background: "black",
                    width: "90%",
                    maxWidth: "500px",
                }}
            />

            {!running && !gameOver && !youWin && (
                <button
                    onClick={startGame}
                    style={{
                        marginTop: "10px",
                        padding: "10px 20px",
                        fontSize: "16px",
                        cursor: "pointer",
                        color: "white"
                    }}
                >
                    Start Game 🚀
                </button>
            )}

            {gameOver && (
                <div style={{ marginTop: "20px", color: "white" }}>
                    <h2>💥 Game Over 💥</h2>
                    <p>Score: {score}</p>
                    <button
                        onClick={startGame}
                        style={{
                            marginTop: "10px",
                            padding: "10px 20px",
                            fontSize: "16px",
                            cursor: "pointer",
                        }}
                    >
                        Restart
                    </button>
                </div>
            )}

            {youWin && (
                <div style={{ marginTop: "20px", color: "white" }}>
                    <h2>🏆 You Win! 🏆</h2>
                    <p>Final Score: {score}</p>
                    <button
                        onClick={startGame}
                        style={{
                            marginTop: "10px",
                            padding: "10px 20px",
                            fontSize: "16px",
                            cursor: "pointer",
                        }}
                    >
                        Play Again
                    </button>
                </div>
            )}
        </div>
    );
}
