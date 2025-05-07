import useQuery from "@/hooks/useQuery";
import { USERS_DASHBOARD_DATA } from "@/imports/api";
import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, TrendingUp, Eye, Users, BarChart3 } from "lucide-react";

// Sample data for development and testing
const sampleData = {
  totalViews: 86,
  uniqueViews: 65,
  caseStudyDataCount: [
    {
      uid: "db4329ce-b400-41c6-bc15-2847b95bc70b",
      id: 3,
      title: "Mobile App Redesign",
      totalViews: 0,
      uniqueViews: 0,
    },
    {
      uid: "a1f832de-d213-4af0-b859-93d9fbbc402e",
      id: 4,
      title: "UX Design Case Study",
      totalViews: 15,
      uniqueViews: 10,
    },
    {
      uid: "c9f329f4-482b-4199-a55b-47d5d8f8d100",
      id: 5,
      title: "Performance Optimization",
      totalViews: 32,
      uniqueViews: 24,
    },
    {
      uid: "f3bd8ea5-4a14-4659-879d-8e199f1b2c6e",
      id: 6,
      title: "Microservices Architecture",
      totalViews: 21,
      uniqueViews: 17,
    },
    {
      uid: "4d9c1e2c-e89e-41fa-92c6-f178d3c8dd47",
      id: 7,
      title: "Next.js Migration",
      totalViews: 18,
      uniqueViews: 14,
    },
  ],
};

// Updated colors to match orange theme
const TOTAL_VIEWS_COLOR = "#FF7E00"; // Primary orange
const UNIQUE_VIEWS_COLOR = "#FFA653"; // Lighter orange

