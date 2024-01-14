import { memo, useEffect, useState } from 'react';
import { useRequestWithState } from '../../hooks/useRequest';
import { notification } from 'antd';
import { Handle, Position } from 'reactflow';

function SubjectDetails() {
  const { request, loading } = useRequestWithState();
  const [subjectDetails, setSubjectDetails] = useState<any[]>([]);
  const loadData = async () => {
    await request('/subjectCombination/get/659d5f12b969c9e88ea889c0')
      .then((res) => {
        setSubjectDetails(res?.data.listSubjectDetails);
      })
      .catch((err) =>
        notification.error({
          message: `Load failed`,
          description: err.message,
        })
      );
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {subjectDetails.map((subject: any, index: number) => {
        return (
          <div style={{ marginLeft: 4 }} key={subject.id}>
            <span className="custom-node__label">
              {index + 1}.&nbsp; {subject.title}:{' '}
            </span>
            <span>{subject.theoryCredits}</span>
          </div>
        );
      })}
    </div>
  );
}

function ThesisTopic({ id, data }: { id: any; data: any }) {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="react-flow__node-custom" style={{ width: 200 }}>
        <div className="custom-node__header">
          <strong>{data?.label}</strong>
        </div>
        <div
          className="custom-note__body"
          style={{ padding: '8px 16px 8px 16px' }}
        >
          <SubjectDetails />
        </div>
      </div>
    </>
  );
}

export default memo(ThesisTopic);
