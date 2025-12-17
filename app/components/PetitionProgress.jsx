import React from 'react';

const PetitionProgress = ({ signedCount = 78041, goalCount = 128095 }) => {
  const percentage = Math.min((signedCount / goalCount) * 100, 100);
  const formattedSigned = signedCount.toLocaleString();
  const formattedGoal = goalCount.toLocaleString();

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-6">
      
      <p className="text-2xl md:text-3xl text-white font-medium tracking-wide text-center">
        <span className="font-bold text-green-3">{formattedSigned}</span> people have signed. Help us reach{' '}
        <span className="font-bold text-green-3">{formattedGoal}</span>
      </p>


      <div className="w-full h-6 bg-green-1 rounded-full overflow-hidden shadow-lg">
        <div
          className="h-full bg-green-5 rounded-full transition-all duration-1000 ease-in-out"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={signedCount}
          aria-valuemin={0}
          aria-valuemax={goalCount}
        ></div>
      </div>
      
    </div>
  );
};

export default PetitionProgress;