import { Text, View } from '@react-pdf/renderer';
import { styles } from '../PDFDocument';
import { useRequestWithState } from '../../../hooks/useRequest';
import { useEffect, useState } from 'react';

const ClassificationScaleDocument = (props: any) => {
  const { request } = useRequestWithState();
  const [dataRefDoc, setDataRefDoc] = useState<any[]>([]);

  const loadData = () => {
    request('/classifyScale')
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
    const dataDisplay = data.filter((item) => item?.type === type);
    return dataDisplay.map((item) => (
      <View style={styles.tableRow}>
        <View style={{ ...styles.tableCol, width: '10%' }}>
          <Text style={styles.tableCell}>{item?.code}</Text>
        </View>
        <View style={{ ...styles.tableCol, width: '10%' }}>
          <Text style={styles.tableCell}>{item?.level}</Text>
        </View>
        <View style={{ ...styles.tableCol, width: '20%' }}>
          <Text style={styles.tableCell}>{item?.title}</Text>
        </View>
        <View style={{ ...styles.tableCol, width: '60%' }}>
          <Text style={styles.tableCell}>{item?.discription}</Text>
        </View>
      </View>
    ));
  };
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.title}>
        5 &nbsp; THANG PHÂN LOẠI KIẾN THỨC, KỸ NĂNG, THÁI ĐỘ
      </Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={{ ...styles.tableCol, width: '10%' }}>
            <Text style={styles.tableCell}>Mã cấp độ</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '10%' }}>
            <Text style={styles.tableCell}>Cấp độ</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '20%' }}>
            <Text style={styles.tableCell}>Tên phân loại của cấp độ</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '60%' }}>
            <Text style={styles.tableCell}>Mô tả</Text>
          </View>
        </View>
        <View style={{ ...styles.tableCol, width: '100%' }}>
          <Text style={styles.tableCell}>Thang phân loại về "Nhận thức"</Text>
        </View>
        {renderDataTextWithFilter(dataRefDoc, 'awareness')}
        <View style={{ ...styles.tableCol, width: '100%' }}>
          <Text style={styles.tableCell}>Thang phân loại về "Kỹ năng"</Text>
        </View>
        {renderDataTextWithFilter(dataRefDoc, 'skill')}
        <View style={{ ...styles.tableCol, width: '100%' }}>
          <Text style={styles.tableCell}>Thang phân loại về "Thái độ"</Text>
        </View>
        {renderDataTextWithFilter(dataRefDoc, 'attitude')}
      </View>
    </View>
  );
};

export default ClassificationScaleDocument;
