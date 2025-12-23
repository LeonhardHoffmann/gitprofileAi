"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown'; // Install using: npm install react-markdown

const RepoDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [repoData, setRepoData] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedData = localStorage.getItem('githubData');
    if (!savedData) {
      router.push('/');
      return;
    }

    const parsedData = JSON.parse(savedData);
    const currentRepo = parsedData.repos.find(r => r.name === params.repo);

    if (currentRepo) {
      setRepoData(currentRepo);
      fetchAIAnalysis(currentRepo, params.owner);
    } else {
      router.push('/projects');
    }
  }, [params.repo]);

  const fetchAIAnalysis = async (details, username) => {
    try {
      const res = await fetch('/api/analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoDetails: details, username }),
      });
      const result = await res.json();
      setAnalysis(result.analysis);
    } catch (err) {
      console.error("Analysis Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#f8fafc]">
      <div className="animate-pulse text-indigo-600 font-bold text-xl">AI is auditing ${params.repo}...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Repo Header */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8">
          <button onClick={() => router.back()} className="text-sm text-indigo-600 font-bold mb-4 flex items-center gap-1">
            ← Back to Projects
          </button>
          <h1 className="text-4xl font-black text-slate-900 mb-2">{repoData?.name}</h1>
          <p className="text-slate-500 text-lg mb-6">{repoData?.description}</p>
          <div className="flex flex-wrap gap-4">
            <span className="px-4 py-1.5 bg-slate-100 rounded-full text-sm font-bold text-slate-700">
              {repoData?.language}
            </span>
            <span className="px-4 py-1.5 bg-indigo-50 rounded-full text-sm font-bold text-indigo-600">
              ⭐ {repoData?.stars} Stars
            </span>
          </div>
        </div>

        {/* AI Report Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-indigo-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 bg-indigo-600 text-white text-xs font-black uppercase tracking-widest">
            AI AUDIT REPORT
          </div>
          
          <article className="prose prose-indigo max-w-none">
            {analysis ? (
              <ReactMarkdown>{analysis}</ReactMarkdown>
            ) : (
              <p className="text-red-500">Could not generate analysis. Please check your API Key.</p>
            )}
          </article>
        </div>
      </div>
    </div>
  );
};

export default RepoDetailPage;