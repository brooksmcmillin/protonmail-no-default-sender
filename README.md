This is a quick and simple extension to make it so that there is no default send address in Proton Mail.
It pretty much just disables the send button until a specific address is chosen.

Inspired by [this Reddit post](https://old.reddit.com/r/ProtonMail/comments/vnhdyh/possibility_to_not_set_any_default_address/).

[Firefox Extension Store](https://addons.mozilla.org/en-US/firefox/addon/protonmail-no-default-sender/)
[Google Chrome Extension Store](https://chrome.google.com/webstore/detail/protonmail-no-default-sen/kdaefaiohdhccnebmpncdladmlgfbbip)

Will update with links to the Chrome and Firefox extension stores when it gets past the review process. 

# Firefox vs Chrome
The only differences between the Firefox and the Chrome version is that Firefox only accepts manifest with `manifest_version` set to 2 and Chrome only accepts manifests with `manifest_version` set to 3. Everything else is exactly the same. 

# Build Instructions
Change the name of `manifest_firefox.json` or `manifest_chrome.json` to `manifest.json` and then zip it up with `main.js`. This zip file can be installed on any Firefox or Chrome browser respectively. 
