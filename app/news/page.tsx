import { demoNews } from "@/lib/demo-data";

export default function NewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-violet-300">Technology updates</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Tech news</h1>
      </div>

      <div className="space-y-4">
        {demoNews.map((article) => {
          const published = article.publishedAt ?? "2025-08-12T00:00:00.000Z";

          return (
            <article key={article.title} className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="rounded-full bg-cyan-500/10 px-2 py-1 text-xs uppercase tracking-[0.18em] text-cyan-200">{article.category}</span>
                <span className="text-xs text-slate-400">{article.source}</span>
              </div>
              <h2 className="text-xl font-semibold text-white">{article.title}</h2>
              <p className="mt-3 text-slate-300">{article.description}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                <span>{new Date(published).toLocaleDateString()}</span>
                <a href={article.url} className="text-cyan-300">Read article</a>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
