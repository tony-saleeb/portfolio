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
  imageDisplay?: "cover" | "contain";
  gallery?: string[];
}

export const projectsData: Project[] = [
  {
    slug: "deepfract",
    title: "DeepFract",
    description: "AI-enhanced fractal image compression system using CNN, ResNet-style residual connections, attention mechanisms (CBAM, Attention-Gated U-Net), and quad-tree partitioning. FastAPI backend, Flutter mobile client.",
    tags: ["Python", "FastAPI", "Flutter", "PyTorch", "Computer Vision"],
    metric: "7,167x compression at 40.57 dB PSNR.",
    githubUrl: "#",
    fullDescription: "DeepFract is an advanced AI-enhanced fractal image compression system. Traditional fractal compression is extremely slow due to the massive search space. DeepFract tackles this by leveraging Convolutional Neural Networks (CNN) with ResNet-style residual connections and attention mechanisms like CBAM and Attention-Gated U-Net. This dramatically speeds up the encoding process while maintaining high fidelity.",
    challenges: [
      "Reducing the extremely high computational complexity of traditional fractal encoding.",
      "Designing an attention mechanism that effectively highlights structural self-similarities in images.",
      "Bridging a complex PyTorch backend with a seamless, responsive Flutter mobile application."
    ],
    architecture: [
      "Model: PyTorch-based CNN with CBAM and Attention-Gated U-Net",
      "Backend: FastAPI serving inference requests efficiently",
      "Frontend: Flutter mobile client for capturing and viewing compressed images",
      "Algorithm: Quad-tree partitioning for optimal block matching"
    ],
    image: "/deepfract-compression.png",
    imageDisplay: "contain"
  },
  {
    slug: "real-time-quiz-platform",
    title: "Real-Time Quiz Platform",
    description: "Kahoot-style multiplayer quiz app supporting real-time synchronization for ~80 concurrent players at a live event, with live leaderboard updates.",
    tags: ["Next.js", "Supabase", "Realtime", "TypeScript"],
    metric: "80 concurrent users.",
    liveUrl: "#",
    githubUrl: "#",
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
    githubUrl: "#",
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
    image: "/bt2-logo.svg",
    imageDisplay: "contain",
    gallery: [
      "/bt2/11.png", "/bt2/2.png", "/bt2/22.png", "/bt2/3.png", 
      "/bt2/33.png", "/bt2/4.png", "/bt2/44.png", "/bt2/5.png", 
      "/bt2/55.png", "/bt2/6.png", "/bt2/66.png"
    ]
  }
];
