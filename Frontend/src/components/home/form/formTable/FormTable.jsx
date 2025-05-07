import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "../../../ui/table";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { ChevronLeft, ChevronRight, Eye, Trash2, Copy } from "lucide-react";
import { API_FORMS, FORMS_PUBLIC } from "@/imports/api";
import useQuery from "@/hooks/useQuery";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { modifyField } from "../createForm/form.config";
import useMutation from "@/hooks/useMutation";

const ITEMS_PER_PAGE = 10;

// const DUMMY_DATA = Array.from({ length: 50 }, (_, i) => ({
//   id: `form-${i + 1}`,
//   title: `Sample Form ${i + 1}`,
//   status: ["open", "closed", "scheduled"][Math.floor(Math.random() * 3)],
//   responses: Math.floor(Math.random() * 100),
//   createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
//   lastModified: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
// }));

function FormTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchKey, setSearchKey] = useState("title"); // Default search by title
  const navigate = useNavigate();
  const { data, refetch, loading } = useQuery(API_FORMS);
  const { mutate } = useMutation();

  const filteredData = useMemo(() => {
    return data
      ? data?.data?.filter((form) =>
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  const copyUrl = (uid) => {
    console.log(uid, "pppppppppp");
    if (uid) {
      const url = `${window.location.origin}/form/${uid}`;
      navigator.clipboard.writeText(url);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center text-slate-500">
        <h3 className="text-lg font-semibold">Loading...</h3>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search forms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64"
          />
          <select
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm"
          >
            <option value="title">Title</option>
            <option value="status">Status</option>
          </select>
        </div>
        <div className="text-sm text-slate-500">
          Total Forms: {filteredData.length}
        </div>
        <Button onClick={() => navigate("create")}>
          <Plus className="h-4 w-4 mr-2" />
          Create Form
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Form Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Responses</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((form) => (
              <TableRow key={form.id}>
                <TableCell className="font-medium">{form.title}</TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium 
                    ${
                      form.status === "OPEN"
                        ? "bg-green-100 text-green-800"
                        : ""
                    }
                    ${form.status === "CLOSED" ? "bg-red-100 text-red-800" : ""}
                    ${
                      form.status === "SCHEDULED"
                        ? "bg-yellow-100 text-yellow-800"
                        : ""
                    }
                  `}
                  >
                    {form.status}
                  </div>
                </TableCell>
                <TableCell>{form?.responseCount || 0}</TableCell>
                <TableCell>{formatDate(form?.createdDate)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        navigate("preview", {
                          state: {
                            formFields: modifyField(form.fields) || [],
                            formSettings: {
                              title: form.title,
                              status: form.status,
                              uniqueUrl: form.uniqueUrl,
                              password: form.password,
                              webhookUrl: form.webhookUrl,
                            },
                          },
                        })
                      }
                    >
                      <Eye className="h-4 w-4" />
                    </Button>

                    <Button
                      onClick={() => copyUrl(form.uid)}
                      variant="ghost"
                      size="icon"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={async () => {
                        await mutate({
                          url: `${FORMS_PUBLIC}/${form.uid}`,
                          method: "DELETE",
                        });
                        refetch();
                      }}
                      variant="ghost"
                      size="icon"
                      className="text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredData.length > 0 ? (
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-500">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + ITEMS_PER_PAGE, filteredData.length)} of{" "}
            {filteredData.length} forms
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="icon"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center text-slate-500">
          <h3 className="text-lg font-semibold">No data found</h3>
          <p className="mt-1 text-sm text-slate-500">
            Try adjusting your search or filter to find results.
          </p>
        </div>
      )}
    </div>
  );
}

export default FormTable;
