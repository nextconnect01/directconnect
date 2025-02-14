import React from "react";
import Navbar from "./shared/Navbar";
import { Button } from "./ui/button";
import Footer from "./shared/Footer";
import { useNavigate } from "react-router-dom";
import SEO from "./SEO";

const Offering = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <SEO title="Offerings Page" description="Welcome to our Offerings page "/> 
      <div className="relative h-[85vh]">
        {/* Background Image for the top of the page */}
        <div
          className="absolute top-0 left-0 w-full h-[80%] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/pexels-fauxels-3184357.jpg')",
          }}
        >
          {/* Dimming effect */}
          <div className="absolute inset-0 bg-black opacity-80"></div>

          <div className="relative pt-7 px-5 md:px-10">
            <Navbar />
            <div className="flex items-center justify-center h-[50vh]">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#FCFCFC] text-center leading-tight">
                OUR OFFERINGS <br />
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-5 px-5">
        {/* Middle Text */}
        <div className="text-center text-[#263238] text-3xl md:text-4xl lg:text-5xl font-bold">
          <h1>Explore Our Key Offerings</h1>
        </div>
        <div className="text-center text-sm md:text-base lg:text-xl">
          <p className="px-12">
            Discover how Next Connect simplifies freelancing while creating
            opportunities for growth an meaningful connections. We’re redefining
            the way freelancers and clients work together —no hidden fees, no
            competition, just genuine support.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-24 w-full mt-12 px-5">
        <div className="px-20 flex flex-col lg:flex-row justify-between items-center gap-20">
          <img
            className="w-full max-w-sm rounded-md lg:max-w-lg"
            src="/images/offering/pexels-sora-shimazaki-5673488.jpg"
            alt=""
          />
          <div className="text-center lg:text-left flex flex-col max-w-md gap-10">
            <h1 className="font-bold text-2xl">
              {" "}
              <span className="text-blue-500 mr-5">01 </span>No Commission
            </h1>
            <p className="text-justify">
              We believe your hard-earned money belongs to you. That’s why we’ve
              removed commission fees entirely. With Next Connect, you keep
              everything you earn while connecting directly with clients or
              freelancers who value your work.
            </p>

            <Button
              className="bg-[rgb(33,100,243)] text-sm md:text-lg px-5 md:px-7 py-3 md:py-5 font-bold hover:bg-white hover:text-black"
              onClick={() => navigate("/SignUp")}
            >
              Get Started - Take Control Over your Earning
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row-reverse justify-center items-center gap-10 lg:gap-24 w-full mt-12 px-5">
        <div className="px-20 flex flex-col lg:flex-row items-center gap-20">
          <img
            className="w-full max-w-sm rounded-md lg:max-w-lg"
            src="/images/offering/pexels-ivan-samkov-5676744.jpg"
            alt=""
          />
          <div className="text-center lg:text-left flex flex-col max-w-md gap-10">
            <h1 className="font-bold text-2xl">
              <span className="text-blue-500 mr-5">02 </span> Community
              Engagement
            </h1>
            <p className="text-justify">
              Freelancing doesn’t have to be isolating. Our platform fosters a
              vibrant, supportive community where freelancers and clients can
              share updates, ask questions, and grow together. Stay on track
              with built-in tools that fit your schedule and simplify
              collaboration
            </p>

            <Button
              onClick={() => navigate("/SignUp")}
              className="bg-[rgb(33,100,243)] text-sm md:text- px-3 md:px-5 py-3 md:py-3 font-bold hover:bg-white hover:text-black"
            >
              Join The Conversation - Be A Part Of Something Bigger
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-24 w-full mt-12 px-5">
        <div className="flex px-20 flex-col lg:flex-row items-center gap-20">
          <img
            className="w-full max-w-sm rounded-md lg:max-w-lg"
            src="/images/offering/pexels-tranmautritam-58709.jpg"
            alt=""
          />
          <div className="text-center  lg:text-left flex flex-col max-w-md gap-10">
            <h1 className="font-bold text-2xl">
              <span className="text-blue-500 mr-5">03 </span>Interactive
              Learning
            </h1>
            <p className="text-justify">
              Your journey shouldn’t stop at “good enough.” Through mentorship
              programs, workshops, and resources, we’re here to help you level
              up. Whether you’re a seasoned freelancer or just starting out,
              you’ll find the guidance you need to grow your skills and achieve
              your goals.
            </p>

            <Button
              onClick={() => navigate("/SignUp")}
              className="bg-[rgb(33,100,243)] text-sm md:text-lg px-5 md:px-7 py-3 md:py-5 font-bold hover:bg-white hover:text-black"
            >
              Learn And Grow - Start your Next Chapter
            </Button>
          </div>
        </div>
      </div>

      <div className="relative h-[50vh] mt-20">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('images/pexels-canvastudio-3277808.jpg')",
          }}
        >
          {/* Dimming effect */}
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 flex justify-center items-center h-full">
            <div className="flex flex-col gap-7">
              <h1
                className="text-[#FCFCFC] text-xl md:text-2xl lg:text-3xl font-bold text-center"
                style={{
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.9)",
                }}
              >
                <p className="px-12 text-center">
                  Take the next step in your freelancing journey with Direct
                  Connect. Whether you’re a client seeking reliable talent or a
                  freelancer looking for opportunities, our platform is designed
                  to help you do well—together
                </p>
              </h1>
              <h3
                className="text-[#FCFCFC] text-lg md:text-xl lg:text-2xl font-bold text-center"
                style={{
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.9)",
                }}
              >
                Join Our Community Today
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-3 px-9 mt-10">
        <h1 className="font-bold text-5xl">Why Choose Next Connect ?</h1>
        <p className="text-lg text-justify">
          At Next Connect, we’ve reimagined freelancing to focus on what truly
          matters: trust, collaboration, and giving everyone the tools they need
          to succeed. Say goodbye to confusing fees and hidden costs—our
          platform is built on transparency. What you earn is what you keep,
          with no commission fees eating into your hard work. Whether you’re a
          freelancer or a client, you’ll always know exactly where your money is
          going, so you can focus on what really matters—getting the job done.
        </p>
        <div className="flex flex-col md:flex-row justify-center mt-12 gap-6">
          <div className="flex flex-col justify-center items-center gap-4 w-full md:w-1/2 px-4">
            <img
              className="w-full max-w-md object-cover rounded-lg"
              src="/images/homeSecondLast.jpg"
              alt=""
            />
            <h1 className="font-bold text-xl">Transparency</h1>
            <p className="text-justify">
            Tired of hidden fees? We show exactly what things cost—no nasty surprises. You keep all your money when freelancing—no percentage cuts or sneaky charges. Clients see every penny they’re spending, and freelancers get paid in full. No confusing math, no fine print. Just simple, honest numbers so you can spend energy on actual work instead of chasing payments or guessing budgets. It’s like getting paid cash-in-hand, but safer and smarter. For clients, it’s like having X-ray vision for your projects—you always know where your cash is going. Work stays fair, pay stays clear, and everyone wins. Join the no-bullsh*t way to freelance.

            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-4 w-full md:w-1/2 px-4">
            <img
              className="w-full max-w-md object-cover rounded-lg"
              src="/images/pexels-canvastudio-3277808.jpg"
              alt=""
            />
            <h1 className="font-bold text-xl">Seamless Collaboration</h1>
            <p className="text-justify">
              Freelancing often feels like a tug-of-war, but Next Connect
              changes that. Our tools make collaboration seamless, helping
              freelancers and clients align goals, share ideas, and build
              lasting relationships. It’s about working together, not against
              each other. Plus, freelancing doesn’t have to be lonely—our
              community connects, supports, and celebrates each other. Next
              Connect makes freelancing simpler, fairer, and more rewarding.
              Ready to join a movement that works for you? Let’s get started.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Offering;
