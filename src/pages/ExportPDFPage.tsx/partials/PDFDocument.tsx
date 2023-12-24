import React from 'react';
import {
  Page,
  Text,
  Image,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

const PDFDocument = () => {
  Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
  });
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.header} fixed>
          ~ Created with react-pdf ~
        </Text>
        <Text style={styles.title}>Don Quijote de la Mancha</Text>
        <Text style={styles.author}>Miguel de Cervantes</Text>
        <Image style={styles.image} src="/images/quijote1.jpg" />
        <Text style={styles.subtitle}>
          Capítulo I: Que trata de la condición y ejercicio del famoso hidalgo
          D. Quijote de la Mancha
        </Text>
        <Text style={styles.text}>abc</Text>
        <Text style={styles.text}>abc</Text>
        <Text style={styles.text}>abc</Text>
        <Text style={styles.text}>ca</Text>
        <Text style={styles.subtitle} break>
          Capítulo II: Que trata de la primera salida que de su tierra hizo el
          ingenioso Don Quijote
        </Text>
        <Image style={styles.image} src="/images/quijote2.png" />
        <Text style={styles.text}>ac</Text>
        <Text style={styles.text}>ac</Text>
        <Text style={styles.text}>ád</Text>
        <Text style={styles.text}>ád</Text>
        <Text style={styles.text}>á</Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

export default PDFDocument;

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald',
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Oswald',
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});
