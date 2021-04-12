import React from 'react';

export default function LinkItem({link}) {
  return (
    <h6>
      {`<${link}>`}
    </h6>
  );
}
