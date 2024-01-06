const replaceSquareBrackets = (val) => {
  return val.replace(/\s*[\[\]]\s*/g, ' ');
};

const copyTextToClipboard = (tab, text) => {
  const execFunc = (text) => {
    try {
      navigator.clipboard.writeText(text);
    } catch (e) {
      console.log(e);
    }
  };
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: execFunc,
    args: [text],
  });
};

const updateContextMenus = async () => {
  await chrome.contextMenus.removeAll();
  const parent = chrome.contextMenus.create({
    id: 'main',
    title: chrome.i18n.getMessage('title'),
    contexts: ['all'],
  });
  chrome.contextMenus.create({
    parentId: parent,
    id: 'markdown',
    title: chrome.i18n.getMessage('markdown'),
    contexts: ['all'],
  });

  chrome.contextMenus.create({
    parentId: parent,
    id: 'scrapbox',
    title: chrome.i18n.getMessage('scrapbox'),
    contexts: ['all'],
  });
};

chrome.runtime.onInstalled.addListener(updateContextMenus);
chrome.runtime.onStartup.addListener(updateContextMenus);
chrome.contextMenus.onClicked.addListener((info, tab) => {
  const title = replaceSquareBrackets(tab.title);
  const url = info.linkUrl || tab.url;
  switch (info.menuItemId) {
    case 'markdown':
      // No text is selected
      copyTextToClipboard(tab, `[${title}](${url})`);
      break;
    case 'scrapbox':
      // No text is selected
      copyTextToClipboard(tab, `[${title} ${url}]`);
      break;
  }
});
