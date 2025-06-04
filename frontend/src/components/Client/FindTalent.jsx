import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import { Check, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import RatingStars from "../shared/RatingStars";
import { Badge } from "../ui/badge";
import useGetAllSuggestedTalent from "@/hooks/useGetAllSuggestedTalent";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setSelectedUser, setUserContacts } from "@/redux/authSlice";
import ClientFooter from "./ClientFooter";

const FindTalent = () => {
  const location =  useLocation()
  const searchParams = new URLSearchParams(location.search)
  const searchFromQuery = searchParams.get("search") || ""
  const [searchTerm, setSearchTerm] = useState(searchFromQuery || "");
  const { userContacts } = useSelector((store) => store.auth);
  const arr = [1, 2, 3, 4, 5, 6];
  const badge = [1, 2, 3, 4, 5];
  useGetAllSuggestedTalent();
  const { suggestedFreelancers } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    { label: "Top Freelancers", value: "" },
    { label: "Web Developer", value: "web developer" },
    { label: "App Developer", value: "app developer" },
    { label: "Design & Creativity", value: "design & creativity" },
    { label: "Creativity & Writing", value: "creativity & writing" },
  ];

  const filteredFreelancers = suggestedFreelancers?.filter((freelancer) => {
    const title = freelancer?.profile?.professionalTitle || "";
    const skills = freelancer?.skillProfile?.subCategory || [];

    return (
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });

  return (
    <div className="w-full pt-3">
      <Navbar />

      {/* Main Container */}
      <div className="pb-5 w-full h-full bg-[#fcfcfc] p-4">
        {/* Hero Section */}
        <div className="flex justify-center">
          <div className="mt-10 bg-[#21b3f3] h-auto text-white flex flex-col lg:flex-row items-center justify-between p-7 rounded-lg max-w-5xl w-full">
            <div className="flex flex-col font-bold w-full lg:w-1/2 gap-4">
              <h1 className="text-3xl md:text-4xl text-center lg:text-left">
                Find Free Top Talent
              </h1>
              <p className="text-md text-center lg:text-left">
                Connect directly with skilled professionals without commission
                fees. Our platform helps you find the perfect match for your
                project.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="What Skills Are You Looking For?"
                  className="py-3 rounded-3xl bg-[#ffffff] text-black w-full sm:w-3/4"
                />
                <Button className="bg-blue-700 rounded-3xl">Search</Button>
              </div>
            </div>

            <img
              className="w-full max-w-xs md:max-w-sm mt-4 lg:mt-0 rounded-lg"
              src="/images/a-professional-stock-photo-showing-a-sma_djxgCCNlTqeQEf7nnSiKCg_YRygzkL9T5Sp7OoDjTtO-A.jpeg.jpg"
              alt=""
            />
          </div>
        </div>

        {/* Carousel Section */}
        <div className="w-full flex justify-center mt-7">
          <Carousel className="w-full bg-white max-w-5xl shadow-xl p-4 rounded-lg">
            <CarouselContent className="flex gap-4">
              {categories.map((category, index) => (
                <CarouselItem
                  key={index}
                  className="flex justify-center basis-1/3 md:basis-1/5"
                >
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm(category.value);
                      setSelectedCategory(category.value);
                    }}
                    className={`rounded-xl px-4 py-2 md:px-6 md:py-3 ${
                      selectedCategory === category.value
                        ? "bg-blue-500 text-white"
                        : "hover:bg-blue-500 hover:text-white"
                    }`}
                  >
                    {category.label}
                  </Button>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Filters Section */}
        <div className="w-full flex justify-center">
          <div className="max-w-5xl w-full mt-7 flex flex-wrap justify-between gap-3">
            {/* Left Filters */}
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <Button key={index} variant="outline">
                  Ranking <ChevronDown className="relative" />
                </Button>
              ))}
            </div>

            {/* Right Filters */}
            <div className="flex flex-wrap gap-2 items-center">
              <p className="mt-1">Sort By :</p>
              <Button variant="outline">
                Ranking <ChevronDown className="relative" />
              </Button>
            </div>
          </div>
        </div>

        {/* Freelancer Cards */}
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 max-w-5xl w-full">
            {filteredFreelancers.map((freelancer) => (
              <div className="bg-white rounded-lg flex flex-col gap-3 p-4 shadow-md">
                {/* Profile Info */}
                <div className="flex gap-3 border-b-2 border-gray-200 pb-3">
                  <Avatar>
                    <AvatarImage
                      src={freelancer?.profile?.profilePhoto}
                      alt="image"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <h1>{freelancer?.fullName}</h1>
                    <p className="text-slate-600">
                      {freelancer?.profile?.professionalTitle}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-2 mt-2">
                  <RatingStars className="mt-1" rating={3.5} />
                  <p className="text-slate-600">(38 reviews)</p>
                </div>

                {/* Skills Badges */}
                <div className="flex flex-wrap gap-2">
                  {freelancer?.skillProfile?.subCategory.map((skill) => (
                    <Badge className="bg-slate-100 text-black text-xs px-2 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <div key={idx} className="flex flex-col gap-1 text-center">
                      <h1 className="text-lg font-bold">97%</h1>
                      <p className="text-sm">Completion</p>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="w-full mt-3 flex justify-between p-3 bg-slate-200 rounded-md">
                  <Badge className="bg-pink-200 text-brown-600 text-xs px-2 py-1 flex items-center">
                    <Check className="mr-1 h-3 w-3" /> Mentor
                  </Badge>
                  <Button
                    className="bg-blue-700 text-white hover:bg-blue-800 hover:text-white"
                    onClick={() => {
                      console.log("Selected freelancer:", freelancer);
                      dispatch(setSelectedUser(freelancer));

                      dispatch(setUserContacts([...userContacts, freelancer]));
                      navigate("/message");
                    }}
                  >
                    Connect
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ClientFooter />
    </div>
  );
};

export default FindTalent;
