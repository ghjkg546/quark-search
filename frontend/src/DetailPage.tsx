import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DetailItem from './interfaces/DetailItem';
import styles from './DetailPage.module.css'; // Import CSS module
import { Button, message } from 'antd';
import { Convert } from './utils/Convert';



const DetailPage: React.FC = () => {
  const params = useParams();
    const id:string = params['id']?params['id']:''

  const [item, setItem] = useState<DetailItem>({id:"",title:"",url:"",create_time:0,});

  const handleDetail = async (id:string) => {
      if(id == ''){
          message.info('need id');
          return
      }
      try {
          // Simulated fetch for demonstration (replace with actual API call)
          const response = await fetch(`http://47.106.155.179:8634/api/data/detail?id=${id}`);
          const res = await response.json();
          setItem(res.data[0])
      } catch (error) {
          console.error('Error fetching search results:', error);
      }
  };

  useEffect(() => {
      handleDetail(id); // Replace 'default query' with your desired initial search query
  }, []); // Empty dependency array ensures this runs only once on mount


  return (
    <div className={styles.detailContainer}>
      <h2 className={styles.detailTitle}>资源详情</h2>
      <div className={styles.detailContent}>
        <h2>{item.title}</h2>
        <p>创建时间: {Convert.formatTimestamp(item.create_time) }</p>
        {item.url && <p>资源链接: <a href={item.url}>{item.url}</a> </p>}
      </div>
      <Link to="/"><Button type="primary" block>
      返回
    </Button></Link>
    </div>
  );
};


export default DetailPage;



