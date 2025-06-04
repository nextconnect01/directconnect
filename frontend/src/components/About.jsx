import React from "react";
import Navbar from "./shared/Navbar";
import { Button } from "./ui/button";
import Footer from "./shared/Footer";
import SEO from "./SEO";
import GuestNavbar from "./shared/GuestNavbar";

const About = () => {
  return (
    <div>
      <SEO
       title="About US Page" description="Welcome to our About US Page "/> 
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
          <GuestNavbar />
          <div className="mt-28 flex flex-col items-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#FCFCFC] text-center leading-tight">
              OUR STORY <br />
            </h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-10 flex flex-col w-full">
        <h1 className="text-center font-bold text-[#263238] text-3xl sm:text-3xl md:text-4xl mt-10">
          Discover The Vision Behind Next Connect
        </h1>
        <div>
          <div className="py-5 px-12 mt-10 w-full bg-[rgb(247,251,250)] border-s-black">
            <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-24 px-4">
              <img
                className="w-full md:max-w-md lg:max-w-2xl rounded-md cursor-pointer"
                src="/images/homeBottom.jpg"
                alt=""
              />
              <div className="flex flex-col justify-center text-justify md:text-justify">
                <h1 className="text-3xl sm:text-xl font-bold">
                  Collaboration is the key to unlocking the potential of every
                  great idea.
                </h1>

                <p className="mt-7 text-sm sm:text-base">
                  Founded on the principle of fair transactions, Next Connect
                  emerged from the need for a commission-free freelancing
                  alternative. Our vision was clear: to empower freelancers with
                  direct deals without hidden fees, transforming how they
                  connect with clients.
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
          <p className="text-center text-2xl  font-bold sm:text-base">
            The foundation of Next Connect lies in the principles that guide
            everything we do. These values define our commitment to creating a
            better freelancing experience
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col gap-3 text-center md:text-left">
              <h1 className="font-bold text-center text-xl">Integrity</h1>
              <p className="text-sm text-justify sm:text-base">
                At Next Connect, honesty and transparency are at the heart of
                every interaction. We ensure every user—freelancer or
                client—feels secure, valued, and respected. Our no-commission
                policy reflects our commitment to fairness, creating a platform
                where everyone can focus o building genuine connections instead
                of worrying about hidden costs or unfair practices
              </p>
            </div>
            <div className="flex flex-col gap-3 text-center md:text-left">
              <h1 className="font-bold text-center text-xl">Empowerment</h1>
              <p className="text-sm text-justify sm:text-base">
                Empowerment drives our mission. We aim to give freelancers the
                tools and opportunities to grow their careers without
                restrictions, while clients gain access to a pool of talented
                professionals who meet their needs. By fostering independence
                and self-confidence, we hel you take charge of your freelancing
                journey and make informed decisions that shape your success
              </p>
            </div>
            <div className="flex flex-col gap-3 text-center md:text-left">
              <h1 className="font-bold text-center text-xl">Innovation</h1>
              <p className="text-sm text-justify sm:text-base">
                Continuous improvement is essential to staying relevant in the
                fast-changing freelance world. At Next Connect, we are
                constantly refining our tools and services to meet your evolving
                needs Whether it’s simplifying workflows or introducing new
                features, we are dedicated to helpin freelancers and clients
                work smarter, faster, and with greater ease.
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
