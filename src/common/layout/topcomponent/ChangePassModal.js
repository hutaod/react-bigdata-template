import React, { Component } from 'react';
import { Button, Form, Input } from 'antd';
import MainModal from '../../../common/components/MainModal';

const FormItem = Form.Item;

class ChangePassModal extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleOk(values);
            }
        });
    }
    handleConfirmPassword = (rule, value, callback) => {
        const { getFieldValue } = this.props.form;
        if (value && value !== getFieldValue('newPass')) {
            callback('两次输入不一致！');
        }
        callback();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 4,
            },
            wrapperCol: {
                span: 20,
            },
        };
        return (
            <MainModal
                visible={true}
                title="修改密码"
                onOk={this.handleSubmit}
                onCancel={this.props.handleCancel}
                footer={[
                    <Button key="submit" type="primary" onClick={this.handleSubmit}>
                        保存
                    </Button>,
                    <Button key="back" onClick={this.props.handleCancel}>取消</Button>,
                ]}
            >
                <Form>
                    <FormItem label="旧密码" {...formItemLayout}>
                        {getFieldDecorator('oldPass', {
                            rules: [{ required: true, message: '请输入旧密码' }],
                        })(
                            <Input placeholder="请输入旧密码" type="password" />
                        )}
                    </FormItem>
                    <FormItem label="新密码" {...formItemLayout}>
                        {getFieldDecorator('newPass', {
                            rules: [{ required: true, message: '请输入新密码' }, { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, message: '请输入6-20位字母数字组合' }],
                        })(
                            <Input placeholder="请输入新密码，6-20位字母数字组合" type="password" />
                        )}
                    </FormItem>
                    <FormItem label="确认密码" {...formItemLayout}>
                        {getFieldDecorator('confirmPass', {
                            rules: [{ required: true, message: '请再次输入新密码' }, { validator: this.handleConfirmPassword }],
                        })(
                            <Input placeholder="请重新输入新密码" type="password" />
                        )}
                    </FormItem>
                </Form>
            </MainModal>
        )
    }
}
const WrappedChangePassModal = Form.create()(ChangePassModal);
export default WrappedChangePassModal;