import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from "docx";
import * as fs from "fs";
import * as path from "path";

async function generateDocx() {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: "Minecraft 英语启蒙世界｜新概念第一册全套 AI 伴学包",
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "这不仅是一套课程资料，更是一个不断扩展的 Minecraft 英语学习世界。",
                italics: true,
                color: "555555",
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 },
          }),

          // Section 1
          new Paragraph({
            text: "📦 包含内容（新概念第一册全 144 课）",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 120 },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "🤖 【核心】Minecraft × 新概念 AI 沉浸式伴学 App",
                bold: true,
              }),
            ],
            spacing: { before: 100, after: 60 },
          }),
          new Paragraph({
            text: "• 6 大像素生态大地图，144 关推图闯关",
            bullet: { level: 0 },
          }),
          new Paragraph({
            text: "• Alex 老师 1v1 AI 实时口语私教、发音打分与纠错",
            bullet: { level: 0 },
          }),
          new Paragraph({
            text: "• 全天候原声磨耳朵随身听，随时培养听力语感",
            bullet: { level: 0 },
          }),
          new Paragraph({
            text: "• 背单词赚绿宝石、合成装备、解锁首领徽章",
            bullet: { level: 0 },
            spacing: { after: 140 },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "📚 144 课 Minecraft 英语短视频",
                bold: true,
              }),
            ],
            spacing: { before: 80, after: 40 },
          }),
          new Paragraph({
            text: "• 每课约 30 秒，结合方块游戏场景趣味精讲",
            bullet: { level: 0 },
            spacing: { after: 140 },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "🖥️ 144 课 配套高清教学 PPT",
                bold: true,
              }),
            ],
            spacing: { before: 80, after: 40 },
          }),
          new Paragraph({
            text: "• 每课约 10 页，系统拆解词汇与语法，支持打印",
            bullet: { level: 0 },
            spacing: { after: 140 },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "📖 第一册方块英语练习册（电子版）",
                bold: true,
              }),
            ],
            spacing: { before: 80, after: 40 },
          }),
          new Paragraph({
            text: "• 单词 + 句型 + 场景结合，边玩边练巩固落地",
            bullet: { level: 0 },
            spacing: { after: 240 },
          }),

          // Section 2
          new Paragraph({
            text: "✨ 后续持续免费更新",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 120 },
          }),
          new Paragraph({
            text: "• 更多 Minecraft 主题拓展课（建筑 / 红石 / 探险）",
            bullet: { level: 0 },
          }),
          new Paragraph({
            text: "• 伴学 App 功能与专项语法题库迭代",
            bullet: { level: 0 },
          }),
          new Paragraph({
            text: "• 持续补充打印素材与核心词卡",
            bullet: { level: 0 },
            spacing: { after: 240 },
          }),

          // Section 3
          new Paragraph({
            text: "💰 完整版学习包与定价",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 120 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "特惠价：199 元",
                bold: true,
                size: 28,
                color: "D97706",
              }),
            ],
          }),
          new Paragraph({
            text: "（含：AI 伴学 App 权限 + 144 课视频 + PPT + 练习册 + 后续更新）",
            spacing: { after: 240 },
          }),

          // Section 4
          new Paragraph({
            text: "📌 虚拟产品说明",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 120 },
          }),
          new Paragraph({
            text: "• 购买后立即获取网盘资源与 App 入口",
            bullet: { level: 0 },
          }),
          new Paragraph({
            text: "• 资源长期有效，持续同步更新",
            bullet: { level: 0 },
          }),
          new Paragraph({
            text: "• 虚拟数字内容一经交付，不支持退款，请确认需求后购买",
            bullet: { level: 0 },
            spacing: { after: 200 },
          }),
        ],
      },
    ],
  });

  const publicDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const outputPath = path.join(publicDir, "Minecraft_English_Book1_Sales_Intro.docx");
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
  console.log("Successfully generated Word document at:", outputPath);
}

generateDocx().catch(console.error);
