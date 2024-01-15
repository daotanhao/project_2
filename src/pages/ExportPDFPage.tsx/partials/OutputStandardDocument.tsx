import { OutputStandard } from '../../../types/AppType';
import { Text, View } from '@react-pdf/renderer';
import { styles } from '../PDFDocument';
import { useRequestWithState } from '../../../hooks/useRequest';
import { useEffect, useState } from 'react';

const OutputStandardDocument = (props: any) => {
  const { request } = useRequestWithState();
  const [dataRefDoc, setDataRefDoc] = useState<any[]>([]);

  const loadData = () => {
    request('/outputStandard')
      .then((res) => {
        setDataRefDoc(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadData();
  }, []);
  const renderDataTextWithFilter = (data: any[], type: string) => {
    const dataDisplay = data
      .filter((item) => item?.type === type)
      .sort((a, b) => {
        const idA = parseInt(a.id.slice(2), 10);
        const idB = parseInt(b.id.slice(2), 10);
        return idA - idB;
      });
    return dataDisplay.map((item) => (
      <Text style={styles.text}>
        - {item?.id}: {item.title}
      </Text>
    ));
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.title}>4 &nbsp; CHUẨN ĐẦU RA </Text>
      <Text style={styles.text}>
        Sinh viên tốt nghiệp Chương trình đào tạo cử nhân chính quy ngành Kỹ
        thuật Phần mềm phải đáp ứng các yêu cầu về tiêu chuẩn đầu ra (CĐR) sau:
      </Text>
      <Text style={styles.text}>Về nhận thức:</Text>
      {renderDataTextWithFilter(dataRefDoc, 'awareness')}
      <Text style={styles.text}>Về kỹ năng:</Text>
      {renderDataTextWithFilter(dataRefDoc, 'skill')}

      <Text style={styles.text}>Về thái độ:</Text>
      {renderDataTextWithFilter(dataRefDoc, 'attitude')}
    </View>
  );
};

export default OutputStandardDocument;
