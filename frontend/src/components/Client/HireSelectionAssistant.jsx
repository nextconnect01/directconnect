import React from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Check } from "lucide-react";
import RatingStars from "../shared/RatingStars";
import { Badge } from "../ui/badge";
import ClientFooter from "./ClientFooter";

const HireSelectionAssistant = () => {
  const boys = [1, 2, 3, 4];
  const skills = [1, 2, 3, 4];
  return (
    <div className="w-full pt-5 ">
      <Navbar />
      <div className="max-w-6xl w-full mt-10 mb-7 mx-auto">
        {" "}
        {/* Centering the content */}
        <h1 className="text-left text-blue-600  text-4xl font-bold">
          Talent Selection
        </h1>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-6xl  p-10 bg-white shadow-2xl rounded-xl">
          <div className="flex w-full justify-between">
            <h1 className="text-xl font-bold">Hire Selection Assistant</h1>
            <Button className="bg-blue-600 text-white " variant="outline">
              Get Started
            </Button>
          </div>

          <div className="grid grid-cols-2 mt-7 gap-5">
            <div className="flex flex-col gap-5 p-5 bg-slate-100 rounded-xl">
              <h1 className="font-bold">What is a Selection Assistant?</h1>
              <p className="text-slate-500 text-sm">
                When you receive numerous applications for a job posting, our
                Selection Assistant can help you identify the best candidates.
                This tool allows you to hire a mid-level freelancer to review
                applications and recommend the most suitable talent for your
                project.
              </p>
            </div>

            <div className="flex p-5 flex-col gap-5 bg-slate-100 rounded-xl">
              <h1 className="font-bold">Benefits</h1>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-slate-500">
                  • Save time screening applications
                </p>
                <p className="text-sm text-slate-500">
                  • Get expert recommendations
                </p>
                <p className="text-sm text-slate-500">
                  • More accurate candidate matching
                </p>
                <p className="text-sm text-slate-500">
                  • Reduce hiring mistakes
                </p>
                <p className="text-sm text-slate-500">
                  • Transparent selection process
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full  mt-7 flex justify-center">
        <div className="w-full max-w-6xl flex flex-col gap-10 bg-white p-4 shadow-2xl rounded-xl">
          <h1 className="font-bold text-xl text-start  ml-[60px] ">Find Selection Assistant</h1>
          <div className="flex justify-around ">
            <div className="flex flex-col gap-1">
              <Label htmlFor="specialization" className="mb-2 font-bold">
                Specialization
              </Label>
              <Input
                id="specialization"
                type="text"
                placeholder="Enter Specialization ..."
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="range" className="mb-2 font-bold">
                Budget Range
              </Label>
              <Input
                id="range"
                type="text"
                placeholder="Enter Your Budget ..."
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="range" className="mb-2 font-bold">
                Budget Range
              </Label>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Not Selected" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Not Selected</SelectLabel>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="7">7</SelectItem>
                    <SelectItem value="8">8</SelectItem>
                    <SelectItem value="9">9</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="w-full mb-5 flex justify-center gap-4">
            <Button variant="outline" className="shadow-xl">
              Reset Filter
            </Button>
            <Button variant="outline" className="bg-blue-600 text-white">
              Apply Filter
            </Button>
          </div>
        </div>
      </div>
      {boys.map((item, index) => (
        <div key={index} className="w-full pb-5 mb-10 mt-10 flex justify-center ">
          <div className="w-full max-w-6xl shadow-2xl rounded-xl bg-white p-5 flex justify-between ">
            <div className="flex gap-3">
              <Avatar>
                <AvatarImage src="" alt="image" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                <h1>
                  Samarth Khatri 
                </h1>
                <Check className="text-blue-700"  />
                </div>
               
                <p className="text-sm text-slate-500">
                  Senior Web Development Specialist
                </p>
                <div className="flex gap-2">
                  <RatingStars rating={5} />
                  <p>(48 reviews )</p>
                </div>
                <div className="flex gap-2">
                {skills.map((item, index) => (
                  <div className="flex gap-2">
                    <Badge className="bg-slate-200" variant="outline">
                      React Js
                    </Badge>
                  </div>
                ))}
                </div>
                
                <div className="grid grid-cols-3 gap-9">
                  <div className="flex flex-col">
                    <h1 className="font-bold text-center">$75</h1>
                    <p className="text-sm text-slate-500 mt-2">Hourly Rate</p>
                  </div>
                  <div className="flex flex-col">
                    <h1 className="font-bold text-center">80%</h1>
                    <p className="text-sm text-slate-500 mt-2">Job Success
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <h1 className="font-bold text-center">5</h1>
                    <p className="text-sm text-slate-500 mt-2">Years Exp.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 justify-center items-center">
              <Button variant="outline" className="border-blue-700 border-s-2 text-blue-700">Shortlist</Button>
              <Button variant="outline" className="bg-blue-600 text-white">Connect</Button>
            </div>
          </div>
        </div>
      ))}

      <ClientFooter/>
    </div>
  );
};

export default HireSelectionAssistant;
