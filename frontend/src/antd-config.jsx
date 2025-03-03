import vi from "antd/locale/vi_VN";
import { ConfigProvider } from "antd";

function AntDProvider({ children }) {
  return (
    <ConfigProvider
      componentSize="middle"
      // locale={vi}
      theme={{
        token: {
          colorPrimary: "#000",
          //   colorInfo: "#006b78",
          //   colorTextBase: "#333333",
          //   colorTextDisabled: "#333333ad",
          colorPrimaryBg: "E4E0E1",
          colorPrimaryBgHover: "#000",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default AntDProvider;
