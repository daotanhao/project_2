import React from 'react';
import CreateEntityTemplate from '../../misc/template/CreateEntityTemplate';
import { Divider, Input, Layout } from 'antd';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import PDFDocument from './partials/PDFDocument';

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
        <PDFDocument />
      </div>
      <Divider type="vertical" />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: window.innerHeight * 0.8,
          width: '50%',
        }}
      >
        <PDFViewer style={{ height: '100%' }}>
          <PDFDocument />
        </PDFViewer>
        <PDFDownloadLink
          style={{ marginTop: 8 }}
          document={<PDFDocument />}
          fileName="document.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 'Download now!'
          }
        </PDFDownloadLink>
      </div>
    </Layout>
  );
};

export default ExportPDFPage;
