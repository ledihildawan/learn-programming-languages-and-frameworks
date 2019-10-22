const postsList = document.querySelector('.posts-items');

const share = document.createElement('div')
share.className = 'share';
share.innerHTML = `
<div class="share-overlay"></div>
<div class="share-content">
    <div class="share-header">
        <p>Bagikan Artikel</p>
    </div>
    <div class="share-body">
        <p class="share-post-title">Berkemeja Putih, Agus Gumiwang Penuhi Panggilan Jokowi</p>
        <img class="share-post-image" src="https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_160,ar_1:1/v1571713401/nramzkrh4rwi9jmpg8l3.jpg" alt="">
    </div>
    <div class="share-footer">
        <ul class="share-sm-list">
            <li class="share-sm-list-item">
                <a href="#" target="_blank">
                    <img class="facebook" src="facebook.svg" alt="">
                </a>
            </li>
            <li class="share-sm-list-item">
                <a href="#" target="_blank">
                    <img class="whatsapp" src="whatsapp.svg" alt="">
                </a>
            </li>
            <li class="share-sm-list-item">
                <a href="#" target="_blank">
                    <img class="line" src="line.svg" alt="">
                </a>
            </li>
            <li class="share-sm-list-item twitter">
                <a href="#" target="_blank">
                    <img class="twitter" src="twitter.svg" alt="">
                </a>
            </li>
            <li class="share-sm-list-item telegram">
                <a href="#" target="_blank">
                    <img class="telegram" src="telegram.svg" alt="">
                </a>
            </li>
            <li class="share-sm-list-item copy-content">
                <a href="#">
                    <img class="copy-content" src="copy-content.svg" alt="">
                </a>
            </li>
        </ul>

        <button class="share-button">Batalkan</button>
    </div>
</div>
`;
document.body.appendChild(share);

const shareOverlay = document.querySelector('.share-overlay');
const shareBtn = document.querySelector('.share-button');

function hasClassPostDetailsShare(element) {
    return element.classList.contains('post-details-share');
}

function openShare() {
    share.style.display = 'block';
}

function closeShare() {
    share.style.display = 'none';
}

postsList.addEventListener('click', function (event) {
    if (hasClassPostDetailsShare(event.target)) {
        openShare();

        const shareFooterList = document.querySelector('.share-sm-list')
        const shareTitle = document.querySelector('.share-post-title');
        const shareImage = document.querySelector('.share-post-image');

        const postLink = event.target.closest('.post-item').querySelector('a').href;
        const postTitle = event.target.closest('.post-item').querySelector('.post-title a').textContent;

        shareTitle.textContent = postTitle;
        shareImage.src = event.target.closest('li').querySelector('.post-thumb img').src;

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

        shareOverlay.addEventListener('click', function () {
            closeShare();
        })

        shareBtn.addEventListener('click', function() {
            closeShare();
        });
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