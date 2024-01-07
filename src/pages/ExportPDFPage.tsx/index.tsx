import React from 'react';
import CreateEntityTemplate from '../../misc/template/CreateEntityTemplate';
import { Divider, Input, Layout } from 'antd';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import PDFDocument from './PDFDocument';
import InputDocument from './InputDocument';

const ExportPDFPage = () => {
  return (
    <Layout
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
      }}
    >
      <div style={{ width: '50%' }}>
        <InputDocument />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: window.innerHeight * 0.8,
          width: '50%',
        }}
      >
        <PDFDocument />
      </div>
    </Layout>
  );
};

export default ExportPDFPage;
