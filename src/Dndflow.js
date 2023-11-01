import React, { useState, useRef } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Controls,
  Background,
  addEdge,
  removeElements,
  
} from "react-flow-renderer";



import Sidebar from "./Sidebar";
import clinetData from "./clientData.json";
import EditNodeModal from "./EditNodeModal";
import EditEdgeModal from "./EditEdgeModal";




const initialElements = [
  {
    id: "1",
    type: "input",
    data: { label: "input node" },
    sourcePosition: "right",
    targetPosition: "left",
    position: { x: 250, y: 5 }
  }
];

const generateNodesFromValueChain = (valuChain) => {
  const elements = [];
  const valueChainSize = Object.keys(valuChain).length;
  const firstNodeXPosition = window.innerWidth / valueChainSize;
  const firstNodeYPosition = window.innerHeight / valueChainSize;
  let positionIncreamentCount = 1;
  for (const valuChainItem in valuChain) {
    if (Object.hasOwnProperty.call(valuChain, valuChainItem)) {
      const element = valuChain[valuChainItem];
      const position = {
        x: firstNodeXPosition * positionIncreamentCount,
        y: firstNodeYPosition * positionIncreamentCount
      };
      positionIncreamentCount++;
      elements.push({
        id: valuChainItem,
        type: element.childOf ? "default" : "output",
        data: { label: element.label },
        position,
        sourcePosition: "right",
        targetPosition: "left"
      });
    }
  }
  return elements;
};

const generateEdgesFromValueChain = (valuChain) => {
  const elements = [];
  for (const valuChainItem in valuChain) {
    if (Object.hasOwnProperty.call(valuChain, valuChainItem)) {
      const element = valuChain[valuChainItem];
      if (element.childOf) {
        elements.push({
          id: `edge-${valuChainItem}-${element.childOf}`,
          source: valuChainItem,
          target: element.childOf,
          type: "smoothstep"
        });
      }
    }
  }
  return elements;
};

let id = 0;
const getId = () => `dndnode_${id++}`;


const arrowMarker = (
  <svg
    width="8px"
    height="8px"
    viewBox="-10 -10 20 20"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <marker
        id="arrow"
        markerWidth="8"
        markerHeight="8"
        refX="5"
        refY="5"
        orient="auto-start-reverse"
        markerUnits="strokeWidth"
      >
        <path d="M0 0 L0 10 L10 5 z" fill="#f00" />
      </marker>
    </defs>
  </svg>
);




const DnDFlow = () => {
  const [paneMoveable] = useState(false);
  const [panOnScroll] = useState(true);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);
  const [selectedNode, setSelectedNode] = useState(null);

  const [selectedEdge, setSelectedEdge] = useState(null);


  


  

  const onLoad = (_reactFlowInstance) => {
    setReactFlowInstance(_reactFlowInstance);

    // Set Nodes
    setElements((es) =>
      es.concat(generateNodesFromValueChain(clinetData.valueChain))
    );
    // Set Edges
    setElements((es) =>
      es.concat(generateEdgesFromValueChain(clinetData.valueChain))
    );
  };

  const onConnect = (params) => setElements((els) => addEdge(params, els));
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

 

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  // const onDrop = (event) => {
  //   event.preventDefault();

  //   const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
  //   const type = event.dataTransfer.getData("application/reactflow");
  //   const position = reactFlowInstance.project({
  //     x: event.clientX - reactFlowBounds.left,
  //     y: event.clientY - reactFlowBounds.top
  //   });
  //   const newNode = {
  //     id: getId(),
  //     type,
  //     position,
  //     sourcePosition: "right",
  //     targetPosition: "left",
  //     data: { label: `${type} node` }
  //   };

  //   setElements((es) => es.concat(newNode));
  // };


  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");
    const nodeLabel = event.dataTransfer.getData("application/reactflow-label");
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top
    });
    const newNode = {
      id: getId(),
      type,
      position,
      sourcePosition: "right",
      targetPosition: "left",
      data: { label: nodeLabel } // use the retrieved label here
    };

    setElements((es) => es.concat(newNode));
};


 

  const onNodeDoubleClick = (_, node) => {
    setSelectedNode(node);
  };

  const handleSave = (node, newLabel) => {
    setElements((prevElements) =>
      prevElements.map((el) => {
        if (el.id === node.id) {
          return {
            ...el,
            data: {
              ...el.data,
              label: newLabel,
            },
          };
        }
        return el;
      })
    );
    setSelectedNode(null);
  };

  const handleCloseModal = () => {
    setSelectedNode(null);
  };



  // const onNodeClick = (event, element) => {
  //   setSelectedNode(element);
  // };

  // const onDeleteNode = () => {
  //   const confirmation = window.confirm("Are you sure you want to delete this node?");
  //   if (confirmation) {
  //     const newElements = elements.filter(el => el.id !== selectedNode.id);
  //     setElements(newElements);
  //     setSelectedNode(null);  // Clear selected node after deleting
  //   }
  // };


  const onDeleteNode = (node) => {
    const newElements = elements.filter(el => el.id !== node.id);
    setElements(newElements);
    setSelectedNode(null); // Clear selected node after deleting
  };


  //edge related code 

  const onEdgeDoubleClick = (_, edge) => {
    setSelectedEdge(edge);
  };
  
  const handleEdgeSave = (edge, newLabel) => {
    setElements((prevElements) =>
      prevElements.map((el) => {
        if (el.id === edge.id) {
          return {
            ...el,
            label: newLabel,
          };
        }
        return el;
      })
    );
    setSelectedEdge(null);
  };
  
  const handleEdgeDelete = (edge) => {
    setElements((prevElements) => 
      prevElements.filter(el => el.id !== edge.id)
    );
    setSelectedEdge(null);
  };
  

  return (
    <div className="dndflow">
      
       {arrowMarker} 

        {selectedNode && (
        <EditNodeModal
          node={selectedNode}
          onSave={handleSave}
          onClose={handleCloseModal}
          onDelete={onDeleteNode}
        />
      )}


{selectedEdge && (
  <EditEdgeModal
    edge={selectedEdge}
    onSave={handleEdgeSave}
    onClose={() => setSelectedEdge(null)}
    onDelete={handleEdgeDelete}
  />
)}

      <ReactFlowProvider>
      <Sidebar />
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
           onEdgeDoubleClick={onEdgeDoubleClick}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
            paneMoveable={paneMoveable}
            panOnScroll={panOnScroll}
            snapToGrid={true}
            elements={elements}
            onNodeDoubleClick={onNodeDoubleClick}
          >

            <Controls />
            <Background variant="lines" />

          </ReactFlow>
         
          <button>Save</button>
        </div>
       
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
