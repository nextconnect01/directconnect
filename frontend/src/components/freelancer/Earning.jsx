import React from "react";
import Navbar from "../shared/Navbar";
import { ArrowUp, Dot, Eye, File, Pencil, Plus, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import FreelancersFooter from "./FreelancersFooter";

const Earning = () => {
  const arr = [1,2,3,4,5,6,7]
  return (
    <div className="w-full h-full pt-5">
      <Navbar />
      <div className="pb-5 w-full min-h-screen  h-full bg-[#F5F5F5] ">
        <div className="w-full flex justify-center ">
          <div className="mt-7 flex  justify-between w-full max-w-6xl ">
            <h1 className="font-bold text-2xl">Transaction Management</h1>
            {/* <Button variant="outline" className="bg-blue-600 transition-transform duration-300 hover:-translate-y-2 text-white p-4">
              <Plus /> Add Transaction
            </Button> */}
          </div>
        </div>
        <div className="w-full flex justify-center ">
          <div className="w-full max-w-6xl grid grid-cols-4 gap-5 mt-7">
            <div className="shadow-2xl transition-transform duration-300 hover:-translate-y-2 border-b-4 border-blue-600 rounded-xl bg-white flex flex-col gap-4 p-5 ">
              <h1 className="text-slate-500">Total Transactions</h1>
              <h1 className="font-bold text-2xl">0</h1>

              <div className="bg-slate-200 p-2 w-3/4 rounded-2xl text-blue-600 flex gap-2 ">
                <ArrowUp />
                <p className="text-sm">0% from last month</p>
              </div>
            </div>

            <div className="shadow-2xl rounded-xl transition-transform duration-300 hover:-translate-y-2 border-b-4 border-pink-600 bg-white flex flex-col gap-4 p-5 ">
              <h1 className="text-slate-500">Pending Amount</h1>
              <h1 className="font-bold text-2xl">0</h1>

              <div className="bg-slate-200 p-2 w-3/4 rounded-2xl text-pink-600 flex gap-2 ">
                <ArrowUp />
                <p className="text-sm">0% from last month</p>
              </div>
            </div>

            <div className="shadow-2xl transition-transform duration-300 hover:-translate-y-2 rounded-xl border-b-4 border-green-600 bg-white flex flex-col gap-4 p-5 ">
              <h1 className="text-slate-500">Completed Payments</h1>
              <h1 className="font-bold text-2xl">0</h1>

              <div className="bg-slate-200 p-2 w-3/4 rounded-2xl text-green-600 flex gap-2 ">
                <ArrowUp />
                <p className="text-sm">0% from last month</p>
              </div>
            </div>

            <div className="shadow-2xl transition-transform duration-300 hover:-translate-y-2 border-b-4 border-red-600 rounded-xl bg-white flex flex-col gap-4 p-5 ">
              <h1 className="text-slate-500">Overdue Payments</h1>
              <h1 className="font-bold text-2xl">0</h1>

              <div className="bg-slate-200 p-2 w-3/4 rounded-2xl text-red-600 flex gap-2 ">
                <ArrowUp />
                <p className="text-sm">0% from last month</p>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="w-full flex justify-center ">
          <div className="max-w-6xl mt-7 w-full bg-white shadow-2xl rounded-xl flex justify-between p-4">
            <div className="relative w-1/3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                className="rounded-xl pl-10 w-full"
                type="text"
                placeholder="Search Transactions..."
              />
            </div>

            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="allStatus">All Status</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Date : Last 30 Days" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last30">Date : Last 30 Days</SelectItem>
                  <SelectItem value="thisMonth">Date : This Month</SelectItem>
                  <SelectItem value="lastMonth">Date : Last Month</SelectItem>
                  <SelectItem value="customRange">Date : Custom Range</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Amount : All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Amount : All</SelectItem>
                  <SelectItem value="daPendingrk">{`Amount < $1000`} </SelectItem>
                  <SelectItem value="Paid">{`Amount < $1000 - $5000`} </SelectItem>
                  <SelectItem value="Overdue">{`Amount > $5000`} </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div> */}

        <div className="w-full flex justify-center ">
          <div className="bg-slate-100 text-sm text-slate-600 p-4 mt-10 shadow-2xl rounded-lg w-full max-w-6xl grid grid-cols-7 gap-3">
            <h1>Transaction ID	</h1>
            <h1>Client Name	</h1>
            <h1>Service</h1>
            <h1>Date</h1>
            <h1>Amount</h1>
            <h1>Status	</h1>
            <h1>Actions
            </h1>
          </div>
          
          
        </div>
        <div className="w-full flex justify-center">
        {/* <div className="max-w-6xl w-full  mb-20 bg-white   ">
          {arr.map((item,index) => <div className="grid  p-4 grid-cols-7 hover:bg-slate-100 gap-4" key={index}>
          <h1>#TRX-2023-001	</h1>
            <h1>Karan Dalakoti	</h1>
            <h1>Software Developer Hiring	</h1>
            <h1>15 Mar 2025	</h1>
            <h1>$8,500.00	</h1>
            <div className=" text-green-600 flex justify-center items-center w-[70px] h-[40px]  bg-slate-200 rounded-xl">
            <Dot size={"20px"} />
            <h1 className="">Paid</h1>
            </div>
            <div className="flex gap-2 mt-2">
            <Eye className="cursor-pointer" size={"20px"} />
            <Pencil className="cursor-pointer" size={"20px"} />
            <File className="cursor-pointer" size={"20px"} />
            </div>
          </div>)}
        </div> */}
        </div>
      </div>
      <FreelancersFooter/>
    </div>
  );
};

export default Earning;
