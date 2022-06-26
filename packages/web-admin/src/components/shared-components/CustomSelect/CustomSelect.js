import React, { memo, useRef } from 'react';
import PropTypes from 'prop-types'
import { Avatar, Select } from 'antd';

const { Option } = Select;

const CustomSelect = props => {
  const {
    placeholder,
    options,
    onSearch,
    type
  } = props;
  const typingTimeoutRef = useRef(null);

  const handleSearch = (value) => {
    if (!value.trim()) {
      onSearch(type, "")
    } else {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);	
      }
      typingTimeoutRef.current = setTimeout(() => {
        onSearch(type, value)
      }, 800)
    }
  }

  return (
    <Select 
      mode="multiple"
      showSearch
      placeholder={placeholder}
      optionFilterProp="children"
      filterOption={false}
      onSearch={handleSearch}
      value={props.value}
      onChange={props.onChange}
    >
      {
        options?.map(elm => (
          <Option key={elm.value} value={elm.value}>
            {
              elm.image &&
              <Avatar src={elm.image} size="small" className="mr-2" />
            }
            {elm.label}
          </Option>
        ))
      }
    </Select>
	)
}

CustomSelect.propTypes = {
	placeholder: PropTypes.string.isRequired,
  options: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    image: PropTypes.string
  }).isRequired,
  onSearch: PropTypes.func.isRequired
}


export default memo(CustomSelect);
