import React, { useEffect, useMemo, useRef, useState } from "react";
import { LazyMotion, domAnimation, motion } from "framer-motion";
import sanaLogo from "./assets/sana-logo.png";
import voiceMp3 from "./assets/voice.mp3";
import {
  BookOpen,
  Building2,
  Crown,
  ExternalLink,
  Eye,
  Globe,
  Headphones,
  HeartHandshake,
  Languages,
  Layers3,
  Link2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Mic2,
  MonitorPlay,
  Pause,
  Play,
  Radio,
  RotateCcw,
  Send,
  ShieldCheck,
  SkipBack,
  SkipForward,
  Sparkles,
  Stars,
  Target,
  Users,
  Volume2,
} from "lucide-react";

const ACCENT = "#D8B36A";
const CTA_DARK = "#143847";
const PAGE_BG = "#06131D";
const PANEL_DARK = "#102A38";
const PANEL_SOFT = "#173B47";
const PANEL_DEEP = "#0D2431";

const SURFACE_GRADIENT =
  "bg-[linear-gradient(135deg,rgba(7,29,43,0.98)_0%,rgba(15,51,66,0.96)_34%,rgba(31,74,80,0.94)_72%,rgba(92,80,39,0.88)_100%)]";

const SOFT_INNER_GRADIENT =
  "bg-[linear-gradient(135deg,rgba(18,52,67,0.72)_0%,rgba(30,69,81,0.58)_50%,rgba(80,77,49,0.36)_100%)]";

const PAGE_BACKGROUND =
  "bg-[linear-gradient(135deg,#04111C_0%,#071B29_18%,#0C2736_38%,#143847_56%,#1F4A50_78%,#4E4A2E_100%)]";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

const pulseGlow = {
  opacity: [0.18, 0.3, 0.18],
  scale: [1, 1.025, 1],
  transition: { duration: 7, repeat: Infinity, ease: "easeInOut" },
};

const containerClass =
  "relative z-10 mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-10 xl:px-14";

const glass =
  "border border-white/10 bg-white/[0.05] md:backdrop-blur-xl backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.18)]";

const softCard = `rounded-[2rem] border border-white/10 ${SURFACE_GRADIENT} shadow-[0_12px_34px_rgba(0,0,0,0.18)]`;
const outerFrame = `rounded-[2.2rem] border border-white/10 ${SURFACE_GRADIENT} shadow-[0_16px_40px_rgba(0,0,0,0.2)]`;

const navItems = [
  { label: "关于我们", href: "#about" },
  { label: "平台特色", href: "#features" },
  { label: "作品展示", href: "#portfolio" },
  { label: "合作伙伴", href: "#partners" },
  { label: "联系我们", href: "#contact" },
];

const stats = [
  { value: "+100", label: "目标覆盖语言" },
  { value: "24/7", label: "持续全球触达" },
  { value: "114", label: "完整章节" },
  { value: "HQ", label: "高品质音视频" },
];

const heroCards = [
  { value: "114", label: "完整章节" },
  { value: "30", label: "三十卷内容" },
  { value: "专业", label: "视听呈现" },
];

const heroBadges = [
  { icon: Sparkles, title: "古兰经之光与美" },
  { icon: Globe, title: "传向世界的信息" },
];

const identityCards = [
  {
    icon: Users,
    title: "我们是谁",
    text: "Sana 是一个公益型古兰经传播项目，致力于将古兰经的意义传向世界。我们通过音频与视频频道，将优美诵读与精准翻译结合，打造完整而庄重的信仰体验，使不同语言背景的人都能更亲近真主的话语。",
  },
  {
    icon: Eye,
    title: "愿景",
    text: "成为全球领先的平台，以现代、优雅且高质量的方式，将古兰经的意义传达给每一个使用自己语言的人。",
  },
  {
    icon: Target,
    title: "使命",
    text: "提供带有翻译的古兰经音视频内容，让人们更清晰、便捷地理解古兰经的意义，并以富有感染力的形式向世界传播引导与启迪。",
  },
];

const features = [
  {
    icon: Languages,
    title: "多语言翻译",
    desc: "以清晰、准确且尊重原意的方式，将古兰经的意义传达给不同民族与语言群体。",
  },
  {
    icon: Headphones,
    title: "完整视听体验",
    desc: "将感人的诵读与同步翻译文字结合，营造庄重、宁静且契合古兰经尊贵气质的体验。",
  },
  {
    icon: Globe,
    title: "持续全球传播",
    desc: "通过数字平台与卫星媒体实现全天候覆盖，持续触达世界各地受众。",
  },
  {
    icon: HeartHandshake,
    title: "为真主而设的公益项目",
    desc: "这是一项全球性的宣教善举，凡参与支持、传播或受益者，皆可共享其善功。",
  },
];

const channels = [
  {
    icon: Radio,
    title: "卫星与广播频道",
    desc: "通过多语种音频与视频渠道，将古兰经的意义传播到不同国家和地区。",
  },
  {
    icon: MonitorPlay,
    title: "社交平台与官方网站",
    desc: "持续更新的数字化传播网络，让古兰经内容更易获取、更广泛分享。",
  },
  {
    icon: Layers3,
    title: "多元化数字应用与媒介",
    desc: "通过适配不同设备与平台的现代体验，让用户以多种方式跟进古兰经内容。",
  },
];

