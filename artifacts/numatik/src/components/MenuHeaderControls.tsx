import { useEffect, useId, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Check, CircleHelp, Globe, Palette, Pause, Play, Settings, Volume2, VolumeX, X } from "lucide-react";
import { useLanguage, type Language } from "@/contexts/LanguageContext";
import { useMusic } from "@/contexts/MusicContext";
import { useTheme, type Theme } from "@/contexts/ThemeContext";
import { TRACKS } from "@/hooks/bgMusicTracks";
import { MP3_TRACKS } from "@/hooks/mp3Tracks";
import { playPopSound } from "@/hooks/useAudio";
import { markGuideSeen } from "@/lib/guideVisit";

type Picker = "language" | "music" | "theme" | null;

const LANGUAGES: ReadonlyArray<{ id: Language; name: string }> = [
  { id: "id", name: "Indonesia" },
  { id: "en", name: "English" },
  { id: "ms-MY", name: "Bahasa Melayu (Malaysia)" },
  { id: "ja", name: "日本語" },
  { id: "zh-CN", name: "简体中文" },
  { id: "ru", name: "Русский" },
];

const THEMES: readonly Theme[] = ["dark", "sunset", "pastel", "ocean", "light", "forest", "white"];
const MUSIC_TRACKS = [{ id: "none", name: "None", emoji: "🔇" }, ...MP3_TRACKS, ...TRACKS];

