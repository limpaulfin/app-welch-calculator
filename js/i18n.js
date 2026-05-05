// Bilingual EN/VN dictionary + apply helper. Hints kept short (≤ ~50 chars) for 1-line fit.
const I18N = {
  en: {
    subtitle: "Sample size for two-group means with unequal variances.",
    inputs_h: "Inputs (drag slider or type a number)",
    note_invariant: "By APP design, $n_{\\min}$ depends only on $f$ and $c$. The variance ratio changes $\\nu^*$, $t$-critical, and the CI half-width — drag $\\sigma_1$ or $\\sigma_2$ to see those move while $n_{\\min}$ stays fixed.",
    results_h: "Results (live)",
    charts_h: "Charts (live updates)",
    chart_h: "$n_{\\min}$ vs precision $f$",
    chart2_h: "$\\nu^*$ vs $\\sigma$-ratio",
    chart3_h: "CI half-width vs $n$",
    formulas_h: "Formulas",
    formulas_meta: "$z$ via Beasley-Springer-Moro. $t$ via Newton on Lentz incomplete beta.",
    what_h: "How to read this",
    what_p: "Drag any slider or type a number into the box on its right. Sliders give a fast visual sweep; the number boxes accept any positive $\\sigma$ beyond the slider range. Numbers and the three charts update live. Each abbreviation in Results has a one-line plain explanation right under it. Browser-only. No server. No tracking.",
    foot_pre: "Working paper companion. Thanh-Phong Lam (HUB 2026, ORCID ",
    foot_mid: "). MIT licence. ",
    live: "Live. Drag slider or type a number.",
    err_num: "All inputs must be numeric.",
    err_f: "Need 0 < f < 1.",
    err_c: "Need 0 < c < 1.",
    err_s: "Need σ > 0 for both groups.",
    in_f: ["Precision $f$", "Smaller $f$ = tighter answer."],
    in_c: ["Confidence $c$ (APP assurance)", "0.95 = right 95 of 100 times."],
    in_s1: ["$\\sigma_1$ (group 1 SD)", "Spread of group 1. Type into the box for $\\sigma > 5$."],
    in_s2: ["$\\sigma_2$ (group 2 SD)", "Spread of group 2. Type into the box for $\\sigma > 5$."],
    r_z: ["$z_{(1+c)/2}$", "Z-score at your assurance level."],
    r_n: ["$n_{\\min}$ per group", "Smallest sample per group."],
    r_nt: ["$n_{\\text{total}}$", "Total sample, both groups."],
    r_nu: ["$\\nu^*$", "Welch effective df. Adjusts for unequal spread."],
    r_t: ["$t$-critical", "Cutoff from $t$-table at $\\nu^*$."],
    r_se: ["SE", "SE = standard error of the mean gap."],
    r_ci: ["CI half-width", "CI = mean $\\pm$ this number."],
    r_ratio: ["$\\sigma_{\\max}/\\sigma_{\\min}$", "Variance ratio: spread imbalance."]
  },
  vn: {
    subtitle: "Cỡ mẫu cho trung bình hai nhóm có phương sai khác nhau.",
    inputs_h: "Đầu vào (kéo thanh trượt hoặc gõ số)",
    note_invariant: "Theo thiết kế APP, $n_{\\min}$ chỉ phụ thuộc $f$ và $c$. Tỷ số phương sai làm thay đổi $\\nu^*$, $t$-tới hạn và nửa khoảng CI — kéo $\\sigma_1$ hoặc $\\sigma_2$ để thấy ba số đó di chuyển trong khi $n_{\\min}$ giữ nguyên.",
    results_h: "Kết quả (cập nhật trực tiếp)",
    charts_h: "Đồ thị (cập nhật trực tiếp)",
    chart_h: "$n_{\\min}$ theo độ chính xác $f$",
    chart2_h: "$\\nu^*$ theo tỷ số $\\sigma$",
    chart3_h: "Nửa khoảng CI theo $n$",
    formulas_h: "Công thức",
    formulas_meta: "$z$ theo Beasley-Springer-Moro. $t$ theo lặp Newton trên hàm beta không đầy đủ Lentz.",
    what_h: "Cách đọc trang này",
    what_p: "Kéo bất kỳ thanh trượt nào hoặc gõ số vào ô bên phải. Thanh trượt giúp quét nhanh trực quan; ô số nhận mọi $\\sigma$ dương vượt phạm vi thanh trượt. Số liệu và ba đồ thị cập nhật ngay. Mỗi chữ viết tắt trong bảng Kết quả có giải thích một dòng ngay dưới. Chạy trong trình duyệt. Không máy chủ. Không theo dõi.",
    foot_pre: "Kèm theo bài working paper. Thanh-Phong Lam (HUB 2026, ORCID ",
    foot_mid: "). Giấy phép MIT. ",
    live: "Đang chạy. Kéo thanh trượt hoặc gõ số.",
    err_num: "Tất cả đầu vào phải là số.",
    err_f: "Cần 0 < f < 1.",
    err_c: "Cần 0 < c < 1.",
    err_s: "Cần σ > 0 cho cả hai nhóm.",
    in_f: ["Độ chính xác $f$", "$f$ càng nhỏ, đáp số càng chặt."],
    in_c: ["Mức tin cậy $c$ (APP assurance)", "0.95 = đúng 95/100 lần."],
    in_s1: ["$\\sigma_1$ (độ lệch nhóm 1)", "Độ phân tán nhóm 1. Gõ ô số để $\\sigma > 5$."],
    in_s2: ["$\\sigma_2$ (độ lệch nhóm 2)", "Độ phân tán nhóm 2. Gõ ô số để $\\sigma > 5$."],
    r_z: ["$z_{(1+c)/2}$", "Điểm Z ở mức tự tin của bạn."],
    r_n: ["$n_{\\min}$ mỗi nhóm", "Cỡ mẫu nhỏ nhất mỗi nhóm."],
    r_nt: ["$n_{\\text{total}}$", "Tổng cỡ mẫu cả hai nhóm."],
    r_nu: ["$\\nu^*$", "Bậc tự do hiệu dụng Welch."],
    r_t: ["$t$-tới hạn", "Tới hạn từ bảng $t$ tại $\\nu^*$."],
    r_se: ["SE", "SE = sai số chuẩn của chênh lệch."],
    r_ci: ["Nửa độ rộng CI", "CI = trung bình $\\pm$ số này."],
    r_ratio: ["$\\sigma_{\\max}/\\sigma_{\\min}$", "Tỷ số phương sai: chênh lệch phân tán."]
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
