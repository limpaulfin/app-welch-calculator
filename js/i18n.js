// Bilingual EN/VN dictionary + apply helper.
// Each input/result key holds [label, hint]. Hints are Feynman-style.
const I18N = {
  en: {
    subtitle: "Sample size for two-group means with unequal variances.",
    inputs_h: "Inputs (drag to explore)",
    results_h: "Results (live)",
    chart_h: "$n_{\\min}$ vs precision $f$ at current $c$",
    formulas_h: "Formulas",
    formulas_meta: "$z$ via Beasley-Springer-Moro. $t$ via Newton iteration on the Lentz incomplete beta.",
    what_h: "How to read this",
    what_p: "Drag any slider. Numbers and the chart update live. Each abbreviation in Results has a plain explanation right under it. Everything runs in your browser. No server. No tracking.",
    foot_pre: "Working paper companion. Thanh-Phong Lam (HUB 2026, ORCID ",
    foot_mid: "). MIT licence. ",
    live: "Live. Drag any slider to update.",
    err_num: "All inputs must be numeric.",
    err_f: "Need 0 < f < 1.",
    err_c: "Need 0 < c < 1.",
    err_s: "Need σ > 0 for both groups.",
    lang_btn: "Tiếng Việt",
    lang_aria: "Switch to Vietnamese",
    in_f: ["Precision $f$", "How tight you want the answer. Smaller $f$ means tighter."],
    in_c: ["Assurance $c$", "How sure you want to be. 0.95 means right 95 times out of 100."],
    in_s1: ["$\\sigma_1$ (group 1 SD)", "How spread out group 1 is. SD = Standard Deviation. Big $\\sigma$ means people in the group differ a lot."],
    in_s2: ["$\\sigma_2$ (group 2 SD)", "How spread out group 2 is. SD = Standard Deviation. Big $\\sigma$ means people in the group differ a lot."],
    r_z: ["$z_{(1+c)/2}$", "Z-score. How many standard deviations from the centre for your assurance level."],
    r_n: ["$n_{\\min}$ per group", "Smallest sample size needed in EACH of the two groups."],
    r_nt: ["$n_{\\text{total}}$", "Total people across both groups combined."],
    r_nu: ["$\\nu^*$", "Welch effective degrees of freedom (df). Adjusts the $t$-table when the two groups have unequal spread."],
    r_t: ["$t$-critical", "Cutoff value from the $t$-table that matches your assurance and $\\nu^*$."],
    r_se: ["SE", "Standard Error. How wobbly the estimated mean gap between the two groups is."],
    r_ci: ["CI half-width", "Confidence Interval (CI). The estimated mean gap is the centre $\\pm$ this number."],
    r_ratio: ["$\\sigma_{\\max}/\\sigma_{\\min}$", "Variance ratio. How much more spread one group has versus the other."]
  },
  vn: {
    subtitle: "Cỡ mẫu cho trung bình hai nhóm có phương sai khác nhau.",
    inputs_h: "Đầu vào (kéo để thử)",
    results_h: "Kết quả (cập nhật trực tiếp)",
    chart_h: "$n_{\\min}$ theo độ chính xác $f$ ở mức $c$ hiện tại",
    formulas_h: "Công thức",
    formulas_meta: "$z$ tính theo Beasley-Springer-Moro. $t$ tính theo lặp Newton trên hàm beta không đầy đủ Lentz.",
    what_h: "Cách đọc trang này",
    what_p: "Kéo bất kỳ thanh trượt nào. Số liệu và đồ thị cập nhật ngay. Mỗi chữ viết tắt trong bảng Kết quả đều có giải thích đơn giản ngay dưới dòng đó. Mọi thứ chạy trong trình duyệt của bạn. Không máy chủ. Không theo dõi.",
    foot_pre: "Kèm theo bài working paper. Thanh-Phong Lam (HUB 2026, ORCID ",
    foot_mid: "). Giấy phép MIT. ",
    live: "Đang chạy. Kéo bất kỳ thanh trượt nào để cập nhật.",
    err_num: "Tất cả đầu vào phải là số.",
    err_f: "Cần 0 < f < 1.",
    err_c: "Cần 0 < c < 1.",
    err_s: "Cần σ > 0 cho cả hai nhóm.",
    lang_btn: "English",
    lang_aria: "Chuyển sang tiếng Anh",
    in_f: ["Độ chính xác $f$", "Bạn muốn câu trả lời chặt cỡ nào. $f$ càng nhỏ thì càng chặt."],
    in_c: ["Mức tự tin $c$", "Bạn muốn tự tin cỡ nào. 0.95 nghĩa là đúng 95 trên 100 lần."],
    in_s1: ["$\\sigma_1$ (độ lệch nhóm 1)", "Nhóm 1 phân tán cỡ nào. SD = Standard Deviation = độ lệch chuẩn. $\\sigma$ lớn nghĩa là mọi người trong nhóm khác nhau rất nhiều."],
    in_s2: ["$\\sigma_2$ (độ lệch nhóm 2)", "Nhóm 2 phân tán cỡ nào. SD = Standard Deviation = độ lệch chuẩn. $\\sigma$ lớn nghĩa là mọi người trong nhóm khác nhau rất nhiều."],
    r_z: ["$z_{(1+c)/2}$", "Điểm Z. Cách tâm bao nhiêu độ lệch chuẩn cho mức tự tin bạn chọn."],
    r_n: ["$n_{\\min}$ mỗi nhóm", "Cỡ mẫu nhỏ nhất cần TRONG MỖI nhóm trong hai nhóm."],
    r_nt: ["$n_{\\text{total}}$", "Tổng số người gộp cả hai nhóm."],
    r_nu: ["$\\nu^*$", "Bậc tự do hiệu dụng Welch (df). Điều chỉnh bảng $t$ khi hai nhóm có độ phân tán khác nhau."],
    r_t: ["$t$-tới hạn", "Giá trị tới hạn lấy từ bảng $t$ ứng với mức tự tin và $\\nu^*$ của bạn."],
    r_se: ["SE", "Sai số chuẩn (Standard Error). Chênh lệch trung bình giữa hai nhóm lung lay cỡ nào."],
    r_ci: ["Nửa độ rộng CI", "Khoảng tin cậy (Confidence Interval, CI). Chênh lệch trung bình ước lượng là tâm $\\pm$ số này."],
    r_ratio: ["$\\sigma_{\\max}/\\sigma_{\\min}$", "Tỷ số phương sai. Một nhóm phân tán hơn nhóm kia bao nhiêu lần."]
  }
};

function getLang() { return localStorage.getItem("welch-lang") || "en"; }
function setLang(l) { localStorage.setItem("welch-lang", l); }
function tdict() { return I18N[getLang()]; }

function applyI18N() {
  const dict = tdict();
  document.documentElement.lang = getLang() === "vn" ? "vi" : "en";
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const v = dict[el.getAttribute("data-i18n")];
    if (v !== undefined) el.innerHTML = Array.isArray(v) ? v[0] : v;
  });
  document.querySelectorAll("[data-i18n-hint]").forEach(el => {
    const v = dict[el.getAttribute("data-i18n-hint")];
    if (Array.isArray(v)) el.innerHTML = v[1];
  });
  const btn = document.getElementById("lang-toggle");
  if (btn) btn.setAttribute("aria-label", dict.lang_aria);
  if (window.renderMathInElement) {
    renderMathInElement(document.body, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false }
      ],
      throwOnError: false
    });
  }
}
