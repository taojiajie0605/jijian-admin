import { Badge, Card, Descriptions, Divider, Table , DatePicker, Form, Button, Input,Popconfirm} from 'antd';
import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormInstance } from 'antd/lib/form';
import reqwest from 'reqwest';
import styles from './style.less';
import moment from 'moment';

const { RangePicker } = DatePicker;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const getRandomuserParams = params => {
  return {
    results: params.pagination.pageSize,
    page: params.pagination.current,
    resultsUp: params.pagination1.pageSize,
    pageUp: params.pagination1.current,
    ...params,
    //phone: params.phone,
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
        title: '工人账号',
        dataIndex: 'phone',
        key: 'phone',
        width: '10%',
      },
      {
        title: '工人姓名',
        dataIndex: 'workername',
        key: 'workername',
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
        dataIndex: 'number',
        key: 'number',
        width: '10%',
      },
      {
        title: '计件单价（元/件）',
        dataIndex: 'price',
        key: 'price',
        width: '10%',
      },
      {
        title: '金额/元',
        dataIndex: 'count',
        key: 'count',
        width: '10%',
      },
      {
        title: '状态',
        dataIndex: 'is_pay',
        key: 'is_pay',
        width: '10%',
        render: ( text: number ) => {
          if(text === 0 ){
            return <Badge status="processing" text="未转账" />;
          }else{
            return <Badge status="success" text="已转账" />;
          }
        },
      },
      {
        title: '审核时间',
        dataIndex: 'confirm_time',
        key: 'confirm_time',
      },
    ];

  this.tablecolumns = [
    {
      title: '工人账号',
      dataIndex: 'phone',
      key: 'phone',
      width: '20%',
    },
    {
      title: '行内转账收款账户',
      dataIndex: 'bank',
      key: 'bank',
      width: '20%',
    },
    {
      title: '行内转账收款户名',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
    },
    {
      title: '行内转账金额',
      dataIndex: 'totalAccount',
      key: 'totalAccount',
      width: '20%',
    }, 
    {
      title: '操作',
      dataIndex: 'totalAccount',
      key: 'totalAccount',
      render: ( text: number,record ) => {
        if(text === 0 ){
          return <Badge status="success" text="已转账" />;
        }else{
          return <div>
              <Popconfirm title="确认已转账吗?" onConfirm={() => this.handleconfirmpay(record.phone)}>
                <a>点击确认转账</a>
              </Popconfirm>
          </div>
        }
      },
    }
  ];
}

  state = {
    data: [],
      //总显示
    datatotal : [],
    pagination: {
      current: 1,
      pageSize: 10,
    },
    pagination1: {
      current: 1,
      pageSize: 10,
    },
    startTime:undefined,//开始时间
    endTime:undefined,  //结束时间
    loading: false,
    phone: "",
    totalMoney: 0,
  };

  componentDidMount() {
    const { pagination,pagination1,phone,startTime, endTime } = this.state;
    this.fetchsearch({ pagination,phone,startTime, endTime,pagination1 });
  }

  //条件查询
  handleTableChange = (values= {}) => {
    const { startTime, endTime } = this.state;
    this.fetchsearch({
      pagination: {
        current: 1,
        pageSize: 10,
      },
      pagination1: {
        current: 1,
        pageSize: 10,
      },
      startTime,
       endTime,
      ...values,
    });
  };

  //分页上表
  handleTableChangeup = (pagination1= {}) => {
    const {phone, startTime, endTime,pagination } = this.state;
    this.fetchsearch({
      pagination,
      pagination1,
      phone,
      startTime,
      endTime,
    });
  };

  //分页下表
  handleTableChangedown = (pagination= {}) => {
    const {phone, startTime, endTime ,pagination1} = this.state;
    this.fetchsearch({
      pagination1,
      pagination,
      phone,
      startTime,
      endTime,
    });
  };

  //确认转账
  handleconfirmpay = (key={}) => {
    const {phone, startTime, endTime,pagination,pagination1 } = this.state;
    this.fetchconfirmpay({
      pagination,
      pagination1,
      key,
      phone,
      startTime,
      endTime,
    });
  };

  //确认转账
  fetchconfirmpay = (params = {}) => {
    this.setState({ loading: true });
    console.log('数据请求',params);
    reqwest({
      //url: '/api/profile/basic',
      url: '/api/confirmPayByAdmin',
      method: 'post',
      type: 'json',
      data: getRandomuserParams(params),
    }).then(data => {
      //console.log('返回数据',data);
      //console.log('1112222222',data.totalCount);
      this.setState({
        loading: false,
        data: data.result,
        datatotal: data.userInfo,
        phone: params.phone,
        totalMoney: data.totalMoney,
        pagination: {
          ...params.pagination,
          total: data.totalCount,
          // 200 is mock data, you should read it from server
          // total: data.totalCount,
        },
        pagination1: {
          ...params.pagination1,
          total: data.totalUpCount,
          // 200 is mock data, you should read it from server
          // total: data.totalCount,
        },
      });
      //this.handleChangeData;
    });
  };

  /*//起始查询
  fetch = (params = {}) => {
    this.setState({ loading: true });
    console.log('数据请求',params);
    reqwest({
      url: '/api/getAllRecordByAdmin',
      method: 'post',
      type: 'json',
      data: getRandomuserParams(params),
    }).then(data => {
      console.log('返回数据',data);
      //console.log('1112222222',data.totalCount);
      this.setState({
        loading: false,
        data: data.result,
       // totalAccount: data.totalAccount,
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
  fetchsearch = (params = {}) => {
    this.setState({ loading: true });
    console.log('数据请求',params);
    reqwest({
      //url: '/api/profile/basic',
      url: '/api/searchRecordByAdmin',
      method: 'post',
      type: 'json',
      data: getRandomuserParams(params),
    }).then(data => {
      //console.log('返回数据',data);
      //console.log('1112222222',data.totalCount);
      this.setState({
        loading: false,
        data: data.result,
        datatotal: data.userInfo,
        phone: params.phone,
        totalMoney: data.totalMoney,
        pagination: {
          ...params.pagination,
          total: data.totalCount,
          // 200 is mock data, you should read it from server
          // total: data.totalCount,
        },
        pagination1: {
          ...params.pagination1,
          total: data.totalUpCount,
          // 200 is mock data, you should read it from server
          // total: data.totalCount,
        },
      });
      //this.handleChangeData;
    });
  };

  //时间改变
  onPickerChange=(date, dateString)=>{
    //console.log("data",date,"dateString",dateString);
    //这两个参数值antd自带的参数
    console.log("dateString",dateString[0],"dateString",dateString[1]);
    this.setState({
      startTime:dateString[0],
      endTime:dateString[1],  
    })
  }

  formRef = React.createRef<FormInstance>();

  render() {
    const { data,datatotal, pagination,pagination1, loading,totalMoney} = this.state;
    //console.log('totalAccount',totalAccount);
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>

          <Table
            columns={this.tablecolumns}
            dataSource={datatotal}
            pagination={pagination1}
            loading={loading}
            onChange={this.handleTableChangeup}
          />

          <Descriptions title="总工资" >
            <Descriptions.Item label="该时间段总工资">{totalMoney}元</Descriptions.Item>
          </Descriptions>
          
          <Form  ref={this.formRef} name="control-ref" onFinish={this.handleTableChange}
              style={{ width:'800px'}}>
            <Form.Item name="phone" label="员工账号" 
            rules={[
              { 
                type:'number',
                    transform(value) {
                      if(value){
                        return Number(value);
                      }
                    },
              },
            ]}>
              <Input
                style={{ width: '100%' }}
                placeholder='请输入员工账号'
                maxLength='11'
                minLength='11'
              />
            </Form.Item>
            <Form.Item name="date" label="起止日期" rules={[{ required: true }]}>
              <RangePicker
                style={{ width: '100%' }}
                showTime={{
                  hideDisabledOptions: true,
                  defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('00:00:00', 'HH:mm:ss')],
                }}
                format="YYYY-MM-DD HH:00"
                onChange={this.onPickerChange} 
              />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </Form.Item>
          </Form>

          <Table
            columns={this.columns}
            dataSource={data}
            pagination={pagination}
            loading={loading}
            onChange={this.handleTableChangedown}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Basic
