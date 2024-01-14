import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import PDFDocument from '../ExportPDFPage.tsx/PDFDocument';
import { PDFDownloadLink } from '@react-pdf/renderer';
import html2pdf from 'html2pdf.js';
import OverviewFlow from '../../components/DiagramFlow/DiagramFlow';

const PDFGenerator = () => {
  return (
    <div style={{ overflowY: 'scroll', height: 100 }}>
      <h1>Hello, this is a PDF</h1>
      <p style={{ marginTop: 20 }}>
        This is some content that will be included in the PDF.
      </p>
      <p style={{ marginTop: 20 }}>
        This is some content that will be included in the PDF.
      </p>
      <p style={{ marginTop: 20 }}>
        This is some content that will be included in the PDF.
      </p>
      <p style={{ marginTop: 20 }}>
        This is some content that will be included in the PDF.
      </p>
      <p style={{ marginTop: 20 }}>
        This is some content that will be included in the PDF.
      </p>
      <p style={{ marginTop: 20 }}>
        This is some content that will be included in the PDF.
      </p>
      <p style={{ marginTop: 20 }}>
        This is some content that will be included in the PDF.
      </p>
      <p style={{ marginTop: 20 }}>
        This is some content that will be included in the PDF.
      </p>
    </div>
  );
};

const HomePage = () => {
  const handleDownloadPDF = () => {
    const content = document.getElementById('pdf-content');

    html2pdf(content);
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: window.innerHeight * 0.8,
          width: '100%',
        }}
      >
        {/* <PDFDocument /> */}
        <OverviewFlow />
      </div>
    </div>
  );
};

export default HomePage;
