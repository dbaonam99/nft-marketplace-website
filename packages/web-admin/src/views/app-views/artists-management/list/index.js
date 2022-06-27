import React, { useEffect, useState } from 'react'
import { Avatar, Card, Table, Typography } from 'antd';

import { getUsers } from 'queries/User';

const { Text } = Typography;

export const getFullDate = (date) => {
  const dateAndTime = date.split('T');

  return dateAndTime[0].split('-').reverse().join('-');
};

const ArtistsList = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const resp = await getUsers();
        setData(resp);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [])
  // columns 
  const tableColumns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      sorter: false,
      render: (value) => (
        <div className="d-flex">
          {
            value &&
            <Avatar
              size={75}
              className="thumbnail-image"
              shape="circle"
              icon={<img alt="image" src={value} />}
            />
          }
        </div>
      ),
    },
    {
      title: 'ETH Address',
      dataIndex: 'ethAddress',
      render: (value) => (
        <Text
          style={{ width: 100 }}
          ellipsis={{ tooltip: value }}
        >
          {value}
        </Text>
      )
    },
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      render: (value) => (
        <>{getFullDate(value)}</>
      )
    }
  ];

  return (
    <Card>
      <div className="table-responsive mt-5">
        <Table
          columns={tableColumns}
          scroll={{ x: 1000 }}
          dataSource={data}
          loading={isLoading}
          rowKey='ethAddress'
        />
      </div>
    </Card>
  )
}

export default ArtistsList;