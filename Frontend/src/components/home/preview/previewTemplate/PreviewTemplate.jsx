import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  ExternalLink,
  Facebook,
  Linkedin,
  Loader2,
  Mail,
  Twitter,
  Calendar,
  Wrench,
} from "lucide-react";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/features/user/userSlice";
import useQuery from "@/hooks/useQuery";
import { CASE_STUDIES_ME } from "@/imports/api";
import { useNavigate } from "react-router-dom";

const sampleData = {
  firstName: "sudhir",
  lastName: "shanu",
  email: "sudhir.yadav@quicktouch.co.in",
  displayName: "displayfrefwefwe",
  bio: "ewfewfwfwefefewfw",
  mobileNumber: "9512232323",
  profilePicUrl:
    "https://ecomm-dev-public.s3.ap-south-1.amazonaws.com/uploads/image%20%281%29%20%281%29.png",
  linkedinUrl: "http://localhost:3000/home",
  twitterUrl: "http://localhost:3000/home",
  facebookUrl: "http://localhost:3000/home",
  designation: null,
  address: "fwe",
  uniqueName: "hello",
  caseStudies: [
    {
      id: 2,
      uid: "db4329ce-b400-41c6-bc15-2847b95bc70a",
      title: "New Titleefefw",
      overview: "fweofwejf woj fowejf weoif jwefoiwef wefiowef",
      startTime: "2025-05-07",
      endTime: "2025-05-07",
      toolsUsed: ["fewkfjwfwef ow fjewo f"],
      outcomes: ["flwejf wefiowe jfw o"],
      mediaUrls: [
        "https://ecomm-dev-public.s3.ap-south-1.amazonaws.com/uploads/image%20%282%29.png",
      ],
      youTubeUrl: "fwfwe fjwoif we",
      themeId: "2",
      createdUserId: 1,
    },
    {
      id: 3,
      uid: "db4329ce-b400-41c6-bc15-2847b95bc70b",
      title: "wofijwe oif jwef",
      overview: "fwefwjfoi wefoweijf we",
      startTime: "2025-05-04",
      endTime: "2025-05-04",
      toolsUsed: ["fweof wj"],
      outcomes: ["fewfiwejf owef"],
      mediaUrls: [
        "https://ecomm-dev-public.s3.ap-south-1.amazonaws.com/uploads/image%20%281%29%20%281%29.png",
        "https://ecomm-dev-public.s3.ap-south-1.amazonaws.com/uploads/fac57885-1084-4c26-8e3a-a9ff14fed96a.png",
      ],
      youTubeUrl: "https://www.youtube.com/watch?v=lQpqgBU1Z3s",
      themeId: "1",
      createdUserId: 1,
    },
  ],
};

