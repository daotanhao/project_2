import { Text, View } from '@react-pdf/renderer';
import { styles } from '../PDFDocument';

const ClassificationScaleDocument = (props: any) => {
  const outputStandard = props?.outputStandard || {};
  console.log('outputStandard data', outputStandard);
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
      </View>
    </View>
  );
};

export default ClassificationScaleDocument;
