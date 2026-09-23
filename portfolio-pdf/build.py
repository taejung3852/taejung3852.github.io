"""Build the three-page, application-ready portfolio PDF."""

from pathlib import Path

from fontTools.ttLib import TTFont as FontToolsFont
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[1]
OUT = Path(__file__).resolve().parent / "park-taejung-portfolio.pdf"
FONT_SOURCE = ROOT / "public/fonts/PretendardVariable.woff2"
FONT_TTF = Path(__file__).resolve().parent / ".pretendard-build.ttf"

W, H = 595.276, 841.89  # A4
M = 44
CW = W - M * 2

PAPER = colors.HexColor("#F7F7F4")
WHITE = colors.HexColor("#FFFFFF")
INK = colors.HexColor("#172533")
MUTED = colors.HexColor("#586776")
ACCENT = colors.HexColor("#087E84")
LINE = colors.HexColor("#DCE4E4")
PALE = colors.HexColor("#E8F3F1")


def font_ready():
    if not FONT_TTF.exists() or FONT_TTF.stat().st_mtime < FONT_SOURCE.stat().st_mtime:
        source = FontToolsFont(FONT_SOURCE)
        source.flavor = None
        source.save(FONT_TTF)
    pdfmetrics.registerFont(TTFont("Pretendard", str(FONT_TTF)))


def y(top):
    return H - top


def text(c, x, top, value, size=10, color=INK):
    c.setFont("Pretendard", size)
    c.setFillColor(color)
    c.drawString(x, y(top), value)


def para(c, x, top, value, width, size=10, leading=15, color=INK, max_height=None):
    style = ParagraphStyle(
        "body", fontName="Pretendard", fontSize=size, leading=leading,
        textColor=color, alignment=TA_LEFT, spaceAfter=0,
        splitLongWords=1,
    )
    p = Paragraph(value, style)
    _, height = p.wrap(width, 1000)
    if max_height is not None and height > max_height:
        raise ValueError(f"Paragraph too tall ({height} > {max_height}): {value}")
    p.drawOn(c, x, H - top - height)
    return height


def rule(c, x1, top, x2, color=LINE):
    c.setStrokeColor(color)
    c.setLineWidth(0.8)
    c.line(x1, y(top), x2, y(top))


def panel(c, x, top, width, height, fill=WHITE, radius=13):
    c.setFillColor(fill)
    c.roundRect(x, H - top - height, width, height, radius, stroke=0, fill=1)


def page_base(c, n):
    c.setFillColor(PAPER)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    rule(c, M, 805, W - M)
    text(c, M, 824, "PARK TAEJUNG  /  PORTFOLIO", 8.2, MUTED)
    text(c, W - M - 20, 824, f"0{n}", 8.2, MUTED)


def link(c, x, top, label, url, width=None, size=9, color=ACCENT):
    text(c, x, top, label, size, color)
    if width is None:
        width = pdfmetrics.stringWidth(label, "Pretendard", size)
    c.linkURL(url, (x, H - top - 3, x + width, H - top + size + 2), relative=0)


def overview(c):
    page_base(c, 1)
    text(c, M, 49, "AI AGENT  /  LLM APPLICATION DEVELOPER", 9, ACCENT)
    text(c, M, 98, "박태정", 32)
    text(c, M, 142, "AI의 작업을 통제하고, 결과를 검증합니다.", 17)
    para(c, M, 162, "생성물을 이해하고 설명하며 책임질 수 있는 결과로 만드는 개발자를 지향합니다.", CW, 10.5, 17, MUTED)

    panel(c, M, 206, CW, 75, WHITE)
    text(c, M + 16, 229, "WEB PORTFOLIO", 8.2, MUTED)
    link(c, M + 16, 250, "taejung3852.github.io  ↗", "https://taejung3852.github.io/", 210, 11)
    text(c, M + 305, 229, "CONTACT", 8.2, MUTED)
    link(c, M + 305, 250, "taejung3852@gmail.com", "mailto:taejung3852@gmail.com", 182, 10)

    text(c, M, 326, "SELECTED WORK", 10, ACCENT)
    text(c, M, 349, "네 가지 문제, 네 가지 설계 판단", 17)

    rows = [
        ("01", "FOWOCO", "모호한 질문을 공식 표현과 연결하는 EPS 검색 설계", "단일 Dense Hit@5 99%; 복잡한 검색은 60→390ms로 지연", "02", "https://taejung3852.github.io/projects/fowoco"),
        ("02", "HWPX Document Plugin", "AI의 추측 입력을 막는 공문서 편집 도구", "XML 구조·시각 배치 분석; MCP 도구 25종 구축", "02", "https://taejung3852.github.io/projects/hwpx"),
        ("03", "OwnHands", "AI의 완료 주장과 실제 실행 증거를 분리해 검증", "독립 대조와 사람의 최종 승인 흐름 운영", "03", "https://taejung3852.github.io/projects/ownhands"),
        ("04", "LLM Gateway Service", "비용·속도·성능 조건에 맞는 모델 선택과 중계", "자체 GPU 전환; 약 3주간 사내 베타 운영", "03", "https://taejung3852.github.io/projects/llm-gateway"),
    ]
    for i, (num, title, problem, outcome, page, url) in enumerate(rows):
        top = 369 + i * 105
        panel(c, M, top, CW, 96)
        text(c, M + 15, top + 25, num, 11, ACCENT)
        text(c, M + 48, top + 25, title, 14)
        text(c, W - M - 44, top + 25, f"P.{page}", 8.5, MUTED)
        para(c, M + 48, top + 40, problem, CW - 68, 9.6, 13, INK, 27)
        para(c, M + 48, top + 64, outcome, CW - 68, 9, 13, MUTED, 24)
        c.linkURL(url, (M, H - top - 96, W - M, H - top), relative=0)
    c.showPage()


