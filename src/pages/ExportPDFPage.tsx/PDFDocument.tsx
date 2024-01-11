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

interface DataEntityId {
  [key: string]: string;
}

const dataEntityId: Record<string, any> = {
  overview: '6585d80b813c9d43a3112e37',
  enroll: '657441735b87d18c330bfb68',
  trainingReg: '65754eb0d2dc45312afef3b5',
  referenceDoc: '65748cf3faed00c29b28ba7f',
  generalKnowledge: '6564480b6b3e7175a20dac0d',
  graduationCondition: '6579e6366baf99b650883047',
  outputType: '654b6d66a5a010e43ca8c974',
  outputStandard: '657966a1b59d9bc820af23f2',
  classifyScale: '6581ca8483f47771f660c43c',
  subjectCombination: '65830c18133d8ca7f1481407',
  subjectDetails: undefined,
};

const PDFDocument = () => {
  const { request } = useRequestWithState();
  const [entityData, setEntityData] = useState<{ [key: string]: any }>({});
  useEffect(() => {
    const fetchDataForEntities = async () => {
      const entityDataCopy = { ...entityData };

      await Promise.all(
        Object.keys(dataEntityId).map((entity: string) => {
          return request(`/${entity}/get/${dataEntityId[entity]}`)
            .then((res) => {
              entityDataCopy[entity] = res.data;
              return;
            })
            .catch((e) => console.log(e));
        })
      );

      setEntityData(entityDataCopy);
    };

    fetchDataForEntities();
  }, []);
  console.log(entityData);

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
          NGÀNH {entityData?.overview?.major}
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
          <OverviewDocument overview={entityData?.overview} />
          <EnrollmentDocument enrollment={entityData?.enroll} />
          <RegulationDocument regulation={entityData?.trainingReg} />
          <OutputStandardDocument outputStandard={entityData?.outputStandard} />
          <ClassificationScaleDocument
            classificationScale={entityData?.classifyScale}
          />
          <TrainingProgramDocument />
          <SubjectAndOutputStandardDocument />
          <GraduationConditionDocument
            graduationCondition={entityData?.graduationCondition}
          />
          <SubjectDetailsDocument />
          <RefDocDocument refDoc={entityData?.referenceDoc} />

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
  }, [entityData]);
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
      {/* {renderPdf()} */}
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
