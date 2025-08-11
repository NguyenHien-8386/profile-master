function changeName() {
  const newName = prompt("Nhập tên mới:");
  if (newName) {
    document.getElementById("name").textContent = newName;
  }
}

let isVietnamese = true;
function toggleLanguage() {
  isVietnamese = !isVietnamese;
  if (isVietnamese) {
    document.getElementById("job").textContent =
      "Sinh viên ngành Công nghệ thông tin trường HaUI";
    document.getElementById("description").textContent =
      "Yêu thích học lập trình, thích khám phá công nghệ - các thuật toán, chia sẻ và học hỏi kiến thức với mọi người";
  } else {
    document.getElementById("job").textContent =
      "Information Technology student at HaUI";
    document.getElementById("description").textContent =
      "Love learning programming, love exploring technology - algorithms, sharing and learning knowledge with everyone";
  }
}

function handleScrollAnimation() {
  const elements = document.querySelectorAll("[data-aos]");
  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top <= window.innerHeight - 50) {
      el.classList.add("show");
    }
  });
}
window.addEventListener("scroll", handleScrollAnimation);
window.addEventListener("load", handleScrollAnimation);
// thêm**//
window.addEventListener("load", () => {
  updateBackgroundByTime?.();
  updateTimeIcon?.();
  updateWeatherBasedBackground?.();
  displayComments(); // ⬅️ Load lại bình luận từ localStorage
});

// Particles nền
const canvas = document.getElementById("snow-canvas");
const ctx = canvas.getContext("2d");
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

let particles = [];
const numParticles = 80;

for (let i = 0; i < numParticles; i++) {
  particles.push({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 3 + 1, // bán kính hạt
    dx: (Math.random() - 0.5) * 0.5, // tốc độ ngang
    dy: (Math.random() - 0.5) * 0.5, // tốc độ dọc
    color: `rgba(255,255,255,${Math.random() * 0.8 + 0.2})`,
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    // Nếu ra ngoài màn hình thì xuất hiện lại
    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;
  });

  requestAnimationFrame(drawParticles);
}

drawParticles();

// Tự cập nhật khi thay đổi kích thước
window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});

// Phóng to ảnh
function showImage(imgElement) {
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  modalImg.src = imgElement.src;
  modal.style.display = "flex";
}
function closeImage() {
  document.getElementById("image-modal").style.display = "none";
}
// con trỏ
const rabbit = document.getElementById("rabbit-cursor");

document.addEventListener("mousemove", function (e) {
  rabbit.style.left = `${e.clientX}px`;
  rabbit.style.top = `${e.clientY}px`;
});
// thay đổi màu theo giờ
function updateBackgroundByTime() {
  const hour = new Date().getHours();
  const body = document.body;

  if (hour >= 5 && hour < 11) {
    // Sáng
    body.style.background = "linear-gradient(to right, #FFE985, #FA742B)";
  } else if (hour >= 11 && hour < 17) {
    // Trưa
    body.style.background = "linear-gradient(to right, #a1ffce, #faffd1)";
  } else if (hour >= 17 && hour < 20) {
    // Chiều
    body.style.background = "linear-gradient(to right, #ff9a9e, #fad0c4)";
  } else {
    // Tối
    body.style.background = "linear-gradient(to right, #27a2e3ff, #2a5298)";
  }
}

window.addEventListener("load", updateBackgroundByTime);
// thời tiết
function updateTimeIcon() {
  const hour = new Date().getHours();
  const icon = document.getElementById("time-icon");

  if (hour >= 5 && hour < 11) {
    icon.textContent = "☀️"; // Buổi sáng
  } else if (hour >= 11 && hour < 17) {
    icon.textContent = "🌤"; // Buổi trưa/chiều
  } else if (hour >= 17 && hour < 20) {
    icon.textContent = "🌇"; // Hoàng hôn
  } else if (hour >= 20 && hour <= 23) {
    icon.textContent = "🌙"; // Tối
  } else {
    icon.textContent = "🌧"; // Khuya / mưa
  }
}

