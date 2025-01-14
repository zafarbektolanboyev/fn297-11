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
        {articles.length > 0 ? (
            articles.map((article, index) => (
              <div
                key={index}
                className="w-[400px] cursor-pointer p-5 bg-gray-200 rounded-md"
                // onClick={() => handleCardClick(article)} 
              >
                <h1 className="text-xl">Id: {article.id}</h1>
                <h1 className="text-3xl font-bold">Title: {article.title}</h1>
                
                <div>
                  <button
                    className="bg-red-600 py-2 px-5 rounded-md text-white text-xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpen(article);
                    }}
                  >
                    Edit
                  </button>
                
                
                </div>
              </div>
            ))
          ) : (
            <p className="text-xl text-gray-500">Hozircha hech qanday ma'lumot qushmadiz</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreatArticle;
