// import React from 'react'

// const GRID_HEIGHT = 4;
// const GRID_WIDTH = 116;

// const DotGrid = () => {
//  const dots = [];
//  let index = 0;
 

//  for(let i = 0; i < GRID_WIDTH; i++){
//     for(let j = 0; j < GRID_HEIGHT; j++){
//         dots.push(
//             <div
//              className='group rounded-full p-[4px]'
//              data-index={index}
//              key={`${i}-${j}`}
//             >
//                 <div
//                  className='dot-point h-2 w-2 rounded-full bg-gradient-to-b from-slate-700 to-slate-400 opacity-10'
//                  data-index={index}
//                 />
//             </div>
//         );
//         index++;
//     }
//  }




//   return (
//     <div 
//      style={{gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)`}}
//      className='grid w-fit'
//     >
//      {dots}
//     </div>
//   )
// }

// export default DotGrid




import React from 'react';

const GRID_HEIGHT = 4;
const GRID_WIDTH = 116;

const DotGrid = () => {
  const dots = [];
  let index = 0;

  for (let i = 0; i < GRID_WIDTH; i++) {
    for (let j = 0; j < GRID_HEIGHT; j++) {
      dots.push(
        <div
          className="group rounded-full p-[1.6px]"
          data-index={index}
          key={`${i}-${j}`}
        >
          <div
            className="dot-point h-2 w-2 rounded-full bg-gradient-to-b from-slate-500 to-slate-400 opacity-10"
            data-index={index}
          />
        </div>
      );
      index++;
    }
  }

  return (
    <div className="w-full overflow-hidden">
      <div
        style={{ gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)` }}
        className="grid w-full"
      >
        {dots}
      </div>
    </div>
  );
};

export default DotGrid;
