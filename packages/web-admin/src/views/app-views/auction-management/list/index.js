import React from 'react'
import { Avatar, Card, Table, Typography } from 'antd';

import { useGetAuctionItemsQuery } from 'queries/Auction';

const { Text } = Typography;

const AuctionList = () => {
  const { data, isLoading } = useGetAuctionItemsQuery();

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
      width: 200,
      render: (value) => (
        <a href={"#"} rel="noreferrer" target="_blank">
          {value}
        </a>
      ),
    },
    {
      title: 'Starting Price (UIT)',
      dataIndex: 'startingPrice',
      width: 200,
    },
    {
      title: 'Bidding Step (UIT)',
      dataIndex: 'biddingStep',
      width: 200,
    },
    {
      title: 'Highest Bid Amount (UIT)',
      dataIndex: 'highestBidAmount',
      width: 200,
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      render: (value) => (
        <>{value / 60} minutes</>
      )
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: 200,
      render: (value) => (
        <Text
          style={{ width: 200 }}
          ellipsis={{ tooltip: value }}
        >
          {value}
        </Text>
      )
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
  ];

  return (
    <Card>
      <div className="table-responsive mt-5">
        <Table
          columns={tableColumns}
          scroll={{ x: 1000 }}
          dataSource={data}
          loading={isLoading}
          rowKey='tokenId'
        />
      </div>
    </Card>
  )
}

export default AuctionList;