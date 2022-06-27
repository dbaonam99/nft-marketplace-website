import { Col, Row, Spin, Typography } from 'antd';
import { useGetAuctionItemsQuery } from 'queries/Auction';
import { useGetMarketItemsQuery } from 'queries/NFT';
import { getUsers } from 'queries/User';
import React, { useEffect, useState } from 'react';

import { Doughnut, Line } from 'react-chartjs-2';
import { getFullDate } from '../artists-management/list';


const getUniq = (arr) => {
  return arr?.reduce(function (a, b) {
    if (a.indexOf(b) < 0) a.push(b);
    return a;
  }, []);
}
const { Title } = Typography;

const Dashboard = () => {
  const { data: NFTs, isLoading: nftsLoading } = useGetMarketItemsQuery();
  const { data: auctionItems, isLoading: auctionLoading } = useGetAuctionItemsQuery();
  const [artistsData, setArtistsData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const resp = await getUsers();
        setArtistsData(resp);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [])

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

  const labels = getUniq(artistsData.map(item => getFullDate(item?.createdAt)));

  const artistsDataMapped = artistsData.map(item => ({
    ...item,
    createdAt: getFullDate(item?.createdAt)
  }));

  const totalUsers = {};
  for (let item of artistsDataMapped) {
    if (totalUsers[item.createdAt]) {
      totalUsers[item.createdAt] = totalUsers[item.createdAt] + 1;
    } else {
      totalUsers[item.createdAt] = 1;
    }
  }

  console.log(artistsDataMapped, totalUsers)
  const mappedUsers = {
    labels,
    datasets: [
      {
        label: 'Artists',
        data: Object.values(totalUsers),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <Spin spinning={nftsLoading || auctionLoading || isLoading}>

      <Row>
        <Col span={12}>
          <Title>NFTs</Title>
          <Doughnut data={mappedData} />
        </Col>
        <Col span={12}>
          <Title>Total Artists</Title>
          <Line data={mappedUsers} />
        </Col>
      </Row>
    </Spin>
  )
}

export default Dashboard;
