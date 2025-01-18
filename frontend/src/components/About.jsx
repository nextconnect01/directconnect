import React from "react";
import Navbar from "./shared/Navbar";
import { Button } from "./ui/button";
import Footer from "./shared/Footer";

const About = () => {
  return (
    <div>
      {/* Background Image Section */}
      <div
        className="relative w-full h-[70vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('images/backgroundHome.jpg')",
        }}
      >
        {/* Dimming effect */}
        <div className="absolute inset-0 bg-black opacity-80"></div>

        <div className="relative pt-7 px-7">
          <Navbar />
          <div className="mt-24 flex flex-col items-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#FCFCFC] text-center leading-tight">
              Our Story <br />
            </h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-10 flex flex-col w-full">
        <h1 className="text-center font-bold text-[#263238] text-3xl sm:text-3xl md:text-4xl mt-10">
          Discover The Vision Behind Direct Connect
        </h1>
        <div>
          <div className="py-5 px-5 mt-10 w-full bg-[rgb(247,251,250)] border-s-black">
            <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-24 px-4">
              <img
                className="w-full md:max-w-md lg:max-w-2xl rounded-md cursor-pointer"
                src="/images/homeBottom.jpg"
                alt=""
              />
              <div className="flex flex-col justify-center text-center md:text-left">
                <h1 className="text-3xl sm:text-xl font-bold">
                  Direct Connect is a pioneering freelancing platform
                </h1>
                <h1 className="text-lg sm:text-xl font-bold">
                  designed to elevate the collaboration experience
                </h1>
                <p className="mt-7 text-sm sm:text-base">
                  Founded on the principle of fair transactions, Direct Connect
                  emerged from the need for a commission-free freelancing
                  alternative. Our vision was clear: to empower freelancers with
                  direct deals without hidden fees, transforming how they connect
                  with clients.
                </p>
                <p className="mt-7 text-sm sm:text-base">
                  We have successfully served a diverse range of clients, from
                  start-ups to established corporations, providing them with
                  exceptional talent and reliable services. Our commitment to
                  quality and transparency has earned us a loyal user base.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[rgb(228,243,239)]">
        <div className=" px-12 flex flex-col mt-10 items-center gap-8 py-10 ">
          <h1 className="font-bold text-3xl sm:text-3xl md:text-4xl">
            Our Core Values
          </h1>
          <p className="text-center text-sm sm:text-base">
            At Direct Connect, we uphold principles that guide our company and
            foster a thriving freelance community.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col gap-3 text-center md:text-left">
              <h1 className="font-bold text-lg">Integrity</h1>
              <p className="text-sm sm:text-base">
                We believe in maintaining honesty and openness in every
                interaction, ensuring that our platform remains a trustworthy
                space for freelancers and clients alike.
              </p>
            </div>
            <div className="flex flex-col gap-3 text-center md:text-left">
              <h1 className="font-bold text-lg">Empowerment</h1>
              <p className="text-sm sm:text-base">
                Our mission is to empower freelancers and clients by providing
                tools that enhance their collaboration experience, promoting
                independence and growth for all users.
              </p>
            </div>
            <div className="flex flex-col gap-3 text-center md:text-left">
              <h1 className="font-bold text-lg">Innovation</h1>
              <p className="text-sm sm:text-base">
                Continuous improvement and innovative solutions are at the heart
                of our operations, allowing us to evolve and adapt to the
                changing needs of the freelancing market.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
