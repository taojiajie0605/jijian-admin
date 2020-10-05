import { Badge, Card, Descriptions, Divider, Table, Popconfirm , DatePicker, Form, Button, Input} from 'antd';
import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormInstance } from 'antd/lib/form';
import reqwest from 'reqwest';
import styles from './style.less';
import { InfoOutlined } from '@ant-design/icons';

const getRandomuserParams = params => {
  return {
    results: params.pagination.pageSize,
    page: params.pagination.current,
    ...params,
  };
};

const getRandomuserParams1 = params => {
  return {
    results: params.pagination.pageSize,
    page: params.pagination.current,
    id: params.key.id,
    workpiece_total: params.key.workpiece_total,
    people_total: params.key.people_total,
    ...params,
  };
};

class Basic extends React.Component {

  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '记录编号',
        dataIndex: 'id',
        key: 'id',
        width: '8%',
      },
      {
        title: '监工账号',
        dataIndex: 'overseer_phone',
        key: 'overseer_phone',
        width: '10%',
      },
      {
        title: '监工姓名',
        dataIndex: 'overseername',
        key: 'overseername',
        width: '10%',
      },
      {
        title: '工种',
        dataIndex: 'type',
        key: 'type',
        width: '10%',
        render: (text: number) => {
          if (text === 1) {
            return <a>点口罩</a>;
          }else if(text === 2){
            return <a>包口罩</a>;
          }else{
            return <a>备用</a>;
          }
        },
      },
      {
        title: '计件数量',
        dataIndex: 'workpiece_total',
        key: 'workpiece_total',
        width: '10%',
      },
      {
        title: '工资',
        dataIndex: 'totalMoney',
        key: 'totalMoney',
        width: '10%',
      },
      {
        title: '班次',
        dataIndex: 'classes',
        key: 'classes',
        width: '10%',
      },
      {
        title: '员工数量',
        dataIndex: 'people_total',
        key: 'people_total',
        width: '10%',
      },
      {
        title: '提交时间',
        dataIndex: 'create_time',
        key: 'create_time',
        width: '10%',
      },
      {
        title: '操作',
        dataIndex: 'status',
        key: 'status',
        render: (text: string, record) => {
          return <div>
                <Popconfirm title="核验数据正确，确认入库吗?" onConfirm={() => this.handleconfirm( record )}>
                  <a>确认</a>
                </Popconfirm>
            </div>
        },
      }
    ];
  }

  state = {
    data: [],
    pagination: {
      current: 1,
      pageSize: 10,
    },
    loading: false,
  };

  componentDidMount() {
    const { pagination } = this.state;
    this.fetch({ pagination });
  }

  handleTableChange = (pagination) => {
    this.fetch({
      pagination,
    });
  };

  //确认
  handleconfirm = (key) => {
    //this.handledeletecom;
    const { pagination } = this.state;
    this.fetchconfirm({
      key,
      pagination,
    });
  };

  //确认
  fetchconfirm = (params = {}) => {
    this.setState({ loading: true });
    //console.log('确认',params);
    reqwest({
      url: '/api/confirmOneStockByAdmin',
      method: 'post',
      type: 'json',
      data: getRandomuserParams1(params),
    }).then(data => {
      console.log('确认',data);
      //console.log('1112222222',data.totalCount);
      this.setState({
        loading: false,
        data: data.result,
        pagination: {
          ...params.pagination,
          total: data.totalCount,
          // 200 is mock data, you should read it from server
          // total: data.totalCount,
        },
      });
    });
  };

  /*//删除
  handledelete = (key) => {
    //this.handledeletecom;
    const { pagination } = this.state;
    this.fetchdelete({
      key,
      pagination,
    });
  };

  //删除
  fetchdelete = (params = {}) => {
    this.setState({ loading: true });
    console.log('删除',params);
    reqwest({
      url: '/api/delOneStockByAdmin',
      method: 'post',
      type: 'json',
      data: getRandomuserParams(params),
    }).then(data => {
      console.log('删除',data);
      //console.log('1112222222',data.totalCount);
      this.setState({
        loading: false,
        data: data.result,
        pagination: {
          ...params.pagination,
          total: data.totalCount,
          // 200 is mock data, you should read it from server
          // total: data.totalCount,
        },
      });
    });
  };*/
  
  //查询
  fetch = (params = {}) => {
    this.setState({ loading: true });
    //console.log('查询',params);
    reqwest({
      //url: '/api/confirm',
      url: '/api/getStockByAdmin',
      method: 'post',
      type: 'json',
      data: getRandomuserParams(params),
    }).then(data => {
      //console.log('2222222',data);
      //console.log('1112222222',data.totalCount);
      this.setState({
        loading: false,
        data: data.result,
        pagination: {
          ...params.pagination,
          total: data.totalCount,
          // 200 is mock data, you should read it from server
          // total: data.totalCount,
        },
      });
    });
  };

  formRef = React.createRef<FormInstance>();

  render() {
    const { data, pagination, loading } = this.state;
    //console.log('33333333',pagination);
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>

          <div className={styles.title}>待核验（监工提交数据正确时，点确认，提交数据错误时，联系监工修改数据）</div>
          <Table
            columns={this.columns}
            dataSource={data}
            pagination={pagination}
            loading={loading}
            onChange={this.handleTableChange}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Basic
