import picture from "./assets/IMG_1086.jpeg";
import linkedin from "./assets/linkedin.svg";
import github from "./assets/github.svg";

const About = () => {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-x-auto"
      style={{
        backgroundImage: `url(/cloud_frame.svg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 overflow-x-auto"></div>

      {/* Content */}
      <div className="relative flex flex-col lg:flex-row p-8 lg:p-32 min-w-full overflow-x-auto">
        <div className="flex justify-center w-full order-1 lg:order-2 mb-8 lg:mb-0 mt-4 lg:mt-0">
          <img
            src={picture}
            alt="pic of me!"
            className="max-w-[360px] min-w-[120px] object-contain"
          />
        </div>
        <div className="flex flex-col gap-3 order-2 lg:order-1 min-w-[120px]">
          <div className="text-white font-light text-sm lg:text-xl md:text-lg pr-0 lg:pr-10 flex flex-col gap-4 lg:gap-10">
            <h1 className="text-3xl lg:text-6xl md:text-4xl">Hey there!</h1>
            <p>
              I&apos;m Max, a computer science student at Rutgers, and I saw an
              opportunity to improve our course scheduling system. So, I took it
              upon myself to create RUPlanning. RUPlanning is like an upgraded
              version of the course scheduler you&apos;re used to, with some
              cool new features. It keeps the familiar layout but adds a core
              code filter, a full display of all courses (not just by subject),
              and a modern, sleek design that makes planning your schedule
              easier and more enjoyable. You can still save your schedules and
              courses, but instead of linking to your Rutgers NetID, it connects
              through your Google account for added convenience. RUPlanning is
              designed to be intuitive and user-friendly. Give it a try and see
              how it simplifies your course planning!
            </p>
            <p>
              Feel free to either connect with me on LinkedIn or GitHub.
              <br />
              Happy scheduling!
            </p>
          </div>
          <div className="flex gap-4">
            <button>
              <img src={linkedin} alt="LinkedIn" className="w-10 h-10 lg:w-14 lg:h-14" />
            </button>
            <button>
              <img src={github} alt="GitHub" className="w-10 h-10 lg:w-14 lg:h-14" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;