export function MineralBlueprint({ data = sampleData, template }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  // Function to handle navigation (simplified for demo)
  const navigate = useNavigate();

  // Handle nested data structure
  const profileData = data?.displayName ? data : data?.user || {};
  const caseStudiesData = data?.caseStudies || [];

  // Format date for mining operations
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 text-slate-800">
      {/* Header with mineral-themed styling */}
      <header className="pt-20 pb-12 px-6 relative">
        {/* Decorative mineral elements */}
        <div className="absolute top-12 left-12 w-16 h-16 bg-orange-100 rounded-full opacity-40 blur-md"></div>
        <div className="absolute bottom-4 right-20 w-20 h-20 bg-orange-200 rounded-full opacity-30 blur-md"></div>

        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profile Image with mineral border */}
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-orange-200 shadow-lg relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100/40 to-transparent mix-blend-overlay"></div>
              <img
                src={
                  profileData?.profilePicUrl ||
                  "https://via.placeholder.com/300x300?text=Profile"
                }
                alt={profileData?.displayName || "Lead Prospector"}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Profile Info */}
            <div className="text-center md:text-left">
              <div className="inline-block mb-3 px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                Mineral Prospector
              </div>
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-800 to-orange-800 bg-clip-text text-transparent">
                {profileData?.displayName}
              </h1>
              <p className="text-lg text-slate-600 mt-2 max-w-2xl">
                {profileData?.bio}
              </p>

              {/* Social Links */}
              <div className="flex gap-4 mt-4 justify-center md:justify-start">
                {profileData?.linkedinUrl && (
                  <a
                    href={profileData.linkedinUrl}
                    className="text-orange-400 hover:text-orange-600 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                )}
                {profileData?.twitterUrl && (
                  <a
                    href={profileData.twitterUrl}
                    className="text-orange-400 hover:text-orange-600 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter Profile"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.059 10.059 0 01-3.122 1.192 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                )}
                {profileData?.facebookUrl && (
                  <a
                    href={profileData.facebookUrl}
                    className="text-orange-400 hover:text-orange-600 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook Profile"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mining Sites Section */}
      <section className="py-12 px-6 bg-white/80 backdrop-blur-sm border-y border-orange-100">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center mb-8">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
              <svg
                className="w-4 h-4 text-orange-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Case Studies</h2>
          </div>

          {caseStudiesData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudiesData.map((study, index) => (
                <div
                  key={study.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-orange-100 group"
                  onMouseEnter={() => setHoveredCard(study.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Card Image with proper aspect ratio */}
                  <div className="relative h-52 overflow-hidden">
                    {/* Geological overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

                    <img
                      src={
                        study.mediaUrls?.[0] ||
                        "https://via.placeholder.com/800x450?text=Mining+Site"
                      }
                      alt={study.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out"
                      style={{
                        transform:
                          hoveredCard === study.id ? "scale(1.05)" : "scale(1)",
                      }}
                    />

                    {/* Excavation date tag */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-orange-800 shadow-sm z-20">
                      Created {formatDate(study.startTime)}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                      {study.overview}
                    </p>

                    <div className="flex justify-between items-center">
                      {/* Resource type indicator */}
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Case Study
                      </span>

                      <button
                        onClick={() =>
                          navigate(template ? study.uid : "case", {
                            state: study,
                          })
                        }
                        className="flex items-center text-sm font-medium text-orange-600 hover:text-orange-800 transition-colors group/btn"
                      >
                        View Case
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-orange-50 rounded-lg border border-orange-100">
              <svg
                className="w-16 h-16 text-orange-300 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
              <p className="text-lg text-orange-800 font-medium">
                No case studies discovered yet
              </p>
              <p className="text-orange-600 mt-2">
                Begin your excavation journey by adding case studies
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer with mining theme */}
      <footer className="py-10 px-6 text-center bg-gradient-to-t from-orange-50 to-white border-t border-orange-100">
        <div className="max-w-5xl mx-auto">
          <div className="inline-block mb-4 px-4 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
            Mineral Blueprint
          </div>
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()}{" "}
            {profileData?.displayName || "Mineral Prospector"} • All mining
            rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}

export function QuarryBlueprint({ data = sampleData, template }) {
  const [activeStudy, setActiveStudy] = useState(null);

  // Function to handle navigation (simplified for demo)
  const navigate = useNavigate();

  // Handle nested data structure
  const profileData = data?.displayName ? data : data?.user || {};
  const caseStudiesData = data?.caseStudies || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      {/* Hero Section with Bold Typography */}
      <header className="relative overflow-hidden">
        {/* Background Design Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-24 relative z-10">
          <div className="grid md:grid-cols-5 gap-12 items-center">
            {/* Profile Info - Takes 3 columns */}
            <div className="md:col-span-3 space-y-8">
              <div>
                <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500">
                  {profileData?.displayName}
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                  {profileData?.bio}
                </p>
              </div>

              {/* Contact & Social Links */}
              <div className="flex flex-wrap gap-4">
                {profileData?.email && (
                  <a
                    href={`mailto:${profileData.email}`}
                    className="group flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Contact</span>
                  </a>
                )}
                {profileData?.linkedinUrl && (
                  <a
                    href={profileData.linkedinUrl}
                    className="group flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {profileData?.twitterUrl && (
                  <a
                    href={profileData.twitterUrl}
                    className="group flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter className="w-4 h-4" />
                    <span>Twitter</span>
                  </a>
                )}
                {profileData?.facebookUrl && (
                  <a
                    href={profileData.facebookUrl}
                    className="group flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook className="w-4 h-4" />
                    <span>Facebook</span>
                  </a>
                )}
              </div>
            </div>

            {/* Profile Image - Takes 2 columns */}
            <div className="md:col-span-2 relative">
              <div className="aspect-square w-full max-w-md mx-auto relative">
                {/* Decorative rings */}
                <div className="absolute inset-0 border-4 border-orange-500/30 rounded-full animate-pulse"></div>
                <div className="absolute inset-4 border-4 border-amber-500/30 rounded-full animate-pulse animation-delay-500"></div>

                {/* Image Container */}
                <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-white/10">
                  <img
                    src={
                      profileData?.profilePicUrl ||
                      "https://via.placeholder.com/400x400?text=Profile"
                    }
                    alt={profileData?.displayName || "User Profile"}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Case Studies Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 inline-block pb-2 border-b-2 border-orange-500">
            Featured Work
          </h2>

          {caseStudiesData.length > 0 ? (
            <div className="space-y-32">
              {caseStudiesData.map((study, index) => (
                <div
                  key={study.id}
                  className={`flex flex-col ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } gap-12 items-center`}
                  onMouseEnter={() => setActiveStudy(study.id)}
                  onMouseLeave={() => setActiveStudy(null)}
                >
                  {/* Image Section */}
                  <div className="flex-1 group relative">
                    {/* Image Container with hover effects */}
                    <div className="relative rounded-lg overflow-hidden shadow-2xl">
                      {/* Background Gradient on Hover */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-t from-orange-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                      ></div>

                      {/* Main Image with Zoom Effect */}
                      <img
                        src={
                          study.mediaUrls?.[0] ||
                          "https://via.placeholder.com/800x450?text=Project+Image"
                        }
                        alt={study.title}
                        className="w-full aspect-video object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />

                      {/* Small Image Gallery (if there are multiple images) */}
                      {study.mediaUrls?.length > 1 && (
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {study.mediaUrls.slice(0, 3).map((url, imgIndex) => (
                            <div
                              key={imgIndex}
                              className="w-12 h-12 rounded border-2 border-white/50 overflow-hidden"
                            >
                              <img
                                src={url}
                                alt={`${study.title} thumbnail ${imgIndex + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                          {study.mediaUrls.length > 3 && (
                            <div className="w-12 h-12 rounded bg-black/50 border-2 border-white/50 flex items-center justify-center text-xs font-bold">
                              +{study.mediaUrls.length - 3}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* YouTube indicator if available */}
                    {study.youTubeUrl && (
                      <div className="absolute top-4 right-4 bg-orange-600 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                        <span>Video</span>
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 space-y-6">
                    {/* Date */}
                    <div className="text-sm text-orange-400 font-medium">
                      {new Date(study.startTime).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })}
                      {study.endTime &&
                        study.endTime !== study.startTime &&
                        ` - ${new Date(study.endTime).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                          }
                        )}`}
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-3xl font-bold mb-4 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500">
                        {study.title}
                      </h3>
                      <p className="text-slate-300 text-lg leading-relaxed">
                        {study.overview}
                      </p>
                    </div>

                    {/* Tools Used */}
                    {study.toolsUsed?.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm uppercase tracking-wider text-slate-400">
                          Tools & Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {study.toolsUsed.map((tool, toolIndex) => (
                            <span
                              key={toolIndex}
                              className="px-3 py-1 bg-white/10 text-orange-300 rounded-full text-sm backdrop-blur-sm"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Outcomes */}
                    {study.outcomes?.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm uppercase tracking-wider text-slate-400">
                          Key Outcomes
                        </h4>
                        <ul className="space-y-2">
                          {study.outcomes
                            .slice(0, 2)
                            .map((outcome, outIndex) => (
                              <li key={outIndex} className="flex items-start">
                                <span className="mr-2 mt-1 text-orange-400">
                                  •
                                </span>
                                <span>{outcome}</span>
                              </li>
                            ))}
                          {study.outcomes.length > 2 && (
                            <li className="text-orange-400">
                              + {study.outcomes.length - 2} more outcomes
                            </li>
                          )}
                        </ul>
                      </div>
                    )}

                    {/* View Button */}
                    <button
                      onClick={() =>
                        navigate(template ? study.uid : "case", {
                          state: study,
                        })
                      }
                      className="group flex items-center gap-2 mt-4 px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 rounded-full font-medium hover:from-orange-500 hover:to-amber-500 transition-all duration-300"
                    >
                      View Case Study
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-slate-400">No case studies found.</p>
              <p className="text-slate-500 mt-2">
                Add some case studies to showcase your work!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-xl font-bold">{profileData?.displayName}</h3>
            <p className="text-slate-400">
              {profileData?.designation || "Professional Portfolio"}
            </p>
          </div>

          <div className="flex gap-6">
            {profileData?.linkedinUrl && (
              <a
                href={profileData.linkedinUrl}
                className="text-slate-400 hover:text-orange-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {profileData?.twitterUrl && (
              <a
                href={profileData.twitterUrl}
                className="text-slate-400 hover:text-orange-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-5 h-5" />
              </a>
            )}
            {profileData?.facebookUrl && (
              <a
                href={profileData.facebookUrl}
                className="text-slate-400 hover:text-orange-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-5 h-5" />
              </a>
            )}
          </div>

          <div className="text-sm text-slate-400">
            © {new Date().getFullYear()} All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export function ExcavationBlueprint({ data = sampleData, template }) {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);

  // Format date to display Month Year
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  // Create timeline string from start and end dates
  const getTimeline = (study) => {
    if (!study.startTime || !study.endTime) return "";
    return `${formatDate(study.startTime)} - ${formatDate(study.endTime)}`;
  };

  // Handle nested data structure
  const profileData = data?.displayName ? data : data?.user || {};
  const caseStudiesData = data?.caseStudies || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-orange-50">
      {/* Decorative background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-orange-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-orange-100 rounded-full opacity-20 blur-3xl"></div>

        {/* Diagonal mining pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(135deg, #000 0, #000 1px, transparent 1px, transparent 12px)`,
          }}
        ></div>
      </div>

      {/* Content container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 md:px-8">
        {/* Excavation Site Master - Profile Header */}
        <div className="relative mb-24">
          <div className="absolute inset-0 -m-10 bg-gradient-to-r from-orange-100 to-transparent opacity-50 skew-y-3 rounded-3xl -z-10"></div>

          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 md:pr-12">
              <div className="inline-flex items-center px-3 py-1 mb-6 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                <svg
                  className="w-3 h-3 mr-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M12.7 2.7a1 1 0 00-1.4 0l-9 9a1 1 0 000 1.4l9 9a1 1 0 001.4 0l9-9a1 1 0 000-1.4l-9-9z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                EXCAVATION SITE MASTER
              </div>

              <h1 className="text-5xl md:text-7xl font-extralight tracking-tight text-slate-800 mb-6">
                {profileData?.displayName}
              </h1>

              <p className="text-lg text-orange-800/80 max-w-2xl leading-relaxed font-light">
                {profileData?.bio}
              </p>

              {/* Social Links */}
              {(profileData?.linkedinUrl ||
                profileData?.twitterUrl ||
                profileData?.facebookUrl) && (
                <div className="flex space-x-4 mt-8">
                  {profileData?.linkedinUrl && (
                    <a
                      href={profileData?.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-all hover:bg-orange-50 text-orange-500"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={18} />
                    </a>
                  )}
                  {profileData?.twitterUrl && (
                    <a
                      href={profileData?.twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-all hover:bg-orange-50 text-orange-500"
                      aria-label="Twitter"
                    >
                      <Twitter size={18} />
                    </a>
                  )}
                  {profileData?.facebookUrl && (
                    <a
                      href={profileData?.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-all hover:bg-orange-50 text-orange-500"
                      aria-label="Facebook"
                    >
                      <Facebook size={18} />
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Decorative diagonal mining element */}
            <div className="hidden md:block md:col-span-4 relative h-48">
              <div className="absolute right-0 top-0 w-full h-full bg-orange-200/30 rounded-lg transform -rotate-6"></div>
              <div className="absolute right-6 top-6 w-full h-full bg-white/80 backdrop-blur shadow-lg rounded-lg transform -rotate-6 overflow-hidden">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `repeating-linear-gradient(135deg, #ff8c00 0, #ff8c00 6px, transparent 6px, transparent 12px)`,
                  }}
                ></div>
                <div className="p-6 transform rotate-6">
                  <div className="font-mono text-xs text-orange-800/60 mb-2">
                    EXCAVATION BLUEPRINT
                  </div>
                  <div className="h-2 w-1/2 bg-orange-200 rounded-full mb-3"></div>
                  <div className="h-2 w-3/4 bg-orange-200 rounded-full mb-3"></div>
                  <div className="h-2 w-1/3 bg-orange-200 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mining Sites */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-12">
            <div className="h-px flex-grow bg-orange-200"></div>
            <h2 className="text-xl font-medium text-orange-800">
              CASE STUDIES
            </h2>
            <div className="h-px flex-grow bg-orange-200"></div>
          </div>

          {caseStudiesData.length > 0 ? (
            <div className="space-y-32">
              {caseStudiesData.map((study, index) => (
                <div
                  key={study.id}
                  className={`relative transition-all duration-500 ${
                    activeIndex === index ? "scale-[1.02]" : "scale-100"
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {/* Decorative angle */}
                  <div className="absolute inset-0 -m-6 transform -skew-y-2 bg-gradient-to-br from-orange-50 to-transparent opacity-80 rounded-xl -z-10"></div>

                  <div className="grid md:grid-cols-12 gap-8 relative">
                    {/* Image */}
                    <div
                      className={`md:col-span-7 ${
                        index % 2 === 0 ? "md:order-1" : "md:order-2"
                      }`}
                    >
                      <div className="relative rounded-xl overflow-hidden shadow-xl group">
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-orange-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end z-10">
                          <div className="w-full p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <p className="text-sm font-light opacity-90 mb-2">
                              {formatDate(study.startTime)}
                            </p>
                            <h3 className="text-xl font-semibold">
                              {study.title}
                            </h3>
                          </div>
                        </div>

                        {/* Main Image */}
                        {study.mediaUrls && study.mediaUrls.length > 0 ? (
                          <img
                            src={study.mediaUrls[0]}
                            alt={study.title}
                            className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                        ) : (
                          <div className="w-full h-[400px] bg-orange-100 flex items-center justify-center">
                            <svg
                              className="w-12 h-12 text-orange-300"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1"
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        )}

                        {/* Excavation site type indicator */}
                        <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-orange-800 shadow-sm z-20">
                          Excavation #{index + 1}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div
                      className={`md:col-span-5 flex flex-col justify-center ${
                        index % 2 === 0 ? "md:order-2" : "md:order-1"
                      }`}
                    >
                      <div className="space-y-6">
                        <h3 className="text-3xl font-light text-slate-800 tracking-tight">
                          {study.title}
                        </h3>

                        <div className="h-0.5 w-16 bg-orange-300"></div>

                        <p className="text-slate-600 leading-relaxed">
                          {study.overview}
                        </p>

                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} className="text-orange-500" />
                            <span>{getTimeline(study)}</span>
                          </div>

                          {study.toolsUsed && study.toolsUsed.length > 0 && (
                            <div className="flex items-center gap-1">
                              <Wrench size={14} className="text-orange-500" />
                              <span>{study.toolsUsed.length} tools</span>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() =>
                            navigate(template ? study.uid : "case", {
                              state: study,
                            })
                          }
                          className="inline-flex items-center gap-2 mt-2 px-6 py-2.5 bg-white border border-orange-200 rounded-lg text-orange-700 hover:bg-orange-50 hover:border-orange-300 transition-colors group/btn shadow-sm"
                        >
                          <span>View Excavation</span>
                          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="inline-block p-6 bg-white rounded-xl shadow-md border border-orange-100 mb-4">
                <svg
                  className="w-16 h-16 text-orange-300 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M8 4v12a2 2 0 002 2h12a2 2 0 002-2V8.342a2 2 0 00-.602-1.43l-4.44-4.342A2 2 0 0017.56 2H14a2 2 0 00-2 2v4.535A3.979 3.979 0 0112 10a4 4 0 104 4V8a1 1 0 00-1-1h-1"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-orange-800 mb-2">
                No Mining Sites Discovered
              </h3>
              <p className="text-orange-600/80">
                Begin your excavation journey by documenting your first site
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="pt-16 border-t border-orange-200/50">
          <div className="text-center">
            <div className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full mb-4">
              Excavation Blueprint
            </div>
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()}{" "}
              {profileData?.displayName || "Mining Operations"} • All excavation
              rights reserved
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

function PreviewTemplate() {
  const currentUser = useSelector(selectUser);

  const [activeTab, setActiveTab] = useState(currentUser?.templateId || "1");
  const [animate, setAnimate] = useState(false);
  const { data, loading } = useQuery(CASE_STUDIES_ME);

  if (loading) {
    return <Loader2 className="animate-spin text-orange-600 mx-auto" />;
  }

  const caseStudies = {
    user: currentUser,
    caseStudies: data?.data?.data,
  };

  const handleSelectChange = (e) => {
    setAnimate(true);
    setActiveTab(e.target.value);
    setTimeout(() => setAnimate(false), 500);
  };

  const getBlueprintDescription = () => {
    switch (activeTab) {
      case "1":
        return "Clean layout with pristine mineral formations and organized data veins";
      case "2":
        return "Robust structure with layered information and excavated highlights";
      case "3":
        return "Minimalist terrain with focused resource presentation and clear pathways";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50">
      <div className="container mx-auto py-8 space-y-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              {/* Small decorative gem icon */}
              <div className="absolute -left-6 top-1 w-4 h-4 bg-orange-300 rotate-45 opacity-70"></div>
              <h2 className="text-2xl font-bold text-slate-800">
                Select Template Blueprint
              </h2>
            </div>
            <p className="text-slate-600 mb-2">
              Choose the template strategy for your portfolio
            </p>

            <div className="relative w-full max-w-md">
              {/* Decorative elements */}
              <div className="absolute -left-6 -top-6 w-12 h-12 rounded-full bg-orange-100 opacity-70"></div>
              <div className="absolute -right-4 -bottom-4 w-8 h-8 rounded-full bg-orange-200 opacity-70"></div>
              <div className="absolute right-20 -top-4 w-6 h-6 rounded-full bg-orange-300 opacity-50"></div>

              <div className="relative bg-white/50 backdrop-blur-sm p-5 rounded-xl border-2 border-orange-200 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-orange-600 text-sm font-semibold">
                    Blueprint Type
                  </span>
                  <span className="text-orange-600 text-sm font-semibold">
                    Template
                  </span>
                </div>

                <select
                  value={activeTab}
                  onChange={handleSelectChange}
                  className="w-full p-3 pl-5 pr-10 text-base font-medium rounded-lg appearance-none bg-orange-50 border-2 border-orange-300 text-slate-800 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 shadow-md"
                >
                  <option value="1">Theme 1</option>
                  <option value="2">Theme 2</option>
                  <option value="3">Theme 3</option>
                </select>
                <div className="pointer-events-none absolute right-6 bottom-[18px] flex items-center px-3 text-orange-500">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                <div className="mt-3 text-sm text-slate-600 italic bg-orange-50 p-2 rounded-md border border-orange-100">
                  {getBlueprintDescription()}
                </div>
              </div>
            </div>
          </div>

          <div
            className={`transition-opacity duration-300 ${
              animate ? "opacity-0" : "opacity-100"
            }`}
          >
            <TabsContent
              value="1"
              className="outline-none ring-0 focus:outline-none focus:ring-0"
            >
              <MineralBlueprint data={caseStudies} />
            </TabsContent>

            <TabsContent
              value="2"
              className="outline-none ring-0 focus:outline-none focus:ring-0"
            >
              <QuarryBlueprint data={caseStudies} />
            </TabsContent>

            <TabsContent
              value="3"
              className="outline-none ring-0 focus:outline-none focus:ring-0"
            >
              <ExcavationBlueprint data={caseStudies} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

export default PreviewTemplate;
