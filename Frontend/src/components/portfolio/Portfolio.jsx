import useQuery from "@/hooks/useQuery";
import React from "react";
import { useParams } from "react-router-dom";
import { PUBLIC_PORTFOLIO } from "@/imports/api";
import { Loader2 } from "lucide-react";
import {
  ExcavationBlueprint,
  MineralBlueprint,
  QuarryBlueprint,
} from "../home/preview/previewTemplate/PreviewTemplate";

function Portfolio() {
  const { id } = useParams();
  const { data, loading } = useQuery(`${PUBLIC_PORTFOLIO}/${id}`);
  console.log(data, loading, "data");

  if (loading || !data) {
    return <Loader2 />;
  }
  const TemplateComponent = {
    1: MineralBlueprint,
    2: QuarryBlueprint,
    3: ExcavationBlueprint,
  };
  const Component = TemplateComponent[data?.data?.data?.templateId ?? "1"];
  return (
    <div>
      <Component
        data={{ ...data?.data?.data, ...data?.data?.data?.user }}
        template
      />
    </div>
  );
}

export default Portfolio;
