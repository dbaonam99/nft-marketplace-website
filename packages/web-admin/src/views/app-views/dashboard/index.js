import { Spin } from 'antd';
import { useGetAuctionItemsQuery } from 'queries/Auction';
import { useGetMarketItemsQuery } from 'queries/NFT';
import React from 'react';

import { Doughnut } from 'react-chartjs-2';

const Dashboard = () => {
  const { data: NFTs, isLoading: nftsLoading } = useGetMarketItemsQuery();
  const { data: auctionItems, isLoading: auctionLoading } = useGetAuctionItemsQuery();

  const mappedData = {
    labels: ["NFTs", "Auction's NFTs"],
    datasets: [
      {
        label: '# of Votes',
        data: [NFTs?.length, auctionItems?.length],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <Spin spinning={nftsLoading || auctionLoading}>
      <Doughnut data={mappedData} />
    </Spin>
  )
}

export default Dashboard;
