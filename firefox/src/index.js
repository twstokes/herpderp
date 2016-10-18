var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");

pageMod.PageMod({
    include: ["https://apis.google.com/*", "https://plus.googleapis.com/*", "https://www.youtube.com/*"],
    contentScriptWhen: 'ready',
    contentScriptFile: [data.url("jquery-2.1.3.min.js"), data.url("herp.js")]
});