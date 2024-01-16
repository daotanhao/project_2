import { Enrollment } from '../../../types/AppType';
import { Text, View } from '@react-pdf/renderer';
import { styles } from '../PDFDocument';
import { useRequestWithState } from '../../../hooks/useRequest';
import { useEffect, useState } from 'react';

const SubjectDetailsDocument = () => {
  const { request } = useRequestWithState();
  const [dataSubject, setDataSubject] = useState<any[]>([]);

  const loadData = () => {
    request('/subjectCombination')
      .then((res) => {
        setDataSubject(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const renderSubjectDetails = (subjectCombination: any[], type: string) => {
    let dataSubjectList: any[] = [];
    subjectCombination
      .filter((item) => item.type === type)
      .forEach((item: any) => {
        dataSubjectList = [...dataSubjectList, ...item.listSubjectDetails];
      });
    return (
      <>
        {dataSubjectList.map((item: any) => {
          return (
            <>
              <Text style={styles.text}>- {item?.title}</Text>
              <View style={{ marginLeft: 16 }}>
                <Text style={styles.text}>
                  Tên tiếng Anh: {item?.englishTitle}
                </Text>
                <Text style={styles.text}>
                  Số tín chỉ: {item?.theoryCredits + item?.practiseCredits}
                </Text>
                <Text style={styles.text}>
                  Tóm tắt nội dung: {item?.synopsis}
                </Text>
              </View>
            </>
          );
        })}
      </>
    );
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.title}>
        9 &nbsp; MÔ TẢ VẮN TẮT NỘI DUNG VÀ KHỐI LƯỢNG CÁC MÔN HỌC
      </Text>
      <Text style={styles.text}>9.1. Khối kiến thức giáo dục đại cương</Text>
      {renderSubjectDetails(dataSubject, 'general')}
      <Text style={styles.text}>
        9.2. Khối kiến thức giáo dục chuyên nghiệp
      </Text>
      {renderSubjectDetails(dataSubject, 'professional')}
      <Text style={styles.text}>9.3. Tốt nghiệp</Text>
      {renderSubjectDetails(dataSubject, 'graduate')}
    </View>
  );
};

export default SubjectDetailsDocument;
