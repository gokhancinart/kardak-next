import { getAllPosts, getPostBySlug } from '../../lib/posts';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Post({ post }) {
  const router = useRouter();
  const { t } = useTranslation('common');
  const locale = router.locale;

  return (
    <div className="p-6">
      <Head>
        <title>{post.title[locale]}</title>
        <meta name="description" content={post.excerpt[locale]} />
      </Head>
      <div className="container mx-auto">
        <Image
          src={post.image}
          alt={post.title[locale]}
          width={800}
          height={400}
          className="w-full h-auto mb-4 rounded-lg"
        />
        <h1 className="text-kardak text-3xl font-bold">{post.title[locale]}</h1>
        <p className="text-gray-500 text-sm">{post.date}</p>
        <br />
        <div className="prose">
          <div dangerouslySetInnerHTML={{ __html: post.content[locale].replace(/\n/g, "<br/>") }} />
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths({ locales }) {
  const posts = getAllPosts();
  const paths = [];

  for (const locale of locales) {
    for (const post of posts) {
      paths.push({
        params: { slug: post.slug[locale] },
        locale
      });
    }
  }

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params, locale }) {
  const posts = getAllPosts();
  const post = posts.find(p => p.slug[locale] === params.slug);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      post
    }
  };
}