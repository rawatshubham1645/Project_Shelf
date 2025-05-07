import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  X,
  Pickaxe,
  Calendar,
  Wrench,
  Youtube,
  Image,
  Target,
  Layers,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useMutation from "@/hooks/useMutation";
import uploadFiles from "@/hooks/uploadFiles";
import { CASE_STUDY } from "@/imports/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { showToast } from "@/utils/toast";

// Ensure all shadcn/ui components are properly imported

function CreateCaseStudies() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [toolsUsed, setToolsUsed] = useState([]);
  const [newTool, setNewTool] = useState("");
  const [outcomes, setOutcomes] = useState([]);
  const [newOutcome, setNewOutcome] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [themeId, setThemeId] = useState("");
  const { mutate, loading } = useMutation();

  const handleToolAdd = () => {
    if (newTool.trim()) {
      setToolsUsed([...toolsUsed, newTool.trim()]);
      setNewTool("");
    }
  };

  const handleOutcomeAdd = () => {
    if (newOutcome.trim()) {
      setOutcomes([...outcomes, newOutcome.trim()]);
      setNewOutcome("");
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const removeFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const removeTool = (index) => {
    setToolsUsed(toolsUsed.filter((_, i) => i !== index));
  };

  const removeOutcome = (index) => {
    setOutcomes(outcomes.filter((_, i) => i !== index));
  };

  const handleThemeChange = (value) => {
    setThemeId(value);
  };

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      toolsUsed,
      outcomes,
      themeId,
    };
    if (!themeId) {
      showToast.warn("Template type is required");
      return;
    }
    if (!selectedFiles.length) {
      showToast.warn("Please upload at least one case study image");
      return;
    }
    if (!formData.title) {
      showToast.warn("Case study name is required");
      return;
    }
    if (!formData.overview) {
      showToast.warn("Case study overview is required");
      return;
    }
    if (!formData.startTime) {
      showToast.warn("Case study start date is required");
      return;
    }
    if (!formData.endTime) {
      showToast.warn("Case study end date is required");
      return;
    }
    const fileResults = await uploadFiles(selectedFiles);
    if (fileResults?.length) {
      formData.mediaUrls = fileResults;
      const response = await mutate({
        url: CASE_STUDY,
        method: "POST",
        data: formData,
      });
      if (response?.success) {
        navigate(-1);
      }
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <div className="space-y-8">
        <div className="relative">
          {/* Decorative mining elements */}
          <div className="absolute -top-8 -left-8 w-16 h-16 bg-orange-100 rounded-full opacity-50"></div>
          <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-orange-200 rounded-full opacity-40"></div>

          <h1 className="text-3xl font-bold text-center mb-2 text-slate-800">
            Document New Case Study
          </h1>
          <p className="text-muted-foreground text-center">
            Record your case study details for your portfolio
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 bg-white p-6 rounded-xl shadow-md border border-orange-100"
        >
          <div className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="flex items-center gap-2 text-slate-700"
              >
                <Pickaxe size={16} className="text-orange-500" />
                Case Study Name
              </Label>
              <Input
                id="title"
                {...register("title", {
                  required: "Case study name is required",
                })}
                placeholder="Enter case study name"
                className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
              />
              {errors.title && (
                <p className="text-sm text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Overview */}
            <div className="space-y-2">
              <Label
                htmlFor="overview"
                className="flex items-center gap-2 text-slate-700"
              >
                <Layers size={16} className="text-orange-500" />
                Case Study Overview
              </Label>
              <Textarea
                id="overview"
                {...register("overview", {
                  required: "Case study overview is required",
                })}
                placeholder="Describe the case study details, geological features, and extraction methods"
                className="min-h-[150px] border-orange-200 focus:border-orange-500 focus:ring-orange-500"
              />
              {errors.overview && (
                <p className="text-sm text-destructive">
                  {errors.overview.message}
                </p>
              )}
            </div>

            {/* Timeline */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-orange-50 rounded-lg">
              <div className="space-y-2">
                <Label
                  htmlFor="startTime"
                  className="flex items-center gap-2 text-slate-700"
                >
                  <Calendar size={16} className="text-orange-500" />
                  Case Study Start Date
                </Label>
                <Input
                  id="startTime"
                  type="date"
                  {...register("startTime", {
                    required: "Start date is required",
                  })}
                  className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                />
                {errors.startTime && (
                  <p className="text-sm text-destructive">
                    {errors.startTime.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="endTime"
                  className="flex items-center gap-2 text-slate-700"
                >
                  <Calendar size={16} className="text-orange-500" />
                  Case Study End Date
                </Label>
                <Input
                  id="endTime"
                  type="date"
                  {...register("endTime", { required: "End date is required" })}
                  className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                />
                {errors.endTime && (
                  <p className="text-sm text-destructive">
                    {errors.endTime.message}
                  </p>
                )}
              </div>
            </div>

            {/* Tools Used */}
            <div className="space-y-4">
              <Label className="flex items-center gap-2 text-slate-700">
                <Wrench size={16} className="text-orange-500" />
                Case Study Equipment
              </Label>
              <div className="flex gap-2">
                <Input
                  value={newTool}
                  onChange={(e) => setNewTool(e.target.value)}
                  placeholder="Add equipment or tool"
                  className="flex-1 border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                />
                <Button
                  type="button"
                  onClick={handleToolAdd}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {toolsUsed.map((tool, index) => (
                  <div
                    key={index}
                    className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    <span>{tool}</span>
                    <button
                      type="button"
                      onClick={() => removeTool(index)}
                      className="hover:text-destructive"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* YouTube URL */}
            <div className="space-y-2">
              <Label
                htmlFor="youTubeUrl"
                className="flex items-center gap-2 text-slate-700"
              >
                <Youtube size={16} className="text-orange-500" />
                Case Study Footage (Optional)
              </Label>
              <Input
                id="youTubeUrl"
                {...register("youTubeUrl")}
                placeholder="Enter YouTube video URL of your case study"
                className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>

            {/* Media Upload */}
            <div className="space-y-4">
              <Label className="flex items-center gap-2 text-slate-700">
                <Image size={16} className="text-orange-500" />
                Case Study Imagery
              </Label>
              <div className="border-2 border-dashed border-orange-200 rounded-lg p-4 bg-orange-50">
                <p className="text-sm text-slate-600 mb-2">
                  Upload images of your case study
                </p>
                <Input
                  type="file"
                  onChange={handleFileChange}
                  multiple
                  accept="image/*"
                  className="mb-4"
                />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="relative group aspect-video bg-muted rounded-lg overflow-hidden"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Outcomes */}
            <div className="space-y-4">
              <Label className="flex items-center gap-2 text-slate-700">
                <Target size={16} className="text-orange-500" />
                Case Study Outcomes
              </Label>
              <div className="flex gap-2">
                <Input
                  value={newOutcome}
                  onChange={(e) => setNewOutcome(e.target.value)}
                  placeholder="Add a case study outcome"
                  className="flex-1 border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                />
                <Button
                  type="button"
                  onClick={handleOutcomeAdd}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  Add
                </Button>
              </div>
              <div className="space-y-2">
                {outcomes.map((outcome, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-orange-50 text-orange-800 rounded-lg border border-orange-200"
                  >
                    <span>{outcome}</span>
                    <button
                      type="button"
                      onClick={() => removeOutcome(index)}
                      className="hover:text-destructive"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="space-y-2 p-4 bg-orange-50 rounded-lg">
                <Label className="flex items-center gap-2 text-slate-700">
                  <Layers size={16} className="text-orange-500" />
                  Case Study Blueprint Type
                </Label>
                <Select
                  value={themeId}
                  onValueChange={(value) => handleThemeChange(value)}
                >
                  <SelectTrigger className="w-full border-orange-200 focus:border-orange-500 focus:ring-orange-500 bg-white">
                    <SelectValue placeholder="Select Blueprint" />
                    </SelectTrigger>
                  <SelectContent>
                    {[
                      { key: "Theme 1", value: "1" },
                      { key: "Theme 2", value: "2" },
                      { key: "Theme 3", value: "3" },
                    ].map((theme) => (
                      <SelectItem key={theme.value} value={theme.value}>
                        {theme.key}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-orange-100">
            <Button
              loading={loading}
              type="submit"
              className="w-10/12 bg-orange-600 hover:bg-orange-700"
            >
              Create Case
            </Button>
            <Button
              onClick={() => navigate(-1)}
              type="button"
              className="w-1.5/12 bg-slate-500 hover:bg-slate-600"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCaseStudies;
