import Menu from "../components/menu/menu";
import React, { useEffect, useState } from "react";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { service } from "../api/services";
import { IArticle } from "../interfaces";
import { ReactComponent as BackIcon } from "../assets/back_icon.svg";

const InfoItemPage = () => {
  const { id } = useParams();

  const [article, setArticle] = useState<IArticle | null>();

  const navigate = useNavigate();

  useEffect(() => {
    id &&
      service.getArticleItem(id).then((res) => {
        setArticle(res.data);
      });
  }, [id]);

  return (
    <div className={"h-svh bg-white relative"}>
      <header className={"flex justify-center min-h-[30px] p-2"}>
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="absolute left-2 active:opacity-[0.8] w-[24px] h-[24px]"
        >
          <BackIcon />
        </button>

        <h2 className={"text-[#222] font-bold text-[20px]"}>
          {article?.title}
        </h2>
      </header>

      <article className={"p-2"}>{article?.description}</article>

      <Menu />
    </div>
  );
};

export default InfoItemPage;
