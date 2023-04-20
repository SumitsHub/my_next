import Head from 'next/head'
import {getPosts} from '../services';
import {Categories, PostCard, PostWidget} from '../components'
// const posts = [
//   { title: 'React JS', excerpt: 'Learn React JS' },
//   { title: 'Next JS', excerpt: 'Learn Next JS' },
// ]

const Home = ({posts}) => {
  return (
    <div className="container mx-auto mb-8 px-10">
      <Head>
        <title>CMS Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className='lg:col-span-8 col-span-1'>
          {posts.map((post, index) => <PostCard key={index} post={post.node}/>)}
        </div>
        <div className='lg:col-span-4 col-span-1'>
          <div className='lg:sticky relative top-8'>
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: {posts}
  }
}
