import React, { useState } from 'react';
import Header from '../components/Header';

function CreatArticle() {
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState('');
  const [poster, setPoster] = useState('');
  const [desc, setDesc] = useState('');

  function handleCreatArticle(e) {
    e.preventDefault();
    const newArticle = {
      title,
      poster,
      desc,
      id:Date.now()
    };
    const updatedArticles = [...articles, newArticle];
    setArticles(updatedArticles);
    localStorage.setItem('articles', JSON.stringify(updatedArticles));
    setTitle('');
    setPoster('');
    setDesc('');
  }

  return (
    <div>
      <Header />
      <div className='flex flex-col'>
        <form className='flex flex-col mx-auto mt-[100px]'>
          <input
            type="text"
            className='w-[400px] border bg-gray-300 p-3 rounded-md mb-2 text-white text-xl'
            placeholder='Enter Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className='w-[400px] border bg-gray-300 p-3 rounded-md mb-2 text-white text-xl'
            placeholder='Enter Poster'
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
          />
          <textarea
            className='w-[400px] border bg-gray-300 p-3 rounded-md mb-2 text-white text-xl'
            placeholder='Enter Description'
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <button
            className='w-[400px] border bg-blue-500 p-3 rounded-md mb-2 text-white text-xl'
            onClick={handleCreatArticle}
          >
            Create Article
          </button>
        </form>
        <div className='mt-5 flex flex-row flex-wrap flex-2 justify-between mx-auto gap-[30px]'>
          {articles.length === 0 ? (
            <p className='text-center text-xl'>No articles yet</p>
          ) : (
            articles.map((article, index) => (
              <div
                key={index}
                className='border p-4 w-[500px] rounded-md mb-3 bg-gray-100'
              >
                <h3 className='text-2xl font-bold'>{article.title}</h3>
                <p className='text-lg'>{article.desc}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default CreatArticle;
