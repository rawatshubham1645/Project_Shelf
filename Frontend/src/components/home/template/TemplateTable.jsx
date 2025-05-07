import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import TemplatePreview from "./preview/TemplatePreview";
import {
  Shovel,
  Hammer,
  Mountain,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Gem,
} from "lucide-react";

function TemplateTable({ caseStudy }) {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(
    caseStudy?.themeId || "1"
  );
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handlePreview = (templateId) => {
    navigate(`/home/templates/preview/${templateId}`, { state: caseStudy });
  };

  const handleTemplateChange = (value) => {
    setSelectedTemplate(value);
    setIsSelectOpen(false);
  };

  const blueprints = [
    {
      id: "1",
      name: "Template 1",
      icon: <Mountain className="w-5 h-5" />,
      description:
        "A refined layout with elegant spacing to showcase precious findings",
      color: "from-orange-500 to-amber-500",
      darkColor: "from-orange-600/80 to-amber-500/80",
      bgLight: "bg-gradient-to-r from-orange-50 to-amber-50",
      bgDark: "bg-gradient-to-r from-orange-900/20 to-amber-900/20",
      accent: "border-orange-300 dark:border-orange-700",
      gem: <Gem className="w-6 h-6 text-orange-500 dark:text-orange-400" />,
    },
    {
      id: "2",
      name: "Template 2",
      icon: <Hammer className="w-5 h-5" />,
      description:
        "A structured design with bold sections for impactful presentations",
      color: "from-amber-500 to-yellow-500",
      darkColor: "from-amber-600/80 to-yellow-500/80",
      bgLight: "bg-gradient-to-r from-amber-50 to-yellow-50",
      bgDark: "bg-gradient-to-r from-amber-900/20 to-yellow-900/20",
      accent: "border-amber-300 dark:border-amber-700",
      gem: <Gem className="w-6 h-6 text-amber-500 dark:text-amber-400" />,
    },
    {
      id: "3",
      name: "Template 3",
      icon: <Shovel className="w-5 h-5" />,
      description:
        "A detailed layout with rich visuals for comprehensive exploration",
      color: "from-yellow-500 to-orange-500",
      darkColor: "from-yellow-600/80 to-orange-500/80",
      bgLight: "bg-gradient-to-r from-yellow-50 to-orange-50",
      bgDark: "bg-gradient-to-r from-yellow-900/20 to-orange-900/20",
      accent: "border-yellow-300 dark:border-yellow-700",
      gem: <Gem className="w-6 h-6 text-yellow-500 dark:text-yellow-400" />,
    },
  ];

  const currentBlueprint =
    blueprints.find((bp) => bp.id === selectedTemplate) || blueprints[0];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="relative">
        {/* Background decorative elements */}
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-orange-500/5 dark:bg-orange-500/10 rounded-full filter blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-10 w-80 h-80 bg-amber-500/5 dark:bg-amber-500/10 rounded-full filter blur-3xl pointer-events-none"></div>

        <div className="space-y-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg transform -rotate-6 mr-3">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-200 tracking-tight">
                Case Study{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                  Blueprints
                </span>
              </h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select a premium blueprint design to showcase your excavation
              results and findings with style and impact
            </p>
          </div>

          {/* Custom select dropdown */}
          <div className="max-w-md mx-auto mb-8">
            <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
              <Gem className="h-4 w-4 text-orange-500" />
              <span>Select Your Blueprint Style:</span>
            </div>
            <div className="relative">
              <div
                className={`w-full h-14 px-4 flex items-center justify-between rounded-lg border-2 ${currentBlueprint.accent} bg-white dark:bg-slate-800/90 cursor-pointer transition-all hover:shadow-md`}
                onClick={() => setIsSelectOpen(!isSelectOpen)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full bg-gradient-to-r ${currentBlueprint.color} flex items-center justify-center`}
                  >
                    {currentBlueprint.icon}
                  </div>
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {currentBlueprint.name}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-orange-500 transition-transform duration-300 ${
                    isSelectOpen ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* Dropdown options */}
              {isSelectOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 rounded-lg border border-orange-200 dark:border-orange-800/30 bg-white dark:bg-slate-800 shadow-lg z-20 overflow-hidden">
                  {blueprints.map((blueprint) => (
                    <div
                      key={blueprint.id}
                      className={`flex items-center gap-3 p-4 cursor-pointer transition-colors hover:bg-orange-50 dark:hover:bg-orange-900/20 ${
                        selectedTemplate === blueprint.id
                          ? "bg-orange-100 dark:bg-orange-900/30"
                          : ""
                      }`}
                      onClick={() => handleTemplateChange(blueprint.id)}
                    >
                      <div
                        className={`w-8 h-8 rounded-full bg-gradient-to-r ${blueprint.color} flex items-center justify-center`}
                      >
                        {blueprint.icon}
                      </div>
                      <div>
                        <div className="font-medium text-slate-800 dark:text-slate-200">
                          {blueprint.name}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {blueprint.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Selection highlight card */}
          <div
            className={`rounded-xl overflow-hidden border-2 ${currentBlueprint.accent} ${currentBlueprint.bgLight} dark:${currentBlueprint.bgDark} p-5 mb-8 relative`}
          >
            <div className="absolute top-0 right-0 bottom-0 w-32 overflow-hidden opacity-10 pointer-events-none">
              <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-amber-500 rotate-45 transform translate-x-8 -translate-y-4"></div>
            </div>

            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-lg bg-gradient-to-br ${currentBlueprint.color} flex items-center justify-center shadow-md`}
              >
                {currentBlueprint.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-orange-700 dark:text-orange-400 flex items-center gap-2">
                  {currentBlueprint.name} Blueprint
                  <Sparkles className="h-4 w-4 animate-pulse" />
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {currentBlueprint.description}
                </p>
              </div>
            </div>
          </div>

          {/* Preview section */}
          <Card
            className={`overflow-hidden border-2 ${currentBlueprint.accent} shadow-lg transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1`}
          >
            <div
              className={`h-2 bg-gradient-to-r ${currentBlueprint.color}`}
            ></div>
            <CardContent className="p-6 space-y-6">
              <div className="rounded-lg overflow-hidden border border-orange-200 dark:border-orange-800/30 shadow-md">
                <div className="relative">
                  {/* Overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none"></div>
                  <TemplatePreview
                    button={true}
                    preivewId={selectedTemplate}
                    caseStudy={caseStudy}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center">
                      {currentBlueprint.gem}
                      <span className="ml-2">
                        {currentBlueprint.name} Blueprint
                      </span>
                    </h2>
                    <p className="text-muted-foreground mt-1">
                      {currentBlueprint.description}
                    </p>
                  </div>

                  <div
                    className={`hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${currentBlueprint.color} dark:${currentBlueprint.darkColor} shadow-lg`}
                  >
                    {currentBlueprint.icon}
                  </div>
                </div>

                <Button
                  onClick={() => handlePreview(selectedTemplate)}
                  className={`flex-1 bg-gradient-to-r ${currentBlueprint.color} hover:scale-[1.02] hover:shadow-lg transition-all duration-300 text-white shadow-md group py-6`}
                >
                  <span className="mr-2">Inspect Blueprint</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Background mining patterns */}
          <div className="absolute bottom-0 right-0 opacity-5 dark:opacity-10 pointer-events-none">
            <svg
              width="240"
              height="240"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            >
              <path d="M14 6.5L17.5 10L13.5 14L21 21.5"></path>
              <path d="M4 4L11 11"></path>
              <path d="M10.5 16.5L14 20"></path>
              <path d="M16 7L5 18"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemplateTable;
