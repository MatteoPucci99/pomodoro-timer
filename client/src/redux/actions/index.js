export const API = "http://localhost:5001/session/savedsessions";
export const SET_SETTINGS = "SET_SETTINGS";
export const SAVE_SESSION = "SAVE_SESSION";
export const GET_SESSIONS = "GET_SESSIONS";

export const setSettingsAction = (settings) => {
  return {
    type: SET_SETTINGS,
    payload: settings,
  };
};

export const saveSessionAction = (obj, handleReset) => {
  return async (dispatch) => {
    fetch(API, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Errore nel invio dei dati");
        }
      })
      .then((session) => {
        dispatch({
          type: SAVE_SESSION,
          payload: session,
        });
        handleReset();
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };
};

export const getSessionsAction = () => {
  return async (dispatch) => {
    fetch(API)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Errore nel caricamento dei dati");
        }
      })
      .then((data) => {
        dispatch({
          type: GET_SESSIONS,
          payload: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
