import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Compass,
  Gem,
  Gauge,
  Maximize2,
  MapPin,
  RotateCcw,
  Sparkles,
  Trophy,
  X,
} from "lucide-react";
import { CITY_TREASURES, mountCityGame, type CityControls, type CityGame, type CityTreasure } from "@/numatik-city-rider/cityRiderGame";
import type { QuizQuestion } from "@/components/MeteorShootingGame";
import { useSound } from "@/contexts/SoundContext";
import type { PointerEvent as ReactPointerEvent } from "react";
import "./NumatikCityRiderPage.css";

const QUESTIONS = [
  { prompt: "Di taman, ada 4 petak bunga. Setiap petak berisi 6 bunga. Berapa jumlah bunga semuanya?", options: ["10 bunga", "24 bunga", "20 bunga", "18 bunga"], answer: 1 },
  { prompt: "Pasar memberi diskon Rp5.000 dari harga Rp20.000. Berapa harga setelah diskon?", options: ["Rp15.000", "Rp25.000", "Rp10.000", "Rp16.000"], answer: 0 },
  { prompt: "Di sekolah ada 3 kelas dengan masing-masing 28 siswa. Berapa jumlah seluruh siswa?", options: ["74 siswa", "81 siswa", "84 siswa", "86 siswa"], answer: 2 },
  { prompt: "Pak Budi memiliki 36 bibit. Bibit itu dibagi rata ke dalam 4 baris. Berapa bibit tiap baris?", options: ["8 bibit", "9 bibit", "10 bibit", "12 bibit"], answer: 1 },
  { prompt: "Sebuah toko menjual 12 kotak pensil. Setiap kotak berisi 8 pensil. Berapa jumlah pensil?", options: ["86 pensil", "92 pensil", "96 pensil", "108 pensil"], answer: 2 },
];

const GAS_SOUND_VOLUME_BOOST = 1.25;

const CITY_MAP = CITY_TREASURES.map(({ position }) => ({
  x: 50 + (position.x / 130) * 44,
  y: 50 + (position.z / 130) * 44,
}));

type CityMapGraphicProps = {
  mapX: number;
  mapY: number;
  collected: number[];
};

const CityMapGraphic = ({ mapX, mapY, collected }: CityMapGraphicProps) => (
  <svg viewBox="0 0 100 100" role="img" aria-label="Peta kota dengan lima lokasi harta karun">
    <rect x="1" y="1" width="98" height="98" rx="8" fill="#d8e6d3" />
    {[-100, -40, 40, 100].map((coordinate) => {
      const line = 50 + (coordinate / 130) * 44;
      return (
        <g key={coordinate}>
          <path d={`M ${line} 2 V 98`} stroke="#fffaf0" strokeWidth="6" />
          <path d={`M 2 ${line} H 98`} stroke="#fffaf0" strokeWidth="6" />
          <path d={`M ${line} 2 V 98`} stroke="#a9b5a8" strokeWidth="0.5" strokeDasharray="1.5 2" />
          <path d={`M 2 ${line} H 98`} stroke="#a9b5a8" strokeWidth="0.5" strokeDasharray="1.5 2" />
        </g>
      );
    })}
    <rect x="43" y="43" width="14" height="14" rx="3" fill="#83b681" stroke="#fff" strokeWidth="1" />
    <circle cx="50" cy="50" r="2.2" fill="#82c5d0" />
    {CITY_MAP.map((point, index) => (
      <g key={index}>
        <circle
          cx={point.x}
          cy={point.y}
          r={collected.includes(index) ? 2.2 : 3.1}
          fill={collected.includes(index) ? "#8d9d91" : "#f2ae3d"}
          stroke="#fff"
          strokeWidth="1"
        />
        {!collected.includes(index) && (
          <circle cx={point.x} cy={point.y} r="4.3" fill="none" stroke="#f2ae3d" strokeOpacity=".55" strokeWidth=".7" />
        )}
      </g>
    ))}
    <path
      d={`M ${mapX} ${mapY - 2.7} L ${mapX - 2.4} ${mapY + 2.1} L ${mapX + 2.4} ${mapY + 2.1} Z`}
      fill="#e24f42"
      stroke="#fff"
      strokeWidth="1"
    />
  </svg>
);

