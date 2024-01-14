import React from 'react';
import { Edge, Node, Position } from 'reactflow';

interface NodeData {
  label: string;
  selects?: {
    'handle-0'?: string;
    'handle-1'?: string;
  };
  listSubjectDetails?: any;
}

// interface Node {
//   id: string;
//   type?: string;
//   data: NodeData;
//   position: {
//     x: number;
//     y: number;
//   };
//   className?: string;
//   style?: React.CSSProperties;
//   sourcePosition?: Position;
//   targetPosition?: Position;
//   draggable?: boolean;
//   selectable?: boolean;
// }

export const nodes: Node[] = [
  {
    id: '1',
    type: 'outlineSubject',
    position: { x: 400, y: 100 },
    data: {
      label: 'CÁC MÔN HỌC ĐẠI CƯƠNG',
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '2',
    type: 'basicSubject',
    position: { x: 400, y: 400 },
    data: {
      label: 'CÁC MÔN HỌC CƠ SỞ NGÀNH',
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '3',
    type: 'majorSubject',
    position: { x: 400, y: 700 },
    data: {
      label: 'CÁC MÔN HỌC CHUYÊN NGÀNH',
    },
    targetPosition: Position.Top,
  },
  {
    id: '4',
    type: 'otherSubject',
    position: { x: 400, y: 1000 },
    data: {
      label: 'CÁC MÔN HỌC KHÁC VÀ TỰ CHỌN',
    },
    targetPosition: Position.Top,
  },
  {
    id: '5',
    type: 'projectSubject',
    position: { x: 400, y: 1090 },
    data: {
      label: 'THỰC TẬP DOANH NGHIỆP, ĐỒ ÁN',
    },
    targetPosition: Position.Top,
  },
  {
    id: '6',
    type: 'thesisGraduate',
    position: { x: 370, y: 1250 },
    data: {
      label: 'KHÓA LUẬN TỐT NGHIỆP',
    },
    targetPosition: Position.Top,
  },
  {
    id: '7',
    type: 'thesisTopic',
    position: { x: 530, y: 1250 },
    data: {
      label: 'CHUYÊN ĐỀ TỐT NGHIỆP',
    },
    targetPosition: Position.Top,
  },
];

export const edges: Edge[] = [
  {
    id: 'edge-1-2',
    type: 'smoothstep',
    source: '1', // id của node nguồn
    target: '2', // id của node đích
    sourceHandle: 'bottom', // bạn có thể thay đổi giá trị này tùy thuộc vào vị trí của handle trên node nguồn
    targetHandle: 'top', // bạn có thể thay đổi giá trị này tùy thuộc vào vị trí của handle trên node đích
    // Tạo một label với react node bên trong
  },
  {
    id: 'edge-2-3',
    type: 'smoothstep',
    source: '2', // id của node nguồn
    target: '3', // id của node đích
    sourceHandle: 'bottom', // bạn có thể thay đổi giá trị này tùy thuộc vào vị trí của handle trên node nguồn
    targetHandle: 'top', // bạn có thể thay đổi giá trị này tùy thuộc vào vị trí của handle trên node đích
    // Tạo một label với react node bên trong
  },
  {
    id: 'edge-3-4',
    type: 'smoothstep',
    source: '3', // id của node nguồn
    target: '4', // id của node đích
    sourceHandle: 'bottom', // bạn có thể thay đổi giá trị này tùy thuộc vào vị trí của handle trên node nguồn
    targetHandle: 'top', // bạn có thể thay đổi giá trị này tùy thuộc vào vị trí của handle trên node đích
    // Tạo một label với react node bên trong
  },
  {
    id: 'edge-4-5',
    type: 'smoothstep',
    source: '4', // id của node nguồn
    target: '5', // id của node đích
    sourceHandle: 'bottom', // bạn có thể thay đổi giá trị này tùy thuộc vào vị trí của handle trên node nguồn
    targetHandle: 'top', // bạn có thể thay đổi giá trị này tùy thuộc vào vị trí của handle trên node đích
    // Tạo một label với react node bên trong
  },
  {
    id: 'edge-5-6',
    type: 'smoothstep',
    source: '5', // id của node nguồn
    target: '6', // id của node đích
    sourceHandle: 'bottom', // bạn có thể thay đổi giá trị này tùy thuộc vào vị trí của handle trên node nguồn
    targetHandle: 'top', // bạn có thể thay đổi giá trị này tùy thuộc vào vị trí của handle trên node đích
    // Tạo một label với react node bên trong
  },
  {
    id: 'edge-5-7',
    type: 'smoothstep',
    source: '5', // id của node nguồn
    target: '7', // id của node đích
    sourceHandle: 'bottom', // bạn có thể thay đổi giá trị này tùy thuộc vào vị trí của handle trên node nguồn
    targetHandle: 'top', // bạn có thể thay đổi giá trị này tùy thuộc vào vị trí của handle trên node đích
    // Tạo một label với react node bên trong
  },
];