def detail_header(c, n, label, heading, intro):
    page_base(c, n)
    text(c, M, 48, label, 9, ACCENT)
    text(c, M, 83, heading, 23)
    para(c, M, 99, intro, CW, 10, 15, MUTED, 35)


def detail_card(c, top, number, title, meta, url, problem, work, result, reflection):
    height = 310
    panel(c, M, top, CW, height)
    text(c, M + 17, top + 26, number, 9.5, ACCENT)
    text(c, M + 47, top + 27, title, 18)
    text(c, M + 17, top + 49, meta, 9, MUTED)
    link(c, W - M - 95, top + 49, "상세 페이지 ↗", url, 76, 8.8)
    rule(c, M + 17, top + 63, W - M - 17)

    def row(row_top, label, body):
        text(c, M + 17, top + row_top + 10, label, 9, ACCENT)
        para(c, M + 99, top + row_top, body, CW - 119, 10, 15, INK, 45)

    row(81, "문제", problem)
    row(139, "내가 한 일", work)
    row(202, "결과", result)
    panel(c, M + 14, top + 262, CW - 28, 34, PALE, 7)
    para(c, M + 24, top + 269, reflection, CW - 48, 8.8, 11.5, MUTED, 24)


def projects_1(c):
    detail_header(c, 2, "PROJECT NOTES  /  01-02", "검색의 정확도, 문서의 신뢰성", "문제를 좁혀 설계하고, 측정과 실행 결과로 판단했습니다.")
    detail_card(
        c, 141, "01", "FOWOCO", "2026.06-08  ·  8인 팀  ·  Language Assistant 담당",
        "https://taejung3852.github.io/projects/fowoco",
        "E-9 근로자의 구어체·오타가 행정 용어를 왜곡하고, HR 담당자는 서식을 반복 작성해야 했습니다.",
        "공식 EPS 외국어 모음집 검색을 설계·구현하고, HWPX 서식 기능을 독립 MCP 도구로 분리했습니다.",
        "평가 데이터셋에서 단일 Dense 검색 Hit@5 99%를 확인했습니다. 멀티쿼리·재정렬은 지연을 60ms에서 390ms로 늘렸습니다.",
        "회고  |  복잡한 파이프라인은 당시 데모에 사용됐으며, 측정 후 단순화 필요성을 확인했습니다.",
    )
    detail_card(
        c, 463, "02", "HWPX Document Plugin", "2026.07-현재  ·  2인 팀  ·  MCP·Skills 설계 및 구현",
        "https://taejung3852.github.io/projects/hwpx",
        "HWPX는 XML 구조와 보이는 입력칸이 달라, AI가 위치를 추측하거나 서명란을 임의로 채울 수 있었습니다.",
        "문서 구조와 시각 배치를 함께 분석하고, 확인된 값만 반영하는 MCP 도구 25종과 Agent Skills를 구축했습니다.",
        "입력값 확인·승인·편집·검증 흐름을 마련하고, 요청하지 않은 서명란·공용란 작성을 거절하도록 했습니다.",
        "한계  |  실행 검사는 구현했지만 편집 계획 자체의 타당성 검사는 추가 과제로 남았습니다.",
    )
    c.showPage()


def projects_2(c):
    detail_header(c, 3, "PROJECT NOTES  /  03-04", "실행 증거와 운영 경험", "AI의 결과를 검증하고, 실제 사용 환경에서 설계를 되돌아봤습니다.")
    detail_card(
        c, 141, "03", "OwnHands", "2026.09-현재  ·  개인 프로젝트  ·  실무 적용 중",
        "https://taejung3852.github.io/projects/ownhands",
        "AI가 완료를 선언해도 요구사항 충족과 테스트 실행 여부를 사람이 확인하기 어려웠습니다.",
        "작업 의도를 먼저 적고, 구현 단계와 독립 검증 단계를 나눠 실행 로그·차이를 기준과 대조하도록 설계했습니다.",
        "모르는 영역은 unknown으로 남기고, 검증 결과를 본 사람이 최종 승인하는 흐름을 Codex 작업에 적용 중입니다.",
        "회고  |  초기 복잡한 구조를 줄이고, 실제 작업에서 필요한 검증 규칙을 계속 다듬고 있습니다.",
    )
    detail_card(
        c, 463, "04", "LLM Gateway Service", "2025.04-10  ·  2인 팀  ·  라우팅 엔진 담당",
        "https://taejung3852.github.io/projects/llm-gateway",
        "상용 API 비용이 높고 모델마다 요청·응답 형식이 달라, 조건에 맞는 모델 선택과 연결이 어려웠습니다.",
        "비용·속도·성능·문맥 길이 가중 라우팅과 모델 어댑터를 구현하고, 실행 환경을 AWS에서 자체 GPU로 옮겼습니다.",
        "클라우드 호스팅 지출을 줄이고, 모델 라우팅·대화 서비스를 약 3주간 사내 베타로 운영했습니다.",
        "회고  |  필수 조건과 선호 점수를 분리하고 단방향 스트리밍을 단순화할 필요를 확인했습니다.",
    )
    c.showPage()


def main():
    font_ready()
    c = canvas.Canvas(str(OUT), pagesize=(W, H), pageCompression=1)
    c.setTitle("박태정 | AI Agent / LLM Application Developer Portfolio")
    c.setAuthor("박태정")
    c.setSubject("3-page project portfolio")
    overview(c)
    projects_1(c)
    projects_2(c)
    c.save()
    FONT_TTF.unlink(missing_ok=True)
    print(OUT)


if __name__ == "__main__":
    main()
