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
    </div>
  );
}
