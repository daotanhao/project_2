import { GraduationCondition } from '../../../types/AppType';
import { Text, View } from '@react-pdf/renderer';
import { styles } from '../PDFDocument';

const GraduationConditionDocument = (props: any) => {
  const graduationCondition: GraduationCondition =
    props?.graduationCondition || {};

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.title}>10 &nbsp; ĐIỀU KIỆN TỐT NGHIỆP</Text>
      <Text style={styles.text}>{graduationCondition.content}</Text>
    </View>
  );
};

export default GraduationConditionDocument;
