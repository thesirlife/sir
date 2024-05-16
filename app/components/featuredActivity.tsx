type FeaturedActivityProps = {
  activity: any;
  // This will need fleshed out more obviously when I build out the activity block
};

const FeaturedActivity = () => {
  return (
    <div>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col">
          <h2>Today&apos;s Featured Activity</h2>
          <p>Check back each day to complete the featured activity!</p>
        </div>
        <div>ACTIVITY BLOCK</div>
      </div>
    </div>
  );
};

export default FeaturedActivity;