const partners = [
  {
    icon: ShieldCheck,
    title: "教法机构与伊斯兰组织",
    desc: "这些机构为古兰经意义翻译提供权威支持，确保内容准确并符合教法依据。",
  },
  {
    icon: Mic2,
    title: "优秀诵读者与温润之声",
    desc: "他们以虔敬而动人的诵读丰富了项目内容，使经文更深地触达人心。",
  },
  {
    icon: Headphones,
    title: "音频与技术制作团队",
    desc: "他们提供高质量录音与专业音视频处理，确保整体呈现达到高标准。",
  },
  {
    icon: Users,
    title: "制作人员与志愿者",
    desc: "他们共同参与内容开发与传播，帮助项目尽可能广泛地覆盖全球受众。",
  },
];

const impactCards = [
  {
    icon: Globe,
    title: "全球触达",
    desc: "古兰经的信息已经传入世界多个国家与家庭，并以多种语言面向不同受众。",
  },
  {
    icon: Languages,
    title: "可信翻译",
    desc: "在可靠学术与宗教机构监督下提供精准翻译，以确保意义表达的正确性。",
  },
  {
    icon: Headphones,
    title: "完整体验",
    desc: "将虔诚诵读与可视化翻译相结合，带来更具感染力且更容易理解的体验。",
  },
  {
    icon: Send,
    title: "持续传播的信息",
    desc: "项目不断向世界介绍真主的话语，并以现代形式触达不同年龄与文化群体。",
  },
];

const portfolioVideos = [
  `${import.meta.env.BASE_URL}videos/v1.mp4`,
  `${import.meta.env.BASE_URL}videos/v2.mp4`,
  `${import.meta.env.BASE_URL}videos/v3.mp4`,
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

function sectionBadge(icon, text, textColor = "text-white") {
  const Icon = icon;
  return (
    <div
      className={`inline-flex max-w-full items-center gap-3 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2.5 text-xs font-semibold ${textColor} backdrop-blur-md shadow-[0_8px_18px_rgba(0,0,0,0.14)] sm:px-5 sm:py-3 sm:text-sm`}
    >
      <Icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: ACCENT }} />
      <span className="truncate">{text}</span>
    </div>
  );
}

function LargeSectionBadge({ icon: Icon, text }) {
  return (
    <div
      className="inline-flex max-w-full items-center gap-3 rounded-full border border-white/10 bg-white/[0.07] px-5 py-3 text-base font-bold backdrop-blur-md shadow-[0_8px_18px_rgba(0,0,0,0.14)] sm:px-8 sm:py-4 sm:text-xl lg:text-2xl"
      style={{ color: ACCENT }}
    >
      <Icon className="h-5 w-5 shrink-0 sm:h-7 sm:w-7" style={{ color: ACCENT }} />
      <span className="truncate">{text}</span>
    </div>
  );
}

function AppStoreIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <path d="M9 15.5 14.5 8" />
      <path d="M11 8h4" />
      <path d="M9.5 15.5H15" />
      <path d="M10.5 12h5" />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 4.5v15l8.8-7.5L5 4.5Z" />
      <path d="m13.8 12 3.6-3 1.6 1.1c1.2.8 1.2 2.1 0 2.9L17.4 14l-3.6-2Z" />
      <path d="m17.4 9-8.2-3.6" />
      <path d="m17.4 15-8.2 3.6" />
    </svg>
  );
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function CardShell({ children, className = "" }) {
  return (
    <div className={`${softCard} h-full p-[1px] ${className}`}>
      <div className="h-full rounded-[1.95rem] border border-white/10 bg-[rgba(9,29,40,0.28)] p-3 sm:p-4">
        <div className={`h-full rounded-[1.55rem] border border-white/10 ${SOFT_INNER_GRADIENT} p-4 sm:p-5`}>
          {children}
        </div>
      </div>
    </div>
  );
}

function StructuredCard({ icon: Icon, title, desc, isMobile }) {
  return (
    <motion.div whileHover={isMobile ? {} : { y: -6, scale: 1.01 }} className="h-full">
      <CardShell>
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
            <Icon className="h-5 w-5" style={{ color: ACCENT }} />
          </div>
          <h3 className="text-base font-bold leading-7 text-white sm:text-lg lg:text-xl">
            {title}
          </h3>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-[rgba(7,23,34,0.34)] px-4 py-4 text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
          {desc}
        </div>
      </CardShell>
    </motion.div>
  );
}

function IdentityCard({ icon: Icon, title, text, large = false, isMobile }) {
  return (
    <motion.div whileHover={isMobile ? {} : { y: -6, scale: 1.01 }} className="h-full">
      <CardShell>
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
            <Icon className="h-5 w-5" style={{ color: ACCENT }} />
          </div>
          <div
            className={`rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-2 font-bold text-white ${
              large ? "text-lg sm:text-xl" : "text-base sm:text-lg"
            }`}
          >
            {title}
          </div>
        </div>

        <div
          className={`mt-4 rounded-2xl border border-white/10 bg-[rgba(7,23,34,0.34)] px-4 py-4 text-white/82 ${
            large
              ? "text-base leading-8 sm:text-lg sm:leading-9 lg:text-xl lg:leading-10"
              : "text-base leading-8 sm:text-lg"
          }`}
        >
          {text}
        </div>
      </CardShell>
    </motion.div>
  );
}

function ImpactCard({ icon: Icon, title, desc, isMobile }) {
  return (
    <motion.div whileHover={isMobile ? {} : { y: -6, scale: 1.01 }} className="h-full">
      <CardShell>
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
            <Icon className="h-5 w-5" style={{ color: ACCENT }} />
          </div>
          <h3 className="text-base font-bold text-white sm:text-lg lg:text-xl">
            {title}
          </h3>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-[rgba(7,23,34,0.34)] px-4 py-4 text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
          {desc}
        </div>
      </CardShell>
    </motion.div>
  );
}

