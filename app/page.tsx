import Image from "next/image";
import Timeline from "./components/Timeline";
import "./globals.css";

export default function Home() {
  return (
    <div className="items-center justify-center bg-zinc-50 dark:bg-black">
      <section className="flex flex-col items-center bg-medium-bluish-purple text-white p-6 sm:p-10 md:flex-row md:p-15">
        <div className="my-4 mx-4 flex-1 sm:my-8 sm:mx-10 md:my-25 md:mx-30 fade-in">
          <h2 className="text-3xl font-semibold">About Me</h2>
          <p className="mt-5">
            Hello! My name is Sonya. I am a sophomore at Cornell University. I am
            passionate about programming and will be pursuing Computer Science. I
            am proficient in Java, Python, and Web Development. I enjoy playing
            Genshin Impact, coding, listening to music, and reading web novels.
          </p>
          <div className="mt-8 flex justify-center md:mt-15">
            <a href="https://docs.google.com/document/d/1GdPAUH_DEc0IHSwc-fNhGNMEHCBWRubi/edit?usp=sharing&ouid=113750441417955225460&rtpof=true&sd=true" className="inline-block px-4 py-2 rounded bg-dark-bluish-purple text-white hover:brightness-125" target="_blank">Click here for my resume</a>
          </div>
        </div>
        <div className="mt-8 flex-1 md:mt-0">
          <img
            src="/assets/graduation-pic-2025.jpeg"
            alt="My photo"
            className="mx-auto block w-48 rounded-2xl border-4 border-white shadow-lg sm:w-64 md:w-75"
          />
        </div>
      </section>
      
      <Timeline/>
      
    </div>
  );
}