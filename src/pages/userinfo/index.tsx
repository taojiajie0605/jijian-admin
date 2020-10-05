import { Card, Descriptions, Divider, Table, Popconfirm , Radio, Form, Button, Input, Modal} from 'antd';
import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormInstance } from 'antd/lib/form';
import reqwest from 'reqwest';
import styles from './style.less';
import { InfoOutlined } from '@ant-design/icons';

const { TextArea } = Input;

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
    ...params,
  };
};

class Userinfo extends React.Component {

  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '员工账号',
        dataIndex: 'phone',
        key: 'phone',
        width: '16%',
      },
      {
        title: '员工姓名',
        dataIndex: 'name',
        key: 'name',
        width: '16%',
      },
      {
        title: '银行卡号',
        dataIndex: 'bank',
        key: 'bank',
        width: '16%',
      },
      {
        title: '员工岗位',
        dataIndex: 'role',
        key: 'role',
        width: '16%',
        render: (text: number) => {
          if (text === 1) {
            return "监工";
          }
          return "普通员工";
        },
      },
      {
        title: '备注',
        dataIndex: 'remarks',
        key: 'remarks',
        width: '16%',
      },
      {
        title: '操作',
        dataIndex: 'status',
        key: 'status',
        render: (text: string, record: []) => {
          return <div>
                <a onClick={() =>this.showModal( record )}>修改</a>
                <Divider type="vertical" />
                <Popconfirm title="确认删除该员工信息吗?" onConfirm={() => this.handledelete( record.phone )}>
                  <a>删除</a>
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
    //对话框
    visible: false,
    //一行数据
    recordline: [],
    role: '2',
  };

  componentDidMount() {
    const { pagination } = this.state;
    this.fetch({ pagination });
  }

  showModal = (key= {}) => {
    if(key.role === 1){
      this.setState({
        role: '1',
      });
    }else{
      this.setState({
        role: '2',
      });
    }
    this.setState({
      visible: true,
      recordline: key,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };

  handleTableChange = (pagination= {}) => {
    this.fetch({
      pagination,
    });
  };

  //搜索
  handleTableChange1 = (values= {}) => {
    //console.log('时间',values);
    this.fetchsearch({
      pagination: {
        current: 1,
        pageSize: 10,
      },
      ...values,
    });
  };

  //修改
  handleTableChange2 = (values= {}) => {
    //console.log('时间',values);
    this.fetchmodify({
      pagination: {
        current: 1,
        pageSize: 10,
      },
      ...values,
    });
  };

  //删除
  handledelete = (key= {}) => {
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
    //console.log('删除',params);
    reqwest({
      //url: '/api/userinfo',
      url: '/api/delOneUserByAdmin',
      method: 'post',
      type: 'json',
      data: getRandomuserParams(params),
    }).then(data => {
      //console.log('删除',data);
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
  //初始查询
  fetch = (params = {}) => {
    this.setState({ loading: true });
    //console.log('查询',params);
    reqwest({
      //url: '/api/userinfo',
      url: '/api/getAllUserByAdmin',
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

  //搜索
  fetchsearch = (params = {}) => {
    this.setState({ loading: true });
    //console.log('搜索',params);
    reqwest({
      url: '/api/searchUserByAdmin',
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

  //修改
  fetchmodify = (params = {}) => {
    this.setState({ loading: true });
    //console.log('修改',params);
    reqwest({
      //url: '/api/userinfo',
      url: '/api/editUserByAdmin',
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
    const { data, pagination, loading, recordline, role } = this.state;
    //console.log('33333333',pagination);
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          
          <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.handleTableChange1}>
            <Form.Item name="phone" label="员工账号" 
            rules={[{ 
              required: true,
              message: '请正确输入员工手机号',
                type:'number',
                transform(value) {
                  if(value){
                    return Number(value);
                  }
                },
            }]}>
            <Input
                style={{ width: '50%' }}
                placeholder='请输入员工账号'
                maxLength='11'  minlength="11" 
              />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </Form.Item>
          </Form>

          <div className={styles.title}>员工信息查询/修改</div>
          <Table
            columns={this.columns}
            dataSource={data}
            pagination={pagination}
            loading={loading}
            onChange={this.handleTableChange}
          />

          <Modal
          title="修改信息"
          visible={this.state.visible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
          destroyOnClose={true}
          >
            <Form {...layout} ref={this.formRef} name="control-ref1" onFinish={this.handleTableChange2}
              initialValues={{
                phone: recordline.phone,
                password: 123456,
                name: recordline.name,
                bank: recordline.bank,
                role: role,
                remarks: recordline.remarks,
              }}
            >
              <Form.Item name="phone" label="员工账号" >
                <Input
                  style={{ width: '60%' }}
                  defaultValue={recordline.phone}
                  disabled
                />
              </Form.Item>
              <Form.Item name="password" label="密码" >
                <Input
                  style={{ width: '60%' }}
                  defaultValue= '123456'
                />
              </Form.Item>
              <Form.Item name="bank" label="银行卡号" >
                <Input
                  style={{ width: '60%' }}
                  defaultValue= {recordline.bank}
                />
              </Form.Item>
              <Form.Item name="name" label="员工姓名" >
                <Input
                  style={{ width: '60%' }}
                  defaultValue={recordline.name}
                />
              </Form.Item>
              <Form.Item name="role" label="员工岗位" >
                <Radio.Group defaultValue={role}>
                  <Radio value="2">普通员工</Radio>
                  <Radio value="1">监工</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item name="remarks" label="备注" >
                <Input
                style={{ width: '60%' }}
                rows={4}
                defaultValue={recordline.remarks}
                />
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" onClick={this.hideModal} loading={loading}>
                  确认修改
                </Button>
              </Form.Item>
            </Form>
          </Modal>

        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Userinfo
