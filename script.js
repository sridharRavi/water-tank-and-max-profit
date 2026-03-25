function trap(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0;
  let water = 0;

  let waterArr = new Array(height.length).fill(0);

  while (left <= right) {
    if (height[left] <= height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        waterArr[left] = leftMax - height[left];
        water += waterArr[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        waterArr[right] = rightMax - height[right];
        water += waterArr[right];
      }
      right--;
    }
  }

  return { water, waterArr };
}

function renderSVG(height, waterArr) {
  const svg = document.getElementById("svgInput");
  svg.innerHTML = "";

  const svgo = document.getElementById("svgOutput");
  svgo.innerHTML = "";


  const cellSize = 30;
  const cols = height.length;

  const maxHeight = Math.max(
    ...height.map((h, i) => h + waterArr[i])
  );

  svg.setAttribute("width", cols * cellSize);
  svg.setAttribute("height", maxHeight * cellSize);
  svgo.setAttribute("width", cols * cellSize)
  svgo.setAttribute("height", maxHeight * cellSize)

  for (let row = 0; row < maxHeight; row++) {
    for (let col = 0; col < cols; col++) {
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

      rect.setAttribute("x", col * cellSize);
      rect.setAttribute("y", row * cellSize);
      rect.setAttribute("width", cellSize);
      rect.setAttribute("height", cellSize);
      rect.setAttribute("fill", "#ffffff");
      rect.setAttribute("stroke", "#ccc");

      const rect2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");

      rect2.setAttribute("x", col * cellSize);
      rect2.setAttribute("y", row * cellSize);
      rect2.setAttribute("width", cellSize);
      rect2.setAttribute("height", cellSize);
      rect2.setAttribute("fill", "#ffffff");
      rect2.setAttribute("stroke", "#ccc");

      svg.appendChild(rect);
      svgo.appendChild(rect2);
    }
  }

  for (let col = 0; col < cols; col++) {
    for (let h = 0; h < height[col]; h++) {
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

      rect.setAttribute("x", col * cellSize);
      rect.setAttribute("y", (maxHeight - h - 1) * cellSize);
      rect.setAttribute("width", cellSize);
      rect.setAttribute("height", cellSize);
      rect.setAttribute("fill", "yellow");

      svg.appendChild(rect);
    }
  }

  for (let col = 0; col < cols; col++) {
    for (let w = 0; w < waterArr[col]; w++) {
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

      rect.setAttribute("x", col * cellSize);
      rect.setAttribute("y", (maxHeight - height[col] - w - 1) * cellSize);
      rect.setAttribute("width", cellSize);
      rect.setAttribute("height", cellSize);
      rect.setAttribute("fill", "#1da1d2");

      const rect2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");

      rect2.setAttribute("x", col * cellSize);
      rect2.setAttribute("y", (maxHeight - height[col] - w - 1) * cellSize);
      rect2.setAttribute("width", cellSize);
      rect2.setAttribute("height", cellSize);
      rect2.setAttribute("fill", "#1da1d2");

      svg.appendChild(rect);
      svgo.appendChild(rect2)
    }
  }
}

function run() {
  const input = document.getElementById("input").value;
  const height = input.split(",").map(Number);

  console.log(height)
  const { water, waterArr } = trap(height);

  document.getElementById("output").innerText = `Output: ${water} Units`;

  renderSVG(height, waterArr);
}

run();