const MenuHeaderControls = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const { musicOn, toggleMusic, trackId, setTrackId } = useMusic();
  const { theme, setTheme } = useTheme();
  const [openPicker, setOpenPicker] = useState<Picker>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceId = useId();
  const languagePickerId = `${instanceId}-language-picker`;
  const musicPickerId = `${instanceId}-music-picker`;
  const musicListId = `${instanceId}-music-list`;
  const themePickerId = `${instanceId}-theme-picker`;

  useEffect(() => {
    if (!openPicker) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (event.target instanceof Node && !containerRef.current?.contains(event.target)) {
        setOpenPicker(null);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenPicker(null);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [openPicker]);

  const togglePicker = (picker: Exclude<Picker, null>) => {
    playPopSound();
    setOpenPicker((current) => current === picker ? null : picker);
  };
  const musicStatusLabel = `${t("menu.musicButton")} · ${t(musicOn ? "settings.musicOn" : "settings.musicOff")}`;

  return (
    <div ref={containerRef} className="menu-header-controls relative flex items-center gap-1.5">
      <div className="relative">
        <button
          type="button"
          aria-label={t("menu.languageButton")}
          title={t("menu.languageButton")}
          aria-expanded={openPicker === "language"}
          aria-controls={languagePickerId}
          onClick={() => togglePicker("language")}
          className="menu-control-button menu-focusable"
        >
          <Globe aria-hidden="true" className="h-5 w-5" />
        </button>
        {openPicker === "language" && (
          <div
            id={languagePickerId}
            role="group"
            aria-label={t("menu.languageButton")}
            className="menu-popover absolute right-0 top-full z-50 mt-2 min-w-40 rounded-xl border p-1.5 shadow-xl"
          >
            {LANGUAGES.map((option) => (
              <button
                key={option.id}
                type="button"
                aria-pressed={language === option.id}
                onClick={() => {
                  playPopSound();
                  setLanguage(option.id);
                  setOpenPicker(null);
                }}
                className="menu-popover-option menu-focusable flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm"
              >
                <span>{option.name}</span>
                {language === option.id && <Check aria-hidden="true" className="h-4 w-4" />}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative">
        <button
          type="button"
          aria-label={musicStatusLabel}
          title={musicStatusLabel}
          aria-expanded={openPicker === "music"}
          aria-controls={musicPickerId}
          aria-pressed={musicOn}
          onClick={() => togglePicker("music")}
          className="menu-control-button menu-focusable"
        >
          {musicOn
            ? <Volume2 aria-hidden="true" className="h-5 w-5" />
            : <VolumeX aria-hidden="true" className="h-5 w-5" />}
        </button>
        {openPicker === "music" && (
          <div
            id={musicPickerId}
            className="menu-popover absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border p-1.5 shadow-xl"
          >
            <div className="flex items-center justify-between gap-2 px-2 py-1.5">
              <span className="text-sm font-bold">{t("menu.musicButton")}</span>
              <button
                type="button"
                aria-label={t(musicOn ? "menu.musicTurnOff" : "menu.musicTurnOn")}
                aria-pressed={musicOn}
                disabled={trackId === "none"}
                onClick={() => {
                  playPopSound();
                  toggleMusic();
                }}
                className="menu-popover-option menu-focusable flex min-h-10 items-center gap-2 rounded-lg px-2 text-xs font-semibold"
              >
                {musicOn
                  ? <Pause aria-hidden="true" className="h-4 w-4 shrink-0" />
                  : <Play aria-hidden="true" className="h-4 w-4 shrink-0" />}
                <span>{t(musicOn ? "settings.musicOn" : "settings.musicOff")}</span>
              </button>
            </div>
            <div
              id={musicListId}
              role="group"
              aria-label={t("menu.musicList")}
              className="menu-music-list"
            >
              {MUSIC_TRACKS.map((track) => (
                <button
                  key={track.id}
                  type="button"
                  aria-pressed={trackId === track.id}
                  title={track.id === "none" ? t("menu.musicNone") : track.name}
                  onClick={() => {
                    playPopSound();
                    setTrackId(track.id);
                    if (!musicOn && track.id !== "none") toggleMusic(track.id);
                    setOpenPicker(null);
                  }}
                  className="menu-popover-option menu-focusable flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm"
                >
                  <span aria-hidden="true" className="shrink-0">{track.emoji}</span>
                  <span className="min-w-0 flex-1 truncate">
                    {track.id === "none" ? t("menu.musicNone") : track.name}
                  </span>
                  {trackId === track.id && <Check aria-hidden="true" className="h-4 w-4 shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        <button
          type="button"
          aria-label={t("menu.themeButton")}
          title={t("menu.themeButton")}
          aria-expanded={openPicker === "theme"}
          aria-controls={themePickerId}
          onClick={() => togglePicker("theme")}
          className="menu-control-button menu-focusable"
        >
          <Palette aria-hidden="true" className="h-5 w-5" />
        </button>
        {openPicker === "theme" && (
          <div
            id={themePickerId}
            role="group"
            aria-label={t("menu.themeButton")}
            className="menu-popover absolute right-0 top-full z-50 mt-2 min-w-44 rounded-xl border p-1.5 shadow-xl"
          >
            {THEMES.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={theme === option}
                onClick={() => {
                  playPopSound();
                  setTheme(option);
                  setOpenPicker(null);
                }}
                className="menu-popover-option menu-focusable flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm"
              >
                <span>{t(`themeNames.${option}`)}</span>
                {theme === option && <Check aria-hidden="true" className="h-4 w-4" />}
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        type="button"
        aria-label={t("menu.guideTooltip")}
        title={t("menu.guideTooltip")}
        onClick={() => {
          playPopSound();
          markGuideSeen();
          setOpenPicker(null);
          navigate("/petunjuk");
        }}
        className="menu-control-button menu-focusable menu-guide-header-button"
      >
        <CircleHelp aria-hidden="true" className="h-5 w-5" />
      </button>

      <button
        type="button"
        aria-label={t("menu.settings")}
        title={t("menu.settings")}
        onClick={() => {
          playPopSound();
          setOpenPicker(null);
          navigate("/pengaturan");
        }}
        className="menu-control-button menu-focusable menu-mobile-settings"
      >
        <Settings aria-hidden="true" className="h-5 w-5" />
      </button>

      <button
        type="button"
        aria-label={t("nav.backToHome")}
        title={t("nav.backToHome")}
        onClick={() => {
          playPopSound();
          setOpenPicker(null);
          navigate("/");
        }}
        className="menu-control-button menu-focusable menu-mobile-close"
      >
        <X aria-hidden="true" className="h-5 w-5" />
      </button>
    </div>
  );
};

export default MenuHeaderControls;
