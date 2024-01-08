import { Enrollment } from '../../../types/AppType';
import { Text, View } from '@react-pdf/renderer';
import { styles } from '../PDFDocument';

const RefDocDocument = (props: any) => {
  const refDoc = props?.refDoc || {};
  console.log('ref doc', refDoc);

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.title}>TÀI LIỆU THAM KHẢO</Text>
      <Text style={{ ...styles.text, textDecoration: 'underline' }}>
        Trong nước
      </Text>
    </View>
  );
};

export default RefDocDocument;
