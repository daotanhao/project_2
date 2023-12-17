import ListTableEntityTemplate from '../../misc/template/ListTableEntityTemplate';

const ListGeneralKnowledgePage = () => {
  return (
    <ListTableEntityTemplate
      entityName="General Knowledge"
      entityRequestUrl="generalKnowledge"
      entityRouterUrl="generalKnowledge"
      columns={[
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
          render: (text: any) => <a>{text}</a>,
        },
      ]}
    />
  );
};

export default ListGeneralKnowledgePage;
