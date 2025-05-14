import React from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import {
  ClipboardList,
  Drama,
  Laptop,
  Search,
  Target,
  Video,
} from "lucide-react";
import { Input } from "../ui/input";
import ClientFooter from "./ClientFooter";

const ScreeningTools = () => {
  return (
    <div className="w-full  pt-5">
      <Navbar />
      <div className="w-full pb-5 pt-10 bg-[#F5F5F5] h-full">
      <div className="max-w-6xl w-full  mb-7 mx-auto">
        {" "}
        {/* Centering the content */}
        <h1 className="text-left text-blue-600  text-4xl font-bold">
          Talent Selection
        </h1>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-6xl  p-10 bg-white shadow-2xl rounded-xl">
          <div className="flex w-full justify-between">
            <h1 className="text-xl font-bold">Screening Tools</h1>
            <Button className="bg-blue-600 text-white " variant="outline">
              Customize Tools
            </Button>
          </div>

          <div className="grid grid-cols-2 mt-7 gap-5">
            <div className="flex flex-col gap-5 p-5  rounded-xl">
              <p className="text-md">
                These screening tools help you evaluate candidates efficiently
                and make informed hiring decisions. Our selection of tools
                allows you to assess technical skills, soft skills, and cultural
                fit for your project requirements.
              </p>
              <p className="text-md">
                Select from our range of screening tools to create a
                comprehensive evaluation process tailored to your specific
                needs. Track candidate performance and compare results easily.
              </p>
            </div>

            <div className="flex p-5 flex-col gap-5 bg-slate-100 rounded-xl">
              <div className="flex flex-col gap-3 justify-center ">
                <p className="text-md ">
                  <span className="text-blue-600 text-xl">•</span> Evaluate
                  technical skills with coding assessments
                </p>
                <p className="text-md">
                  <span className="text-blue-600 text-xl">•</span> Assess soft
                  skills with situational questions
                </p>
                <p className="text-md">
                  <span className="text-blue-600 text-xl">•</span> Create custom
                  screening questionnaires
                </p>
                <p className="text-md">
                  <span className="text-blue-600 text-xl">•</span> Compare
                  candidate performance side by side
                </p>
                <p className="text-md">
                  <span className="text-blue-600 text-xl">•</span> Reduce time
                  spent on technical interviews
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center ">
  <div className="max-w-6xl mt-7 pb-10 w-full grid grid-cols-3 gap-10 ">
    <div className="bg-white flex flex-col gap-3 p-5 border-2xl shadow-2xl border-t-4 border-blue-600 transition-transform duration-300 hover:-translate-y-2">
      <div className="p-5 bg bg-blue-100 w-[65px] rounded-lg ">
        <Laptop />
      </div>
      <h1 className="font-bold text-xl">Coding Assessment</h1>
      <p className="text-sm text-slate-500">
        Evaluate technical skills with language-specific coding challenges. Supports automated testing and plagiarism detection.
      </p>
      <Button className="bg-blue-700 text-white" variant="outline">
        Configure Test
      </Button>
    </div>
    <div className="bg-white flex flex-col gap-3 border-2xl shadow-2xl  p-5 border-t-4 border-blue-600 transition-transform duration-300 hover:-translate-y-2">
      <div className="p-5 bg-blue-100 w-[65px] rounded-lg ">
        <ClipboardList />
      </div>
      <h1 className="font-bold text-xl">Skill Questionnaire</h1>
      <p className="text-sm text-slate-500">
        Create custom questionnaires to assess specific skills. Includes templates for common roles and skill assessments.
      </p>
      <Button className="bg-blue-700 text-white" variant="outline">
        Create Questionnaires
      </Button>
    </div>
    <div className="bg-white flex flex-col border-2xl shadow-2xl  gap-3 p-5 border-t-4 border-blue-600 transition-transform duration-300 hover:-translate-y-2">
      <div className="p-5 bg bg-blue-100 w-[65px] rounded-lg ">
        <Drama />
      </div>
      <h1 className="font-bold text-xl">Personality Assessment</h1>
      <p className="text-sm text-slate-500">
        Evaluate candidate's work style, collaboration preferences, and cultural fit with standardized assessments.
      </p>
      <Button className="bg-blue-700 text-white" variant="outline">
        Select Assessment
      </Button>
    </div>

    <div className="bg-white flex flex-col border-2xl shadow-2xl  gap-3 p-5 border-t-4 border-blue-600 transition-transform duration-300 hover:-translate-y-2">
      <div className="p-5 bg bg-blue-100 w-[65px] rounded-lg ">
        <Search />
      </div>
      <h1 className="font-bold text-xl">Reference Check</h1>
      <p className="text-sm text-slate-500">
        Automated reference verification tool that collects insights from previous clients or employers through structured forms.
      </p>
      <Button className="bg-blue-700 text-white" variant="outline">
        Send References
      </Button>
    </div>

    <div className="bg-white flex flex-col border-2xl shadow-2xl  gap-3 p-5 border-t-4 border-blue-600 transition-transform duration-300 hover:-translate-y-2">
      <div className="p-5 bg bg-blue-100 w-[65px] rounded-lg ">
        <Target />
      </div>
      <h1 className="font-bold text-xl">Portfolio Review</h1>
      <p className="text-sm text-slate-500">
        Structured approach to evaluate candidate portfolios with customizable rubrics and evaluation criteria.
      </p>
      <Button className="bg-blue-700 text-white" variant="outline">
        Setup Review
      </Button>
    </div>

    <div className="bg-white flex flex-col border-2xl shadow-2xl  gap-3 p-5 border-t-4 border-blue-600 transition-transform duration-300 hover:-translate-y-2">
      <div className="p-5 bg bg-blue-100 w-[65px] rounded-lg ">
        <Video />
      </div>
      <h1 className="font-bold text-xl">Video Interview</h1>
      <p className="text-sm text-slate-500">
        Pre-recorded video interview platform with AI analysis of communication skills and presentation quality.
      </p>
      <Button className="bg-blue-700 text-white" variant="outline">
        Create Interview
      </Button>
    </div>
  </div>
</div>


      <div className="w-full flex justify-center pb-10">
        <div className="bg-white p-4 max-w-6xl flex flex-col gap-5 w-full rounded-lg shadow-2xl">
          <div className="flex justify-between">
            <h1 className="font-bold text-xl">Custom Screening Package</h1>
            <Button
              variant="outline"
              className="bg-blue-700 font-bold text-white"
            >
              Save Package
            </Button>
          </div>
          <div className="flex justify-between ">
            <div className="w-2/3 flex flex-col gap-4 mt-7">
              <h1 className="font-bold">Package Name</h1>
              <Input type="text" placeholder="e.g. Web Developer Assessment" />
            </div>
            <div className="flex flex-col bg-slate-100 p-4 pr-10 gap-2">
              <h1 className="font-bold text-xl">Package Summary</h1>
              <p className="text-sm text-slate-500">No tools selected</p>
              <div className="flex flex-col text-sm text-slate-500 ">
                <p>Estimated completion time: 0 min</p>
                <p>Estimated setup time: 0 min</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-bold">Select Tools</h1>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-100 p-3 flex gap-2">
                <input type="checkbox" id="codingAssessment" />
                <label htmlFor="codingAssessment">Coding Assessment</label>
              </div>
              <div className="bg-slate-100 p-3 flex gap-2">
                <input type="checkbox" id="skillQuestionnaire" />
                <label htmlFor="skillQuestionnaire">Skill Questionnaire</label>
              </div>
              <div className="bg-slate-100 p-3 flex gap-2">
                <input type="checkbox" id="personalityAssessment" />
                <label htmlFor="personalityAssessment">
                  Personality Assessment
                </label>
              </div>
              <div className="bg-slate-100 p-3 flex gap-2">
                <input type="checkbox" id="refrenceCheck" />
                <label htmlFor="refrenceCheck">Reference Check</label>
              </div>
              <div className="bg-slate-100 p-3 flex gap-2">
                <input type="checkbox" id="portfolioReview" />
                <label htmlFor="portfolioReview">Portfolio Review</label>
              </div>
              <div className="bg-slate-100 p-3 flex gap-2">
                <input type="checkbox" id="videoInterview" />
                <label htmlFor="videoInterview">Video Interview</label>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <Button variant="outline" className="font-bold">
              Reset
            </Button>
            <Button
              variant="outline"
              className="bg-blue-700 font-bold text-white"
            >
              Create Package
            </Button>
          </div>
        </div>
      </div>
      </div>
      <ClientFooter/>
      
    </div>
  );
};

export default ScreeningTools;
