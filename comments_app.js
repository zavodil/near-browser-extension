const LoadTelegrams = async () => {
    return await fetch(`https://rest.nearapi.org/view`, {
        method: 'POST',
        body: JSON.stringify({
            "contract": "dev-1620499613958-3096267",
            "method": "get_all_contacts_by_type",
            "params": {"category": "Telegram", "from_index": 0, "limit": 100}
        }),
        headers: {'Content-type': 'application/json; charset=UTF-8'}
    }).then(res => res.json())
        .then(contacts => {
            let telegrams = [];
            Object.keys(contacts).forEach(nearAccount => {
                    if (contacts[nearAccount].length > 0)
                        telegrams[contacts[nearAccount][0]] = nearAccount;
                }
            );
            return telegrams;
        });
};

if (!window.isTop) {
    (async () => {
        const telegrams = await LoadTelegrams();
        const oldData = document.getElementsByClassName('bc-comments')[0];
        const data = oldData.cloneNode(true);

        let authors = data.getElementsByTagName("span");
        let nearAccountsFound = 0;
        for (let i = 0; i < authors.length; i++) {
            if (authors[i].className === "bc-comment-author-name") {
                let link = authors[i].getElementsByTagName('a')[0];
                let username = link.getAttribute("href").replace("https://tx.me/", "");
                if (telegrams.hasOwnProperty(username)) {
                    link.innerHTML = telegrams[username];
                    link.href = "https://explorer.testnet.near.org/accounts/" + telegrams[username];
                    nearAccountsFound++;
                }
            }
        }

        oldData.replaceWith(data);
        chrome.runtime.sendMessage({sendBack: true, data: nearAccountsFound});
    })();
}