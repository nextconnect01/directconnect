import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import { Button } from "./ui/button";
import Footer from "./shared/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import useGetAllBlog from "@/hooks/useGetAllBlog";

const Home = () => {
  useGetAllBlog();

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/v1/user/profile", {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setUser(res.data.user));
        } else {
          dispatch(setUser(null));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        dispatch(setUser(null));
      }
    };
    if (!user) {
      fetchUser();
    }
  }, [dispatch, user]);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div
          className="absolute top-0 left-0 w-full h-[90%] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('images/backgroundHome.jpg')" }}
        >
          <div className="absolute inset-0 bg-black opacity-80"></div>

          <div className="relative pt-7 px-7">
            <Navbar />
            <div className="mt-24 flex flex-col items-center text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-[#FCFCFC] leading-tight">
                Elevate Your Freelance <br />
                <span className="block">Experience</span>
              </h1>
              <p className="mt-8 font-bold text-[#FCFCFC] text-sm md:text-base">
                Join A Commission-Free platform designed for seamless <br />
                collaboration between freelancers and clients worldwide
              </p>
              <Button
                onClick={() => navigate("/coming-soon")}
                className="mt-7 py-4 md:py-6 bg-[#2164f3] hover:bg-white hover:text-black max-w-32 text-[#FCFCFC]"
              >
                Coming Soon
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[10%] bg-white"></div>
      </div>

      {/* Explore Section */}
      <div className="flex flex-col items-center gap-7 px-5 md:px-0">
        <h1 className="text-black font-bold text-3xl md:text-5xl text-center">
          Explore Our Key Offerings
        </h1>
        <div className="flex flex-col items-center">
          <p className="text-base md:text-lg text-black text-center">
            Discover a range of services designed to facilitate seamless
            freelance collaborations while ensuring a commission-free
          </p>
          <p className="text-lg md:text-xl text-black text-center">
            experience for all users
          </p>
        </div>
      </div>

      {/* Key Offerings */}
      <div className="flex flex-wrap justify-around gap-10 mt-10 px-5">
        <div className="max-w-sm flex flex-col gap-3 text-center">
          <img
            className="w-full h-60 object-cover cursor-pointer rounded-md"
            src="/images/homeCard1.webp"
            alt="No Commission"
          />
          <h1 className="font-bold text-xl">No Commission</h1>
          <p>
            Experience complete transparency with our no-commission model.
            Maximise your earnings while enjoying direct communication with
            clients for better collaboration.
          </p>
        </div>
        <div className="max-w-sm flex flex-col gap-3 text-center">
          <img
            className="w-full h-60 object-cover cursor-pointer rounded-md"
            src="/images/homeCard2.webp"
            alt="Community Engagement"
          />
          <h1 className="font-bold text-xl">Community Engagement</h1>
          <p>
            Join a vibrant community of freelancers and clients. Engage in
            forums, share feedback, and enhance your freelancing journey
            through collective knowledge.
          </p>
        </div>
        <div className="max-w-sm flex flex-col gap-3 text-center">
          <img
            className="w-full h-60 object-cover cursor-pointer rounded-md"
            src="/images/homeCard3.jpeg"
            alt="Interactive Learning"
          />
          <h1 className="font-bold text-xl">Interactive Learning</h1>
          <p>
            Stay updated with our blogging section, featuring valuable tips and
            insights. Learn from others and contribute to discussions that
            drive your success.
          </p>
        </div>
      </div>

      {/* Vision Section */}
      <div className="py-10 mt-24 bg-[rgb(228,243,239)] border-s-black">
        <div className="flex flex-wrap justify-around items-center gap-10 px-5">
          <img
            className="w-full max-w-lg rounded-md cursor-pointer"
            src="/images/homeBottom.jpg"
            alt="Vision"
          />
          <div className="flex flex-col items-center max-w-lg">
            <h1 className="text-3xl md:text-5xl font-bold">
              Discover The Vision Behind Direct Connect
            </h1>
            <p className="mt-7 text-sm md:text-base leading-relaxed">
              With years of experience in the freelancing industry, Direct
              Connect has developed a deep understanding of the challenges
              faced by both freelancers and clients. Our commitment to a
              commission-free model reflects our dedication to fostering
              transparent, fair collaborations that empower all users.
            </p>
            <Button className="mt-7 py-4 md:py-6 bg-[#2164f3] hover:bg-white hover:text-black max-w-32 text-[#FCFCFC]">
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="relative h-[50vh]">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('images/homeBackgroundBottom.jpg')" }}
        >
          <div className="absolute inset-0 bg-black opacity-80"></div>
          <div className="relative z-10 flex justify-center items-center h-full">
            <div className="flex flex-col gap-7 text-center">
              <h1 className="text-[#FCFCFC] text-xl md:text-3xl font-bold" style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.9)" }}>
                Direct Connect transformed my freelancing career. I can focus
                on my projects without worrying about hidden fees or commission
                cuts.
              </h1>
              <h3 className="text-[#FCFCFC] text-lg md:text-2xl font-bold" style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.9)" }}>
                John Smith
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Transparent Transactions Section */}
      <div className="mt-14">
        <div className="flex flex-wrap justify-center items-center gap-24 px-5">
          <img
            className="w-full max-w-md rounded-sm object-cover"
            src="/images/homeSecondLast.jpg"
            alt="Transparent Transactions"
          />
          <div className="flex flex-col max-w-sm gap-5">
            <h1 className="font-bold text-xl">Transparent Transactions</h1>
            <p>
              Our platform is built on transparency, ensuring that every deal
              is clear and straightforward. No hidden fees mean you keep what
              you earn.
            </p>
            <Button className="bg-[#2164f3] hover:bg-white hover:text-black">
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Seamless Collaboration Section */}
      <div className="mt-10">
        <div className="flex flex-wrap justify-center items-center gap-24 px-5">
          <div className="flex flex-col justify-center  max-w-sm gap-5">
            <h1 className="font-bold text-xl">Seamless Collaboration</h1>
            <p>
              Centralised communication tools empower freelancers and clients
              to work closely together, fostering better project outcomes and
              lasting relationships.
            </p>
            <Button className="bg-[#2164f3] hover:bg-white hover:text-black">
              Learn More
            </Button>
          </div>
          <img
            className="w-full max-w-md rounded-sm object-cover"
            src="/images/pexels-canvastudio-3277808.jpg"
            alt="Seamless Collaboration"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;