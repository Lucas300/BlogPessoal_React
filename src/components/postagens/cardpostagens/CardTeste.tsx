import { GithubLogo, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react";
import React from "react";


type BlogCardProps = {
  author: string;
  date: string;
  imageUrl: string;
  title: string;
  tag: string;
  subtitle: string;
  paragraphs: string[];
  pointTitle: string;
  pointText: string;
};

export const BlogCard: React.FC<BlogCardProps> = ({
  author,
  date,
  imageUrl,
  title,
  tag,
  paragraphs,
}) => {
  return (
    <div className="bg-gray-900 text-white max-w-3xl mx-auto rounded-lg shadow-lg overflow-hidden border border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-4">
          {/* Imagem de perfil */}
          <img
            src="https://conteudo.imguol.com.br/c/entretenimento/15/2019/02/07/cena-de-guardioes-da-galaxia-vol-2-1549560714572_v2_1x1.png"
            alt="Perfil"
            className="w-10 h-10 rounded-full object-cover border border-gray-600"
          />
          <div>
            <h2 className="font-semibold text-lg">{author}</h2>
            <p className="text-sm text-gray-400">{date}</p>
          </div>
        </div>
        {/* Redes sociais */}
        <div className="flex gap-4">
          <a
            href="https://www.linkedin.com/in/lucas-daniel-souza-dias/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 transition"
          >
            <LinkedinLogo size={32} weight="bold" />
          </a>
          <a
            href="https://github.com/Lucas300"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-200 hover:text-gray-400 transition"
          >
            <GithubLogo size={32} weight="bold" />
          </a>
        </div>
      </div>

      {/* Image */}
      <div className="relative">
        <img src={imageUrl} alt="Capa" className="w-full h-56 object-cover" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-gray-400 text-sm">#{tag}</p>

        <div className="bg-gray-800 p-4 rounded-lg mt-2">
          <h4 className="font-bold">{paragraphs.map((p, idx) => (
            <p key={idx} className="text-gray-200">
              {p}
            </p>
          ))}</h4>

        </div>
      </div>
    </div>
  );
};
