import { memo } from "react";

function SemesterNode({ id, data } : {id: any, data: any}) {
  console.log(data);
  
  return (
    <>
      <div className="custom-node__header">
        <strong>{data?.label}</strong>
      </div>
      <div className="custom-node__body__semester">
        
      </div>
    </>
  );
}

export default memo(SemesterNode);