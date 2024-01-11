import React from 'react';
import { MarkerType, MiniMap, Position } from 'reactflow';

interface NodeData {
  label: string;
  selects?: {
    'handle-0'?: string;
    'handle-1'?: string;
  };
  listSubjectDetails?: any;
}

interface Node {
  id: string;
  type?: string;
  data: NodeData;
  position: {
    x: number;
    y: number;
  };
  className?: string;
  style?: React.CSSProperties;
  sourcePosition?: Position;
  targetPosition?: Position;
  draggable?: boolean;
  selectable?: boolean;
}

export const nodes: Node[] = [
  // {
  //   id: '4',
  //   type: 'custom',
  //   position: { x: 100, y: 200 },
  //   data: {
  //     label: 'custom nodes',
  //     selects: {
  //       'handle-0': 'smoothstep',
  //       'handle-1': 'smoothstep',
  //     },
  //   },
  // },
  // {
  //   id: '5',
  //   type: 'output',
  //   data: {
  //     label: 'custom style',
  //   },
  //   className: 'circle',
  //   style: {
  //     background: '#2B6CB0',
  //     color: 'white',
  //   },
  //   position: { x: 400, y: 200 },
  //   sourcePosition: Position.Right,
  //   targetPosition: Position.Left,
  // },
  // {
  //   id: '6',
  //   type: 'output',
  //   style: {
  //     background: '#63B3ED',
  //     color: 'white',
  //     width: 100,
  //   },
  //   data: {
  //     label: 'Node',
  //   },
  //   position: { x: 400, y: 325 },
  //   sourcePosition: Position.Right,
  //   targetPosition: Position.Left,
  // },
  // {
  //   id: '7',
  //   type: 'default',
  //   className: 'annotation',
  //   data: {
  //     label: 'This is some notes for the diagram'
  //   },
  //   draggable: false,
  //   selectable: false,
  //   position: { x: 150, y: 400 },
  // },
  {
    id: '1',
    type: 'outlineSubject',
    position: { x: 400, y: 500 },
    data: {
      label: 'CÁC MÔN HỌC ĐẠI CƯƠNG',
      // listSubjectDetails: [
      //   {
      //     id: 1,
      //     title: 'Tư tưởng Hồ Chí Minh',
      //     theoryCredits: 2,
      //     practiseCredits: 1,
      //     totalCredits: 3,
      //   },
      //   {
      //     id: 2,
      //     title: 'Pháp luật đại cương',
      //     theoryCredits: 23,
      //     practiseCredits: 14,
      //     totalCredits: 32,
      //   },
      // ],
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '2',
    type: 'basicSubject',
    position: { x: 400, y: 700 },
    data: {
      label: 'CÁC MÔN HỌC CƠ SỞ NGÀNH',
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '3',
    type: 'majorSubject',
    position: { x: 400, y: 900 },
    data: {
      label: 'CÁC MÔN HỌC CHUYÊN NGÀNH',
    },
  },
];

export const edges = [
  { id: 'e1-2', source: '1', target: '2', label: 'this is an edge label' },
  { id: 'e1-3', source: '1', target: '3', animated: false },
  {
    id: 'e4-5',
    source: '1',
    target: '2',
    type: 'smoothstep',
    sourceHandle: 'handle-0',
    data: {
      selectIndex: 0,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e4-6',
    source: '2',
    target: '3',
    type: 'smoothstep',
    sourceHandle: 'handle-1',
    data: {
      selectIndex: 1,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];
