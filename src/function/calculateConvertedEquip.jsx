/**
 * 옵션 문자열 한 줄을 “전투력” 숫자로 환산
 * @param {string|null|undefined} rawLine  예) "STR +12%", "공격력 +10", null
 * @param {string|string[]} mainStat       주스탯. 예) "STR" / ["STR","DEX","LUK"] / "HP"
 * @returns {number}                       환산 전투력 (가중치 기반 추정값)
 */
export default function calculateConvertedEquip(rawLine, mainStat) {
  if (!rawLine) return 0;

  //"test"

  // ── 전처리: 공백 제거 & 대문자 통일 ──────────────────
  const line = rawLine.replace(/\s+/g, "").toUpperCase();

  // 값(숫자)·% 여부 추출
  const match = line.match(/([+-]?\d+)(%?)/);
  if (!match) return 0;
  const value = parseInt(match[1], 10);
  const isPercent = match[2] === "%";

  // 주스탯 여러 개일 수도 있으므로 배열화
  const mainStats = Array.isArray(mainStat)
    ? mainStat.map((s) => s.toUpperCase())
    : [String(mainStat).toUpperCase()];

  /* ── 1. 공격력 / 마력 ─────────────────────────────── */
  if (line.includes("공격력") || line.includes("마력")) {
    // % 공격력은 희귀하므로 flat 가중치만 사용 (4배)
    return isPercent ? value * 160 : value * 4;
  }

  /* ── 2. HP 기반 직업 (데몬어벤져 등) ──────────────── */
  if (mainStats.includes("HP") && line.includes("HP")) {
    return isPercent ? value * 2 : value * 0.02; // HP는 대체로 50 HP ≈ 1 STR 가정
  }

  /* ── 3. 올스탯 % ─────────────────────────────────── */
  if (line.includes("올스탯") && isPercent) {
    return value * 30; // 경험적 평균치
  }

  /* ── 4. 일반 스탯 (STR/DEX/INT/LUK) ──────────────── */
  const isMain = mainStats.some((s) => line.includes(s));
  const isStatLine =
    ["STR", "DEX", "INT", "LUK"].some((s) => line.includes(s));

  if (isStatLine) {
    if (isPercent) {
      // 주스탯 1% ≈ 40, 부스탯 1% ≈ 20
      return value * (isMain ? 40 : 20);
    }
    // flat: 주스탯 1, 부스탯 0.5
    return isMain ? value : value * 0.5;
  }

  /* ── 5. 기타(방어력 등) : 전투력 영향 없다고 가정 ── */
  return 0;
}