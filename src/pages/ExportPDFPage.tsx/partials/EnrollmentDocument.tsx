import { Enrollment } from '../../../types/AppType';
import { Text, View } from '@react-pdf/renderer';
import { styles } from '../PDFDocument';

const EnrollmentDocument = (props: any) => {
  const enrollment: Enrollment = props?.enrollment || {};

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.title}>2 &nbsp; ĐỐI TƯỢNG TUYỂN SINH </Text>
      <Text style={styles.text}>{enrollment.content}</Text>
    </View>
  );
};

export default EnrollmentDocument;
