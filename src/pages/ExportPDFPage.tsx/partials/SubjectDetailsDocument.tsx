import { Enrollment } from '../../../types/AppType';
import { Text, View } from '@react-pdf/renderer';
import { styles } from '../PDFDocument';

const SubjectDetailsDocument = () => {
  //   const enrollment: Enrollment = props?.enrollment || {};

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.title}>
        11 &nbsp; MÔ TẢ VẮN TẮT NỘI DUNG VÀ KHỐI LƯỢNG CÁC MÔN HỌC
      </Text>
      <Text style={styles.text}></Text>
    </View>
  );
};

export default SubjectDetailsDocument;
