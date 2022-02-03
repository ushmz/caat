const copyTextToClipboard = (val) => {
  const cpForm = document.createElement('textarea');
  cpForm.textContent = val;
  const body = document.getElementsByTagName('body')[0];
  body.appendChild(cpForm);
  cpForm.select();
  const ok = document.execCommand('copy');
  body.removeChild(cpForm);
  return ok;
};

chrome.contextMenus.create({
  title: 'Markdown形式でコピー',
  type: 'normal',
  contexts: ['all'],
  onclick: (info, tab) => {
    if (info.selectionText) {
      copyTextToClipboard(`[${info.selectionText.replace(/\s*[\[\]]\s*/g, ' ')}](${info.linkUrl})`);
    } else {
      if (!info.linkUrl) {
        copyTextToClipboard(`[${tab.title.replace(/\s*[\[\]]\s*/g, ' ')}](${tab.url})`);
      } else {
        copyTextToClipboard(`[](${info.linkUrl})`);
      }
    }
  },
});

chrome.contextMenus.create({
  title: 'ScrapBox形式でコピー',
  type: 'normal',
  contexts: ['all'],
  onclick: (info, tab) => {
    if (info.selectionText) {
      copyTextToClipboard(`[${info.selectionText.replace(/\s*[\[\]]\s*/g, ' ')} ${info.linkUrl}]`);
    } else {
      if (!info.linkUrl) {
        copyTextToClipboard(`[${tab.title.replace(/\s*[\[\]]\s*/g, ' ')} ${tab.url}]`);
      }
      copyTextToClipboard(`[ ${info.linkUrl}]`);
    }
  },
});
