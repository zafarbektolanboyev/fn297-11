import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import circlePlus from "../assets/circlePlus.svg";
import { useNavigate } from "react-router-dom";

function Home() {
  const [articles, setArticles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDesc, setEditedDesc] = useState("");
  const [comments, setComments] = useState({});

  const navigate = useNavigate();
  useEffect(() => {
    const savedArticles = JSON.parse(localStorage.getItem("articles")) || [];
    setArticles(savedArticles);
  }, []);
  function handleComment(articleId) {
    if (!comments[articleId]?.trim()) return;

    const updatedArticles = articles.map((article) => {
      if (article.id === articleId) {
        const updatedComments = article.comments || [];
        return {
          ...article,
          comments: [...updatedComments, comments[articleId]],
        };
      }
      return article;
    });

    setArticles(updatedArticles);
    localStorage.setItem("articles", JSON.stringify(updatedArticles));
    setComments({ ...comments, [articleId]: "" });
  }
  function handleCommentChange(articleId, value) {
    setComments({ ...comments, [articleId]: value });
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
              >
                <h1 className="text-xl">Id: {article.id}</h1>
                <h1 className="text-3xl font-bold">Title: {article.title}</h1>
                <input
                  type="text"
                  placeholder="Enter comment"
                  value={comments[article.id] || ''}
                  onChange={(e) => handleCommentChange(article.id, e.target.value)}
                  className="py-2 px-3 mt-3 mb-3 bg-gray-300 rounded-md"
                />
                {article.comments && article.comments.length > 0 && (
                  <div className="p-2 mt-3 rounded-md">
                    <h3 className="font-bold">Comments:</h3>
                    {article.comments.map((cmt, idx) => (
                      <li key={idx} className="text-gray-700">{cmt}</li>
                    ))}
                  </div>
                )}
                <div className="flex flex-row gap-5">
                  <button
                    className="bg-green-400 py-2 px-5 rounded-md text-white text-xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentArticle(article);
                      setEditedTitle(article.title);
                      setEditedDesc(article.desc);
                      setIsOpen(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                  className="bg-green-400 py-2 px-5 rounded-md text-white text-xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleComment(article.id);
                  }}
                >
                  Add Comment
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
            onClick={() => navigate('/creatarticle')}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
