import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inbox: {
    345345: {
      from: "abc@gmail.com",
      id: 345345,
      subject: "Test 01",
      mailBody: {},
      read: false,
    },
    43645645: {
      from: "xyz@gmail.com",
      id: 43645645,
      subject: "Test 02",
      mailBody: {},
      read: false,
    },
  },
  sent: {
    456456: { to: "abc@gmail.com", id: 456456, subject: "Test 01", mailBody: {} },
    567: { to: "xyz@gmail.com", id: 567, subject: "Test 02", mailBody: {} },
  },
  recycle: {
    524: { to: "abc@gmail.com", id: 524, subject: "Test 01", mailBody: {} },
    6546: { to: "xyz@gmail.com", id: 6546, subject: "Test 02", mailBody: {} },
    7678: { from: "xyz@gmail.com", id: 7678, subject: "Test 02", mailBody: {} },
  },
  totalUnread: 0,
};

const mailBoxSlice = createSlice({
  name: "mailBoxSlice",
  initialState,
  reducers: {
    send(state, actions) {
      state.sent[actions.payload.id] = actions.payload;
    },
    // inbox(state, actions) {
    //   state.inbox[actions.payload.from] = actions.payload;
    // },
    moveToRecyleBin(state, actions) {
      if (actions.payload.to) {
        //means received from Sent-Mails
        delete state.sent[actions.payload.id];
      } else {
        //means received from Inbox
        delete state.inbox[actions.payload.id];
      }
      state.recycle[actions.payload.id] = actions.payload;
    },
    restoreMail(state, actions) {
      if (actions.payload.to) {
        state.sent[actions.payload.id] = actions.payload;
      } else {
        state.inbox[actions.payload.id] = actions.payload;
      }
      delete state.recycle[actions.payload.id];
    },
    deleteForever(state) {
      state.recycle = {};
    },
    replaceMailBox(state, actions) {
      state.sent = actions.payload.sent;
      state.inbox = actions.payload.inbox;
      state.recycle = actions.payload.recycle;
      state.totalUnread = actions.payload.totalUnread;
    },
    getTotalUnread(state) {
      let ctr = 0;
      for (const key in state.inbox) {
        if (!state.inbox[key].read) {
          ctr++;
        }
      }
      state.totalUnread = ctr;
    },
    changeReadToFalse(state, actions) {
      state.inbox[actions.payload].read = true;
    },
  },
});

export default mailBoxSlice.reducer;
export const mailBoxActions = mailBoxSlice.actions;
