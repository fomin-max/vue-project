<template>
  <div class="wrapper">
    <h1>Comments</h1>
    <p>
      <router-link :to="URLS.HOME">Go to home page</router-link>
    </p>
    <input
      placeholder="Enter comment"
      type="text"
      v-model="commentText"
      @keyup.enter="createMessage"
      style="min-width: 13rem"
    />
    &nbsp;
    <button @click="createMessage">Add comment</button>
    <p v-if="!!errorMessage" class="error">{{ errorMessage }}</p>
    <ul v-else>
      <li v-for="(comment, index) in comments" :key="index">
        {{ comment.text }} &nbsp;
        <button @click="() => handleCommentDelete(comment)">Удалить</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { URLS } from "@/constants";
import { isEmptyString } from "@/utils/helpers";

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
      requestBuffer: {},
      comments: initialComments,
      errorMessage: "",
      websocket: null
    };
  },
  methods: {
    createMessage() {
      if (isEmptyString(this.commentText)) return;

      this.requestNumber = ++this.requestNumber;

      this.requestBuffer = {
        ...this.requestBuffer,
        [this.requestNumber]: this.commentText
      };

      this.commentText = "";

      this.websocket.send(this.requestNumber.toString());
    },
    handleCommentDelete(comment) {
      if (comment.requestNumber) return;

      this.requestNumber = ++this.requestNumber;

      comment.requestNumber = this.requestNumber;

      this.websocket.send(this.requestNumber.toString());
    },
    handleMessage({ data }) {
      const requestNumber = Number(data);

      const isDelete = !this.requestBuffer[requestNumber];

      // delete comment
      if (isDelete) {
        const commentToDelete = this.comments.find(
          comment => comment.requestNumber === requestNumber
        );

        if (!commentToDelete) return;

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

      // clear buffer
      delete this.requestBuffer[requestNumber];
    },
    handleError({ data }) {
      if (data) {
        this.errorMessage = `Websocket error: ${data}`;
      } else {
        this.errorMessage = "Unknown error";
      }
    },
    initWebSocket() {
      if ("WebSocket" in window) {
        this.websocket = new WebSocket(this.websocketUrl);

        this.websocket.onmessage = this.handleMessage;
        this.websocket.onerror = this.handleError;
      } else {
        this.errorMessage = "Websocket is not supported by your browser";
      }
    }
  },
  mounted() {
    this.initWebSocket();
  },
  destroyed() {
    this.websocket.close();
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
  word-wrap: break-word;
  overflow-wrap: break-word;
}
.wrapper {
  margin: 0 auto;
  max-width: 20rem;
}
</style>
