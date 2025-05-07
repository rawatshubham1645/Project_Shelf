import useQuery from "@/hooks/useQuery";
import React from "react";
import { useParams } from "react-router-dom";
import { PUBLIC_PORTFOLIO } from "@/imports/api";
import {
  CreativeTemplate,
  MineralBlueprint,
  QuarryBlueprint,
} from "../home/template/preview/TemplatePreview";
import { Loader2 } from "lucide-react";

function CaseStudy() {
  const { id, caseId } = useParams();
  const { data, loading } = useQuery(`${PUBLIC_PORTFOLIO}/${id}/${caseId}`);
  console.log(data, "caseId");
  if (loading || !data) {
    return <Loader2 />;
  }
  const templateData = data?.data?.data;
  const TemplateComponent = {
    1: MineralBlueprint,
    2: QuarryBlueprint,
    3: CreativeTemplate,
  };
  const Component = TemplateComponent[templateData?.themeId ?? "2"];

  return (
    <div className="min-h-auto bg-background py-12">
      <Component data={templateData} />
    </div>
  );
}

export default CaseStudy;
