import { Button, Form } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useStore } from "../../store/todoStore";

const TodoCreatePage = () => {
  const { addTodo } = useStore();
  let router = useRouter();

  const onFinish = (values: { body: string }) => {
    console.log("Success:", values);
    addTodo(values.body);
    router.push("/todo/");
  };

  const onFinishFailed = (errorInfo: any) => {
    toast.success("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="body"
        name="body"
        rules={[{ required: true, message: "Add your todo!" }]}
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TodoCreatePage;
