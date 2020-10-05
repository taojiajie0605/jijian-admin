import { Button, Card,  Input, Form, Radio, InputNumber } from 'antd';
import { connect, Dispatch, FormattedMessage} from 'umi';
import React, { FC } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { values } from 'lodash';

const FormItem = Form.Item;
const { TextArea } = Input;

interface BasicFormProps {
  submitting: boolean;
  dispatch: Dispatch<any>;
}

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const BasicForm: FC<BasicFormProps> = (props) => {
  const { submitting } = props;
  const [form] = Form.useForm();
  const [showPublicUsers, setShowPublicUsers] = React.useState(false);
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 10 },
    },
  };

  const submitFormLayout = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 10, offset: 7 },
    },
  };

  const onFinish = (values: { [key: string]: any }) => {
    const { dispatch } = props;
    //console.log('2222222',values);
    dispatch({
      type: 'formAndbasicForm/submitRegularForm',
      payload: values,
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    // eslint-disable-next-line no-console
    //console.log('Failed:', errorInfo);
  };

  const onValuesChange = (changedValues: { [key: string]: any }) => {
    const { publicType } = changedValues;
    if (publicType) setShowPublicUsers(publicType === '2');
  };

  return (
    <PageHeaderWrapper>

      <Card bordered={false}>
        <Form
          hideRequiredMark
          style={{ marginTop: 8 }}
          form={form}
          name="basic"
          initialValues={{ public: '1' }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
        >
          <FormItem
            {...formItemLayout}
            label='手机号  (默认密码123456)'
            name="phone"
            rules={[
              {
                required: true,
                message: '请正确输入员工手机号',
                type:'number',
                transform(value) {
                  if(value){
                    return Number(value);
                  }
                },
              },
            ]}
          >
            <Input placeholder='请输入手机号' maxLength='11'  minlength="11" />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='姓名'
            name="name"
            rules={[
              {
                required: true,
                message: '请输入员工姓名',
              },
            ]}
          >
            <Input placeholder='请输入姓名'/>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='银行卡号'
            name="bank"
            rules={[
              {
                required: true,
                message: '请正确输入银行卡号',
                type:'number',
                    transform(value) {
                      if(value){
                        return Number(value);
                      }
                    },
              },
            ]}
          >
            <Input placeholder='请输入银行卡号' maxLength='20'/>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='员工岗位'
            name="position"
            rules={[
              {
                required: true,
                message: '请选择员工岗位',
              },
            ]}
          >
              <Radio.Group>
                <Radio value="2">普通员工</Radio>
                <Radio value="1">监工</Radio>
              </Radio.Group>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='备注'
            name="beizhu"
            rules={[
              {
                required: true,
                message: '请输入员工入厂时间等信息',
              },
            ]}
          >
            <TextArea
              style={{ minHeight: 32 }}
              placeholder='请输入员工入厂时间等信息'
              rows={5}
            />
          </FormItem>
          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" loading={submitting}>
              <FormattedMessage id="formandbasic-form.form.submit" />
            </Button>
          </FormItem>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
  submitting: loading.effects['formAndbasicForm/submitRegularForm'],
}))(BasicForm);
