import { OutputStandard } from '../../../types/AppType';
import { Text, View } from '@react-pdf/renderer';
import { styles } from '../PDFDocument';

const OutputStandardDocument = (props: any) => {
  const outputStandard = props?.outputStandard || {};
  console.log('outputStandard data', outputStandard);

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.title}>4 &nbsp; CHUẨN ĐẦU RA </Text>
      <Text style={styles.text}>
        Sinh viên tốt nghiệp Chương trình đào tạo cử nhân chính quy ngành Kỹ
        thuật Phần mềm phải đáp ứng các yêu cầu về tiêu chuẩn đầu ra (CĐR) sau:
      </Text>
      <Text style={styles.text}>Về nhận thức:</Text>
      <Text style={styles.text}>
        - {outputStandard.id}: {outputStandard.title}
      </Text>
      <Text style={styles.text}>Về kỹ năng:</Text>
      <Text style={styles.text}>Về thái độ:</Text>
    </View>
  );
};

export default OutputStandardDocument;
