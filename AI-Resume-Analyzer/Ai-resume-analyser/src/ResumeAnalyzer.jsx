import React, { useState, useCallback } from "react";
import {
  Upload,
  FileText,
  Brain,
  Target,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  XCircle,
  BarChart3,
  PieChart,
  Star,
  Award,
  Zap,
  Eye,
} from "lucide-react";

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Mock analysis function - in real app, this would call your backend API
  const analyzeResume = useCallback(async (fileContent) => {
    setLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock analysis results
    const mockAnalysis = {
      atsScore: 85,
      overallRating: 4.2,
      sections: {
        contact: { score: 95, status: "excellent" },
        summary: { score: 78, status: "good" },
        experience: { score: 88, status: "excellent" },
        skills: { score: 72, status: "good" },
        education: { score: 90, status: "excellent" },
        formatting: { score: 83, status: "good" },
      },
      skills: {
        technical: ["React", "JavaScript", "Python", "SQL", "AWS"],
        soft: ["Leadership", "Communication", "Problem Solving"],
        missing: ["Docker", "Kubernetes", "GraphQL", "TypeScript"],
      },
      keywords: {
        found: ["software engineer", "react", "javascript", "agile", "api"],
        missing: [
          "microservices",
          "devops",
          "cloud computing",
          "machine learning",
        ],
      },
      strengths: [
        "Strong technical background with modern web technologies",
        "Clear progression in career responsibilities",
        "Quantified achievements with specific metrics",
        "Good balance of technical and leadership skills",
      ],
      improvements: [
        "Add more industry-specific keywords for better ATS matching",
        "Include quantified results in earlier work experiences",
        "Consider adding relevant certifications or courses",
        "Optimize formatting for better readability",
      ],
      feedback: {
        summary:
          "Your resume demonstrates strong technical expertise and career progression. The quantified achievements are particularly impressive and show real impact. To enhance ATS compatibility, consider incorporating more industry-standard keywords naturally throughout your experience descriptions.",
        detailed: [
          {
            section: "Professional Summary",
            feedback:
              "Your summary effectively highlights your key strengths. Consider adding 2-3 more industry keywords to improve ATS scanning.",
            score: 78,
          },
          {
            section: "Work Experience",
            feedback:
              "Excellent use of quantified achievements! Your progression shows clear growth. Consider using more action verbs to start bullet points.",
            score: 88,
          },
          {
            section: "Technical Skills",
            feedback:
              "Good coverage of current technologies. Adding emerging skills like containerization would strengthen your profile.",
            score: 72,
          },
        ],
      },
    };

    setAnalysis(mockAnalysis);
    setLoading(false);
  }, []);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (
      uploadedFile &&
      (uploadedFile.type === "application/pdf" ||
        uploadedFile.type.includes("word"))
    ) {
      setFile(uploadedFile);

      // In a real app, you'd extract text from PDF/Word here
      const reader = new FileReader();
      reader.onload = (e) => {
        analyzeResume(e.target.result);
      };
      reader.readAsText(uploadedFile);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 85) return "text-green-600 bg-green-100";
    if (score >= 70) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "excellent":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "good":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default:
        return <XCircle className="w-5 h-5 text-red-600" />;
    }
  };

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Brain className="w-12 h-12 text-indigo-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">
                AI Resume Analyzer
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Get instant feedback, ATS scoring, and actionable insights
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Analyzing Your Resume
                </h3>
                <p className="text-gray-600">
                  Our AI is examining your resume for ATS compatibility, keyword
                  optimization, and professional feedback...
                </p>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="w-24 h-24 text-indigo-400 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Upload Your Resume
                </h2>
                <p className="text-gray-600 mb-8">
                  Upload your PDF or Word document to get comprehensive
                  AI-powered analysis
                </p>

                <label className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer font-semibold">
                  <FileText className="w-5 h-5 mr-2" />
                  Choose File
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4">
                    <Target className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-gray-800">ATS Scoring</h3>
                    <p className="text-sm text-gray-600">
                      Get compatibility scores for applicant tracking systems
                    </p>
                  </div>
                  <div className="text-center p-4">
                    <TrendingUp className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-gray-800">
                      Visual Analytics
                    </h3>
                    <p className="text-sm text-gray-600">
                      Interactive charts showing your resume strengths
                    </p>
                  </div>
                  <div className="text-center p-4">
                    <Brain className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-gray-800">AI Feedback</h3>
                    <p className="text-sm text-gray-600">
                      Detailed suggestions for improvement
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Brain className="w-10 h-10 text-indigo-600 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Resume Analysis Results
              </h1>
              <p className="text-gray-600">{file?.name}</p>
            </div>
          </div>
          <button
            onClick={() => {
              setAnalysis(null);
              setFile(null);
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Analyze New Resume
          </button>
        </div>

        {/* ATS Score Banner */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center mr-6">
                <span className="text-2xl font-bold text-white">
                  {analysis.atsScore}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  ATS Compatibility Score
                </h2>
                <p className="text-gray-600">
                  Your resume is well-optimized for applicant tracking systems
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <Star className="w-6 h-6 text-yellow-500 mr-1" />
              <span className="text-xl font-bold text-gray-800">
                {analysis.overallRating}/5.0
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-t-2xl shadow-lg border border-gray-200 border-b-0">
          <div className="flex space-x-8 px-6 py-4">
            {[
              { id: "overview", label: "Overview", icon: Eye },
              { id: "sections", label: "Section Analysis", icon: BarChart3 },
              { id: "keywords", label: "Keywords", icon: Target },
              { id: "feedback", label: "AI Feedback", icon: Brain },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-2xl shadow-lg p-6 border border-gray-200">
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-green-600" />
                  Key Strengths
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysis.strengths.map((strength, index) => (
                    <div
                      key={index}
                      className="flex items-start p-4 bg-green-50 rounded-lg"
                    >
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">{strength}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-blue-600" />
                  Areas for Improvement
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysis.improvements.map((improvement, index) => (
                    <div
                      key={index}
                      className="flex items-start p-4 bg-blue-50 rounded-lg"
                    >
                      <AlertCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">{improvement}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "sections" && (
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Section-by-Section Analysis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(analysis.sections).map(([section, data]) => (
                  <div
                    key={section}
                    className="p-6 border border-gray-200 rounded-xl"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-800 capitalize">
                        {section}
                      </h4>
                      {getStatusIcon(data.status)}
                    </div>
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Score</span>
                        <span className="font-semibold">{data.score}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${data.score}%` }}
                        ></div>
                      </div>
                    </div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getScoreColor(
                        data.score
                      )}`}
                    >
                      {data.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "keywords" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-green-700">
                  ✅ Keywords Found
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.keywords.found.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-orange-700">
                  ⚠️ Missing Keywords
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.keywords.missing.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Technical Skills
                  </h3>
                  <div className="space-y-2">
                    {analysis.skills.technical.map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center p-2 bg-blue-50 rounded"
                      >
                        <span className="text-blue-800">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Soft Skills
                  </h3>
                  <div className="space-y-2">
                    {analysis.skills.soft.map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center p-2 bg-purple-50 rounded"
                      >
                        <span className="text-purple-800">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "feedback" && (
            <div className="space-y-8">
              <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Brain className="w-6 h-6 mr-2 text-indigo-600" />
                  AI Summary Feedback
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {analysis.feedback.summary}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  Detailed Section Feedback
                </h3>
                <div className="space-y-6">
                  {analysis.feedback.detailed.map((item, index) => (
                    <div
                      key={index}
                      className="p-6 border border-gray-200 rounded-xl"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-semibold text-gray-800">
                          {item.section}
                        </h4>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(
                            item.score
                          )}`}
                        >
                          {item.score}%
                        </span>
                      </div>
                      <p className="text-gray-700">{item.feedback}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
