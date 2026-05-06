const login = require("fca-unofficial");

// Cookie của Khang DZ
const cookie = "datr=tAX3acNRSbBqDEDC-Haq7mW2;sb=tQX3aVNOzK2yr_VrwAdENtDw;c_user=61583414139994;xs=21%3A_hNaX3NijCezeQ%3A2%3A1777796649%3A-1%3A-1;locale=vi_VN;pas=61583414139994%3AUl0ReHqoKI;vpd=v1%3B709x368x3.8125;fr=0wQ58E3moZSMhBofg.AWc4UqhS7YKsu5xYBY7l9VD40yJBO2uno5I7RrPtrXjd-IPTfyA.Bp9wW1..AAA.0.0.Bp-F-8.AWe3BPNb4LNCqyORI5-ZsVqLCBM;wl_cbv=v2%3Bclient_version%3A3157%3Btimestamp%3A1777885116;fbl_st=100425142%3BT%3A29631418;";

const appState = cookie.split(';').filter(x => x.trim().length > 0).map(x => {
    let [name, ...val] = x.trim().split('=');
    return { "key": name, "value": val.join('='), "domain": "facebook.com", "path": "/" };
});

// Kho câu chửi cực dài của Khang DZ - Chặn trùng lặp
const danhSachChui = [
    "Khang DZ đang đứng đây, mấy concho nqu tuổi gì mà gáy? 😏",
    "Gõ phím nhanh lên, nhìn mày sủa mà tao thấy tội cho cái bàn phím! 👅",
    "Đè bẹp mấy loại nqu như mày chỉ tốn 1 giây của Khang thôi con ạ.",
    "Bố của các loại nhây là Khang đây, mày định làm gì được tao nào? 😎",
    "Ngu thì im, sủa nhiều chỉ làm mày thêm hèn thôi cái loại phế vật.",
    "Trình độ này mà đòi nhây với Khang à? Về bú bình thêm 10 năm đi!",
    "Mày có biết Khang DZ là ai không mà dám vào đây múa rìu? 🤡",
    "Não mày chứa gì mà phát ngôn nghe nqu không tả nổi thế?",
    "Nhìn mày gõ phím mà tao tưởng con rùa đang bò trên màn hình.",
    "Khang bảo này, loại như mày chỉ đáng làm nền cho tao tỏa sáng thôi.",
    "Gáy to lên xem nào, sao mới nhây tí đã cứng họng như ngậm hột thị rồi? 😂",
    "Nhìn mày nhây mà tao tưởng đứa trẻ con đang tập viết chữ.",
    "Trình độ thấp kém thì đừng cố tỏ ra nguy hiểm với Khang DZ nhé.",
    "Mày có sủa 100 năm nữa cũng không bằng một góc của Khang đâu concho nqu.",
    "Tốc độ gõ phím của mày chậm như cách mày hiểu bài vậy, nqu vãi l!",
    "Khang DZ chấp cả dòng họ nhà mày vào đây nhây luôn đấy, nhào vô hết đi!",
    "Đừng để tao phải ra tay thật sự, lúc đó mày chỉ có nước xóa acc trốn nợ.",
    "Mày là cái loại rác rưởi gì mà đòi đứng chung khung hình với Khang?",
    "Học cách làm người trước khi học cách nhây với Khang DZ nhé mấy concho nqu.",
    "Tao nhây từ lúc mày còn chưa biết cầm điện thoại cơ, tuổi tôm mà đòi đấu!",
    "Loại mày chỉ có trình độ cào bàn phím thôi chứ não có tí chất xám nào đâu?",
    "Câm nín rồi à? Sao không sủa tiếp đi cho vui tai Khang nào? 🤫",
    "Càng nói càng thấy nqu, thôi về nhà đắp chăn mà ngủ đi con ạ.",
    "Khang DZ là cái gì đó quá tầm với cái loại hạ đẳng như mày rồi.",
    "Mày gáy nữa đi, tao đang ngồi đợi xem mày nqu đến mức nào đây.",
    "Ngôn từ hạn hẹp mà cứ thích ra gió, cẩn thận trúng gió độc của Khang nha.",
    "Nhìn cách mày rep tin nhắn là biết cái tầm mày ở đâu rồi, rác rưởi!",
    "Tao là Khang DZ, và nhiệm vụ của tao là dọn dẹp mấy bãi rác như mày.",
    "Sống sao cho sang, chứ đừng sống kiểu nqu ngục như mày con ạ.",
    "Cái loại mày chỉ xứng đáng làm nô lệ cho bàn phím của Khang thôi.",
    "Đừng có mà lèm bèm, tao vả cho lệch hàm bây giờ chứ ở đó mà nhây.",
    "Mày không có tư cách nói chuyện với Khang, cút về chuồng đi!",
    "Gặp Khang DZ thì phải biết cúi đầu, đừng có mà gân cổ lên sủa nqu.",
    "Tao là ác mộng của mấy cái loại nhây rẻ tiền như mày đấy.",
    "Cố gắng lên, gõ thêm vài chữ nữa xem có khôn ra được tí nào không.",
    "Nhìn mày nqu một cách tự nhiên thật đấy, không cần phải diễn luôn.",
    "Khang DZ chưa bao giờ ngán bất cứ một concho nqu nào, kể cả mày!",
    "Tao chửi cho mày không ngóc đầu lên được luôn, tin không?",
    "Cái loại mày chỉ có nước chui xuống lỗ mà trốn thôi con ạ.",
    "Đừng để Khang phải nóng, tao mà nóng là mày không có chỗ mà dung thân đâu."
];

login({appState}, (err, api) => {
    if(err) return console.error("Lỗi đăng nhập! Kiểm tra cookie đi Khang.");
    console.log("Hệ thống nhây vô tận của Khang DZ đã khởi động!");

    api.listenMqtt((err, message) => {
        if(err || !message.body) return;
        
        // Random câu chửi cực mạnh
        const cauChui = danhSachChui[Math.floor(Math.random() * danhSachChui.length)];
        
        // Trả lời tin nhắn
        api.sendMessage(cauChui, message.threadID);
    });
});
