document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("btnGenerateNew")
    .addEventListener("click", generateNewPassword);
  document
    .getElementById("btnCopy")
    .addEventListener("click", copyPasswordToClipboard);
  document.getElementById("useNumbers").addEventListener("click", uiChanged);
  document.getElementById("addSymbols").addEventListener("click", uiChanged);
  document.getElementById("pwdLength").addEventListener("change", uiChanged);
  document.getElementById("symbols").addEventListener("change", uiChanged);

  initializeOptions();
});

function uiChanged() {
  UiState.minimumLength = document.getElementById("pwdLength").value;
  UiState.symbols = document.getElementById("symbols").value;
  UiState.useNumbers = document.getElementById("useNumbers").checked;
  UiState.useSymbols = document.getElementById("addSymbols").checked;

  var toSave = JSON.stringify(UiState);
  chrome.storage.local.set(
    { easyToRememberPwd_UiState: toSave },
    function () {}
  );
}

function generateNewPassword() {
  const minimumLength = parseInt(document.getElementById("pwdLength").value);
  const addNumbers = document.getElementById("useNumbers").checked;
  const addSymbols = document.getElementById("addSymbols").checked;
  const symbols = document.getElementById("symbols").value;

  const generator = new PasswordGenerator(
    minimumLength,
    addNumbers,
    addSymbols,
    symbols
  );
  const password = generator.generate();

  document.getElementById("generatedPwd").innerHTML = password;
  copyPasswordToClipboard();
}

function copyPasswordToClipboard() {
  copyTextToClipboard(document.getElementById("generatedPwd").innerHTML);

  const copiedMsg = document.getElementById("copiedMsg");
  copiedMsg.textContent = "Copied to clipboard!";
  copiedMsg.style.display = "inline";

  setTimeout(function () {
    copiedMsg.style.display = "none";
  }, 2000);
}

async function copyTextToClipboard(text) {
  await navigator.clipboard.writeText(text);
}

UiState = {
  minimumLength: 13,
  useNumbers: true,
  useSymbols: true,
  symbols: "!@#$%^&*",
};

function initializeOptions() {
  chrome.storage.local.get("easyToRememberPwd_UiState", function (result) {
    if (result && Object.keys(result).length > 0) {
      UiState = JSON.parse(result["easyToRememberPwd_UiState"]);
    }

    document.getElementById("pwdLength").value = UiState.minimumLength;
    document.getElementById("useNumbers").checked = UiState.useNumbers;
    document.getElementById("addSymbols").checked = UiState.useSymbols;
    document.getElementById("symbols").value = UiState.symbols;

    generateNewPassword();
  });
}
