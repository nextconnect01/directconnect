import React from "react";
import Navbar from "./shared/Navbar";
import { Button } from "./ui/button";
import Footer from "./shared/Footer";

const Offering = () => {
  return (
    <div className="w-full">
      <div className="relative h-screen">
        {/* Background Image for the top of the page */}
        <div
          className="absolute top-0 left-0 w-full h-[90%] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/homeCard3.jpeg')",
          }}
        >
          {/* Dimming effect */}
          <div className="absolute inset-0 bg-black opacity-80"></div>

          <div className="relative pt-7 px-5 md:px-10">
            <Navbar />
            <div className="flex items-center justify-center h-[75vh]">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#FCFCFC] text-center leading-tight">
                Our Offerings <br />
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
          <p>Discover a range of services designed to facilitate</p>
          <p>seamless freelance collaborations while ensuring a</p>
          <p>commission-free experience for all users.</p>
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
            <h1 className="font-bold text-2xl"> <span className="text-blue-500 mr-5">01  </span>No Commission</h1>
            <p>
              Our platform provides a user-friendly interface where freelancers
              can showcase their skills, facilitating easy discovery by
              potential clients. This streamlined process enhances connections
              without any commission fees, empowering both parties.
            </p>
            <Button className="bg-[#2164f3] hover:bg-white hover:text-black">
              Get Started
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
            <h1 className="font-bold text-2xl"><span className="text-blue-500 mr-5">02  </span>   Community Engagement</h1>
            <p>
              We offer tailored project management tools that simplify
              communication and workflow between freelancers and clients. Our
              features include real-time updates and task tracking, ensuring
              that projects stay on schedule and within budget without added
              costs.
            </p>
            <Button className="bg-[#2164f3] hover:bg-white hover:text-black">
              Get Started
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
            <h1 className="font-bold text-2xl"><span className="text-blue-500 mr-5">03  </span>Interactive Learning</h1>
            <p>
              Our community forums provide a vibrant space for freelancers and
              clients to engage, share insights, and seek feedback. This
              collaborative environment fosters professional growth and
              strengthens relationships within the community, setting us apart
              from traditional platforms.
            </p>
            <Button className="bg-[#2164f3] hover:bg-white hover:text-black">
              Get Started
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
                <p>Direct Connect has transformed my freelancing</p>
                <p>experience, making collaboration effortless and</p>
                <p>rewarding. I feel valued and understood without</p>
                <p>worrying about commission fees.</p>
              </h1>
              <h3
                className="text-[#FCFCFC] text-lg md:text-xl lg:text-2xl font-bold text-center"
                style={{
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.9)",
                }}
              >
                Sarah Johnson
              </h3>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Offering;
