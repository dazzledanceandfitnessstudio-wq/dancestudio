import Link from "next/link";
import { Play, Video, ArrowRight } from "lucide-react";

export default function FeatureTutorial() {
  return (
    <section className="ld-section ld-container ft-section">
      <div className="ft-split">
        <div className="ft-text">
          <span className="ft-eyebrow">
            <Video size={13} strokeWidth={2.5} />
            Why Dazzle
          </span>
          <h2 className="ft-title">
            Not Your Average
            <br />
            Online Tutorial
          </h2>
          <p className="ft-desc">
            Learn from competition champions and music-video choreographers in
            real time. Our classes blend structured technique with creative
            freestyle so you actually retain what you learn — and have fun doing it.
          </p>
          <Link href="/courses" className="btn-gradient-cta" style={{ width: "fit-content" }}>
            Explore Courses <ArrowRight size={16} />
          </Link>
        </div>
        <div className="ft-media">
          <img
            src="https://media3.giphy.com/media/l0MYC0LajbaPoEADu/giphy.gif"
            alt="Dance tutorial preview"
          />
          <button className="ft-play-btn" aria-label="Play preview">
            <Play size={28} fill="#FFFFFF" />
          </button>
        </div>
      </div>
    </section>
  );
}
