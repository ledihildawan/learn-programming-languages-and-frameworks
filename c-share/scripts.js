const postsList = document.querySelector('.posts-item');

const share = document.querySelector('.share');
const shareBtn = document.querySelector('.share-button');

function hasClassPostDetailsShare(element) {
    return element.classList.contains('post-details-share');
}

function openShare() {
    share.style.display = 'block';
}

function closeShare() {
    shareBtn.addEventListener('click', function() {
        share.style.display = 'none';
    });
}

postsList.addEventListener('click', function (event) {
    if (hasClassPostDetailsShare(event.target)) {
        openShare();

        const shareFooterList = document.querySelector('.share-sm-list')
        const shareTitle = document.querySelector('.share-post-title');
        const shareImage = document.querySelector('.share-post-image');

        const postLink = event.target.parentElement.querySelector('h3 a').href;
        const postTitle = event.target.parentElement.querySelector('h3 a').textContent;

        shareTitle.textContent = event.target.parentElement.querySelector('h3 a').textContent;
        shareImage.src = event.target.closest('li').querySelector('img').src;

        shareFooterList.addEventListener('click', function (event2) {
            if (event2.target.classList.contains('facebook')) {
                event2.target.parentElement.href = `https://www.facebook.com/sharer.php?u=${postLink}`;
            }

            if (event2.target.classList.contains('twitter')) {
                event2.target.parentElement.href = `https://twitter.com/intent/tweet?text=${encodeURI(postTitle)}&url=${postLink}`;
            }

            if (event2.target.classList.contains('telegram')) {
                event2.target.parentElement.href = `https://telegram.me/share/url?url=${postLink}&text=${encodeURI(postTitle)}`;
            }
            
            if (event2.target.classList.contains('whatsapp')) {
                event2.target.parentElement.href = `https://api.whatsapp.com/send?text=${postLink}%20${postLink}`;
            }

            if (event2.target.classList.contains('line')) {
                event2.target.parentElement.href = `https://social-plugins.line.me/lineit/share?url=${postLink}`;
            }
            
            if (event2.target.classList.contains('copy-content')) {
                event2.preventDefault();

                const input = document.createElement('input');
                input.type = 'text';
                input.value = postLink;

                document.body.appendChild(input);

                input.select();
                input.setSelectionRange(0, 99999);
                document.execCommand("copy");

                input.remove();
            }
        });

        closeShare();
    }
});

// shares.forEach((share) => {
//     postDetailsShare.addEventListener('click', function () {
//         share.style.display = 'block';
//     });

//     shareBtn.addEventListener('click', function() {
//         share.style.display = 'none';
//     });
// });