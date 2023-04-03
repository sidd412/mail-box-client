import axios from "axios";
import { popUpActions } from "./pop-up-slice";
import { mailBoxActions } from "./mail-box-slice";

export const getData = () => {
  return async (dispatch) => {
    let email = localStorage.getItem("email");
    if (email) {
      email = email.replace("@", "").replace(".", "");
      let url = `https://mail-box-client-42f8b-default-rtdb.firebaseio.com/${email}.json`;

      try {
        const res = await axios(url);

        if (res.data) {
          // console.log(res.data, "getData");
          dispatch(mailBoxActions.replaceMailBox(res.data));
        }
      } catch (error) {
        dispatch(
          popUpActions.popUpAlertHandler({
            message: "Fetching data failed!",
            severity: "error",
          })
        );
      }
    }
  };
};

export const putData = (mailBox) => {
  return async (dispatch) => {
    let email = localStorage.getItem("email");

    if (email) {
      email = email.replace("@", "").replace(".", "");
      let url = `https://mail-box-client-42f8b-default-rtdb.firebaseio.com/${email}.json`;

      try {
        await axios.put(url, mailBox);
        // console.log(res.data, "putData");
        dispatch(
          popUpActions.popUpAlertHandler({
            message: "Request successful",
            severity: "success",
          })
        );
      } catch (error) {
        dispatch(
          popUpActions.popUpAlertHandler({
            message: "Request sent failed!",
            severity: "error",
          })
        );
      }
    }
  };
};