function Dashboard() {
  const { data: apiData, loading } = useQuery(USERS_DASHBOARD_DATA);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [chartType, setChartType] = useState("bar"); // To toggle between bar and donut charts

  // Use API data if available, otherwise use sample data
  const data = apiData?.data?.data ?? sampleData;

  // Prepare data for combined bar chart
  const barChartData = useMemo(() => {
    return data?.caseStudyDataCount.map((study) => ({
      name:
        study.title.length > 15
          ? study.title.substring(0, 15) + "..."
          : study.title,
      totalViews: study.totalViews,
      uniqueViews: study.uniqueViews,
      fullTitle: study.title,
      id: study.id,
    }));
  }, [data]);

  // Prepare data for pie chart
  const pieChartData = useMemo(() => {
    return data?.caseStudyDataCount.map((study) => ({
      name:
        study.title.length > 15
          ? study.title.substring(0, 15) + "..."
          : study.title,
      value: study.totalViews,
      fullTitle: study.title,
      id: study.id,
    }));
  }, [data]);

  // Handle click on pie chart slice
  const handlePieClick = (data) => {
    setSelectedCaseStudy(data.id);
  };

  // Render custom label for the pie chart
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    name,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Updated pie chart colors to match orange theme
  const COLORS = ["#FF7E00", "#FFA653", "#FFB777", "#FFCB99", "#FFE0CC"];

  // Custom styles
  const legendStyle = {
    fontSize: "14px",
    fontWeight: 500,
    fontFamily: "system-ui, sans-serif",
  };

  // Custom tooltip for pie charts
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{`${payload[0].name}: ${payload[0].value}`}</p>
          {payload[0].percent !== undefined && (
            <p className="text-sm text-gray-600">{`${(
              payload[0].percent * 100
            ).toFixed(1)}% of total`}</p>
          )}
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for bar charts
  const BarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      // Get the total value for this category (sum of all bars for this x value)
      const totalValue = payload.reduce(
        (sum, entry) => sum + (entry.value || 0),
        0
      );

      return (
        <div className="bg-white p-4 rounded shadow-lg border border-gray-200">
          <p className="font-medium text-gray-700 mb-1">{label}</p>
          {payload.map((entry, index) => {
            const percentage =
              totalValue > 0
                ? ((entry.value / totalValue) * 100).toFixed(1)
                : 0;
            return (
              <div
                key={`tooltip-${index}`}
                className="flex justify-between items-center mb-1"
              >
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 mr-2"
                    style={{ backgroundColor: entry.fill || entry.color }}
                  ></div>
                  <span className="text-sm">{entry.name}:</span>
                </div>
                <span className="font-semibold ml-4">
                  {entry.value}{" "}
                  <span className="text-xs text-gray-500">({percentage}%)</span>
                </span>
              </div>
            );
          })}
          <div className="mt-2 pt-2 border-t border-gray-200">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Total:</span>
              <span>{totalValue}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom legend
  const renderColorfulLegendText = (value, entry) => {
    return (
      <span className="text-gray-800 font-medium">
        {value} ({entry.payload.value})
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading dashboard data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">Dashboard Analytics</h1>
        <p className="text-muted-foreground">
          Explore and extract insights from your case studies data
        </p>
      </div>

      {/* Two-column layout for Summary Cards and Combined Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Summary Cards - Left Column */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6 flex items-center space-x-4">
            <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900/30">
              <Eye className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Excavations
              </p>
              <h3 className="text-2xl font-bold">{data?.totalViews}</h3>
            </div>
          </Card>

          <Card className="p-6 flex items-center space-x-4">
            <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30">
              <Users className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Unique Prospectors
              </p>
              <h3 className="text-2xl font-bold">{data?.uniqueViews}</h3>
            </div>
          </Card>

          <Card className="p-6 flex items-center space-x-4">
            <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
              <BarChart3 className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Case Studies
              </p>
              <h3 className="text-2xl font-bold">
                {data?.caseStudyDataCount.length}
              </h3>
            </div>
          </Card>
        </div>

        {/* Combined Chart - Right Column */}
        <div className="lg:col-span-2">
          <Card className="p-6 h-full">
            <h2 className="text-xl font-semibold mb-6">
              Case Studies Overview
            </h2>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barChartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={70}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis />
                  <Tooltip content={<BarTooltip />} />
                  <Legend />
                  <Bar
                    dataKey="totalViews"
                    name="Total Excavations"
                    fill={TOTAL_VIEWS_COLOR}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="uniqueViews"
                    name="Unique Prospectors"
                    fill={UNIQUE_VIEWS_COLOR}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      {/* Distribution Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Resource Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={renderCustomizedLabel}
                  onClick={handlePieClick}
                >
                  {pieChartData?.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke={
                        selectedCaseStudy === entry.id ? "#000" : undefined
                      }
                      strokeWidth={
                        selectedCaseStudy === entry.id ? 2 : undefined
                      }
                      className="transition-all duration-300"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">
            Site Details
            {selectedCaseStudy &&
              `: ${
                data?.caseStudyDataCount.find((s) => s.id === selectedCaseStudy)
                  ?.title
              }`}
          </h2>

          {selectedCaseStudy ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-800/30">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Excavations
                  </p>
                  <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {data?.caseStudyDataCount.find(
                      (s) => s.id === selectedCaseStudy
                    )?.totalViews || 0}
                  </h3>
                </div>
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-800/30">
                  <p className="text-sm font-medium text-muted-foreground">
                    Unique Prospectors
                  </p>
                  <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                    {data?.caseStudyDataCount.find(
                      (s) => s.id === selectedCaseStudy
                    )?.uniqueViews || 0}
                  </h3>
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Click on different chart segments to view site details
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">
                Select a case study from the chart to view details
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Individual Case Study Charts with Tabs */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Individual Case Performance</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setChartType("bar")}
              className={`px-3 py-1 rounded transition-colors ${
                chartType === "bar"
                  ? "bg-orange-500 hover:bg-orange-600 text-white"
                  : "bg-orange-100 dark:bg-orange-900/30 hover:bg-orange-200 dark:hover:bg-orange-800/40 text-orange-700 dark:text-orange-300"
              }`}
            >
              Bar Chart
            </button>
            <button
              onClick={() => setChartType("donut")}
              className={`px-3 py-1 rounded transition-colors ${
                chartType === "donut"
                  ? "bg-orange-500 hover:bg-orange-600 text-white"
                  : "bg-orange-100 dark:bg-orange-900/30 hover:bg-orange-200 dark:hover:bg-orange-800/40 text-orange-700 dark:text-orange-300"
              }`}
            >
              Donut Chart
            </button>
          </div>
        </div>

        <Tabs
          defaultValue={data?.caseStudyDataCount?.[0]?.id.toString() || "0"}
          className="space-y-4"
        >
          <TabsList className="mb-6 overflow-x-auto flex w-full bg-orange-50 dark:bg-orange-900/10">
            {data?.caseStudyDataCount.map((study) => (
              <TabsTrigger
                key={study.id}
                value={study.id.toString()}
                className="min-w-max data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow"
              >
                {study.title.length > 20
                  ? study.title.substring(0, 20) + "..."
                  : study.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {data?.caseStudyDataCount.map((study) => (
            <TabsContent key={study.id} value={study.id.toString()}>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === "bar" ? (
                    <BarChart
                      data={[
                        {
                          name: "Metrics",
                          totalExcavations: study.totalViews,
                          uniqueProspectors: study.uniqueViews,
                        },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" hide />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="totalExcavations"
                        name="Total Excavations"
                        fill={TOTAL_VIEWS_COLOR}
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="uniqueProspectors"
                        name="Unique Prospectors"
                        fill={UNIQUE_VIEWS_COLOR}
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  ) : (
                    <PieChart>
                      <defs>
                        <linearGradient
                          id="colorTotal"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#FF7E00"
                            stopOpacity={1}
                          />
                          <stop
                            offset="100%"
                            stopColor="#FF9A40"
                            stopOpacity={1}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorUnique"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#FFA653"
                            stopOpacity={1}
                          />
                          <stop
                            offset="100%"
                            stopColor="#FFCB99"
                            stopOpacity={1}
                          />
                        </linearGradient>
                      </defs>
                      <Pie
                        data={[
                          {
                            name: "Total Excavations",
                            value: study.totalViews,
                          },
                          {
                            name: "Unique Prospectors",
                            value: study.uniqueViews,
                          },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={110}
                        paddingAngle={3}
                        dataKey="value"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${(percent * 100).toFixed(0)}%`
                        }
                        strokeWidth={2}
                        stroke="#ffffff"
                      >
                        <Cell key="cell-0" fill="url(#colorTotal)" />
                        <Cell key="cell-1" fill="url(#colorUnique)" />
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        formatter={renderColorfulLegendText}
                        layout="horizontal"
                        verticalAlign="bottom"
                        align="center"
                        iconType="circle"
                        iconSize={10}
                        wrapperStyle={legendStyle}
                      />
                    </PieChart>
                  )}
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-800/30">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Excavations
                  </p>
                  <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {study.totalViews}
                  </h3>
                </div>
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-800/30">
                  <p className="text-sm font-medium text-muted-foreground">
                    Unique Prospectors
                  </p>
                  <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                    {study.uniqueViews}
                  </h3>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Card>
    </div>
  );
}

export default Dashboard;
