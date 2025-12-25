"use client";

export default function RepoTechCard({ repo }) {
  if (!repo?.tech || repo.tech.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-gray-400">
        <h3 className="text-lg font-semibold">{repo.name}</h3>
        <p className="text-sm mt-2">
          No tech stack data available for this repository.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5 space-y-4">
      <div>
        <h3 className="text-lg font-semibold">{repo.name}</h3>
        {repo.description && (
          <p className="text-sm text-gray-400">{repo.description}</p>
        )}
      </div>

      {/* ✅ Tech stack list */}
      <div className="flex flex-wrap gap-2">
        {repo.tech.slice(0, 8).map((tech, index) => (
          <span
            key={`${tech}-${index}`}
            className="px-3 py-1 text-sm rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
