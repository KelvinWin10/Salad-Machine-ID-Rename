function walk(node, replacements) {
  if (node.nodeType === Node.TEXT_NODE) {
    let text = node.nodeValue;
    for (let key in replacements) {
      text = text.replaceAll(key, replacements[key]);
    }
    node.nodeValue = text;
  } else {
    node.childNodes.forEach(child => walk(child, replacements));
  }
}


chrome.storage.local.get("machines", data => { // llaod from config
  const machines = data.machines || {
    "testingmachine1": "please1",
    "testingmachine2": "please2"
  };

  walk(document.body, machines);


  new MutationObserver(mutations => { // see if website changes/new config
    mutations.forEach(m => {
      m.addedNodes.forEach(node => walk(node, machines));
    });
  }).observe(document.body, { childList: true, subtree: true });
});
