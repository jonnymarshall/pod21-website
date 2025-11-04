const MotivationalCard = () => {
  return (
    <>
      <div className="relative gap-4 border border-stroke rounded-lg p-6 md:p-8 bg-bgSecondary overflow-hidden">
        <div className="absolute -bottom-[90px] -right-[60px] w-[224px] h-[300px] opacity-20 ">
          <img
            src="/straight-lines.png"
            alt="Background pattern"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="">
          <h2 className="text-h3 italic">
            "Rather than giving up, I turned my frustration into{" "}
            <span className="text-primary-100">curiosity</span>".
          </h2>
          <p className="text-body-sm lg:text-body-md mt-4 text-textBody">
            I started to look at the podcasting process not just as one giant
            unwieldy beast, but rather as a set of specific, manageable tasks
            which could be executed efficiently. I broke the entire workflow
            down and designed systems so that I could create episodes start to
            finish with minimum friction. My time returned, and so did my
            sanity. But most crucially - my love for the art of podcasting
            returned. I knew that there must be more out there like me who were
            tearing their hair out trying to be a quality podcaster or content
            creator but falling short because the time demands on their podcast
            were conflicting and interfering with their career success or family
            commitments.
          </p>
        </div>
      </div>
    </>
  );
};

export default MotivationalCard;
