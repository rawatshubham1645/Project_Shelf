import React from 'react'
import TemplateTable from '../template/TemplateTable'
import { useLocation, useParams } from 'react-router-dom';

function CaseStudyPreview() {
  const { templateId } = useParams();
  const {state}=useLocation();

  return (
   <TemplateTable preivewId={templateId} caseStudy={state}/>
  )
}

export default CaseStudyPreview