import React, { useCallback, useEffect, useState } from "react";

import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";

import {
  nodes as initialNodes,
  edges as initialEdges,
} from "./intinal-elements";
import CustomNode from "./CustomNode";

import "reactflow/dist/style.css";
import "./overview.css";
import { useRequestWithState } from "../../hooks/useRequest";
import { notification } from "antd";
import { memo } from 'react';
import SemesterNode from "./SemesterNode";

const nodeTypes = {
  custom: CustomNode,
  semester: SemesterNode,
};

const minimapStyle = {
  height: 120,
};

const onInit = (reactFlowInstance: any) =>
  console.log("flow loaded:", reactFlowInstance);

const OverviewFlow = () => {
  const initialNodesArray = initialNodes ?? []; // Use an empty array if initialNodes is null
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodesArray);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  const [subjectDetails, setSubjectDetails] = useState();
  const [subjectCombination, setSubjectCombination] = useState();
  // call api
  const { request, loading } = useRequestWithState();
  const [dataEntity, setDataEntity] = useState<any[]>([]);

  const loadData = async (props: any) => {
    await request(`/${props}`)
      .then((res) => {
        console.log(res.data);
        if (props == 'subjectDetails') {
          setSubjectDetails(res?.data);
          return;
        }

        if (props == 'subjectCombination') {
          setSubjectCombination(res?.data);
          return;
        }


      })
      .catch((err) =>
        notification.error({
          message: `Load ${props.entityName} failed`,
          description: err.message,
        })
      );
  };

  useEffect(() => {
    loadData("subjectDetails");
    loadData("subjectCombination");

  }, []);

  // we are using a bit of a shortcut here to adjust the edge type
  // this could also be done with a custom edge for example
  const edgesWithUpdatedTypes = edges.map((edge) => {
    if (edge.sourceHandle) {
      const customNode = nodes.find((node) => node.type === "custom");

      if (customNode) {
        const edgeType = customNode.data.selects
          ? customNode.data.selects[
              edge.sourceHandle as keyof typeof customNode.data.selects
            ]
          : undefined;
        edge.type = edgeType;
      } else {
        // Handle the case where no 'custom' node is found
        console.error("No 'custom' node found");
      }
    }

    return edge;
  });

  return (
    <ReactFlow
      nodes={nodes}
      edges={edgesWithUpdatedTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={onInit}
      fitView
      attributionPosition="top-right"
      nodeTypes={nodeTypes}
    >
      <MiniMap style={minimapStyle} zoomable pannable />
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};

export default memo(OverviewFlow);
