import React from "react";
import { Company } from "../interfaces";

interface CompanyCardProps {
  company: Company;
  toggleStar: (id: string) => void;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company, toggleStar }) => {
  return (
    <article className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
      {company.image && (
        <figure>
          <img
            src={company.image}
            alt={company.name}
            className="w-20 h-20 object-cover rounded-full"
          />
          <figcaption className="sr-only">{company.name}</figcaption>
        </figure>
      )}
      <div>
        <h2 className="font-bold">{company.name}</h2>
        <p>{company.description}</p>
        <p>
          {company.address.city}, {company.address.state}
        </p>
        <button onClick={() => toggleStar(company.id)}>
          Starred: {company.starred ? "Yes" : "No"} {"(Click to toggle)"}
        </button>
      </div>
    </article>
  );
};

export default CompanyCard;
