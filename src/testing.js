import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 100,
  duration: "30s",
};

export default function () {
  let loginRes2 = http.post("http://localhost:5000/auth/login", {
    username: "admin",
    password: "admin123",
  });
  check(loginRes2, {
    "login status is 200": (r) => r.status === 200,
    "auth token is not empty": (r) => r.json("accessToken") !== "",
  });

  sleep(1);
}