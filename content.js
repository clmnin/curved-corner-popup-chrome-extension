const wrapper = document.createElement('div');
const shadowRoot = wrapper.attachShadow({ mode: 'open' });

const style = document.createElement('style');
style.textContent = `
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    display: none;
  }

  .modal {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border-radius: 8px;
    max-width: 300px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: none;
  }

  .modal.show {
    display: block;
  }

  .modal-overlay.show {
    display: block;
  }

  .dialog-header {
    background: #f5f5f5;
    padding: 12px 16px;
    border-radius: 8px 8px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h2 {
    margin: 0;
    font-size: 16px;
    color: #333;
  }

  .close-button {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #666;
    padding: 0 4px;
  }

  .dialog-content {
    padding: 16px;
  }
`;

const template = `
  <div class="modal-overlay"></div>
  <div class="modal">
    <div class="dialog-header">
      <h2>Extension Dialog</h2>
      <button class="close-button">&times;</button>
    </div>
    <div class="dialog-content">
      <p>This is a counter example:</p>
      <div class="counter-container">
        <button class="counter-button decrease">-</button>
        <span class="counter-value">0</span>
        <button class="counter-button increase">+</button>
      </div>
    </div>
  </div>
`;

shadowRoot.appendChild(style);
shadowRoot.innerHTML += template;

const modal = shadowRoot.querySelector('.modal');
const overlay = shadowRoot.querySelector('.modal-overlay');

function showModal() {
  modal.classList.add('show');
  overlay.classList.add('show');
}

function hideModal() {
  modal.classList.remove('show');
  overlay.classList.remove('show');
}

shadowRoot.querySelector('.close-button').addEventListener('click', hideModal);
overlay.addEventListener('click', hideModal);

let count = 0;
const counterValue = shadowRoot.querySelector('.counter-value');
const decreaseButton = shadowRoot.querySelector('.decrease');
const increaseButton = shadowRoot.querySelector('.increase');

decreaseButton.addEventListener('click', () => {
  count--;
  counterValue.textContent = count;
});

increaseButton.addEventListener('click', () => {
  count++;
  counterValue.textContent = count;
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "showDialog") {
    showModal();
  }
});

document.body.appendChild(wrapper);