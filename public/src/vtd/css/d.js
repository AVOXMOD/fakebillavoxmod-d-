const processedMessages = new Set(JSON.parse(localStorage.getItem('processedMessages')) || []);
const processedRequests = new Set(JSON.parse(localStorage.getItem('processedRequests')) || []);
const processedMessagesMention = new Set(JSON.parse(localStorage.getItem('processedMessagesMention')) || []);


function getGroupInfo() {
    const titleElement = document.querySelector('.header-title.flx.flx-al-c.flex-1');
    const memberCountElement = document.querySelector('.community__chat-box-indicator__mem span.ml-4');

    const title = titleElement ? titleElement.textContent.trim() : 'Nhóm';
    const memberCount = memberCountElement ? memberCountElement.textContent.trim() : '0';

    return { title, memberCount };
}

function getCurrentTime() {
    const now = new Date();
    const pad = num => num.toString().padStart(2, '0');
    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const day = pad(now.getDate());
    const month = pad(now.getMonth() + 1);
    const year = now.getFullYear();
    const weekDay = now.toLocaleDateString('vi-VN', { weekday: 'long' });
    const timeOfDay = hours >= 3 && hours < 9 ? 'vào lúc Sáng' :
                      hours >= 10 && hours < 15 ? 'vào lúc Trưa' :
                      hours >= 16 && hours < 18 ? 'vào lúc Chiều' :
                      hours >= 19 && hours < 21 ? 'vào lúc Tối' : 'vào lúc Khuya';
    return { time: `${hours}:${minutes}`, date: `${day}/${month}/${year}`, weekDay, timeOfDay };
}

function sendMessage(message) {
    const chatInput = document.querySelector('#richInput');
    if (chatInput) {
        chatInput.innerText = message;
        const inputEvent = new Event('input', { bubbles: true });
        chatInput.dispatchEvent(inputEvent);

        const virtualSendButton = document.createElement('button');
        virtualSendButton.id = 'virtual-send-button';
        virtualSendButton.style.display = 'none';
        document.body.appendChild(virtualSendButton);

        virtualSendButton.addEventListener('click', () => {
            const sendButton = document.querySelector('.chat-box-input-button[title="Gửi"]');
                sendButton.click();
            virtualSendButton.remove();
        });

        virtualSendButton.click();
    }
}
function handleEventMessages() {
    const eventMessages = document.querySelectorAll('.event-message');
    const chatMessages = document.querySelectorAll('.chat-message.wrap-message.rotate-container');
    let hasNewEvent = false;
    const { title: namegroup, memberCount: totalMembers } = getGroupInfo();

    const regexes = {
        kick: /xoá khỏi nhóm|xóa khỏi cộng đồng/i,
        added: /thêm vào nhóm|tham gia nhóm|thêm vào cộng đồng/i,
        leave: /rời khỏi nhóm|đã rời khỏi nhóm|rời khỏi cộng đồng|đã rời khỏi cộng đồng/i,
        join: /đã tham gia cộng đồng|đã tham gia nhóm/i,
        rqjoin: /vừa yêu cầu tham gia cộng đồng/i,
        tag: /Thanh Diệu/i
    };
    const MsgLeave = [
        'vì cảm thấy chim mình quá bé',
        'do thất tình vì bị người yêu đá',
        'vì lí do xem sex sợ thành viên trong box phát hiện',
    ];
    const MsgKick = [
        'đá ra khỏi nhóm',
        'trục xuất ra khỏi nhóm',
        'sút ra khỏi nhóm',
    ];
    const MsgAdd = [
        'Chúc bạn ngày mới vui vẻ 😍',
        'Chúc bạn luôn mã đáo thành công 💝',
        'Chúc bạn luôn sống lâu trăm tuổi 🎁',
    ];
    eventMessages.forEach(message => {
        const messageId = message.getAttribute('data-id') || message.querySelector('.event-message__content').textContent.trim();
        if (processedMessages.has(messageId)) return;

        const usernameElement = message.querySelector('.event-message__username');
        const contentElement = message.querySelector('.event-message__content');

        if (usernameElement && contentElement) {
            const username = usernameElement.textContent.trim();
            const messageContent = contentElement.textContent.trim();
            const { time, date, weekDay, timeOfDay } = getCurrentTime();

            if (regexes.kick.test(messageContent)) {
                sendMessage(`‧[𝗕𝗢𝗧] Thằng ngu ${username} vừa bị quản trị viên ${MsgKick[Math.floor(Math.random() * MsgKick.length)]} lúc ${time} - ${date} || tổng thành viên còn lại: ${totalMembers}`);
                hasNewEvent = true;
            } else if (regexes.added.test(messageContent)) {
                sendMessage(`‧[𝗕𝗢𝗧] Welcome bro: ${username} đã tham gia nhóm || Thời gian bạn được duyệt vào lúc: ${weekDay} - ${time} - ${date} || Chào mừng đã đến với ngôi nhà ${namegroup}, bạn là thành viên thứ ${totalMembers} của nhóm 🥳. || `+MsgAdd[Math.floor(Math.random() * MsgAdd.length)]);
                hasNewEvent = true;
            } else if (regexes.leave.test(messageContent)) {
                sendMessage(`‧[𝗕𝗢𝗧] Con lợn ${username} đã tự rời khỏi nhóm ` +MsgLeave[Math.floor(Math.random() * MsgLeave.length)]);
                hasNewEvent = true;
            } else if (regexes.join.test(messageContent)) {
                sendMessage(`‧[𝗕𝗢𝗧] Chào thành viên mới của chúng ta ${username} bạn đã tự vào nhóm ${namegroup} bạn là thành viên thứ ${totalMembers} của nhóm 🥳`);
                hasNewEvent = true;
            } else if (regexes.rqjoin.test(messageContent)) {
                sendMessage(`‧[𝗕𝗢𝗧] Đồng chí ${username} đã gửi yêu cầu tham gia ${namegroup} đang cần chờ quản trị viên phê duyệt.`);
                hasNewEvent = true;
            }

            processedMessages.add(messageId);
        }
    });
    localStorage.setItem('processedMessages', JSON.stringify(Array.from(processedMessages)));
    localStorage.setItem('processedMessagesMention', JSON.stringify(Array.from(processedMessagesMention)));
}
function handleJoinRequests() {
    const requestMessages = document.querySelectorAll('.message-info');
    const { title: namegroup, memberCount: totalMembers } = getGroupInfo();
    requestMessages.forEach(message => {
        const usernameElement = message.querySelector('.message-info_highlight');
        const contentElement = message.querySelector('.message-info_text');
        if (usernameElement && contentElement && /vừa yêu cầu tham gia cộng đồng/i.test(contentElement.textContent)) {
            const username = usernameElement.textContent.trim();
            const messageId = username + contentElement.textContent.trim();
            if (processedRequests.has(messageId)) return;
            sendMessage(`‧[𝗕𝗢𝗧] Đồng chí ${username} đã gửi yêu cầu tham gia ${namegroup} đang cần chờ quản trị viên phê duyệt.`);
            processedRequests.add(messageId);
        }
    });

    localStorage.setItem('processedRequests', JSON.stringify(Array.from(processedRequests)));
}
setInterval(function () {handleEventMessages();handleJoinRequests();}, 1500);