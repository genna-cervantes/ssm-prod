<<<<<<< HEAD
import Image from "next/image";
import ReadMoreCard from './readMoreCard';

export default function Home() {
  return (
    <div className="container min-w-full pl-50 pr-50">
      <div className="header-container w-full ">
        <h1 className="text-6xl">
          Why Sierra Madre Matters
        </h1>
        <span>
          This ancient rainforest is more than just trees.  It's a lifeline for millions.
        </span>
      </div>
      <div>
        <ReadMoreCard 
        />
        <ReadMoreCard />
        <ReadMoreCard />
      </div>
=======
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen h-dvh gap-15 items-center justify-center pl-50 pr-50 container min-w-full">
        <div className="hero-content flex flex-col items-center justify-center text-center gap-20">
          <div className="hero-title">
            <p>Save Millions of Lives</p>
            <h1>Save Sierra Madre Now.</h1>
            <p>Without it, our future is at risk</p>
          </div>
          <div className="hero-cta">
            <button>Sign the petition now</button>
            <button>Learn more</button>
          </div>
        </div>
        <div>
          <div className="hero-note-list flex gap-20">
            <div className="hero-note note-1 flex items-center justify-center flex-col">
              <p className="note-text">The lungs of luzon</p>
              <div className="vertical-dashed-line w-0 h-10 border-dashed border-white border-l"></div>
              <div className="circle bg-white rounded-full w-2 h-2"></div>
            </div>
            <div className="hero-note note-2 flex items-center justify-center flex-col">
              <p className="note-text">Home to millions of species and <br/> indigenous communities.</p>
              <div className="vertical-dashed-line w-0 h-10 border-dashed border-white border-l"></div>
              <div className="circle bg-white rounded-full w-2 h-2"></div>
            </div>
            <div className="hero-note note-3 flex items-center justify-center flex-col">
              <p className="note-text">Protector from typhoons, <br/> and provider of clean water</p>
              <div className="vertical-dashed-line w-0 h-10 border-dashed border-white border-l"></div>
              <div className="circle bg-white rounded-full w-2 h-2"></div>
            </div>
          </div>
          <div className="petitions-signed w-full">
            <p> <span>78,041</span> people have signed. Help us reach 128,095</p>
            <div className="progress-bar bg-white rounded-full h-4 w-full">
              <div className="progress bg-green-500 rounded-full h-4" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>
</div>
  );
}
