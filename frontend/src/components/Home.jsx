import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import { Button } from "./ui/button";
import Footer from "./shared/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import useGetAllBlog from "@/hooks/useGetAllBlog";
import SEO from "./SEO";

const Home = () => {
  const backendUri = import.meta.env.VITE_BACKEND_URL;
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${backendUri}/api/v1/user/profile`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setUser(res.data.user));
        } else {
          dispatch(setUser(null));
        }
      } catch (error) {
        if (user) {
          console.error("Error fetching user data:", error);
        }
        dispatch(setUser(null));
      }
    };
    if (!user) {
      fetchUser();
    }
  }, [dispatch, user]);

  return (
    <div className="w-full">
      <SEO title="Home Page" description="Welcome to our home page "/> 
      {/* Hero Section */}
      <div className="relative h-screen">
        <div
          className="absolute top-0 left-0 w-full h-[90%] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('images/backgroundHome.jpg')" }}
        >
          <div className="absolute inset-0 bg-black opacity-80"></div>

          <div className="relative pt-7 px-7">
            <Navbar />
            <div className="mt-28 flex flex-col items-center text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-[#FCFCFC] leading-tight">
                Elevate Your Freelance <br />
                <span className="block">Experience</span>
              </h1>
              <div className="mt-8 font-bold text-[#FCFCFC] text-sm md:text-base">
                Discover a platform where meaningful collaboration takes center
                stage.
                <div className="font-bold text-[#FCFCFC] text-sm md:text-base">
                  Say goodbye to commissions and hello to opportunities that put
                  your success first
                </div>
              </div>
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
          We’re here to redefine how freelancers and clients connect. Explore a suite of tools and feature
          designed to help you succeed on your own terms
          </p>

          <p className="mt-5 font-bold text-lg md:text-xl text-black text-center">
            Empower Your Work, Your Way
          </p>
        </div>
      </div>

      {/* Key Offerings */}
      <div className="flex flex-wrap justify-around gap-10 mt-10 px-5">
        <div className="max-w-sm flex flex-col gap-3 text-justify">
          <img
          loading = "lazy"
            className="w-full h-60 object-cover cursor-pointer rounded-md"
            src="/images/homeCard1.webp"
            alt="No Commission"
          />
          <h1 className="font-bold text-xl text-center">No Commission</h1>
          <p>
            Experience complete transparency with our no-commission model.
            Maximise your earnings while enjoying direct communication with
            clients for better collaboration.
          </p>
        </div>
        <div className="max-w-sm flex flex-col gap-3 text-justify">
          <img
          loading = "lazy"
            className="w-full h-60 object-cover cursor-pointer rounded-md"
            src="/images/homeCard2.webp"
            alt="Community Engagement"
          />
          <h1 className="font-bold text-xl text-center">
            Community Engagement
          </h1>
          <p>
            Join a vibrant community of freelancers and clients. Engage in
            forums, share feedback, and enhance your freelancing journey through
            collective knowledge.
          </p>
        </div>
        <div className="max-w-sm flex flex-col gap-3 text-justify">
          <img
          loading = "lazy"
            className="w-full h-60 object-cover cursor-pointer rounded-md"
            src="/images/homeCard3.jpeg"
            alt="Interactive Learning"
          />
          <h1 className="font-bold text-xl text-center">
            Interactive Learning
          </h1>
          <p>
            Stay updated with our blogging section, featuring valuable tips and
            insights. Learn from others and contribute to discussions that drive
            your success.
          </p>
        </div>
      </div>

      {/* Vision Section */}
      <div className="py-10 mt-24 bg-[rgb(228,243,239)] border-s-black">
        <div className="flex flex-wrap justify-around items-center gap-10 px-5">
          <img
          loading = "lazy"
            className="w-full max-w-lg rounded-md cursor-pointer"
            src="/images/homeBottom.jpg"
            alt="Vision"
          />
          <div className="flex flex-col  items-center max-w-lg">
            <h1 className="text-3xl md:text-5xl font-bold">
              Discover The Vision Behind Next Connect
            </h1>
            <p className="mt-7 text-justify text-sm md:text-base leading-relaxed">
              Built on years of experience in the freelancing world,{" "}
              <span className="font-bold">Next Connect </span>
              is more than a platform—it’s a movement. We believe in empowering
              freelancers and clients to collaborate without barriers. Our
              mission? To create a commission-free space where trust, growth,
              and opportunity grow.
            </p>
            <a rel="preload" target="blank" href="https://www.facebook.com/groups/nextconnecthub">
              <Button className="mt-7 text-lg font-bold px-10 py-4 md:py-6 bg-[#2164f3] hover:bg-white hover:text-black max-w-32 text-[#FCFCFC]">
                Join Us
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mt-12 relative h-[50vh]">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('images/homeBackgroundBottom.jpg')" }}
        >
          <div className="absolute inset-0 bg-black opacity-80"></div>
          <div className="relative z-10 flex justify-center items-center h-full">
            <div className="flex flex-col gap-7 text-center">
              <h1
                className="text-[#FCFCFC] text-xl md:text-3xl font-bold"
                style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.9)" }}
              >
                Alone, we can do so little; together, we can do so much
              </h1>
              <h3
                className="text-[#FCFCFC] text-lg md:text-2xl font-bold"
                style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.9)" }}
              >
                – Helen Keller
              </h3>
            </div>
          </div>
        </div>
      </div>
      
      {/*Why Choose Next Connect part*/}
      <div className="flex flex-col gap-5 justify-center items-center mt-10">
        <h1 className="font-bold text-5xl text-center">Why Choose Next Connect For Freelancing ?</h1>
        <p className="font-bold text-3xl text-center">A Platform Built for You</p>
        <p className="px-12 text-3xl text-center">We know the challenges freelancers and clients face. That’s why Next Connect is designed to 
        make things easier, fairer, and more effective. Here’s how</p>
      </div>

      {/* Transparent Transactions Section */}
      <div className="mt-14">
  {/* Transparent Transactions Section */}
  <div className="flex flex-wrap justify-center items-center gap-8 md:gap-24 px-5">
    <img
    loading = "lazy"
      className="w-full max-w-sm rounded-sm object-cover"
      src="/images/homeSecondLast.jpg"
      alt="Transparent Transactions"
    />
    <div className="flex flex-col items-center max-w-sm gap-4 md:gap-5">
      <h1 className="font-bold text-lg md:text-xl text-center">
        Transparent Transactions
      </h1>
      <p className="text-justify">
        Enjoy seamless payments with no hidden fees or middlemen. You earn what
        you work for, and clients pay what they agreed—simple as that.
      </p>
      <a href="https://www.facebook.com/groups/nextconnecthub" target="blank">
        <Button className="bg-[rgb(33,100,243)] text-sm md:text-lg px-5 md:px-7 py-3 md:py-5 font-bold hover:bg-white hover:text-black">
          Join Us
        </Button>
      </a>
    </div>
  </div>
</div>

{/* Seamless Collaboration Section */}
<div className="mt-14 md:mt-15">
  <div className="flex flex-wrap justify-center items-center gap-8 md:gap-24 px-5">
    <div className="flex flex-col justify-center items-center max-w-sm gap-4 md:gap-5">
      <h1 className="font-bold text-lg md:text-xl text-center">
        Seamless Collaboration
      </h1>
      <p className="text-justify">
        Work smarter, not harder. Our tools make it easy to connect,
        communicate, and deliver projects without unnecessary hassle.
      </p>
      <a  href="https://www.facebook.com/groups/nextconnecthub" target="blank">
        <Button className="bg-[rgb(33,100,243)] text-sm md:text-lg px-5 md:px-7 py-3 md:py-5 font-bold hover:bg-white hover:text-black">
          Join Us
        </Button>
      </a>
    </div>
    <img
    loading = "lazy"
      className="w-full max-w-sm rounded-sm object-cover"
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
