import { Calendar, User, Tag } from 'lucide-react';
import { newsArticles } from '../data/content';
import NewsletterForm from '../components/NewsletterForm';
import PaginatedList from '../components/PaginatedList';

type Article = typeof newsArticles[number];

export default function NewsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#0F172A' }}>
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/6759164/pexels-photo-6759164.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <p className="font-semibold text-sm uppercase tracking-wider mb-2" style={{ color: '#6eb7c7' }}>News & Updates</p>
          <h1 className="font-display font-bold text-white mb-6" style={{ fontSize: 'clamp(36px,5vw,56px)', color: '#ffffff' }}>
            Latest Updates
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: '#cbd5e1' }}>
            Stay informed about our programs, events, partnerships, and the impact we are making in communities across Nigeria.
          </p>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="card group mb-12">
            <div className="grid md:grid-cols-2">
              <div className="aspect-video md:aspect-auto overflow-hidden">
                <img
                  src={newsArticles[0].image}
                  alt={newsArticles[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                  <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full w-fit mb-4" style={{ backgroundColor: '#f0f9fb', color: '#3a8fa4' }}>
                  <Tag className="w-3 h-3" aria-hidden="true" />
                  {newsArticles[0].category}
                </span>
                <h2 className="text-2xl font-bold mb-3 transition-colors" style={{ color: '#0F172A', fontFamily: 'Poppins, system-ui, sans-serif' }}>
                  {newsArticles[0].title}
                </h2>
                <p className="leading-relaxed mb-4" style={{ color: '#374151' }}>{newsArticles[0].excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" aria-hidden="true" /> <time dateTime={newsArticles[0].date}>{new Date(newsArticles[0].date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time></span>
                  <span className="flex items-center gap-1"><User className="w-4 h-4" aria-hidden="true" /> {newsArticles[0].author}</span>
                </div>
              </div>
            </div>
          </article>

          {/* Articles Grid — PaginatedList gives keyboard/SR users a predictable
              page-based structure instead of relying on scroll position */}
          <PaginatedList<Article>
            items={newsArticles.slice(1)}
            pageSize={6}
            itemLabel="news articles"
            gridClassName="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            renderItem={(article) => (
              <article key={article.id} className="card group">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full mb-3" style={{ backgroundColor: '#f0f9fb', color: '#3a8fa4' }}>
                    <Tag className="w-3 h-3" aria-hidden="true" />
                    {article.category}
                  </span>
                  <h3 className="font-bold mb-2 line-clamp-2" style={{ color: '#0F172A', fontFamily: 'Poppins, system-ui, sans-serif', fontSize: '18px' }}>
                    {article.title}
                  </h3>
                  <p className="text-sm leading-relaxed line-clamp-3 mb-3" style={{ color: '#374151' }}>{article.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                      <time dateTime={article.date}>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" aria-hidden="true" />
                      {article.author}
                    </span>
                  </div>
                </div>
              </article>
            )}
          />
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#0F172A' }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">Stay in the Loop</h2>
          <p className="mb-8" style={{ color: '#94a3b8' }}>
            Subscribe to our newsletter and never miss an update on our programs, events, and impact stories.
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
