const message = document.getElementById("message");
const currentTime = document.getElementById("current-time");

function updateClock() {
  const now = new Date();
  const hour = now.getHours();

  currentTime.textContent = `現在時刻 ${now.toLocaleTimeString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })}`;

  // 17:00以上、23:00未満は睡眠時間です。
  if (hour >= 17 && hour < 23) {
    message.textContent = "鶴太郎は今寝ています";
    document.body.classList.add("sleeping");
    return;
  }

  const wokeUpAt = new Date(now);
  wokeUpAt.setHours(23, 0, 0, 0);

  // 日付が変わった後は、前日の23時から数えます。
  if (hour < 23) {
    wokeUpAt.setDate(wokeUpAt.getDate() - 1);
  }

  const elapsedMinutes = Math.floor((now - wokeUpAt) / 60000);
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  const minutes = elapsedMinutes % 60;

  message.textContent = `鶴太郎が起きてから${elapsedHours}時間${minutes}分が経ちました`;
  document.body.classList.remove("sleeping");
}

updateClock();
setInterval(updateClock, 1000);
