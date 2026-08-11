export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  metric?: string;
  liveUrl?: string;
  githubUrl?: string;
  fullDescription: string;
  challenges: string[];
  architecture: string[];
  image?: string;
  /** Homepage card cover; falls back to `image` when omitted. */
  cardImage?: string;
  imageDisplay?: "cover" | "contain";
  gallery?: string[];
}

export const projectsData: Project[] = [
  {
    slug: "deepfract",
    title: "DeepFract",
    description: "Orchestrated AI models for fractal image compression — high ratio and detail retention in a short encode time. FastAPI backend, Flutter mobile client.",
    tags: ["Python", "FastAPI", "Flutter", "PyTorch", "Computer Vision"],
    // Metric withheld until Phase 1 re-derivation is done — do not publish a headline ratio yet.
    fullDescription: "DeepFract is an AI-enhanced fractal image compression system. Instead of relying on a single model, it orchestrates several specialized networks that work together — residual CNNs, attention (CBAM, attention-gated U-Net), and quad-tree partitioning — so encoding stays fast while compression ratio and visual detail stay high.",
    challenges: [
      "Coordinating multiple specialized models so they improve ratio and quality without blowing up encode time.",
      "Designing attention that surfaces structural self-similarities useful for fractal block matching.",
      "Bridging a PyTorch inference backend with a responsive Flutter mobile client."
    ],
    architecture: [
      "Orchestration: multiple specialized models coordinated for encode",
      "Models: PyTorch CNNs with CBAM and Attention-Gated U-Net",
      "Algorithm: Quad-tree partitioning for block matching",
      "Backend: FastAPI serving inference",
      "Frontend: Flutter client for capture, encode, and review"
    ],
    image: "/deepfract-transparent.png",
    imageDisplay: "contain"
  },
  {
    slug: "real-time-quiz-platform",
    title: "Real-Time Quiz Platform",
    description: "Kahoot-style multiplayer quiz app supporting real-time synchronization for ~80 concurrent players at a live event, with live leaderboard updates.",
    tags: ["Next.js", "Supabase", "Realtime", "TypeScript"],
    metric: "80 concurrent users.",
    fullDescription: "A fully interactive, multiplayer quiz platform built for live events. The application handles high-concurrency websocket connections to sync question states, timer countdowns, and live leaderboard updates across all connected clients with minimal latency.",
    challenges: [
      "Handling real-time state synchronization for dozens of users simultaneously without race conditions.",
      "Optimizing Supabase Realtime subscriptions to prevent connection drops under load.",
      "Ensuring the UI remains extremely responsive and animations are fluid during rapid state changes."
    ],
    architecture: [
      "Frontend: Next.js with React Server Components and Tailwind CSS",
      "State Management: Zustand & Context API",
      "Database & Auth: Supabase (PostgreSQL)",
      "Realtime: Supabase Realtime (WebSockets)"
    ]
  },
  {
    slug: "techtips",
    title: "TechTips",
    description: "OS Tips & Tricks App - Master workflow efficiency with smart shortcuts for Windows, macOS, and Linux.",
    tags: ["Flutter", "Dart", "Provider", "MVVM"],
    metric: "Productivity Boost",
    githubUrl: "https://github.com/tony-saleeb/TechTips",
    fullDescription: "A comprehensive Flutter mobile application focused on productivity tips and keyboard shortcuts across different operating systems. It helps power users access essential keyboard shortcuts and system tips quickly, featuring smart relevance-based search, favorites system, and dark/light mode switching.",
    challenges: [
      "Implementing relevance-based smart search for quick tip discovery",
      "Building a cross-platform responsive design suitable for phones, tablets, and desktop screens",
      "Managing local data persistence for the favorites system and themes"
    ],
    architecture: [
      "Framework: Flutter",
      "Architecture: Clean Architecture with MVVM pattern",
      "State Management: Provider",
      "Language: Dart"
    ],
    image: "/techtips-logo.png",
    imageDisplay: "contain"
  },
  {
    slug: "bt2",
    title: "BT2",
    description: "Interactive Flutter app visualizing numerical analysis methods step by step.",
    tags: ["Flutter", "Dart"],
    fullDescription: "BT2 is an educational tool designed for mathematics and computer science students. It provides an interactive sandbox for visualizing complex numerical analysis methods (like Newton-Raphson, Bisection, and Secant methods) step by step on a mobile device.",
    challenges: [
      "Implementing performant mathematical parsing and graphing in Dart.",
      "Creating intuitive, step-by-step interactive visualizers for abstract mathematical concepts.",
      "Ensuring cross-platform compatibility and smooth 60fps animations in Flutter."
    ],
    architecture: [
      "Framework: Flutter",
      "Language: Dart",
      "Graphics: Custom Paint and Canvas APIs for graphing"
    ],
    image: "/bt2-logo.webp",
    imageDisplay: "contain",
    gallery: [
      "/bt2/1.png", "/bt2/11.png", "/bt2/2.png", "/bt2/22.png",
      "/bt2/3.png", "/bt2/33.png", "/bt2/4.png", "/bt2/44.png",
      "/bt2/5.png", "/bt2/55.png", "/bt2/6.png", "/bt2/66.png"
    ]
  }
];
