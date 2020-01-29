<template>
  <div style="padding: 0 40%">
    <h1>Comments</h1>
    <p>
      <router-link :to="URLS.HOME">Go to home page</router-link>
    </p>
    <input
      placeholder="Enter comment"
      type="text"
      v-model="commentText"
      @keyup.enter="createMessage"
    />
    &nbsp;
    <button @click="createMessage">Add comment</button>
    <ul>
      <li v-for="(comment, index) in comments" :key="index">
        {{ comment.text }} &nbsp;
        <button @click="() => handleCommentDelete(index)">Удалить</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { URLS } from "@/constants";

export default {
  name: "Comments",
  data() {
    const initialComments = [
      {
        text: "Тестовый коммент 1"
      },
      {
        text: "Это шедевр"
      },
      {
        text: "Это прекрасно"
      },
      {
        text: "Лучшее, что я видел"
      },
      {
        text: "Два чая этому автору"
      },
      {
        text: "Три чая этому автору"
      },
      {
        text: "Четыре чая этому автору"
      },
      {
        text: "Пять чая этому автору"
      },
      {
        text: "Шесть чая этому автору"
      },
      {
        text: "Семь чая этому автору"
      }
    ];

    return {
      URLS,
      commentText: "",
      websocketUrl: "wss://echo.websocket.org/",
      requestNumber: 0,
      maxId: 10,
      requestBuffer: {},
      comments: initialComments,
      websocket: null
    };
  },
  methods: {
    createMessage() {
      this.requestNumber = ++this.requestNumber;

      this.requestBuffer = {
        ...this.requestBuffer,
        [this.requestNumber]: this.commentText
      };

      this.websocket.send(this.requestNumber.toString());
    },
    handleCommentDelete(index) {
      this.requestNumber = ++this.requestNumber;

      this.comments[index].requestNumber = this.requestNumber;

      this.websocket.send(this.requestNumber.toString());
    },
    handleMessage({ data }) {
      const requestNumber = Number(data);

      if (!requestNumber) return;

      const commentToDelete = this.comments.find(
        comment => comment.requestNumber === requestNumber
      );

      const isDelete = !this.requestBuffer[requestNumber];

      // delete comment
      if (isDelete) {
        this.comments = this.comments.filter(
          comment => comment.requestNumber !== commentToDelete.requestNumber
        );

        return;
      }

      // create comment
      this.comments = [
        ...this.comments,
        { text: this.requestBuffer[requestNumber] }
      ];

      delete this.requestBuffer[requestNumber];
    },
    handleClose(event) {
      console.log("handleClose", event);
    },
    handleError(event) {
      console.log("handleError", event);
    },
    initWebSocket() {
      this.websocket = new WebSocket(this.websocketUrl);

      this.websocket.onmessage = event => {
        this.handleMessage(event);
      };
      this.websocket.onclose = event => {
        this.handleClose(event);
      };
      this.websocket.onerror = event => {
        this.handleError(event);
      };
    }
  },
  mounted() {
    this.initWebSocket();
  }
};
</script>

<style scoped>
ul {
  padding: 0;
  text-align: start;
}
li {
  padding-bottom: 1rem;
}
</style>
