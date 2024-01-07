import React from 'react';
import { Overview } from '../../../types/AppType';
import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { styles } from '../PDFDocument';
import parse from 'html-react-parser';

const OverviewDocument = (props: any) => {
  const overview: Overview = props?.overview || {};

  const renderHtml = (html: any) => {
    if (!html) return;
    const paragraphs = html.split('<p>').filter(Boolean);

    return paragraphs.map((paragraph: any, index: any) => {
      const key = `paragraph-${index}`;

      if (paragraph.includes('<ul>')) {
        const items = paragraph
          .split('<li>')
          .filter(Boolean)
          .map((item: any, itemIndex: any) => (
            <Text key={`item-${itemIndex}`} style={styles.text}>{`-     ${item
              .replace('</li>', '')
              .replace('</p>', '')
              .replace('<ul>', '')
              .replace('</ul>', '')}`}</Text>
          ));

        return (
          <View key={key} style={styles.text}>
            {items}
          </View>
        );
      }

      return (
        <Text key={key} style={styles.text}>
          {paragraph.replace('</p>', '')}
        </Text>
      );
    });
  };

  // const renderHtml = (html: string) => {
  //   const components = parse(html, {
  //     replace: (domNode: any) => {
  //       if (domNode.type === 'tag') {
  //         if (domNode.name === 'p') {
  //           return <Text style={styles.text}>{domNode.children}</Text>;
  //         }
  //         if (domNode.name === 'ul') {
  //           return <View style={styles.text}>{domNode.children}</View>;
  //         }
  //         if (domNode.name === 'li') {
  //           return <Text style={styles.text}>{`• ${domNode.children}`}</Text>;
  //         }
  //       }
  //     },
  //   });

  //   return components;
  // };
  return (
    <View>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ alignItems: 'center' }}>
          <Text
            style={{ fontSize: 14, fontFamily: 'Roboto', marginHorizontal: 12 }}
          >
            ĐẠI HỌC QUỐC GIA TP. HỒ CHÍ MINH
          </Text>

          <Text style={{ fontSize: 14, fontFamily: 'Roboto' }}>
            TRƯỜNG ĐẠI HỌC
          </Text>
          <Text style={{ fontSize: 14, fontFamily: 'Roboto' }}>
            CÔNG NGHỆ THÔNG TIN
          </Text>
        </div>
        <div style={{ alignItems: 'center' }}>
          <Text
            style={{ fontSize: 14, fontFamily: 'Roboto', marginHorizontal: 12 }}
          >
            CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'Roboto',
              borderBottom: '1px solid #000',
            }}
          >
            Độc lập - Tự do - Hạnh phúc
          </Text>
        </div>
      </div>

      <Text style={{ ...styles.title, marginVertical: 20 }}>
        CHƯƠNG TRÌNH GIÁO DỤC ĐẠI HỌC
      </Text>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.text}>Tên chương trình:</Text>
        <Text style={styles.text}>{overview?.title}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.text}>Trình độ đào tạo: </Text>
        <Text style={styles.text}>{overview?.degree}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.text}>Ngành/Chuyên ngành đào tạo: </Text>
        <Text style={styles.text}>{overview?.major}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.text}>Mã ngành đào tạo: </Text>
        <Text style={styles.text}>{overview?.major}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.text}>Loại hình đào tạo: </Text>
        <Text style={styles.text}>{overview?.type}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.text}>Đối tượng áp dụng: </Text>
        <Text style={styles.text}>
          Từ khóa tuyển năm {overview?.availableYear}
        </Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={styles.title}>1 &nbsp; GIỚI THIỆU CHUNG: </Text>

        <Text style={styles.subtitle}>1.1 Mục tiêu đào tạo</Text>
        {overview?.goalsTraining && renderHtml(overview?.goalsTraining)}

        <Text style={styles.subtitle}>
          1.2 Vị trí và khả năng làm việc sau tốt nghiệp
        </Text>
        {overview?.prospectAfterGraduation &&
          renderHtml(overview?.prospectAfterGraduation)}

        <Text style={styles.subtitle}>
          1.3 Quan điểm xây dựng chương trình đào tạo
        </Text>
        {overview?.perspectivesTraining &&
          renderHtml(overview?.perspectivesTraining)}

        <Text style={styles.subtitle}>1.4 Hình thức và thời gian đào tạo</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.text}>- Hình thức đào tạo: </Text>
          <Text style={styles.text}>{overview?.method}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.text}>- Số tín chỉ đào tạo: </Text>
          <Text style={styles.text}>{overview?.credits}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.text}>- Thời gian đào tạo: </Text>
          <Text style={styles.text}>
            {overview?.duration} năm ({overview?.duration * 2} học kỳ chính)
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OverviewDocument;
