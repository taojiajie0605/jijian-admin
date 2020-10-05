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

class BasicPass extends React.Component {

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
        title: '核验时间',
        dataIndex: 'examine_time',
        key: 'examine_time',
        width: '10%',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text: string, record) => {
          if (text === 'success') {
            return <Badge status="success" text="核验成功" />;
          }
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
  
  //查询
  fetch = (params = {}) => {
    this.setState({ loading: true });
    //console.log('查询',params);
    reqwest({
      url: '/api/getConfirmStock',
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

          <div className={styles.title}>已核验</div>
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

export default BasicPass