window.addEventListener("load", () => {
  updateBackgroundByTime();
  updateTimeIcon();
});
// bình luận
function addComment() {
  const name = document.getElementById("comment-name").value.trim();
  const text = document.getElementById("comment-text").value.trim();
  const list = document.getElementById("comment-list");

  if (!name || !text) {
    alert("Vui lòng nhập đầy đủ tên và bình luận!");
    return;
  }

  // Hiện progress bar
  const progressBar = document.getElementById("comment-progress");
  const progressContainer = document.getElementById("progress-container");
  const progressPercent = document.getElementById("progress-percent");

  progressContainer.style.display = "flex";
  //   Thêm dòng này ngay sau khi progressContainer.style.display = "flex";
  document.getElementById("pikachu-gif").style.display = "block";

  progressBar.value = 0;
  progressPercent.textContent = "0%";

  let progress = 0;
  const interval = setInterval(() => {
    // Di chuyển pikachu theo tiến trình
    const pikachu = document.getElementById("pikachu-gif");
    pikachu.style.left = `calc(${progress}% - 30px)`; // -30px để căn giữa ảnh
    // tốc độ thanh tiến trình//
    // progress += Math.floor(Math.random() * 10) + 5;

    progress += 6; // hoặc 1 nếu bạn muốn chậm hơn

    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      // Tạo đối tượng comment
      const newComment = { name, text };
      // Lưu vào localStorage
      const stored = JSON.parse(localStorage.getItem("comments") || "[]");
      stored.unshift(newComment); // thêm lên đầu
      localStorage.setItem("comments", JSON.stringify(stored));
      displayComments();

      // Xóa nội dung input
      document.getElementById("comment-name").value = "";
      document.getElementById("comment-text").value = "";

      // Ẩn progress bar
      setTimeout(() => {
        progressContainer.style.display = "none";
        document.getElementById("pikachu-gif").style.display = "none";
      }, 300);
    }

    progressBar.value = progress;
    progressPercent.textContent = `${progress}%`;

    // Tính màu mượt theo phần trăm (HSL)
    const hue = progress * 1.2; // từ 0 (đỏ) đến 120 (xanh)
    const gradientColor = `hsl(${hue}, 80%, 50%)`;

    // Cập nhật màu cho thanh
    progressBar.style.setProperty("--progress-color", gradientColor);

    // Tạo CSS động cho thanh tiến trình
    const dynamicStyle = document.createElement("style");
    dynamicStyle.innerHTML = `
  #comment-progress::-webkit-progress-value {
    background-color: ${gradientColor} !important;}`;
    document.head.appendChild(dynamicStyle);
  }, 100); // tốc độ tăng, càng nhỏ càng nhanh
}
function displayComments() {
  const list = document.getElementById("comment-list");
  list.innerHTML = "";

  const stored = JSON.parse(localStorage.getItem("comments") || "[]");

  stored.forEach((comment, index) => {
    const div = document.createElement("div");
    div.className = "comment";
    div.innerHTML = `
      <strong>${comment.name}</strong>
      ${comment.text}
      <button class="delete-comment" onclick="deleteComment(${index})">❌</button>
    `;
    list.appendChild(div);
  });
}
//
function deleteComment(index) {
  const stored = JSON.parse(localStorage.getItem("comments") || "[]");
  stored.splice(index, 1); // Xoá comment tại vị trí chỉ định
  localStorage.setItem("comments", JSON.stringify(stored)); // Cập nhật lại storage
  displayComments(); // Cập nhật lại giao diện
}
// thay đổi ảnh image-bank
// Ảnh thay đổi tự động mỗi 5 giây cho ảnh ngân hàng
const bankImages = [
  "jpg/avt.jpg",
  "jpg/avt1.jpg",
  "jpg/avt4.jpg",
  "jpg/avt5.jpg",
];

let currentIndex = 0;
const img = document.getElementById("bank-image");

setInterval(() => {
  // 1. Ảnh hiện tại trượt ra
  img.classList.add("slide-out");

  setTimeout(() => {
    // 2. Đổi ảnh khi đã trượt ra xong
    currentIndex = (currentIndex + 1) % bankImages.length;
    img.src = bankImages[currentIndex];

    // 3. Reset lại trạng thái để chuẩn bị trượt vào
    img.classList.remove("slide-out");

    // 4. Cho ảnh mới bắt đầu trượt vào
    img.classList.add("slide-in");

    // 5. Xóa class slide-in để lần sau còn chạy tiếp
    setTimeout(() => {
      img.classList.remove("slide-in");
    }, 800);
  }, 800); // Thời gian khớp với transition CSS
}, 3000);