function HeroAudioPlayer({ isMobile }) {
  const audioRef = useRef(null);
  const blobUrlRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  const previousBarsRef = useRef([]);

  const BARS_COUNT = isMobile ? 24 : 48;
  const HALF_BARS = BARS_COUNT / 2;
  const MIN_BAR_HEIGHT = isMobile ? 8 : 10;
  const MAX_BAR_HEIGHT = isMobile ? 22 : 34;

  const idleBars = useMemo(() => {
    const half = Array.from({ length: HALF_BARS }, (_, i) => {
      const t = i / Math.max(1, HALF_BARS - 1);
      return Math.round((isMobile ? 9 : 12) + t * 3);
    });
    return [...half.slice().reverse(), ...half];
  }, [HALF_BARS, isMobile]);

  const [bars, setBars] = useState(idleBars);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    previousBarsRef.current = idleBars;
    setBars(idleBars);
  }, [idleBars]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let cancelled = false;

    const loadAudioAsBlob = async () => {
      try {
        const response = await fetch(voiceMp3, { cache: "force-cache" });
        const blob = await response.blob();
        if (cancelled) return;

        const objectUrl = URL.createObjectURL(blob);
        blobUrlRef.current = objectUrl;
        audio.src = objectUrl;
        audio.load();
      } catch {
        if (!cancelled) {
          audio.src = voiceMp3;
          audio.load();
        }
      }
    };

    loadAudioAsBlob();

    return () => {
      cancelled = true;
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration || 0);
    const onTime = () => setCurrentTime(audio.currentTime || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      previousBarsRef.current = idleBars;
      setBars(idleBars);
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("durationchange", onLoaded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("durationchange", onLoaded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, [idleBars]);

  useEffect(() => {
    if (isMobile && !isPlaying) {
      previousBarsRef.current = idleBars;
      setBars(idleBars);
      return;
    }

    if (!isPlaying) {
      previousBarsRef.current = idleBars;
      setBars(idleBars);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const analyser = analyserRef.current;
    if (!analyser) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const animateBars = () => {
      analyser.getByteFrequencyData(dataArray);

      let total = 0;
      for (let i = 0; i < bufferLength; i += 1) total += dataArray[i];
      const globalEnergy = total / bufferLength / 255;

      const halfBars = Array.from({ length: HALF_BARS }, (_, index) => {
        const start = Math.floor((index / HALF_BARS) * bufferLength);
        const end = Math.floor(((index + 1) / HALF_BARS) * bufferLength);

        let localSum = 0;
        let count = 0;

        for (let i = start; i < end; i += 1) {
          localSum += dataArray[i];
          count += 1;
        }

        const localEnergy = count ? localSum / count / 255 : 0;
        const mixedEnergy = localEnergy * 0.68 + globalEnergy * 0.32;
        const height =
          MIN_BAR_HEIGHT + mixedEnergy * (MAX_BAR_HEIGHT - MIN_BAR_HEIGHT);

        return clamp(height, MIN_BAR_HEIGHT, MAX_BAR_HEIGHT);
      });

      const mirroredBars = [...halfBars.slice().reverse(), ...halfBars];

      const animatedBars = mirroredBars.map((value, index) => {
        const previous = previousBarsRef.current[index] ?? idleBars[index];
        return Math.round(previous * 0.55 + value * 0.45);
      });

      previousBarsRef.current = animatedBars;
      setBars(animatedBars);
      animationFrameRef.current = requestAnimationFrame(animateBars);
    };

    animationFrameRef.current = requestAnimationFrame(animateBars);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [HALF_BARS, MAX_BAR_HEIGHT, MIN_BAR_HEIGHT, idleBars, isPlaying, isMobile]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  const setupAnalyser = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioContextRef.current) {
      const context = new AudioContextClass();
      const analyser = context.createAnalyser();
      analyser.fftSize = 128;
      analyser.smoothingTimeConstant = 0.92;

      const source = context.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(context.destination);

      audioContextRef.current = context;
      analyserRef.current = analyser;
    }

    if (audioContextRef.current?.state === "suspended") {
      await audioContextRef.current.resume().catch(() => {});
    }
  };

  const progress = useMemo(
    () => (duration ? (currentTime / duration) * 100 : 0),
    [currentTime, duration]
  );

  const togglePlay = async () => {
    const el = audioRef.current;
    if (!el) return;

    await setupAnalyser();

    if (el.paused) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  };

  const seekBy = (delta) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = Math.max(0, Math.min(el.duration || 0, (el.currentTime || 0) + delta));
  };

  const replay = async () => {
    const el = audioRef.current;
    if (!el) return;
    await setupAnalyser();
    el.currentTime = 0;
    el.play().catch(() => {});
  };

  const toggleMute = () => {
    const el = audioRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  const handleSeek = (event) => {
    const el = audioRef.current;
    if (!el) return;
    const next = Number(event.target.value);
    el.currentTime = next;
    setCurrentTime(next);
  };

  return (
    <div className="mt-5 rounded-[1.4rem] border border-white/10 bg-[rgba(7,23,34,0.34)] p-3 sm:p-4">
      <audio ref={audioRef} preload="metadata" onContextMenu={(e) => e.preventDefault()} />

      <div className="mb-4 flex h-14 items-end gap-[2px] overflow-hidden rounded-2xl border border-white/10 bg-black/10 px-2 py-3 sm:h-18">
        {bars.map((height, index) => (
          <motion.div
            key={index}
            animate={{ height }}
            transition={{ duration: isMobile ? 0.2 : 0.14, ease: "easeOut" }}
            className="flex-1 self-end rounded-full bg-gradient-to-t from-[#1C5763] via-[#D8B36A] to-[#8EA08A] opacity-95"
            style={{ maxHeight: `${MAX_BAR_HEIGHT}px` }}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={togglePlay}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white transition hover:bg-white/[0.10]"
          aria-label={isPlaying ? "暂停" : "播放"}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" style={{ color: ACCENT }} />
          ) : (
            <Play className="h-4 w-4" style={{ color: ACCENT }} />
          )}
        </button>

        <button
          type="button"
          onClick={() => seekBy(-10)}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white transition hover:bg-white/[0.10]"
          aria-label="后退"
        >
          <SkipBack className="h-4 w-4" style={{ color: ACCENT }} />
        </button>

        <button
          type="button"
          onClick={replay}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white transition hover:bg-white/[0.10]"
          aria-label="重新播放"
        >
          <RotateCcw className="h-4 w-4" style={{ color: ACCENT }} />
        </button>

        <button
          type="button"
          onClick={() => seekBy(10)}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white transition hover:bg-white/[0.10]"
          aria-label="前进"
        >
          <SkipForward className="h-4 w-4" style={{ color: ACCENT }} />
        </button>

        <button
          type="button"
          onClick={toggleMute}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white transition hover:bg-white/[0.10]"
          aria-label="音量"
        >
          <Volume2
            className={`h-4 w-4 ${muted ? "opacity-50" : ""}`}
            style={{ color: ACCENT }}
          />
        </button>

        <div className="min-w-[52px] text-xs text-white/75">{formatTime(currentTime)}</div>

        <div className="relative h-2 w-full flex-1 overflow-visible rounded-full bg-white/10">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#1C5763] via-[#D8B36A] to-[#8EA08A]"
            style={{ width: `${progress}%` }}
          />
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            className="audio-range absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none bg-transparent"
            style={{ WebkitAppearance: "none" }}
          />
        </div>
      </div>

      <style>{`
        .audio-range::-webkit-slider-runnable-track { height: 8px; background: transparent; }
        .audio-range::-moz-range-track { height: 8px; background: transparent; }
        .audio-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          margin-top: -3px;
          border-radius: 999px;
          border: 2px solid rgba(255,255,255,0.9);
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
        .audio-range::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.9);
          border-radius: 999px;
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
      `}</style>
    </div>
  );
}

function ProtectedHlsVideoCard({
  video,
  index,
  isMobile,
  videoId,
  registerVideo,
  unregisterVideo,
  requestExclusivePlay,
}) {
  const videoRef = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;

    registerVideo(videoId, element);

    const onLoaded = () => {
      setDuration(element.duration || 0);
      setIsReady(true);
    };

    const onTimeUpdate = () => setCurrentTime(element.currentTime || 0);

    const onPlay = () => {
      requestExclusivePlay(videoId);
      setIsPlaying(true);
    };

    const onPause = () => setIsPlaying(false);

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    element.addEventListener("loadedmetadata", onLoaded);
    element.addEventListener("loadeddata", onLoaded);
    element.addEventListener("canplay", onLoaded);
    element.addEventListener("durationchange", onLoaded);
    element.addEventListener("timeupdate", onTimeUpdate);
    element.addEventListener("play", onPlay);
    element.addEventListener("pause", onPause);
    element.addEventListener("ended", onEnded);

    return () => {
      unregisterVideo(videoId);
      element.removeEventListener("loadedmetadata", onLoaded);
      element.removeEventListener("loadeddata", onLoaded);
      element.removeEventListener("canplay", onLoaded);
      element.removeEventListener("durationchange", onLoaded);
      element.removeEventListener("timeupdate", onTimeUpdate);
      element.removeEventListener("play", onPlay);
      element.removeEventListener("pause", onPause);
      element.removeEventListener("ended", onEnded);
    };
  }, [registerVideo, requestExclusivePlay, unregisterVideo, videoId]);

  const progress = useMemo(
    () => (duration ? (currentTime / duration) * 100 : 0),
    [currentTime, duration]
  );

  const playVideo = () => {
    const el = videoRef.current;
    if (!el) return;
    requestExclusivePlay(videoId);
    el.play().catch(() => {});
  };

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      playVideo();
    } else {
      el.pause();
    }
  };

  const replayVideo = () => {
    const el = videoRef.current;
    if (!el) return;
    requestExclusivePlay(videoId);
    el.currentTime = 0;
    el.play().catch(() => {});
  };

  const handleSeek = (e) => {
    const el = videoRef.current;
    if (!el) return;
    const next = Number(e.target.value);
    el.currentTime = next;
    setCurrentTime(next);
  };

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    const next = !el.muted;
    el.muted = next;
    setMuted(next);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 12 : 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.5, delay: isMobile ? 0 : index * 0.08 }}
      whileHover={isMobile ? {} : { y: -6, scale: 1.01 }}
      className="h-full"
    >
      <CardShell className="p-[1px]">
        <div className="relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-black/30">
          <video
            ref={videoRef}
            src={video}
            className="aspect-video w-full object-cover"
            playsInline
            preload="auto"
            controls={false}
            muted={muted}
            onContextMenu={(e) => e.preventDefault()}
          />

          {!isPlaying && (
            <button
              type="button"
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/15 transition hover:bg-black/10"
              aria-label="播放视频"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-[0_0_22px_rgba(20,56,71,0.25)] sm:h-18 sm:w-18">
                <Play className="ml-1 h-7 w-7 text-white" />
              </span>
            </button>
          )}

          <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[11px] text-white/80 backdrop-blur-md">
            {isReady ? "播放前预览已就绪" : "正在准备预览"}
          </div>
        </div>

        <div className="mt-4 rounded-[1.3rem] border border-white/10 bg-[rgba(7,23,34,0.34)] p-3 sm:p-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={toggleMute}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white transition hover:bg-white/[0.10]"
              aria-label="静音或开启声音"
            >
              <Volume2
                className={`h-4 w-4 ${muted ? "opacity-50" : ""}`}
                style={{ color: ACCENT }}
              />
            </button>

            <button
              type="button"
              onClick={replayVideo}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white transition hover:bg-white/[0.10]"
              aria-label="重新播放"
            >
              <RotateCcw className="h-4 w-4" style={{ color: ACCENT }} />
            </button>

            <button
              type="button"
              onClick={togglePlay}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white transition hover:bg-white/[0.10]"
              aria-label={isPlaying ? "暂停" : "播放"}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" style={{ color: ACCENT }} />
              ) : (
                <Play className="h-4 w-4" style={{ color: ACCENT }} />
              )}
            </button>

            <div className="min-w-[52px] text-xs text-white/75">{formatTime(currentTime)}</div>

            <div className="relative h-2 w-full flex-1 overflow-visible rounded-full bg-white/10">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#1C5763] via-[#D8B36A] to-[#8EA08A]"
                style={{ width: `${progress}%` }}
              />
              <input
                type="range"
                min="0"
                max={duration || 0}
                step="0.1"
                value={currentTime}
                onChange={handleSeek}
                className="video-range absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none bg-transparent"
              />
            </div>
          </div>
        </div>

        <style>{`
          .video-range::-webkit-slider-runnable-track { height: 8px; background: transparent; }
          .video-range::-moz-range-track { height: 8px; background: transparent; }
          .video-range::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 14px;
            height: 14px;
            margin-top: -3px;
            border-radius: 999px;
            border: 2px solid rgba(255,255,255,0.9);
            background: ${ACCENT};
            box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
          }
          .video-range::-moz-range-thumb {
            width: 14px;
            height: 14px;
            border: 2px solid rgba(255,255,255,0.9);
            border-radius: 999px;
            background: ${ACCENT};
            box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
          }
        `}</style>
      </CardShell>
    </motion.div>
  );
}

