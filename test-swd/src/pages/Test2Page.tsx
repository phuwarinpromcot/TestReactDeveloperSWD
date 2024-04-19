import { Button, Form, Input, Row, Select, DatePicker, Radio } from "antd";
import "../styles/scss/test2.scss";
import { useTranslation } from "react-i18next";
import { TableData } from "../component/table-data";
import { useDispatch } from "react-redux";
import { addFormData, clearFormData } from "../formSlice";
const { Option } = Select;

export const setLocalStorage = (key: string, values: string) => {
  window.localStorage.setItem(key, values);
  return "store successfully";
};

export const getLocalStorage = (key: string) => {
  return window.localStorage.getItem(`${key}`);
};

export const Test2Page = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const submitForm = () => {
    form.validateFields().then((values) => {
      const newData = {
        name: `${values["คำนำหน้า"]} ${values["first name"]} ${values["last name"]}`,
        birthday: values["birthday"].toDate(), // Convert to Date object
        gender: `${values["gender"]}`,
        IDcard: values["ID card"] || null,
        phoneNumber: `+${values["prefix"]} ${values["phone"]}`,
        national: `${values["national"]}`,
        passport: `${values["passport"]}` || null,
        salary: parseInt(values["salary"]),
      };

      dispatch(addFormData(newData));

      const existingData = JSON.parse(getLocalStorage("formData") || "[]");
      const updatedData = [...existingData, newData];
      setLocalStorage("formData", JSON.stringify(updatedData));

      form.resetFields();
    });
  };

  const clearForm = () => {
    dispatch(clearFormData());
    form.resetFields();
  };

  return (
    <>
      <div className="task">
        <h4 className="titleTest2">{t("subTitle2")}</h4>
        <div className="form">
          <Form form={form} onFinish={submitForm}>
            <Row>
              <Form.Item
                label="คำนำหน้า"
                name="คำนำหน้า"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Select placeholder="คำนำหน้า">
                  <Option key="นาย" value="นาย">
                    นาย
                  </Option>
                  <Option key="นางสาว" value="นางสาว">
                    นางสาว
                  </Option>
                  <Option key="นาง" value="นาง">
                    นาง
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="ชื่อจริง"
                name="first name"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="นามสกุล"
                name="last name"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Input />
              </Form.Item>
            </Row>
            <Row>
              <Form.Item
                label="วันเกิด"
                name="birthday"
                rules={[{ required: true }]}
              >
                <DatePicker placeholder="เดือน/วัน/ปี" />
              </Form.Item>
              <Form.Item
                label="สัญชาติ"
                name="national"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Select placeholder="--กรุณาเลือก--">
                  <Option key="thia" value="ไทย">
                    ไทย
                  </Option>
                  <Option key="eng" value="อังกฤษ">
                    อังกฤษ
                  </Option>
                </Select>
              </Form.Item>
            </Row>
            <Row>
              <Form.Item label="เลขบัตรประชาชน" name="ID card">
                <Input />
              </Form.Item>
            </Row>
            <Row>
              <Form.Item
                label="เพศ"
                name="gender"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Radio.Group>
                  <Radio value="ชาย">ชาย</Radio>
                  <Radio value="หญิง">หญิง</Radio>
                  <Radio value="ไม่ระบุ">ไม่ระบุ</Radio>
                </Radio.Group>
              </Form.Item>
            </Row>
            <Row>
              <Form.Item
                label="หมายเลขโทรศัพท์"
                name="phone"
                rules={[{ required: true }]}
              >
                <Row>
                  <Form.Item name="prefix">
                    <Select style={{ width: 70 }}>
                      <Option value="86">+86</Option>
                      <Option value="87">+87</Option>
                    </Select>
                  </Form.Item>
                  <span>-</span>
                  <Form.Item
                    style={{
                      display: "inline-block",
                      width: "200px",
                      margin: "0 8px",
                    }}
                  >
                    <Input />
                  </Form.Item>
                </Row>
              </Form.Item>
            </Row>
            <Row>
              <Form.Item label="หนังสือเดินทาง" name="passport">
                <Input />
              </Form.Item>
            </Row>
            <Row justify="space-between">
              <Form.Item
                label="เงินเดือนที่คาดหวัง"
                name="salary"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Row justify="space-around">
                <Form.Item>
                  <Button className="buttonForm" onClick={clearForm}>
                    ล้างข้อมูล
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button className="buttonForm" htmlType="submit">
                    ส่งข้อมูล
                  </Button>
                </Form.Item>
              </Row>
            </Row>
          </Form>
        </div>
      </div>
      <TableData />
    </>
  );
};
