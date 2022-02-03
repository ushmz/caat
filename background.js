chrome.contextMenus.create({
  title: "Markdown形式でコピー",
  type: "normal",
  contexts: ["all"],
  onclick: (info, tab) => {
    if (info.selectionText) {
      console.log(
        `[${info.selectionText.replace(/\s*[\[\]]\s*/g, " ")}](${info.linkUrl})`
      );
    } else {
      if (!info.linkUrl) {
        console.log(`[${tab.title.replace(/\s*[\[\]]\s*/g, " ")}](${tab.url})`);
      } else {
        console.log(`[](${info.linkUrl})`);
      }
    }
  },
});

chrome.contextMenus.create({
  title: "ScrapBox形式でコピー",
  type: "normal",
  contexts: ["all"],
  onclick: (info, tab) => {
    if (info.selectionText) {
      console.log(
        `[${info.selectionText.replace(/\s*[\[\]]\s*/g, " ")} ${info.linkUrl}]`
      );
    } else {
      if (!info.linkUrl) {
        console.log(`[${tab.title.replace(/\s*[\[\]]\s*/g, " ")} ${tab.url}]`);
      }
      console.log(`[ ${info.linkUrl}]`);
    }
  },
});
