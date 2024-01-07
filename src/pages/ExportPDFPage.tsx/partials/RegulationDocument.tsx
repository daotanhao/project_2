import { Regulation } from '../../../types/AppType';
import { Text, View } from '@react-pdf/renderer';
import { styles } from '../PDFDocument';

const RegulationDocument = (props: any) => {
  const regulation: Regulation = props?.regulation || {};

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.title}>3 &nbsp; QUY CHẾ ĐÀO TẠO </Text>
      <Text style={styles.text}>{regulation.content}</Text>
    </View>
  );
};

export default RegulationDocument;
