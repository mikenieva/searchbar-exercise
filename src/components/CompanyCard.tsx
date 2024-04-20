import React from 'react';
import { Company } from '../interfaces';
import Button from './Elements/Button';

interface CompanyCardProps {
  company: Company;
  toggleStar: (id: string) => void;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company, toggleStar }) => {
  return (
    <ul className="bg-white rounded-sm">
      <li key={company.name} className="flex flex-col gap-10 pt-12 sm:flex-row">
        <img
          className="aspect-[4/5] w-52 flex-none rounded-2xl object-cover"
          src={company.image || '/icons8-company-100.png'}
          alt=""
        />
        <div className="max-w-xl flex-auto">
          <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">
            {company.name}
          </h3>
          <p className="text-base leading-7 text-gray-600">
            {company.description}
          </p>
          <p className="mt-6 text-base leading-7 text-gray-600">
            {company.address.address1}
          </p>
          <p className="text-base leading-7 text-gray-600">
            {company.address.city}, {company.address.state}
          </p>
          <p className="text-base leading-7 text-gray-600">
            {company.address.postalCode}
          </p>

          <Button variant="base" onclickfn={() => toggleStar(company.id)}>
            Starred: {company.starred ? 'Yes' : 'No'}
          </Button>
        </div>
      </li>
    </ul>
  );
};

export default CompanyCard;
