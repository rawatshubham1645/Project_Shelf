import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useMutation from "@/hooks/useMutation";
import useQuery from "@/hooks/useQuery";
import { CASE_STUDIES_ME, CASE_STUDY } from "@/imports/api";
import {
  ChevronLeft,
  ChevronRight,
  Edit2,
  Plus,
  Trash2,
  FileText,
  Calendar,
  Palette,
} from "lucide-react";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 10;

const searchKeyOptions = [
  { value: "title", label: "Title" },
  { value: "startTime", label: "Start Date" },
  { value: "endTime", label: "End Date" },
];

function CaseStudiesTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchKey, setSearchKey] = useState("title"); // Default search by title
  const navigate = useNavigate();
  const { data, refetch, loading } = useQuery(CASE_STUDIES_ME);
  const { mutate } = useMutation();

  const filteredData = useMemo(() => {
    const response = data?.data?.data;
    return response
      ? response?.filter((form) =>
          form[searchKey]
            .toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : [];
  }, [searchQuery, searchKey, data]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="h-12 w-12 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>
        <h3 className="mt-4 text-lg font-semibold text-orange-700">
          Loading data...
        </h3>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-orange-200 dark:border-orange-800/30">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
          Case Studies
        </h2>
        <Button
          onClick={() => navigate("create")}
          className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-md"
        >
          <Plus className="h-4 w-4 mr-2" />
Create
        </Button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <Input
            placeholder="Search case studies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-2 border-primary/70 bg-white shadow-md h-11 px-4 text-base focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all"

          />
          <select
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            className="h-10 rounded-md border border-orange-200 dark:border-orange-800/30 bg-white dark:bg-slate-800 px-3 text-sm"
          >
            {searchKeyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400 bg-orange-50 dark:bg-orange-900/10 px-3 py-1 rounded-full">
          Total Cases:{" "}
          <span className="font-semibold text-orange-600 dark:text-orange-400">
            {filteredData.length}
          </span>
        </div>
      </div>

      <div className="rounded-lg border border-orange-200 dark:border-orange-800/30 overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-orange-50 dark:bg-orange-900/10">
            <TableRow>
              <TableHead className="font-semibold text-orange-700 dark:text-orange-400">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Case Title
                </div>
              </TableHead>
              <TableHead className="font-semibold text-orange-700 dark:text-orange-400">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Start Date
                </div>
              </TableHead>
              <TableHead className="font-semibold text-orange-700 dark:text-orange-400">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  End Date
                </div>
              </TableHead>
              <TableHead className="font-semibold text-orange-700 dark:text-orange-400">
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Template
                </div>
              </TableHead>
              <TableHead className="text-right font-semibold text-orange-700 dark:text-orange-400">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((form) => (
                <TableRow
                  key={form.id}
                  className="hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors"
                >
                  <TableCell className="font-medium">{form.title}</TableCell>
                  <TableCell>
                    {new Date(form?.startTime).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(form?.endTime).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        form?.themeId === "1"
                          ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                          : form?.themeId === "2"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                      }`}
                    >
                      {form?.themeId === "1"
                        ? "Template 1"
                        : form?.themeId === "2"
                        ? "Template 2"
                        : "Template 3"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          navigate("edit", {
                            state: { caseStudy: form },
                          })
                        }
                        className="hover:bg-orange-100 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={async () => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this case study?"
                            )
                          ) {
                            await mutate({
                              url: `${CASE_STUDY}/${form.id}`,
                              method: "DELETE",
                            });
                            refetch();
                          }
                        }}
                        variant="ghost"
                        size="icon"
                        className="hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center text-slate-500">
                    <h3 className="text-lg font-semibold">
                      No case found
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Try adjusting your search parameters to find sites.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {filteredData.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Showing{" "}
            <span className="font-medium text-orange-600 dark:text-orange-400">
              {startIndex + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium text-orange-600 dark:text-orange-400">
              {Math.min(startIndex + ITEMS_PER_PAGE, filteredData.length)}
            </span>{" "}
            of{" "}
            <span className="font-medium text-orange-600 dark:text-orange-400">
              {filteredData.length}
            </span>{" "}
            case studies
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="border-orange-200 dark:border-orange-800/30 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400 disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="icon"
                onClick={() => handlePageChange(page)}
                className={
                  currentPage === page
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "border-orange-200 dark:border-orange-800/30 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400"
                }
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="border-orange-200 dark:border-orange-800/30 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400 disabled:opacity-50"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CaseStudiesTable;
