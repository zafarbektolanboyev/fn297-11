import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

function Home() {
  const [articles, setArticles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDesc, setEditedDesc] = useState('');
  const [newComment, setNewComment] = useState('');
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

  function handleAddComment(articleId) {
    const updatedArticles = articles.map((article) => {
      if (article.id === articleId) {
        const updatedComments = article.comments ? [...article.comments, newComment] : [newComment];
        return { ...article, comments: updatedComments };
      }
      return article;
    });
    setArticles(updatedArticles);
    localStorage.setItem('articles', JSON.stringify(updatedArticles));
    setNewComment('');
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

                {/* Comments Section */}
                <div className="mt-3">
                  <h4 className="text-lg font-semibold">Comments</h4>
                  {article.comments && article.comments.length === 0 ? (
                    <p className="text-sm italic">No comments</p>
                  ) : (
                    <ul className="list-disc list-inside">
                      {article.comments && article.comments.map((comment, id) => (
                        <li key={id} className="text-sm">
                          {comment}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-2">
                    <input
                      type="text"
                      className="border p-2 rounded-md w-full"
                      placeholder="Add a comment"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button
                      className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md"
                      onClick={() => handleAddComment(article.id)}
                    >
                      Add Comment
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xl text-gray-500">Hozircha hech qanday ma'lumot qushmadiz</p>
          )}
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
