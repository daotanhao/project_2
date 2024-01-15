import { Enrollment } from '../../../types/AppType';
import { Text, View } from '@react-pdf/renderer';
import { styles } from '../PDFDocument';
import { useRequestWithState } from '../../../hooks/useRequest';
import { useEffect, useState } from 'react';

const RefDocDocument = () => {
  const { request } = useRequestWithState();
  const [dataRefDoc, setDataRefDoc] = useState<any[]>([]);

  const loadData = () => {
    request('/referenceDoc')
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
    const dataDisplay = data.filter((item) => item.type === type);
    return dataDisplay.map((item) => (
      <Text key={item._id} style={styles.text}>
        - {item.title}
      </Text>
    ));
  };
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.title}>TÀI LIỆU THAM KHẢO</Text>
      <Text style={{ ...styles.text, textDecoration: 'underline' }}>
        Trong nước
      </Text>
      <Text style={styles.text}>
        {renderDataTextWithFilter(dataRefDoc, 'Domestic')}
      </Text>
      <Text
        style={{ ...styles.text, textDecoration: 'underline', marginTop: 20 }}
      >
        Ngoài nước
      </Text>
      <Text style={styles.text}>
        {renderDataTextWithFilter(dataRefDoc, 'Foreign')}
      </Text>
    </View>
  );
};

export default RefDocDocument;
