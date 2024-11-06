import { Input, Select, Button, Form } from "antd";
import { useEffect } from "react";

const { Option } = Select;
const { TextArea } = Input;

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
  placement,
  form,
  size
   // Thêm đối tượng form ở đây
}) {
  // useEffect(() => {
  //   form.setFieldsValue(formData); // Đặt các giá trị form theo formData
  // }, [formData, form]);

  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;

      case "select":
        element = (
          <Select
            placeholder={getControlItem.label}
            onChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
            value={value}
            style={{ width: "100%" }}
          >
            {getControlItem.options && getControlItem.options.length > 0
              ? getControlItem.options.map((optionItem) => (
                  <Option key={optionItem.id} value={optionItem.id}>
                    {optionItem.label}
                  </Option>
                ))
              : null}
          </Select>
        );
        break;

      case "textarea":
        element = (
          <TextArea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
            rows={4}
          />
        );
        break;

      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  }

  return (
    <Form
      form={form} // Sử dụng form truyền từ props
      onFinish={onSubmit}
      layout={placement}
      style={{ maxWidth: size }}
    >
      {formControls.map((controlItem) => (
        <Form.Item
          key={controlItem.name}
          label={controlItem.label}
          name={controlItem.name}
        >
          {renderInputsByComponentType(controlItem)}
        </Form.Item>
      ))}
      <Button
        block
        disabled={isBtnDisabled}
        htmlType="submit"
        className="mt-2 w-full "
      >
        {buttonText || "Submit"}
      </Button>
    </Form>
  );
}

export default CommonForm;
