import { MessageBox, Message } from "element-ui";

/**
  封装 element-ui 弹框
 */
export function handleConfirm(text = "确定执行此操作吗？", type = "danger") {
    return MessageBox.confirm(text, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: type
    });
}

/**
 封装 element-ui 消息提示
 */
export function handleAlert(text = "操作成功", type = "success") {
    return Message({
        showClose: true,
        message: text,
        type: type
    });
}