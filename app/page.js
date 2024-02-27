"use client";
import Image from "next/image";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { Card, Col, Row, Button, Form, message, Space, Upload } from "antd";
import { useState } from "react";
export default function Home() {
  const [form] = Form.useForm();
  const [datas, setDatas] = useState();

  const onFinish = async (values) => {
    const { uploadFile } = values;
    let data = new FormData();
    data.append("sampleFile", values.uploadFile.fileList[0].originFileObj);
    console.log("uploadFile", uploadFile);

    axios
      .post("http://localhost:8081/api/v0/upload-file", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        message.success("Submit success!");
        setDatas(response.data.data);
      })
      .catch(function (error) {
        message.error("Submit failed!");
      });
  };

  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  return (
    <main className="flex  flex-col items-center justify-between ">
      <div className="z-10 mt-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Total Number of Words" bordered={false}>
              {datas?.wordCount ? datas.wordCount : 0}
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Total Number of Characters" bordered={false}>
              {datas?.characterCount ? datas.characterCount : 0}
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Total Number of Sentence" bordered={false}>
              {datas?.sentenceCount ? datas.sentenceCount : 0}
            </Card>
          </Col>
        </Row>
      </div>
      <div className=" z-10 mt-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Row gutter={16}>
          <Col span={12}>
            <Card title="Total Number of Paragraph" bordered={false}>
              {datas?.paraCount ? datas.paraCount : 0}
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Longest Word" bordered={false}>
              {datas?.longestwords ? datas.paraCount : "N/A"}
            </Card>
          </Col>
        </Row>
      </div>
      <div className="z-10 max-w-5xl  w-full items-center justify-between font-mono text-sm lg:flex mt-10">
        <Card title="Upload File" className="w-full " bordered={false}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="uploadFile"
              label="Upload Text File"
              rules={[{ required: true }]}
            >
              <Upload maxCount={1}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="default" htmlType="submit">
                  Submit
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </main>
  );
}
