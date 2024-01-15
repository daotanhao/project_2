import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Page,
  Text,
  Image,
  Document,
  Font,
  PDFViewer,
  PDFDownloadLink,
  StyleSheet,
} from '@react-pdf/renderer';
import { useRequestWithState } from '../../hooks/useRequest';
import logo from '../../assets/images/uit-logo.png';
import OverviewDocument from './partials/OverviewDocument';
import EnrollmentDocument from './partials/EnrollmentDocument';
import RegulationDocument from './partials/RegulationDocument';
import OutputStandardDocument from './partials/OutputStandardDocument';
import ClassificationScaleDocument from './partials/ClassificationScaleDocument';
import TrainingProgramDocument from './partials/TrainingProgramDocument';
import GraduationConditionDocument from './partials/GraduationConditionDocument';
import SubjectDetailsDocument from './partials/SubjectDetailsDocument';
import RefDocDocument from './partials/RefDocDocument';
import SubjectAndOutputStandardDocument from './partials/SubjectAndOutputStandardDocument';
import { useAuth } from '../../hooks/useAuth';

const PDFDocument = () => {
  const { pdfData } = useAuth();
  console.log(pdfData?.programImage);

  const renderCoverPage = () => {
    return (
      <Page style={styles.body}>
        <Text style={styles.header}>ĐẠI HỌC QUỐC GIA TP. HỒ CHÍ MINH</Text>
        <Text style={styles.header}>TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN</Text>
        <Image style={styles.image} src={logo} />

        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Roboto',
            textTransform: 'uppercase',
            marginVertical: 5,
            marginTop: 180,
            fontSize: 20,
          }}
        >
          CHƯƠNG TRÌNH GIÁO DỤC ĐẠI HỌC
        </Text>
        <Text
          style={{
            fontSize: 30,
            textAlign: 'center',
            fontFamily: 'Roboto',
            textTransform: 'uppercase',
            marginVertical: 5,
            marginTop: 40,
          }}
        >
          ĐẠI HỌC CHÍNH QUY
        </Text>
        <Text
          style={{
            fontSize: 30,
            textAlign: 'center',
            fontFamily: 'Roboto',
            textTransform: 'uppercase',
            marginVertical: 5,
          }}
        >
          NGÀNH {pdfData?.overview?.major}
        </Text>
        <Text style={{ fontSize: 18, alignSelf: 'center', marginTop: 230 }}>
          THÁNG 6/2022
        </Text>
      </Page>
    );
  };

  const renderPdf = useCallback(() => {
    return (
      <Document>
        {renderCoverPage()}

        <Page style={styles.body}>
          <OverviewDocument overview={pdfData?.overview} />
          <EnrollmentDocument enrollment={pdfData?.enroll} />
          <RegulationDocument regulation={pdfData?.trainingReg} />
          <OutputStandardDocument outputStandard={pdfData?.outputStandard} />
          <ClassificationScaleDocument />
          <TrainingProgramDocument programImage={pdfData?.programImage} />
          <SubjectAndOutputStandardDocument />
          <GraduationConditionDocument
            graduationCondition={pdfData?.graduationCondition}
          />
          <SubjectDetailsDocument />
          <RefDocDocument />

          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </Page>
      </Document>
    );
  }, [pdfData]);
  return (
    <>
      <PDFViewer style={{ height: '100%' }}>{renderPdf()}</PDFViewer>
      <PDFDownloadLink
        style={{ marginTop: 8 }}
        document={renderPdf()}
        fileName="document.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Download now!'
        }
      </PDFDownloadLink>
    </>
  );
};

export default PDFDocument;

Font.register({
  family: 'Roboto',
  src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf',
});

export const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingLeft: 35,
    paddingRight: 35,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Roboto',
    textTransform: 'uppercase',
    marginVertical: 5,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Roboto',
    marginVertical: 5,
  },
  text: {
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Roboto',
    marginVertical: 5,
    // width: '100%',
    flexWrap: 'wrap',
    marginLeft: 20,
  },
  image: {
    alignSelf: 'center',
    width: 130,
    height: 100,
  },
  header: {
    fontSize: 20,
    marginBottom: 5,
    textAlign: 'center',
    fontWeight: 'extrabold',
    fontFamily: 'Roboto',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  table: {
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCol: {
    // width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10,
    fontFamily: 'Roboto',
  },
});
