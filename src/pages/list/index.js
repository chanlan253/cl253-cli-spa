import React, { Component } from "react";
import axios from "@/plugins/axios";
import moment from "moment";
import { Table, Divider, message, Tag, Button, Icon, Input, TreeSelect, DatePicker } from "antd";
import Box from "components/box";
const { RangePicker } = DatePicker;
const { Search } = Input;
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {},
      list: [
        {
          key: "1",
          name: "John Brown",
          age: 32,
          address: "New York No. 1 Lake Park"
        },
        {
          key: "2",
          name: "Jim Green",
          age: 42,
          address: "London No. 1 Lake Park"
        },
        {
          key: "3",
          name: "Joe Black",
          age: 32,
          address: "Sidney No. 1 Lake Park"
        },
        {
          key: "4",
          name: "Disabled User",
          age: 99,
          address: "Sidney No. 1 Lake Park"
        }
      ],
      treeData: [],
      loading: false,
      selectedRowKeys: [] //选择的筛选框
    };
    this.title_keywords = "";
    this.class_ids = ""; //搜索的分类
    this.starttime = ""; //开始时间
    this.endtime = ""; //结束时间
  }
  columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: text => <a>{text}</a>
    },
    {
      title: "Age",
      dataIndex: "age"
    },
    {
      title: "Address",
      dataIndex: "address"
    }
  ];
  /* 表格选项更改 */
  /* ================================================== */
  handleTableChange = (pagination, filters, sorter) => {
    this.getData({ ...pagination, ...sorter });
  };

  /* 输入框搜索内容 */
  searchChange = e => {
    this.title_keywords = e.target.value;
  };

  /* 选择日期 */
  rangeChange = (dates, dateStrings) => {
    this.starttime = dateStrings[0];
    this.endtime = dateStrings[1];
    this.getData();
  };

  /* 表格选择 */
  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  /* 获取数据 */
  /* ================================================== */
  getData = params => {};

  componentDidMount() {
    this.getData();
  }

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    return (
      <Box title="发送记录">
        <div className="table_filter">
          <div className="filter_left">
            <div className="filter_list">
              <label>创建时间：</label>
              <RangePicker onChange={this.rangeChange} style={{ width: 280 }} />
            </div>
            <div className="filter_list">
              <label>搜索：</label>
              <Search
                placeholder="输入标题关键字搜索"
                onChange={this.searchChange}
                onSearch={() => {
                  this.getData();
                }}
                style={{ width: 200 }}
              />
            </div>
          </div>
          <div className="filter_right">
            <div className="filter_list">
              <Button type="primary">添加</Button>
            </div>
            <div className="filter_list">
              <Button type="danger">批量删除</Button>
            </div>
          </div>
        </div>
        <div className="table_wrap">
          <Table
            rowSelection={rowSelection}
            rowKey={record => record.key}
            columns={this.columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
            loading={this.state.loading}
            onChange={this.handleTableChange}
          />
        </div>
      </Box>
    );
  }
}

export default List;
