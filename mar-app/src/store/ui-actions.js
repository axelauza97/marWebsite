import { uiActions } from "./ui-slice";

export const showNotification = (data) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: data.status,
        title: data.title,
        message: data.message,
      })
    );
    setTimeout(() => {
      dispatch(uiActions.hideNotification());
    }, "2000");
  };
};

export const hideNotification = () => {
  return async (dispatch) => {
    dispatch(uiActions.hideNotification());
  };
};
