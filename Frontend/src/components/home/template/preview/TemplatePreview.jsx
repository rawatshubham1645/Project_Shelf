import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Link2,
  CheckCircle2,
  PenTool,
  SkipBackIcon,
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  Play,
  ChevronDown,
  ChevronLeft,
  Wrench,
  Code,
  Zap,
  BarChart3,
  Youtube,
  Award,
  Eye,
} from "lucide-react";

// Sample data for preview
const sampleData =  {
  "id": 1,
  "uid": "5b203e34-853a-419d-8e28-0cf2ecb38a18",
  "title": "Apple Tv Clone",
  "overview": "This is a clone of Apple Tv+, which includes Apple Original films and series-which are original shows and movies made exclusively for Apple.",
  "startTime": "2025-05-06",
  "endTime": "2025-05-07",
  "toolsUsed": [
      "React.js",
      "React Router",
      "Java",
      "SpringBoot",
      "Postgres"
  ],
  "outcomes": [
    "40% increase in conversion rate",
    "Reduced page load time by 60%",
    "Improved user satisfaction score by 45%",
    ],
  "mediaUrls": [
      "https://ecomm-dev-public.s3.ap-south-1.amazonaws.com/uploads/Screenshot%202025-05-07%20at%202.43.47%E2%80%AFPM.jpg",
      "https://ecomm-dev-public.s3.ap-south-1.amazonaws.com/uploads/Screenshot%202025-05-07%20at%202.43.47%E2%80%AFPM.jpg",
      "https://ecomm-dev-public.s3.ap-south-1.amazonaws.com/uploads/Screenshot%202025-05-07%20at%202.43.47%E2%80%AFPM.jpg"

  ],
  "youTubeUrl": "https://www.youtube.com/watch?v=DNCnl8HYWzY&ab_channel=artificialintelligence",
  "themeId": "1",
  "totalViews": 4,
  "uniqueViews": 1,
  "createdUserId": 1
}

