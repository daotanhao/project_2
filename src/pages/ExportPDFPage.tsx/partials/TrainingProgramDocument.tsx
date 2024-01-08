import { Enrollment } from '../../../types/AppType';
import { Text, View } from '@react-pdf/renderer';
import { styles } from '../PDFDocument';

const TrainingProgramDocument = () => {
  //   const enrollment: Enrollment = props?.enrollment || {};

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.title}>6 &nbsp; CHƯƠNG TRÌNH ĐÀO TẠO</Text>
      <Text style={styles.text}></Text>
    </View>
  );
};

export default TrainingProgramDocument;
