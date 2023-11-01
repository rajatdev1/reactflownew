import React from "react";



export default () => {
  // const onDragStart = (event, nodeType) => {
  //   event.dataTransfer.setData("application/reactflow", nodeType);
  //   event.dataTransfer.effectAllowed = "move";
  // };

  const onDragStart = (event, nodeType, nodeLabel) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("application/reactflow-label", nodeLabel); // set label
    event.dataTransfer.effectAllowed = "move";
  };
  


  return (

    
    <aside className="sidebar">
      <div className="description">
       <h2>Welcome to Hive connect Flow</h2>
      </div>
      <div
        className="dndnode input"
        // onDragStart={(event) => onDragStart(event, "input")}
        onDragStart={(event) => onDragStart(event, "input", "Start Node")}

        draggable
      >
        Start Node
      </div>



      <div
        className="dndnode"
        // onDragStart={(event) => onDragStart(event, "default")}
        onDragStart={(event) => onDragStart(event, "default", "Request Creation")}

        draggable
      >
       Request Creation
      </div>


      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "default", 'Vendor Alloctaion ')}
        draggable
      >
       Vendor Alloctaion 
      </div>


      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "default", 'Estimate')}
        draggable
      >
        Estimate
      </div>


      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "default", 'P.O')}
        draggable
      >
        P.O
      </div>

      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "default", 'Installation')}
        draggable
      >
     Installation
      </div>


      


      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, "output", ' End Node')}
        draggable
      >
        End Node
      </div>
    </aside>
   
  );
};
