
const PetitionProgress = ({ signedCount = 78041, goalCount = 128095 }) => {
  const percentage = Math.min((signedCount / goalCount) * 100, 100);
  const formattedSigned = signedCount.toLocaleString();
  const formattedGoal = goalCount.toLocaleString();

  return (
    <div className="">
      
      
    </div>
  );
};

export default PetitionProgress;