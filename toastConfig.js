import React from "react";
import CustomToastMessage from "./Components/Alert/CustomToastMessage";

export const toastConfig = {
  successToast: ({ props }) => (
    <CustomToastMessage type="successToast" msg={props.msg} />
  ),

  warningToast: ({ props }) => (
    <CustomToastMessage msg={props.msg} type="warningToast" />
  ),

  normalToast: ({ props }) => (
    <CustomToastMessage msg={props.msg} type="normalToast" />
  ),
};

export default { toastConfig };
