import React from "react";

interface StarredCountProps {
  count: number;
}

const StarredCount: React.FC<StarredCountProps> = ({ count }) => {
  return <p>Total Starred: {count}</p>;
};

export default StarredCount;
