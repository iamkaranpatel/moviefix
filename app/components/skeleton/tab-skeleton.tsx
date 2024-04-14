import React from "react";

const TabSkeleton = () => {
  return (
    <ul className={`tab-skeleton`}>
      {Array.from({ length: 15 }, (v, i) => (
        <li key={i} className="line"></li>
      ))}
    </ul>
  );
};

export default TabSkeleton;