export default function QuranTranslationLandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const videoElementsRef = useRef({});

  const registerVideo = (videoId, element) => {
    videoElementsRef.current[videoId] = element;
  };

  const unregisterVideo = (videoId) => {
    delete videoElementsRef.current[videoId];
  };

  const requestExclusivePlay = (activeVideoId) => {
    Object.entries(videoElementsRef.current).forEach(([videoId, element]) => {
      if (videoId !== String(activeVideoId) && element && !element.paused) {
        element.pause();
      }
    });
  };

  return (
    <LazyMotion features={domAnimation}>
      <div dir="ltr" className={`relative min-h-screen overflow-hidden text-white ${PAGE_BACKGROUND}`}>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.10)_0%,rgba(0,0,0,0.16)_100%)]" />
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:44px_44px]" />
        </div>

        {!isMobile && (
          <>
            <motion.div
              className="absolute left-[18%] top-[12%] h-[26rem] w-[26rem] rounded-full bg-[#1F4A50]/18 blur-3xl"
              animate={pulseGlow}
            />
            <motion.div
              className="absolute bottom-[8%] right-[10%] h-[24rem] w-[24rem] rounded-full bg-[#4E4A2E]/18 blur-3xl"
              animate={pulseGlow}
            />
          </>
        )}

        <div className={containerClass}>
          <header className="pt-4 sm:pt-6">
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className={`mx-auto flex items-center justify-between gap-3 rounded-[1.8rem] px-3 py-3 sm:rounded-[2rem] sm:px-4 ${outerFrame}`}
            >
              <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/10 shadow-[0_0_16px_rgba(20,56,71,0.2)] sm:h-16 sm:w-16">
                  <img
                    src={sanaLogo}
                    alt="Sana Quran Channels 标志"
                    className="h-full w-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                </div>
                <div className="truncate text-sm font-bold tracking-wide sm:text-xl">
                  Sana 古兰经频道
                </div>
              </div>

              <nav className="hidden items-center gap-3 md:flex">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white/85 transition hover:border-white/20 hover:bg-white/[0.10] hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] md:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </motion.div>

            {menuOpen && (
              <div className={`mt-3 rounded-[1.6rem] p-3 md:hidden ${softCard}`}>
                <div className="grid gap-2">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white/85 sm:text-base"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </header>

          <section className="relative grid min-h-[auto] items-center gap-10 py-10 sm:gap-12 sm:py-14 lg:min-h-[84vh] lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
            <div className="order-1">
              <motion.div
                custom={0}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs backdrop-blur-md sm:text-sm"
                style={{ color: ACCENT }}
              >
                <Stars className="h-4 w-4" style={{ color: ACCENT }} />
                <span>Sana —— 传向众世界的信息</span>
              </motion.div>

              <motion.h1
                custom={1}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="text-3xl font-black leading-[1.25] sm:text-5xl lg:text-7xl"
              >
                <span className="block bg-gradient-to-r from-[#F2E6C4] via-[#D8B36A] to-[#DCE4DD] bg-clip-text text-transparent">
                  Sana 古兰经频道
                </span>
              </motion.h1>

              <motion.p
                custom={2}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8 lg:text-xl"
              >
                面向全球语言的古兰经意义翻译音视频频道 —— 为真主而设的公益项目。
              </motion.p>

              <motion.div
                custom={3}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4"
              >
                <a
                  href="#features"
                  className="group inline-flex items-center justify-center gap-3 rounded-2xl border px-6 py-3.5 text-sm font-bold shadow-[0_8px_20px_rgba(8,8,32,0.24)] transition hover:scale-[1.02] sm:px-7 sm:py-4 sm:text-base"
                  style={{
                    backgroundColor: CTA_DARK,
                    borderColor: "rgba(216,179,106,0.22)",
                    color: ACCENT,
                  }}
                >
                  <Sparkles
                    className="h-5 w-5 transition group-hover:rotate-12"
                    style={{ color: ACCENT }}
                  />
                  探索平台
                </a>

                <a
                  href="https://www.youtube.com/channel/UCpm15Ma-asr2GDce_eHDDog"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/[0.06] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/[0.10] sm:px-7 sm:py-4 sm:text-base"
                >
                  <Play className="h-5 w-5" />
                  访问我们的频道
                </a>
              </motion.div>

              <motion.div
                custom={4}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-4"
              >
                {stats.map((item, i) => (
                  <motion.div
                    key={item.label}
                    animate={isMobile ? {} : { y: [0, -4, 0] }}
                    transition={
                      isMobile
                        ? {}
                        : { duration: 4 + i, repeat: Infinity, ease: "easeInOut" }
                    }
                    className={`${softCard} p-[1px]`}
                  >
                    <div className="rounded-[1.6rem] border border-white/10 bg-[rgba(9,29,40,0.28)] p-4 text-center">
                      <div className="text-xl font-black sm:text-2xl" style={{ color: ACCENT }}>
                        {item.value}
                      </div>
                      <div className="mt-2 text-xs text-white/72 sm:text-sm">{item.label}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, rotate: isMobile ? 0 : -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="order-2 relative"
            >
              <motion.div
                animate={isMobile ? {} : { y: [0, -10, 0] }}
                transition={isMobile ? {} : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className={`relative mx-auto max-w-2xl ${outerFrame} p-[1px]`}
              >
                <div className="rounded-[2.1rem] border border-white/10 bg-[rgba(9,29,40,0.28)] p-3 sm:p-4">
                  <div className={`rounded-[1.8rem] border border-white/10 ${SOFT_INNER_GRADIENT} p-4 sm:p-6`}>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs text-white/60 sm:text-sm">当前语言</p>
                        <h3 className="mt-1 text-xl font-bold sm:text-2xl">阿拉伯语古兰经</h3>
                      </div>
                      <div className="w-fit rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-2 text-xs text-[#E3E7E3] sm:text-sm">
                        实时播出
                      </div>
                    </div>

                    <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-[rgba(7,23,34,0.30)] p-4 sm:mt-8 sm:p-6">
                      <div className="mb-4 flex items-start gap-3 text-sm text-white/80 sm:items-center sm:text-base">
                        <Headphones className="mt-0.5 h-5 w-5 shrink-0" style={{ color: ACCENT }} />
                        <span>聆听诵读，同时观看古兰经意义的视觉呈现</span>
                      </div>

                      {!isMobile && (
                        <div className="space-y-3">
                          {[65, 88, 42].map((w, idx) => (
                            <motion.div
                              key={idx}
                              animate={{ width: [`${w - 14}%`, `${w}%`, `${w - 8}%`] }}
                              transition={{
                                duration: 3 + idx,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              className="h-3 rounded-full bg-gradient-to-r from-[#1C5763] via-[#D8B36A] to-[#8EA08A]"
                            />
                          ))}
                        </div>
                      )}

                      <div className="mt-6 grid grid-cols-3 gap-2 text-center sm:mt-8 sm:gap-3">
                        {heroCards.map((item) => (
                          <div
                            key={item.label}
                            className="rounded-2xl border border-white/10 bg-white/[0.05] p-3 sm:p-4"
                          >
                            <div className="text-sm font-bold sm:text-lg" style={{ color: ACCENT }}>
                              {item.value}
                            </div>
                            <div className="mt-1 text-[11px] text-white/60 sm:text-xs">
                              {item.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      <HeroAudioPlayer isMobile={isMobile} />
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="mx-auto mt-5 grid max-w-2xl gap-3 sm:mt-6 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
                {heroBadges.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className={`${softCard} w-full p-[1px] sm:min-w-[220px] sm:w-auto`}>
                      <div className="rounded-[1.5rem] border border-white/10 bg-[rgba(9,29,40,0.28)] px-5 py-4 text-center">
                        <div className="flex items-center justify-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] sm:h-11 sm:w-11">
                            <Icon className="h-5 w-5" style={{ color: ACCENT }} />
                          </div>
                          <div className="text-sm font-bold text-white sm:text-base">{item.title}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </section>

          <section id="about" className="py-4 lg:py-8">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-8 text-center"
            >
              <LargeSectionBadge icon={BookOpen} text="全球化古兰经身份表达" />
            </motion.div>

            <div className="space-y-6">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.16 }}
                custom={0}
                variants={fadeUp}
              >
                <IdentityCard {...identityCards[0]} large isMobile={isMobile} />
              </motion.div>

              <div className="grid gap-6 lg:grid-cols-2">
                {identityCards.slice(1).map((card, i) => (
                  <motion.div
                    key={card.title}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.16 }}
                    custom={i + 1}
                    variants={fadeUp}
                  >
                    <IdentityCard {...card} isMobile={isMobile} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-8 lg:py-12">
            <div className="mb-6 text-center">
              <LargeSectionBadge icon={Building2} text="执行与监督" />
            </div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className={`relative overflow-hidden p-5 sm:p-6 md:p-10 ${outerFrame}`}
            >
              <div className="relative z-10">
                <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-8">
                  <div className={`${softCard} p-[1px]`}>
                    <div className="h-full rounded-[1.8rem] border border-white/10 bg-[rgba(9,29,40,0.28)] p-4 sm:p-6">
                      <div className={`h-full rounded-2xl border border-white/10 ${SOFT_INNER_GRADIENT} p-4 sm:p-5`}>
                        <h2 className="text-2xl font-black sm:text-3xl lg:text-4xl">
                          值得信赖的执行合作
                        </h2>
                        <p className="mt-5 text-base leading-8 text-white/78 sm:text-lg">
                          <span className="font-bold text-white">Sana 古兰经频道</span>
                          项目由
                          <span className="font-bold" style={{ color: ACCENT }}>
                            沙特-约旦卫星广播公司（Jasco）
                          </span>
                          在约旦安曼负责执行，拥有媒体制作与播出的丰富经验。
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={`${softCard} p-[1px]`}>
                    <div className="h-full rounded-[1.8rem] border border-white/10 bg-[rgba(9,29,40,0.28)] p-4 sm:p-6">
                      <div className={`flex h-full flex-col justify-center rounded-2xl border border-white/10 ${SOFT_INNER_GRADIENT} p-4 sm:p-5`}>
                        <div className="text-sm text-white/60">官方网站</div>
                        <div className="mt-2 text-xl font-bold sm:text-2xl">Jasco Media City</div>
                        <a
                          href="https://jascomediacity.net/"
                          target="_blank"
                          rel="noreferrer"
                          className="mt-5 inline-flex w-fit items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm text-white/90 transition hover:bg-white/[0.10] sm:text-base"
                        >
                          访问 Jasco 官网
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <section id="features" className="py-12 lg:py-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Sparkles, "平台特色")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">
                Sana —— 传向众世界的信息
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
                一个运用现代技术传播古兰经意义的平台，将教法根基与先进媒介优雅结合。
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {features.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <StructuredCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section className="py-10 lg:py-14">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Send, "传播与触达方式")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">多渠道传播矩阵</h2>
            </motion.div>

            <div className="grid gap-5 lg:grid-cols-3">
              {channels.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <StructuredCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section id="portfolio" className="py-12 lg:py-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Crown, "我们的作品")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">作品示例</h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
                芬芳的古兰经诵读与多语言经义翻译展示 —— Sana，传向众世界的信息。
              </p>
            </motion.div>

            <div className="grid gap-5 lg:grid-cols-3">
              {portfolioVideos.map((video, i) => (
                <ProtectedHlsVideoCard
                  key={video}
                  video={video}
                  index={i}
                  isMobile={isMobile}
                  videoId={i}
                  registerVideo={registerVideo}
                  unregisterVideo={unregisterVideo}
                  requestExclusivePlay={requestExclusivePlay}
                />
              ))}
            </div>
          </section>

          <section className="py-12 lg:py-16">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Globe, "项目影响")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">
                项目影响力与全球传播
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
                这是一项全球性的古兰经传播事业，提供可信翻译、动人体验，并将古兰经的意义带入世界各地家庭。
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {impactCards.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <ImpactCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section id="partners" className="py-12 lg:py-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Users, "成功伙伴")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">合作成就卓越</h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
                项目的成功来自一批优秀合作方，包括教法机构、媒体团队、制作方以及志愿者。
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2">
              {partners.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <StructuredCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section id="contact" className="py-8 lg:py-12">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              <div className="text-center">
                <div
                  className="inline-flex max-w-full items-center gap-3 rounded-full border border-white/10 bg-white/[0.07] px-5 py-3 text-base font-semibold backdrop-blur-md shadow-[0_6px_16px_rgba(0,0,0,0.12)] sm:px-7 sm:py-4 sm:text-lg"
                  style={{ color: ACCENT }}
                >
                  <Sparkles className="h-5 w-5 shrink-0" style={{ color: ACCENT }} />
                  <span>联系我们</span>
                </div>

                <p className="mx-auto mt-5 max-w-4xl text-base leading-8 text-white/76 sm:text-lg">
                  Sana 是一项面向世界的宣教信息工程。我们乐于随时接收您的咨询、建议与合作意向，并以清晰直接的方式与您沟通。
                </p>
              </div>

              <div className={`mt-8 rounded-[2.2rem] p-4 sm:p-6 md:p-8 ${outerFrame}`}>
                <div className="rounded-[2rem] border border-white/10 bg-[rgba(9,29,40,0.28)] p-4 sm:p-6">
                  <div className={`rounded-[1.6rem] border border-white/10 ${SOFT_INNER_GRADIENT} p-4 sm:p-5`}>
                    <div className="mb-4 text-xl font-bold sm:text-2xl">联系团队</div>
                    <div className="space-y-3 text-white/76">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm sm:text-base">
                        我们的团队将很高兴为您提供帮助，并尽快回复您。
                      </div>
                      <a
                        href="mailto:snachannel159@gmail.com"
                        className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/[0.10] sm:text-base"
                      >
                        <Mail className="h-4 w-4" style={{ color: ACCENT }} />
                        发送邮件
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <footer className="pb-8 pt-4 sm:pb-10">
            <div className={`rounded-[2.2rem] px-4 py-6 sm:px-6 sm:py-8 lg:px-10 ${outerFrame}`}>
              <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr_1fr]">
                <div className={`${softCard} p-[1px]`}>
                  <div className="flex h-full flex-col items-center justify-center rounded-[1.9rem] border border-white/10 bg-[rgba(9,29,40,0.28)] p-4 text-center sm:p-6">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-white/10 shadow-[0_0_18px_rgba(255,255,255,0.06)] backdrop-blur-md sm:h-24 sm:w-24">
                      <img
                        src={sanaLogo}
                        alt="Sana 标志"
                        className="h-14 w-14 object-contain sm:h-16 sm:w-16"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    <div className="mt-4">
                      <span className="inline-flex rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs text-white/90 sm:px-5 sm:text-sm">
                        Sana 古兰经频道
                      </span>
                    </div>

                    <div className="mt-4 text-2xl font-black sm:text-3xl" style={{ color: ACCENT }}>
                      Sana —— 传向众世界的信息
                    </div>

                    <p className="mx-auto mt-4 max-w-[30rem] rounded-[1.4rem] border border-white/10 bg-[rgba(7,23,34,0.34)] px-4 py-4 text-sm leading-7 text-white/78 sm:px-5 sm:text-base sm:leading-8">
                      面向全球语言的古兰经意义翻译音视频频道，是一项兼具美学呈现、精准释义与使命精神的公益工程。
                    </p>
                  </div>
                </div>

                <div className={`${softCard} p-[1px]`}>
                  <div className="flex h-full flex-col items-center justify-center rounded-[1.8rem] border border-white/10 bg-[rgba(9,29,40,0.28)] p-4 text-center sm:p-5">
                    <div className="mb-5 flex flex-col items-center justify-center gap-4 text-lg font-bold text-white sm:text-xl">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] shadow-[0_8px_18px_rgba(0,0,0,0.14)]">
                        <MessageCircle className="h-6 w-6" style={{ color: ACCENT }} />
                      </div>
                      <span>联系我们的信息</span>
                    </div>

                    <div className="w-full space-y-4 text-white/72">
                      <a
                        href="mailto:snachannel159@gmail.com"
                        className="flex items-center justify-center gap-3 break-all rounded-2xl border border-white/10 bg-[rgba(7,23,34,0.34)] px-4 py-3 text-sm transition hover:bg-white/[0.08] sm:text-base"
                      >
                        <Mail className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                        snachannel159@gmail.com
                      </a>

                      <div className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-[rgba(7,23,34,0.34)] px-4 py-3 text-sm sm:text-base">
                        <MapPin className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                        安曼 · 约旦
                      </div>
                    </div>

                    <div className="mt-6 w-full rounded-[1.4rem] border border-white/10 bg-[rgba(7,23,34,0.34)] p-4">
                      <a
                        href="https://www.facebook.com/people/%E6%96%AF%E5%A8%9C-%E4%B8%AD%E6%96%87/61575383744787/"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] py-3 text-sm font-semibold text-white transition hover:scale-[1.01] hover:bg-white/[0.10]"
                      >
                        <Globe className="h-4 w-4" style={{ color: ACCENT }} />
                        在 Facebook 关注我们
                      </a>

                      <p className="mt-4 text-center text-sm leading-6 text-white/70">
                        现在开启你的古兰经之旅
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`${softCard} p-[1px]`}>
                  <div className="flex h-full flex-col items-center justify-center rounded-[1.9rem] border border-white/10 bg-[rgba(9,29,40,0.28)] p-4 text-center backdrop-blur-md sm:p-5">
                    <div className="mb-5 flex flex-col items-center justify-center gap-4 text-lg font-bold text-white sm:text-xl">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] shadow-[0_8px_18px_rgba(0,0,0,0.14)]">
                        <Link2 className="h-6 w-6" style={{ color: ACCENT }} />
                      </div>
                      <span>应用下载链接</span>
                    </div>

                    <div className="w-full rounded-[1.4rem] border border-white/10 bg-[rgba(7,23,34,0.34)] p-4">
                      <p className="mb-4 text-sm leading-7 text-white/65">
                        下载应用，通过官方平台更轻松地跟进古兰经内容。
                      </p>

                      <div className="grid gap-3 md:grid-cols-2">
                        <a
                          href="https://play.google.com/store/apps/details?id=com.sana_all&pcampaignid=web_share"
                          target="_blank"
                          rel="noreferrer"
                          className="group rounded-[1.3rem] border border-white/10 bg-white/[0.05] p-4 transition hover:-translate-y-0.5 hover:bg-white/[0.10]"
                        >
                          <div className="flex items-center justify-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white">
                              <GooglePlayIcon />
                            </div>
                            <span className="whitespace-nowrap text-sm font-bold text-white sm:text-base">
                              Google Play
                            </span>
                          </div>
                        </a>

                        <a
                          href="https://apps.apple.com/us/app/sana-tv-%D8%B3%D9%86%D8%A7/id6742054715"
                          target="_blank"
                          rel="noreferrer"
                          className="group rounded-[1.3rem] border border-white/10 bg-white/[0.05] p-4 transition hover:-translate-y-0.5 hover:bg-white/[0.10]"
                        >
                          <div className="flex items-center justify-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white">
                              <AppStoreIcon />
                            </div>
                            <span className="text-sm font-bold text-white sm:text-base">
                              App Store
                            </span>
                          </div>
                        </a>
                      </div>

                      <div className="mt-5 rounded-[1.4rem] border border-white/10 bg-white/[0.05] p-4">
                        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/65">
                          <span>⭐ 4.9 评分</span>
                          <span>🌍 100+ 国家</span>
                        </div>

                        <a
                          href="https://www.youtube.com/channel/UCpm15Ma-asr2GDce_eHDDog"
                          target="_blank"
                          rel="noreferrer"
                          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] py-3 text-sm font-bold text-white transition hover:scale-[1.01] hover:bg-white/[0.10]"
                        >
                          <Sparkles className="h-4 w-4" style={{ color: ACCENT }} />
                          立即开始
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-5 text-center text-xs text-white/55 sm:text-sm">
                版权所有 © Sana 古兰经频道
              </div>
            </div>
          </footer>
        </div>
      </div>
    </LazyMotion>
  );
}
