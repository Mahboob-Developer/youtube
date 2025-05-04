'use client'

import { useState } from "react";

function Description({ description }) {
  const [more, setMore] = useState(false);

  return (
    <>
      {more ? (
        <>
          <span>{description}</span>  
          <a className="text-primary" onClick={() => setMore(false)} id="moreButton">
            ...less
          </a>
        </>
      ) : (
        <>
          <span>{description.slice(0, 200)}...</span> 
          <a className="text-primary" onClick={() => setMore(true)} id="moreButton">
            more
          </a>
        </>
      )}
    </>
  );
}

export default Description;
