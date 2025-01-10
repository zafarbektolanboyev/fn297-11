import React from "react";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";

function ArticleDetail() {
  const location = useLocation();
  const { state } = location;
  return (
    <div>
      <Header></Header>
      <div className='w-[400px] className="w-[400px] cursor-pointer p-5 mx-auto mt-[100px] bg-gray-200 rounded-md'>
        <h1 className="text-3xl">Id:{state?.id}</h1>
        <h1 className="text-3xl">Title:{state?.title}</h1>
        <h1 className="break-words "><span className="text-3xl font-medium">Description</span>:{state?.desc}</h1>
      </div>
    </div>
  );
}

export default ArticleDetail;