const NumatikCityRiderPage = ({
  treasureQuestions,
  backPath = "/ruang-untuk-guru/numatik-game",
}: {
  treasureQuestions?: QuizQuestion[];
  backPath?: string;
} = {}) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<CityGame | null>(null);
  const answerTimeoutRef = useRef<number | null>(null);
  const analogPointerIdRef = useRef<number | null>(null);
  const gasAudioRef = useRef<HTMLAudioElement | null>(null);
  const activeAcceleratorsRef = useRef(new Set<string>());
  const navigate = useNavigate();
  const { soundOn, volume } = useSound();
  const [gameError, setGameError] = useState<string | null>(null);
  const [started, setStarted] = useState(false);
  const [nearby, setNearby] = useState<CityTreasure | null>(null);
  const [questionId, setQuestionId] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerFeedback, setAnswerFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [collected, setCollected] = useState<number[]>([]);
  const [touchControls, setTouchControls] = useState<CityControls>({
    accelerate: 0,
    brake: 0,
    steer: 0,
  });
  const [playerPosition, setPlayerPosition] = useState({ x: 8, z: 100 });
  const [speed, setSpeed] = useState(0);
  const [mapExpanded, setMapExpanded] = useState(false);
  const questions = treasureQuestions?.length
    ? Array.from({ length: CITY_TREASURES.length }, (_, index) => {
        const question = treasureQuestions[index % treasureQuestions.length]!;
        return {
          prompt: question.question,
          options: question.options,
          answer: question.correctIndex,
        };
      })
    : QUESTIONS;

  const playGasSound = useCallback(() => {
    if (!soundOn || !started || questionId !== null) return;
    const audio = gasAudioRef.current;
    if (!audio || !audio.paused) return;
    audio.currentTime = 0;
    audio.volume = Math.min(1, (volume / 100) * GAS_SOUND_VOLUME_BOOST);
    void audio.play().catch((error: unknown) => {
      console.warn("Unable to play the City Rider gas sound.", error);
    });
  }, [questionId, soundOn, started, volume]);

  const stopGasSound = useCallback(() => {
    const audio = gasAudioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  }, []);

  const setAccelerator = useCallback((source: string, active: boolean) => {
    const activeSources = activeAcceleratorsRef.current;
    if (active) {
      const wasIdle = activeSources.size === 0;
      activeSources.add(source);
      if (wasIdle) playGasSound();
      return;
    }

    activeSources.delete(source);
    if (activeSources.size === 0) stopGasSound();
  }, [playGasSound, stopGasSound]);

  useEffect(() => {
    const audio = new Audio("/sounds/city-rider-gas.mp3");
    audio.preload = "auto";
    audio.loop = true;
    gasAudioRef.current = audio;
    return () => {
      activeAcceleratorsRef.current.clear();
      audio.pause();
      audio.currentTime = 0;
      gasAudioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (gasAudioRef.current) {
      gasAudioRef.current.volume = Math.min(1, (volume / 100) * GAS_SOUND_VOLUME_BOOST);
    }
  }, [volume]);

  useEffect(() => {
    if (soundOn && started && questionId === null) return;
    activeAcceleratorsRef.current.clear();
    stopGasSound();
  }, [questionId, soundOn, started, stopGasSound]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (key === "w" || key === "arrowup") setAccelerator(`key:${key}`, true);
    };
    const onKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (key === "w" || key === "arrowup") setAccelerator(`key:${key}`, false);
    };
    const onBlur = () => {
      activeAcceleratorsRef.current.clear();
      stopGasSound();
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
    };
  }, [setAccelerator, stopGasSound]);

  const openQuestion = useCallback((treasure: CityTreasure) => {
    gameRef.current?.setPaused(true);
    activeAcceleratorsRef.current.clear();
    stopGasSound();
    setMapExpanded(false);
    setQuestionId(treasure.id);
    setSelectedAnswer(null);
    setAnswerFeedback(null);
  }, [stopGasSound]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    try {
      const game = mountCityGame(host, {
        onNearby: setNearby,
        onOpen: openQuestion,
        onStatus: (position, currentSpeed) => {
          setPlayerPosition(position);
          setSpeed(currentSpeed);
        },
      });
      gameRef.current = game;
      return () => {
        if (answerTimeoutRef.current !== null) window.clearTimeout(answerTimeoutRef.current);
        game.dispose();
        gameRef.current = null;
      };
    } catch (error) {
      setGameError(error instanceof Error ? error.message : String(error));
      return undefined;
    }
  }, [openQuestion]);

  useEffect(() => {
    gameRef.current?.setControls(touchControls);
  }, [touchControls]);

  const start = () => {
    gameRef.current?.start();
    setStarted(true);
  };

  const chooseAnswer = (answerIndex: number) => {
    if (answerFeedback || questionId === null) return;
    setSelectedAnswer(answerIndex);
    if (answerIndex === questions[questionId]?.answer) {
      setAnswerFeedback("correct");
      answerTimeoutRef.current = window.setTimeout(() => {
        gameRef.current?.setCollected(questionId);
        setCollected((previous) => previous.includes(questionId) ? previous : [...previous, questionId]);
        setQuestionId(null);
        gameRef.current?.setPaused(false);
        setAnswerFeedback(null);
        setNearby(null);
        answerTimeoutRef.current = null;
      }, 900);
    } else {
      setAnswerFeedback("incorrect");
      answerTimeoutRef.current = window.setTimeout(() => {
        setSelectedAnswer(null);
        setAnswerFeedback(null);
        answerTimeoutRef.current = null;
      }, 850);
    }
  };

  const resetGame = () => {
    if (answerTimeoutRef.current !== null) window.clearTimeout(answerTimeoutRef.current);
    answerTimeoutRef.current = null;
    activeAcceleratorsRef.current.clear();
    stopGasSound();
    gameRef.current?.reset();
    setCollected([]);
    setQuestionId(null);
    setNearby(null);
    gameRef.current?.setPaused(false);
    setStarted(true);
  };

  const updateControl = (key: keyof CityControls, value: number) => {
    setTouchControls((current) => ({ ...current, [key]: value }));
  };

  const bindControl = (key: keyof CityControls, value: number) => ({
    onPointerDown: (event: ReactPointerEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.currentTarget.setPointerCapture(event.pointerId);
      updateControl(key, value);
      if (key === "accelerate") setAccelerator("touch", true);
    },
    onPointerUp: () => {
      updateControl(key, 0);
      if (key === "accelerate") setAccelerator("touch", false);
    },
    onPointerCancel: () => {
      updateControl(key, 0);
      if (key === "accelerate") setAccelerator("touch", false);
    },
    onLostPointerCapture: () => {
      updateControl(key, 0);
      if (key === "accelerate") setAccelerator("touch", false);
    },
  });

  const updateAnalogSteering = (event: ReactPointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const maxTravel = bounds.width * 0.28;
    const offsetX = Math.max(
      -maxTravel,
      Math.min(maxTravel, event.clientX - (bounds.left + bounds.width / 2)),
    );
    updateControl("steer", -offsetX / maxTravel);
  };

  const startAnalogSteering = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (analogPointerIdRef.current !== null) return;
    analogPointerIdRef.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    updateAnalogSteering(event);
  };

  const moveAnalogSteering = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerId === analogPointerIdRef.current) updateAnalogSteering(event);
  };

  const stopAnalogSteering = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerId !== analogPointerIdRef.current) return;
    analogPointerIdRef.current = null;
    updateControl("steer", 0);
  };

  const question = questionId === null ? null : questions[questionId];
  const activeQuestionId = questionId ?? 0;
  const allCollected = collected.length === CITY_TREASURES.length;
  const analogPosition = -touchControls.steer;
  const mapX = 50 + (playerPosition.x / 130) * 44;
  const mapY = 50 + (playerPosition.z / 130) * 44;

  return (
    <main className="city-game">
      <div ref={hostRef} className="city-game__canvas" />
      <div className="city-game__vignette" />

      <header className="city-game__topbar">
        <button className="city-game__back" type="button" onClick={() => navigate(backPath)}>
          <ArrowLeft size={17} />
          <span>NUMATIK GAME</span>
        </button>
        <div className="city-game__brand">
          <div className="city-game__brand-icon">
            <img src="/logo-numatik.png" alt="Logo NUMATIK" />
          </div>
          <div><strong>NUMATIK CITY RIDER 3D</strong><small>URBAN TREASURE RIDE</small></div>
        </div>
        <button className="city-game__icon-button" type="button" onClick={resetGame} aria-label="Ulangi petualangan">
          <RotateCcw size={17} />
        </button>
      </header>

      {started && (
        <>
          <section className="city-game__hud">
            <div className="city-game__hud-card city-game__score">
              <span className="city-game__eyebrow"><Gem size={13} /> HARTA TERKUMPUL</span>
              <strong>{String(collected.length).padStart(2, "0")} <small>/ 05</small></strong>
              <div className="city-game__treasure-dots" aria-label={`${collected.length} dari 5 peti ditemukan`}>
                {CITY_TREASURES.map((treasure) => (
                  <i key={treasure.id} className={collected.includes(treasure.id) ? "is-found" : ""} />
                ))}
              </div>
            </div>
            <div className="city-game__hud-card city-game__speed">
              <span className="city-game__eyebrow"><Gauge size={13} /> KECEPATAN</span>
              <strong>{Math.round(speed)} <small>KM/J</small></strong>
            </div>
          </section>

          <button
            type="button"
            className="city-game__map-card"
            aria-label="Perbesar peta kota"
            onClick={() => setMapExpanded(true)}
          >
            <span className="city-game__map-heading"><MapPin size={13} /> PETA KOTA <span>PERBESAR <Maximize2 size={11} /></span></span>
            <CityMapGraphic mapX={mapX} mapY={mapY} collected={collected} />
            <span className="city-game__map-label"><span><i className="player-dot" /> KAMU</span><span><i className="treasure-dot" /> HARTA</span></span>
          </button>

          <div className="city-game__controls-hint">
            <kbd>W A S D</kbd> / <kbd>↑ ← ↓ →</kbd> BERKENDARA <b>·</b> DEKATI PETI UNTUK MEMBUKA KUIS
          </div>

          {nearby && !question && (
            <div className="city-game__interact">
              <span className="city-game__interact-key"><Gem size={17} /></span>
              <span><strong>PETI HARTA DI DEKATMU!</strong><small>Dekati peti — pertanyaan akan terbuka otomatis</small></span>
              <Sparkles size={20} />
            </div>
          )}

          <div className="city-game__touch" aria-label="Kontrol berkendara sentuh">
            <div
              className="city-game__steering"
              role="slider"
              aria-label="Analog kemudi"
              aria-valuemin={-1}
              aria-valuemax={1}
              aria-valuenow={Number(analogPosition.toFixed(2))}
              tabIndex={0}
              onPointerDown={startAnalogSteering}
              onPointerMove={moveAnalogSteering}
              onPointerUp={stopAnalogSteering}
              onPointerCancel={stopAnalogSteering}
              onLostPointerCapture={stopAnalogSteering}
            >
              <span className="city-game__analog-guide" />
              <span
                className="city-game__analog-knob"
                style={{ transform: `translate(calc(-50% + ${analogPosition * 30}px), -50%)` }}
              />
              <span className="city-game__analog-label">KEMUDI</span>
            </div>
            <div className="city-game__pedals">
              <button className="city-game__brake" type="button" aria-label="Rem" {...bindControl("brake", 1)}>REM</button>
              <button className="city-game__gas" type="button" aria-label="Gas" {...bindControl("accelerate", 1)}>
                <span>▲</span> GAS
              </button>
            </div>
          </div>
        </>
      )}

      {!started && !gameError && (
        <div className="city-game__intro">
          <div className="city-game__intro-card">
            <div className="city-game__intro-tag"><Sparkles size={13} /> NUMATIK CITY RIDER 3D</div>
            <h1>JELAJAHI KOTA.<br /><span>TEMUKAN HARTA.</span></h1>
            <p>Naiki motor, jelajahi taman dan pusat kota, lalu temukan lima peti harta berisi tantangan matematika.</p>
            <div className="city-game__intro-stats">
              <span><Gem size={15} /> 5 peti rahasia</span>
              <span><Compass size={15} /> 1 kota untuk dijelajahi</span>
            </div>
            <button className="city-game__start" type="button" onClick={start}>
              MULAI PETUALANGAN <span>→</span>
            </button>
            <small className="city-game__keyboard-note">WASD / tombol panah untuk berkendara <b>·</b> Dekati peti untuk membuka pertanyaan otomatis</small>
          </div>
        </div>
      )}

      {question && (
        <div className="city-game__modal-backdrop" role="presentation">
          <section className="city-game__question" role="dialog" aria-modal="true" aria-labelledby="city-question-title">
            <button className="city-game__close" type="button" disabled={answerFeedback === "correct"} onClick={() => {
              if (answerTimeoutRef.current !== null) window.clearTimeout(answerTimeoutRef.current);
              answerTimeoutRef.current = null;
              setQuestionId(null);
              setAnswerFeedback(null);
              setSelectedAnswer(null);
              gameRef.current?.setPaused(false);
            }} aria-label="Tutup pertanyaan">
              <X size={18} />
            </button>
            <div className="city-game__question-icon"><Gem size={22} /></div>
            <div className="city-game__question-kicker">PETI {String(activeQuestionId + 1).padStart(2, "0")} / 05 <span>•</span> {CITY_TREASURES[activeQuestionId]?.name.toUpperCase()}</div>
            <h2 id="city-question-title">Jawab tantangan untuk<br />membuka harta!</h2>
            <p className="city-game__prompt">{question.prompt}</p>
            <div className="city-game__answers">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = answerFeedback === "correct" && isSelected;
                const isWrong = answerFeedback === "incorrect" && isSelected;
                return (
                  <button
                    key={option}
                    type="button"
                    disabled={Boolean(answerFeedback)}
                    className={`${isSelected ? "is-selected" : ""} ${isCorrect ? "is-correct" : ""} ${isWrong ? "is-wrong" : ""}`}
                    onClick={() => chooseAnswer(index)}
                  >
                    <span>{String.fromCharCode(65 + index)}</span>{option}
                    {isCorrect && <Check size={17} />}
                  </button>
                );
              })}
            </div>
            {answerFeedback && <div className={`city-game__feedback ${answerFeedback}`}>
              {answerFeedback === "correct" ? "Tepat sekali! Harta berhasil ditemukan!" : "Belum tepat. Coba pilih jawaban lain!"}
            </div>}
            <div className="city-game__question-footer"><span>✨</span> Jawaban benar membuka peti harta karun</div>
          </section>
        </div>
      )}

      {mapExpanded && started && (
        <div className="city-game__map-backdrop" role="presentation" onClick={() => setMapExpanded(false)}>
          <section
            className="city-game__expanded-map"
            role="dialog"
            aria-modal="true"
            aria-labelledby="city-expanded-map-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="city-game__expanded-map-header">
              <div>
                <span><MapPin size={14} /> PETA PENJELAJAH</span>
                <h2 id="city-expanded-map-title">KOTA NUMATIK</h2>
              </div>
              <button type="button" className="city-game__close" onClick={() => setMapExpanded(false)} aria-label="Tutup peta">
                <X size={18} />
              </button>
            </div>
            <CityMapGraphic mapX={mapX} mapY={mapY} collected={collected} />
            <div className="city-game__expanded-map-legend">
              <span><i className="player-dot" /> Posisi kamu</span>
              <span><i className="treasure-dot" /> Peti harta</span>
              <span><i className="city-park-dot" /> Taman kota</span>
            </div>
            <div className="city-game__map-destinations">
              {CITY_TREASURES.map((treasure) => (
                <span key={treasure.id} className={collected.includes(treasure.id) ? "is-found" : ""}>
                  <i /> {treasure.name}
                </span>
              ))}
            </div>
          </section>
        </div>
      )}

      {allCollected && !question && (
        <div className="city-game__modal-backdrop">
          <section className="city-game__victory" role="dialog" aria-modal="true">
            <div className="city-game__victory-icon"><Trophy size={36} /></div>
            <div className="city-game__question-kicker">MISI SELESAI</div>
            <h2>LEGENDARIS!</h2>
            <p>Kamu berhasil menemukan semua harta dan menaklukkan lima tantangan matematika di kota.</p>
            <button className="city-game__start" type="button" onClick={resetGame}><RotateCcw size={16} /> JELAJAHI LAGI</button>
          </section>
        </div>
      )}

      {gameError && (
        <div className="city-game__error">
          <div><h1>NUMATIK CITY RIDER 3D</h1><p>Game 3D tidak dapat dimulai di perangkat ini.</p><small>{gameError}</small></div>
        </div>
      )}

      {started && !allCollected && <div className="city-game__location"><MapPin size={13} /> KOTA NUMATIK <span>•</span> SIANG HARI</div>}
    </main>
  );
};

export default NumatikCityRiderPage;
