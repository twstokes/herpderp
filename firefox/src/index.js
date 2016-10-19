var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");

pageMod.PageMod({
    include: ["https://apis.google.com/*", "https://plus.googleapis.com/*", "https://www.youtube.com/*"],
    contentScriptWhen: 'ready',
    contentScriptFile: [data.url("herp.js")]
});