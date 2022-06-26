import React from 'react'
import { Avatar, Card, Table, Typography } from 'antd';

import { useGetMarketItemsQuery } from 'queries/NFT';

const { Text } = Typography;

const NFTList = () => {
  const { data: NFTs, isLoading } = useGetMarketItemsQuery();

  // columns 
  const tableColumns = [
    {
      title: 'NFT preview',
      dataIndex: 'image',
      sorter: false,
      render: (value) => (
        <div className="d-flex">
          {
            value &&
            <Avatar
              size={75}
              className="thumbnail-image"
              shape="square"
              icon={<img alt="image" src={value} />}
            />
          }
        </div>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      render: (value) => (
        <a href={"#"} rel="noreferrer" target="_blank">
          {value}
        </a>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
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
      title: 'Seller',
      dataIndex: 'seller',
      render: (value) => (
        <Text
          style={{ width: 100 }}
          ellipsis={{ tooltip: value }}
        >
          {value}
        </Text>
      )
    },
  ];

  return (
    <Card>
      <div className="table-responsive mt-5">
        <Table
          columns={tableColumns}
          scroll={{ x: 1000 }}
          dataSource={NFTs}
          loading={isLoading}
          rowKey='tokenId'
        />
      </div>
    </Card>
  )
}

export default NFTList;