export function QuarryBlueprint({ data = sampleData }) {
 
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(data.mediaUrls);
  const [imageErrors, setImageErrors] = useState(Array(data.mediaUrls.length).fill(false));

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % data.mediaUrls.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + data.mediaUrls.length) % data.mediaUrls.length);
  };
  
  // Reset image states when data data changes
  
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const dataDuration = () => {
    if (data.startTime === data.endTime) {
      return formatDate(data.startTime);
    }
    return `${formatDate(data.startTime)} - ${formatDate(data.endTime)}`;
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
     
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">{data.title}</h1>
          <div className="flex items-center mt-2 text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{dataDuration()}</span>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2 relative">
            <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg aspect-video relative">
             
              
              {/* Show error state */}
              {imageErrors[currentImageIndex] && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="text-gray-500 flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p>Image could not be loaded</p>
                  </div>
                </div>
              )}
              
              <img 
                src={data.mediaUrls[currentImageIndex]} 
                alt={`data screenshot ${currentImageIndex + 1}`}
                className={`w-full h-full object-contain ${!imagesLoaded[currentImageIndex] ? 'opacity-0' : 'opacity-100'}`}
                // onLoad={() => handleImageLoad(currentImageIndex)}
                // onError={() => handleImageError(currentImageIndex)}
              />
              
              {/* Image Navigation */}
              {data.mediaUrls.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <button 
                    onClick={prevImage} 
                    className="bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 text-white transition z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={nextImage} 
                    className="bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 text-white transition z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              )}
            </div>
            
            {/* Pagination Indicators */}
            {data.mediaUrls.length > 1 && (
              <div className="flex justify-center space-x-2 mt-4 overflow-x-auto py-2">
                {data.mediaUrls.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentImageIndex ? "w-8 bg-blue-600" : "w-2 bg-gray-300"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
            
            {/* Overview */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
              <p className="text-gray-700 leading-relaxed">{data.overview}</p>
            </div>
          </div>

          {/* Right Column - data Details */}
          <div className="space-y-8">
            {/* YouTube Video Embed */}
            {data.youTubeUrl && (
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Demo Video</h2>
                  <a 
                    href={data.youTubeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    <span>YouTube</span>
                  </a>
                </div>
                <div className="w-full aspect-video overflow-hidden rounded-lg">
                  {(() => {
                    // Extract YouTube video ID from URL
                    const getYouTubeId = (url) => {
                      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                      const match = url.match(regExp);
                      return (match && match[2].length === 11) ? match[2] : null;
                    };
                    
                    const videoId = getYouTubeId(data.youTubeUrl);
                    
                    if (videoId) {
                      return (
                        <iframe
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/${videoId}`}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      );
                    } else {
                      // Fallback if YouTube URL is invalid
                      return (
                        <div className="flex items-center justify-center bg-gray-100 w-full h-full text-gray-500">
                          <div className="flex flex-col items-center">
                            <Play className="w-12 h-12 text-red-600 mb-2" />
                            <span>Invalid YouTube URL</span>
                          </div>
                        </div>
                      );
                    }
                  })()}
                </div>
              </div>
            )}

            {/* Tools Used */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center mb-4">
                <Wrench className="w-5 h-5 mr-2 text-gray-700" />
                <h2 className="text-xl font-semibold text-gray-900">Tech Stack</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.toolsUsed.map((tool, index) => (
                  <span 
                    key={index} 
                    className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Outcomes */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Outcomes</h2>
              <ul className="space-y-3">
                {data.outcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 bg-green-100 text-green-800 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Analytics</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{data.totalViews}</div>
                  <div className="text-sm text-gray-500">Total Views</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{data.uniqueViews}</div>
                  <div className="text-sm text-gray-500">Unique Visitors</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export function MineralBlueprint({ data = sampleData }) { const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(data.mediaUrls);
  const [imageErrors, setImageErrors] = useState(Array(data.mediaUrls.length).fill(false));
  const [activeTab, setActiveTab] = useState('overview');

  // Reset image states when project data changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [data.mediaUrls]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % data.mediaUrls.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + data.mediaUrls.length) % data.mediaUrls.length);
  };
  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const projectDuration = () => {
    if (data.startTime === data.endTime) {
      return formatDate(data.startTime);
    }
    return `${formatDate(data.startTime)} - ${formatDate(data.endTime)}`;
  };

  // Extract YouTube video ID from URL
  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  
  const videoId = getYouTubeId(data.youTubeUrl);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <ChevronRight className="w-4 h-4" /> },
    { id: 'tech', label: 'Tech Stack', icon: <Code className="w-4 h-4" /> },
    { id: 'outcomes', label: 'Outcomes', icon: <Zap className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 lassName="w-4 h-4" /> }
  ];

  return (
    <div className="bg-black text-white min-h-screen font-sans">
     
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center justify-between flex-col sm:flex-row">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{data.title}</h1>
              <div className="flex items-center text-gray-400">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{projectDuration()}</span>
              </div>
            </div>
            
            {data.youTubeUrl && (
              <a 
                href={data.youTubeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-4 sm:mt-0 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full flex items-center transition-colors duration-200"
              >
                <Play className="w-4 h-4 mr-2" />
                <span>Watch Demo</span>
              </a>
            )}
          </div>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-12">
          {/* Image Gallery */}
          <div className="relative">
            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl aspect-video relative">
              {/* Show loading state or fallback if image error */}
             
              
              <img 
                src={data.mediaUrls[currentImageIndex]} 
                alt={`data screenshot ${currentImageIndex + 1}`}
                className={`w-full h-full object-contain`}
              />
              
              {/* Image Navigation */}
              {data.mediaUrls.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <button 
                    onClick={prevImage} 
                    className="bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 text-white transition z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={nextImage} 
                    className="bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 text-white transition z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              )}
            </div>
            
            {/* Pagination Indicators */}
            {data.mediaUrls.length > 1 && (
              <div className="flex justify-center space-x-2 mt-4 overflow-x-auto py-2">
                {data.mediaUrls.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentImageIndex ? "w-8 bg-red-600" : "w-2 bg-gray-600"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Tabs Section */}
          <div className="bg-gray-900 rounded-xl overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-800">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 flex items-center whitespace-nowrap transition-colors duration-200 ${
                    activeTab === tab.id 
                      ? "text-red-500 border-b-2 border-red-500" 
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  {tab.icon}
                  <span className="ml-2">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">data Overview</h2>
                    <p className="text-gray-300 leading-relaxed">{data.overview}</p>
                  </div>
                  
                  {videoId && (
                    <div className="mt-8">
                      <h3 className="text-xl font-semibold mb-4">Demo Video</h3>
                      <div className="aspect-video w-full rounded-lg overflow-hidden">
                        <iframe
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/${videoId}`}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tech Stack Tab */}
              {activeTab === 'tech' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Technology Stack</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.toolsUsed.map((tool, index) => (
                      <div 
                        key={index} 
                        className="bg-gray-800 p-4 rounded-lg flex items-center"
                      >
                        <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center mr-4 flex-shrink-0">
                          <Code className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-gray-200">{tool}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Outcomes Tab */}
              {activeTab === 'outcomes' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">data Outcomes</h2>
                  <div className="space-y-4">
                    {data.outcomes.map((outcome, index) => (
                      <div 
                        key={index} 
                        className="bg-gray-800 p-4 rounded-lg flex items-center"
                      >
                        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mr-4 flex-shrink-0">
                          <Zap className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-gray-200">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Analytics Tab */}
              {activeTab === 'analytics' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Project Analytics</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-800 p-6 rounded-lg text-center">
                      <div className="text-5xl font-bold text-red-500 mb-2">{data.totalViews}</div>
                      <div className="text-gray-400">Total Views</div>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg text-center">
                      <div className="text-5xl font-bold text-red-500 mb-2">{data.uniqueViews}</div>
                      <div className="text-gray-400">Unique Visitors</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CreativeTemplate({ data = sampleData }) {
  const project = data;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const getYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const youtubeVideoId = getYouTubeVideoId(project.youTubeUrl);
  const youtubeEmbedUrl = youtubeVideoId ? `https://www.youtube.com/embed/${youtubeVideoId}` : null;
  
  // Function to handle next and previous image
  const handleNext = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === project.mediaUrls.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const handlePrev = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === 0 ? project.mediaUrls.length - 1 : prevIndex - 1
    );
  };
  
  // Format dates
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{project.title}</h1>
        <p className="text-lg text-gray-600">{project.overview}</p>
      </div>
      
      {/* Media Section */}
      <div className="mb-12">
        {/* Image Carousel */}
        <div className="mb-8 relative">
          <div className="bg-black rounded-lg overflow-hidden aspect-video relative">
            <img 
              src={project.mediaUrls[activeImageIndex]} 
              alt={`Project screenshot ${activeImageIndex + 1}`}
              className="w-full h-full object-contain"
            />
            
            {/* Navigation Controls */}
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <button 
                onClick={handlePrev}
                className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={handleNext}
                className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition"
                aria-label="Next image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* Image Indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {project.mediaUrls.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`w-2 h-2 rounded-full ${index === activeImageIndex ? 'bg-white' : 'bg-gray-400'}`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* YouTube Video */}
        {youtubeEmbedUrl && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Youtube className="mr-2 text-red-600" size={24} />
              Project Demo
            </h2>
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                className="w-full h-full"
                src={youtubeEmbedUrl}
                title="Project Video Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
      
      {/* Project Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Left Column */}
        <div>
          {/* Timeline */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Calendar className="mr-2 text-blue-600" size={20} />
              Timeline
            </h2>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="font-medium">{formatDate(project.startTime)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">End Date</p>
                  <p className="font-medium">{formatDate(project.endTime)}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tools Used */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Code className="mr-2 text-purple-600" size={20} />
              Technologies Used
            </h2>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex flex-wrap gap-2">
                {project.toolsUsed.map((tool, index) => (
                  <span 
                    key={index} 
                    className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column */}
        <div>
          {/* Key Outcomes */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Award className="mr-2 text-green-600" size={20} />
              Key Outcomes
            </h2>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <ul className="space-y-2">
                {project.outcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-800 text-sm font-medium mr-3">
                      {index + 1}
                    </span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Stats */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Eye className="mr-2 text-blue-600" size={20} />
              Project Stats
            </h2>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Total Views</p>
                  <p className="text-2xl font-bold">{project.totalViews}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Unique Visitors</p>
                  <p className="text-2xl font-bold">{project.uniqueViews}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="border-t border-gray-200 pt-4 flex justify-between items-center text-sm text-gray-500">
        <div>
          Project ID: {project.uid.substring(0, 8)}
        </div>
        <div className="flex items-center">
          <ExternalLink size={16} className="mr-1" />
          <a href={project.youTubeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            View on YouTube
          </a>
        </div>
      </div>
    </div>
  );
}

function TemplatePreview({ preivewId, caseStudy, button }) {
  const { templateId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const id = preivewId ?? templateId;

  // Choose template based on ID
  const TemplateComponent =
    {
      1: MineralBlueprint,
      2: QuarryBlueprint,
      3: CreativeTemplate,
    }[id] || QuarryBlueprint;

  return (
    <div className="min-h-screen bg-background py-12">
      {!button && (
        <Button className="w-1/4 bg-slate-600" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 pr-2" /> Back
        </Button>
      )}
      <div className="container mx-auto">
        <TemplateComponent data={caseStudy ?? state ?? sampleData} />
      </div>
    </div>
  );
}

export default TemplatePreview;
