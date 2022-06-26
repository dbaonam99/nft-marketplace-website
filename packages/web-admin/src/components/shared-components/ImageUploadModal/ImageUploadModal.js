import React, { useState, useEffect, useRef } from 'react';
import { Modal, Tabs, Input, Pagination } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Flex from '../Flex';
import imageApi from 'services/imageApi';
import ImageList from './ImageList';
import Loading from '../Loading';
import { PlusOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const PAGE_SIZE = 20;
const POST_COLUMNS = ["title"];
const types = [
  {
    label: "Poster",
    value: "poster"
  },
  {
    label: "Thumbnails",
    value: "thumbnails"
  },
  {
    label: "Episode",
    value: "episode"
  },
  {
    label: "Actor",
    value: "actor"
  },
  {
    label: "Director",
    value: "director"
  }
]

const ImageUploadModal = (props) => {
  const { file, setFile, className } = props;
  const [state, setState] = useState({
    pagination: {
      current: 1,
      pageSize: PAGE_SIZE,
    },
    filters: {
      keyword: "",
      type: types[0].value
    },
    sort: {
      field: undefined,
      order: undefined
    },
    data: [],
    loading: false,
  })
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState({})
  const [searchTerms, setSearchTerms] = useState("");
  const typingTimeoutRef =  useRef(null)

  useEffect(() => {
    setImage(file)
  }, [file])

  // fetch data
  const fetchData = async () => {
    try {
      setState(prevState => ({
        ...prevState,
        loading: true
      }))
      const data = {
        pageSize: state.pagination.pageSize,
        current: state.pagination.current,
        column: POST_COLUMNS,
        search: state.filters,
        ...state.sort,
      } 
      const resp = await imageApi.getAll(data);
      if (resp.status === 1) {
        setState(prevState => ({
          ...prevState,
          data: resp.data,
          selectedRowKeys: [],
          pagination: {
            ...prevState.pagination,
            total: resp.recordsFiltered,
          },
        }))
      }
    } catch (error) {
      console.log(error);
    } finally {
      setState(prevState => ({
        ...prevState,
        loading: false
      }))
    }
  }

  useEffect(() => {
    if (visible) {
      fetchData()
    }
  }, [state.filters, state.pagination.current, state.pagination.pageSize, state.sort, visible])

  useEffect(() => {
    if (!visible) {
      setState({
        pagination: {
          current: 1,
          pageSize: PAGE_SIZE,
        },
        filters: {
          keyword: "",
          type: types[0].value
        },
        sort: {
          field: undefined,
          order: undefined
        },
        data: [],
        loading: false,
      })
    }
  }, [visible])

  const handleOpenModal = () => {
    setVisible(true);
  }

  const handleCloseModal = () => {
    setVisible(false);
  }

  const handleTabChange = (value) => {
    setState(prevState => ({
      ...prevState,
      filters: {
        ...prevState.filters,
        type: value
      }
    }))
  }

  const handleOk = () => {
    if (setFile) {
      setFile(image)
      setVisible(false);
    }
  }

  const onSearch = e => {
    const value = e.currentTarget.value;
    setSearchTerms(value);

		if (typingTimeoutRef.current) {
			clearTimeout(typingTimeoutRef.current);	
		}

		typingTimeoutRef.current = setTimeout(() => {
      setState(prevState => ({
        ...prevState,
        filters: {
          ...prevState.filters,
          keyword: value.trim()
        },
        pagination: {
          ...prevState.pagination,
          current: 1,
        },
      }))
		}, 800)
	}

  const handleTableChange = (value) => {
    setState(prevState => ({
      ...prevState,
      pagination: {
        ...prevState.pagination,
        current: value
      },
    }))
  }

  function onShowSizeChange(current, pageSize) {
    setState(prevState => ({
      ...prevState,
      pagination: {
        ...prevState.pagination,
        current: current,
        pageSize: pageSize
      },
    }))
  }
  
	return (
		<div>
      <div onClick={handleOpenModal}>
        <Flex 
          alignItems="center" 
          justifyContent="center" 
          className={`ant-upload ant-upload-select-picture-card mt-3 p-2 ${className ? className : ""}`}
        >
          {
            file.url ?
            <img src={file.url} className="img-fluid" style={{maxHeight: "100%"}}/> :
            <div>
              <PlusOutlined />
              <div className="ant-upload-text">Thêm ảnh</div>
            </div>
          }
        </Flex>
      </div>
      <Modal
        visible={visible}
        onOk={handleOk}
        onCancel={handleCloseModal}
        closable={false}
        width="60%"
        destroyOnClose
      >
        <Tabs defaultActiveKey={types[0].value} onChange={handleTabChange}>
          {
            types.map(item =>
              <TabPane tab={item.label} key={item.value}>
                <Flex mobileFlex={false}>
                  <div className="mr-md-3 mr-3">
                    <Input 
                      placeholder="Search" 
                      prefix={<SearchOutlined />} 
                      onChange={e => onSearch(e)}
                      value={searchTerms}
                    />
                  </div>
                </Flex>
                {
                  state.loading ? 
                  <Loading /> :
                  <ImageList 
                    items={state.data} 
                    type={state.filters.type} 
                    file={image}
                    setFile={setImage}
                    setListState={setState}
                  />
                }

                <Pagination 
                  {...state.pagination}
                  showSizeChanger
                  onShowSizeChange={onShowSizeChange}
                  style={{textAlign: "right"}}
                  onChange={handleTableChange}
                />
              </TabPane>
            )
          }
        </Tabs>
      </Modal>
    </div>
	)
}

export default ImageUploadModal