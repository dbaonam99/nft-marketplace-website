import { Upload, Modal, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { CDN_URL } from 'configs/AppConfig';
import imageApi from 'services/imageApi';
import "./style.css";

const PAGE_SIZE = 20;
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const ImageList = (props) => {
  const { items, type, setFile, file, setListState } = props;
  const [state, setState] = useState({
    previewVisible: false,
    previewImage: '',
    fileList: []
  })

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      fileList: items?.map(item => ({
        uid: item._id,
        name: item.title,
        status: "done",
        url: `${CDN_URL}${item.url}`,
      }))
    }))
  }, [items])

  const handleCancel = () => {
    setState(prevState => ({
      ...prevState,
      previewVisible: false
    }))
  };

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setState(prevState => ({
      ...prevState,
      previewImage: file.url || file.preview,
      previewVisible: true,
    }));
  };

  const handleChange = () => { return }

  const handleUpload = async (e) => {
    try {
      const form = new FormData();
      form.append("type", type);
      form.append("image", e.file);
      const resp = await imageApi.upload(form);
      if (resp.status === 1) {
        e.onSuccess(resp.data, e.file);
        notification["success"]({
          message: "Thêm ảnh thành công",
          description: "Ảnh đã được thêm thành công"
        });
        if (setListState) setListState(prevState => ({
          pagination: {
            current: 1,
            pageSize: PAGE_SIZE,
          },
          filters: {
            ...prevState.filters,
            keyword: "",
          },
        }))
      } else {
        notification["error"]({
          message: "Thêm ảnh thất bại",
          description:
            resp.msg,
        });
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleChoose = (file) => {
    if (setFile) setFile(file);
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const itemRender = (originNode, currentFile) => {
    return (
      <div className={`custom-item-render ${file.uid === currentFile.uid ? "active" : ""}`} onClick={() => handleChoose(currentFile)}>
        {originNode}
      </div>
    );
  };

  return (
    <div className="clearfix mt-3">
      <Upload
        accept="image/*"
        listType="picture-card"
        fileList={state.fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        customRequest={handleUpload}
        itemRender={itemRender}
        showUploadList={{
          showRemoveIcon: false
        }}
      >

        {uploadButton}
      </Upload>
      <Modal destroyOnClose visible={state.previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" width="100%" src={state.previewImage} />
      </Modal>
    </div>
  );
}

export default ImageList