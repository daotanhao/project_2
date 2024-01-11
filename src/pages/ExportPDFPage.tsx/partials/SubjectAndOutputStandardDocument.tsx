import { Text, View } from '@react-pdf/renderer';
import { styles } from '../PDFDocument';

//example data to render subject with output standard
const data: any[] = [
  {
    code: 'SS003',
    name: 'Tư tưởng Hồ Chí Minh',
    relationship: ['LO1:N01', 'LO2:KN3'],
  },
  {
    code: 'MA006',
    name: 'Giải tích',
    relationship: [
      //  key: value
      // 'id' output standard: 'code' classification scale
      'LO2: KN3',
      'LO3: KN3',
    ],
  },
];

const SubjectAndOutputStandardDocument = (props: any) => {
  const outputStandard = props?.outputStandard || {};
  console.log('outputStandard data', outputStandard);

  const newData = data.map((item) => {
    if (Array.isArray(item.relationship)) {
      let relationshipObject: Record<any, string> = {};
      item.relationship.forEach((relationshipItem: any) => {
        let [key, value] = relationshipItem.split(':');
        relationshipObject[key] = value;
      });
      item.relationship = relationshipObject;
    }

    return item;
  });

  const renderSubjectWithOutputStandard = () => {
    console.log('new data', newData);
    return newData.map((item: any) => {
      return (
        <View style={styles.tableRow}>
          <View style={{ ...styles.tableCol, width: '5%' }}>
            <Text style={styles.tableCell}></Text>
          </View>
          <View style={{ ...styles.tableCol, width: '10%' }}>
            <Text style={styles.tableCell}>{item.code}</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '25%' }}>
            <Text style={styles.tableCell}>{item.name}</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>{item?.relationship?.LO1}</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>{item?.relationship?.LO2}</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>{item?.relationship?.LO3}</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>{item?.relationship?.LO4}</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>{item?.relationship?.LO5}</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>{item?.relationship?.LO6}</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>{item?.relationship?.LO7}</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>{item?.relationship?.LO8}</Text>
          </View>
        </View>
      );
    });
  };
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.title}>
        7 &nbsp; CÁC MÔN HỌC VÀ MỐI QUAN HỆ VỚI CHUẨN ĐẦU RA
      </Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={{ ...styles.tableCol, width: '5%' }}>
            <Text style={styles.tableCell}>STT</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '10%' }}>
            <Text style={styles.tableCell}>Mã môn học</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '25%' }}>
            <Text style={styles.tableCell}>Tên môn học</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '60%' }}>
            <Text style={styles.tableCell}>Chuẩn đầu ra</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={{ ...styles.tableCol, width: '5%' }}>
            <Text style={styles.tableCell}></Text>
          </View>
          <View style={{ ...styles.tableCol, width: '10%' }}>
            <Text style={styles.tableCell}></Text>
          </View>
          <View style={{ ...styles.tableCol, width: '25%' }}>
            <Text style={styles.tableCell}></Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>LO1</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>LO2</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>LO3</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>LO4</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>LO5</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>LO6</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>LO7</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>LO8</Text>
          </View>
        </View>
        {renderSubjectWithOutputStandard()}
      </View>
    </View>
  );
};

export default SubjectAndOutputStandardDocument;
