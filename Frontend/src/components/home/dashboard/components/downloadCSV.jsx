import { Button } from "@/components/ui/button";
import { DASHBOARD_EXPORT_CSV } from "@/imports/api";
import BACKEND_URL from "@/imports/baseUrl";
import { getToken } from "@/imports/localStorage";
import { FileSpreadsheet } from "lucide-react";
import React from "react";

function DownloadCSV({ formId }) {
  const handleDownload = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}${DASHBOARD_EXPORT_CSV}/${formId}`,
        {
          method: "GET",
          headers: {
            // Add auth headers if needed

            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to download file");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      // Optional: Set file name based on content-disposition or fallback
      const filename = "exported_file.xlsx";
      link.setAttribute("download", filename);

      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  return (
    <div>
      <Button
        onClick={handleDownload}
        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
      >
        <FileSpreadsheet className="w-4 h-4" />
        Export Excel
      </Button>
    </div>
  );
}

export default DownloadCSV;
