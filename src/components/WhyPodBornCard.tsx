const WhyPodBornCard = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 border border-textBody rounded-lg p-6 md:p-8">
        <div className="col-span-1 lg:col-span-2 flex flex-col justify-center">
          <h2 className="text-h3">
            That’s when <span className="text-primary-100">Pod21</span> was
            born.
          </h2>
          <p className="text-body-sm lg:text-body-md mt-4 text-textBody">
            I realised that what creators need is not another online platform
            claiming to “do it all”. They need an adaptive system like the one
            I’d developed. They need real, hands-on support. A way to strip out
            the friction, reduce the stress, and let them focus on the part they
            actually love: creating, talking, connecting, and sharing ideas.
            <br />
            <br />
            Because what good is a fitness coach with a podcast with no time to
            train? What good is an author with a podcast with no time to write?
            What good is a lifestyle influencer with a podcast with no time to
            spend with their family?
          </p>
        </div>
        <div className="col-span-1 lg:col-span-1">
          <img
            src="/that's_why_pod21_born.png"
            alt="About History"
            className=""
          />
        </div>
      </div>
    </>
  );
};

export default WhyPodBornCard;
