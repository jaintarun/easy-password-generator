$(function () {
    $('#btnGenerateNew').click(function () {
        generateNewPassword(false);
    });

    $('#btnCopy').click(copyPasswordToClipboard);

    $("#useNumbers,#addSymbols").click(uiChanged);
    $("#pwdLength,#symbols").change(uiChanged);
});

function uiChanged() {
    UiState.minimumLength = $("#pwdLength").val();
    UiState.symbols = $("#symbols").val();
    UiState.useNumbers = $("#useNumbers").is(":checked");
    UiState.useSymbols = $("#addSymbols").is(":checked");

    var toSave = JSON.stringify(UiState);

    chrome.storage.local.set({ 'easyToRememberPwd_UiState': toSave }, function () {
        //chrome.extension.getBackgroundPage().console.log('Saved = ' + toSave);
    });

}

function getQuery() {
    var toReturn = "?";
    toReturn += "minLen=" + $("#pwdLength").val();
    toReturn += "&numbers=" + $("#useNumbers").is(":checked");
    toReturn += "&addSymbols=" + $("#addSymbols").is(":checked");
    toReturn += "&symbols=" + encodeURI($("#symbols").val());

    return toReturn;
}

function generateNewPassword(copyToClipboard) {
    var x = new XMLHttpRequest();
    var query = getQuery();
    x.open('GET', 'https://pwd.bigbingobot.com/api/getpassword' + query);
    x.onload = function () {
        document.getElementById('generatedPwd').innerHTML = x.responseText;
        if (copyToClipboard) {
            copyPasswordToClipboard();
        }
    };
    x.send();
}

function copyPasswordToClipboard() {
    copyTextToClipboard(document.getElementById('generatedPwd').innerHTML);

    $("#copiedMsg").text("Copied to clipboard!");

    $('#copiedMsg').fadeIn(300, function () {
        setTimeout(function () { $('#copiedMsg').fadeOut('slow'); }, 2000);
    });
}

function copyTextToClipboard(text) {
    var copyFrom = document.createElement("textarea");
    copyFrom.textContent = text;
    document.body.appendChild(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    copyFrom.blur();
    document.body.removeChild(copyFrom);
}

//defaults
UiState = {
    minimumLength: 13,
    useNumbers: true,
    useSymbols: true,
    symbols: '!@#$%^&*'
}

function initializeOptions() {

    chrome.storage.local.get('easyToRememberPwd_UiState', function (result) {

        if (!jQuery.isEmptyObject(result)) {
            UiState = JSON.parse(result['easyToRememberPwd_UiState']);
        } 

        $("#pwdLength").val(UiState.minimumLength);
        $("#useNumbers").prop('checked', UiState.useNumbers);
        $("#addSymbols").prop('checked', UiState.useSymbols);
        $("#symbols").val(UiState.symbols);

        generateNewPassword(true);

    });
}

document.addEventListener('DOMContentLoaded', function () { 
    initializeOptions();
});


