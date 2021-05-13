const LoadGithubs = async () => {
    return await fetch(`https://rest.nearapi.org/view`, {
        method: 'POST',
        body: JSON.stringify({
            "contract": "dev-1620499613958-3096267",
            "method": "get_all_contacts_by_type",
            "params": {"category": "Github", "from_index": 0, "limit": 100}
        }),
        headers: {'Content-type': 'application/json; charset=UTF-8'}
    }).then(res => res.json())
        .then(contacts => {
            let telegrams = [];
            Object.keys(contacts).forEach(nearAccount => telegrams[contacts[nearAccount][0]] = nearAccount);
            return telegrams;
        });
};

(async () => {
    const githubs = await LoadGithubs();
    let links = document.getElementsByTagName("a");

    for (let i = 0; i < links.length; i++) {
        if (links[i].hasAttribute("data-hovercard-type") && links[i].getAttribute("data-hovercard-type") === "user") {

            const username = links[i].href.replace("https://github.com/", "");

            let tipLink = document.createElement("a");
            tipLink.innerHTML = ` [Tip]`;
            tipLink.classList.add('github-link');
            tipLink.setAttribute('target', '_blank');
            tipLink.href = `https://testnet.auth.nearspace.info/?action=send&type=Github&contact=${username}&amount=1`;

            if (githubs.hasOwnProperty(username))
                tipLink.setAttribute('title', `[Tip to ${githubs[username]}]`);
            else
                tipLink.setAttribute('title', `[Tip to ${username}]`);

            links[i].appendChild(tipLink);

            console.log(githubs);
        }
    }
})();

