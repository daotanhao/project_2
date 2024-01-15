import { Enrollment } from '../../../types/AppType';
import { Text, View, Image } from '@react-pdf/renderer';
import { styles } from '../PDFDocument';
import { useRequestWithState } from '../../../hooks/useRequest';
import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';

function calculateTotalCredits(dataSubjects: any[]): number {
  return dataSubjects.reduce((total, item) => total + item.totalCredits, 0);
}

const TrainingProgramDocument = (props: any) => {
  const { request } = useRequestWithState();
  const [dataSubjectCombination, setDataSubjectCombination] = useState<any[]>(
    []
  );
  const { pdfData } = useAuth();
  const [imageUrl, setImageUrl] = useState<string>('');

  const totalTrainingCredits: number = useMemo(() => {
    return calculateTotalCredits(dataSubjectCombination);
  }, [dataSubjectCombination]);

  const loadData = () => {
    request('/subjectCombination')
      .then((res) => {
        setDataSubjectCombination(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setImageUrl(props?.programImage);
  }, [pdfData]);

  // console.log(pdfData?.programImage);

  const renderTitleSubjectCombination = (text: string) => {
    switch (text) {
      case 'general':
        return 'Khối kiến thức giáo dục đại cương';
      case 'professional':
        return 'Khối kiến thức giáo dục chuyên nghiệp';
      case 'graduate':
        return 'Tốt nghiệp';
    }
  };

  const renderSubjectDetails = (subjectCombination: any[], type: string) => {
    let dataSubjectList: any[] = [];
    subjectCombination
      .filter((item) => item.type === type)
      .forEach((item: any) => {
        dataSubjectList = [...dataSubjectList, ...item.listSubjectDetails];
      });
    return dataSubjectList.map((item, index) => {
      return (
        <View style={styles.tableRow}>
          <View style={{ ...styles.tableCol, width: '6%' }}>
            <Text style={styles.tableCell}>{index + 1}</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '16%' }}>
            <Text style={styles.tableCell}>{item?.subjectCode}</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '60%' }}>
            <Text style={styles.tableCell}>{item?.title}</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '6%' }}>
            <Text style={styles.tableCell}>
              {item?.theoryCredits + item?.practiseCredits}
            </Text>
          </View>
          <View style={{ ...styles.tableCol, width: '6%' }}>
            <Text style={styles.tableCell}>{item?.theoryCredits}</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '6%' }}>
            <Text style={styles.tableCell}>{item?.practiseCredits}</Text>
          </View>
        </View>
      );
    });
  };

  const mapSubjectCombination = (subjectCombination: any[], type: string) => {
    return (
      <View style={styles.tableRow}>
        <View style={{ ...styles.tableCol, width: '15%' }}>
          <Text style={styles.tableCell}>
            {renderTitleSubjectCombination(type)}
          </Text>
        </View>
        <View
          style={{
            ...styles.tableCol,
            width: '85%',
            borderRight: 0,
            borderBottom: 0,
          }}
        >
          {subjectCombination.map((item: any) => {
            return (
              <View style={styles.tableRow}>
                <View style={{ ...styles.tableCol, width: '50%' }}>
                  <Text style={styles.tableCell}>{item.title}</Text>
                </View>
                <View style={{ ...styles.tableCol, width: '30%' }}>
                  <Text style={{ ...styles.tableCell }}>
                    {item.totalCredits}
                  </Text>
                </View>
                <View style={{ ...styles.tableCol, width: '20%' }}>
                  <Text style={styles.tableCell}>{item?.percents}%</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const renderSubjectCombination = () => {
    return (
      <>
        {mapSubjectCombination(
          dataSubjectCombination.filter((item) => item.type === 'general'),
          'general'
        )}
        {mapSubjectCombination(
          dataSubjectCombination.filter((item) => item.type === 'professional'),
          'professional'
        )}
        {mapSubjectCombination(
          dataSubjectCombination.filter((item) => item.type === 'graduate'),
          'graduate'
        )}
      </>
    );
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.title}>6 &nbsp; CHƯƠNG TRÌNH ĐÀO TẠO</Text>

      {/*******  6.1 *******/}
      <>
        <Text style={{ ...styles.subtitle, marginTop: 16 }}>
          6.1 &nbsp; Tỷ lệ các khối kiến thức
        </Text>
        <Text style={styles.text}>
          &nbsp; Không kể giáo dục thể chất và giáo dục quốc phòng
        </Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View
              style={{
                ...styles.tableCol,
                width: '57.5%',
              }}
            >
              <Text style={styles.tableCell}>Khối kiến thức</Text>
            </View>

            <View style={{ ...styles.tableCol, width: '42.5%' }}>
              <View style={{ ...styles.tableRow }}>
                <Text style={styles.tableCell}>Khối lượng</Text>
              </View>
              <View style={{ ...styles.tableRow, borderTop: '1px solid #000' }}>
                <View
                  style={{
                    ...styles.tableCol,
                    width: '60.2%',
                    borderBottom: 0,
                  }}
                >
                  <Text style={styles.tableCell}>Tổng số tín chỉ</Text>
                </View>
                <View
                  style={{
                    ...styles.tableCol,
                    width: '39.8%',
                    borderBottom: 0,
                    borderRight: 0,
                  }}
                >
                  <Text style={styles.tableCell}>%</Text>
                </View>
              </View>
            </View>
          </View>
          {renderSubjectCombination()}

          <View style={styles.tableRow}>
            <View
              style={{
                ...styles.tableCol,
                width: '57.5%',
              }}
            >
              <Text style={styles.tableCell}>
                Tổng số tín chỉ tích lũy tối thiểu toàn khóa
              </Text>
            </View>

            <View style={{ ...styles.tableCol, width: '25.5%' }}>
              <Text style={styles.tableCell}>{totalTrainingCredits}</Text>
            </View>
            <View style={{ ...styles.tableCol, width: '17%' }}></View>
          </View>
        </View>
      </>

      {/*******  6.2 *******/}
      <Text style={{ ...styles.subtitle, marginTop: 16 }}>
        6.2 &nbsp; Phân bố các khối kiến thức
      </Text>
      <>{imageUrl && <Image source={imageUrl} />}</>

      {/*******  6.3 *******/}
      <Text style={{ ...styles.subtitle, marginTop: 16 }}>
        6.3 &nbsp; Khối kiến thức giáo dục đại cương
      </Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={{ ...styles.tableCol, width: '6%' }}>
            <Text style={styles.tableCell}>STT</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '16%' }}>
            <Text style={styles.tableCell}>Mã môn học</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '60%' }}>
            <Text style={styles.tableCell}>Tên môn học</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '6%' }}>
            <Text style={styles.tableCell}>TC</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '6%' }}>
            <Text style={styles.tableCell}>LT</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '6%' }}>
            <Text style={styles.tableCell}>TH</Text>
          </View>
        </View>
        {renderSubjectDetails(dataSubjectCombination, 'general')}
      </View>
      <Text style={{ ...styles.subtitle, marginTop: 16 }}>
        6.4 &nbsp; Khối kiến thức giáo dục chuyên nghiệp
      </Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={{ ...styles.tableCol, width: '6%' }}>
            <Text style={styles.tableCell}>STT</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '16%' }}>
            <Text style={styles.tableCell}>Mã môn học</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '60%' }}>
            <Text style={styles.tableCell}>Tên môn học</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '6%' }}>
            <Text style={styles.tableCell}>TC</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '6%' }}>
            <Text style={styles.tableCell}>LT</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '6%' }}>
            <Text style={styles.tableCell}>TH</Text>
          </View>
        </View>
        {renderSubjectDetails(dataSubjectCombination, 'professional')}
      </View>
      <Text style={{ ...styles.subtitle, marginTop: 16 }}>
        6.3 &nbsp; Khối kiến thức tốt nghiệp
      </Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={{ ...styles.tableCol, width: '6%' }}>
            <Text style={styles.tableCell}>STT</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '16%' }}>
            <Text style={styles.tableCell}>Mã môn học</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '60%' }}>
            <Text style={styles.tableCell}>Tên môn học</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '6%' }}>
            <Text style={styles.tableCell}>TC</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '6%' }}>
            <Text style={styles.tableCell}>LT</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '6%' }}>
            <Text style={styles.tableCell}>TH</Text>
          </View>
        </View>
        {renderSubjectDetails(dataSubjectCombination, 'graduate')}
      </View>
    </View>
  );
};

export default TrainingProgramDocument;
