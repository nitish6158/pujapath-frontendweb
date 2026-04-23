import BlogCard from '../components/BlogCard';
import SectionHeader from '../components/SectionHeader';

function BlogsPage({ blogs, onBook, t, text }) {
  return (
    <section className="page-section media-section blog-band page-screen">
      <SectionHeader title={t('sectionBlogs')}>{t('latestBlogs')}</SectionHeader>
      <div className="blog-grid">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            item={blog}
            onBook={(item) => onBook(item, 'blog')}
            t={t}
            text={text}
          />
        ))}
      </div>
    </section>
  );
}

export default BlogsPage;
