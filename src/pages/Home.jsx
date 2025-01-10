import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import circlePlus from '../assets/circlePlus.svg';
import { useNavigate } from "react-router-dom";

function Home() {
  const [articles, setArticles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDesc, setEditedDesc] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedArticles = JSON.parse(localStorage.getItem('articles')) || [];
    setArticles(savedArticles);
  }, []);

  function handleOpen(article) {
    setCurrentArticle(article);
    setEditedTitle(article.title);
    setEditedDesc(article.desc);
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
    setCurrentArticle(null);
    setEditedTitle('');
    setEditedDesc('');
  }

  function handleSave() {
    const updatedArticles = articles.map((article) =>
      article.id === currentArticle.id
        ? { ...article, title: editedTitle, desc: editedDesc }
        : article
    );
    setArticles(updatedArticles);
    localStorage.setItem('articles', JSON.stringify(updatedArticles));
    handleClose();
  }

  function handleClick() {
    navigate('/creatarticle');
  }

  function handleCardClick(article) {
    navigate(`/articledetails/${article.id}`, { state: article });
  }

  return (
    <div>
      <Header></Header>
      <div className="flex flex-col">
        <div className="flex flex-row flex-wrap mx-auto gap-3 mt-[100px] mb-[50px]">
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <div
                key={index}
                className="w-[400px] cursor-pointer p-5 bg-gray-200 rounded-md"
                onClick={() => handleCardClick(article)} 
              >
                <h1 className="text-xl">Id: {article.id}</h1>
                <h1 className="text-3xl font-bold">Title: {article.title}</h1>
                <div>
                  <button
                    className="bg-green-400 py-2 px-5 rounded-md text-white text-xl"
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
            <p className="text-xl text-gray-500">Hozircha maqola yo'q.</p>
          )}
        </div>
        <div className="flex flex-row mx-auto items-center">
          <h1 className="text-2xl mx-auto">Maqola yaratish uchun bosing</h1>
          <img
            src={circlePlus}
            alt=""
            width={50}
            height={50}
            className="mx-auto cursor-pointer"
            onClick={handleClick}
          />
        </div>
      </div>

      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit article</h3>
            <form className="flex-col mt-5 flex">
              <input
                type="text"
                className="w-full border bg-gray-300 p-3 rounded-md mb-2 text-white text-xl"
                placeholder="Enter title"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <input
                type="text"
                className="w-full border bg-gray-300 p-3 rounded-md mb-2 text-white text-xl"
                placeholder="Enter description"
                value={editedDesc}
                onChange={(e) => setEditedDesc(e.target.value)}
              />
            </form>
            <div className="modal-action">
              <button onClick={handleSave} className="btn bg-blue-500 text-white">
                Save
              </button>
              <button onClick={handleClose} className="btn bg-red-500 text-white">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default Home;
