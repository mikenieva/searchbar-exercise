import React from 'react';

interface Button {
  children: React.ReactNode;
  variant: string;
  onclickfn: () => void;
}

export default function Button({ children, variant, onclickfn }: Button) {
  const selectVariant = (variant: string) => {
    switch (variant) {
      case 'base':
        return 'mt-8 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50';

      default:
        return '';
    }
  };

  const selectedVariant = selectVariant(variant);

  return (
    <button type="button" className={selectedVariant} onClick={onclickfn}>
      {children}
    </button>
  );
}
