import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="bg-grid flex min-h-screen items-center justify-center bg-bgPrimary">
      <div id="not-found" className="text-center">
        <p id="not-found--readout" className="readout text-[#5c5a57]">
          404 <span className="slash-sep">{"//"}</span> SIGNAL LOST
        </p>
        <h1
          id="not-found--headline"
          className="mt-6 font-kanit text-[56px] font-bold leading-none text-boneWhite"
        >
          Dead <span className="text-primary-100">air.</span>
        </h1>
        <p className="mt-4 text-base text-textBody">
          The page you're looking for isn't broadcasting.
        </p>
        <Link
          id="not-found--home-link"
          to="/"
          className="mt-8 inline-block rounded-full bg-red-100 px-8 py-4 font-kanit font-bold uppercase tracking-[0.12em] text-boneWhite transition-colors hover:bg-red-60"
        >
          Return to control
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
