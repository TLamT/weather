# 香港天氣

一個使用 **Next.js** + **shadcn/ui** 構建的實時天氣儀表板，數據來自 [香港天文台開放數據 API](https://data.weather.gov.hk/weatherAPI/opendata/weather.php)。

## 功能

- **即時溫度** — 顯示香港天文台或香港平均溫度
- **天氣警告** — 使用香港天文台官方圖示，一目了然
- **地區溫度** — 切換各地區即時溫度
- **天氣預報** — 未來九天天氣預報 + 溫度範圍圖
- **實時時鐘** — 顯示當前日期時間
- **A4 佈局** — 美觀文件式排版

## 技術棧

- [Next.js](https://nextjs.org)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
- 數據來源：香港天文台 HKO

## 本地開發

```bash
npm install
npm run dev
```

打開 [http://localhost:3000](http://localhost:3000) 即可查看。

## 線上版本

[https://shadcn-eta-three.vercel.app](https://shadcn-eta-three.vercel.app)

## Vercel 部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new?repository-url=https://github.com/TLamT/weather)

1. 點撃上方按鈕
2. 用 GitHub 登入 Vercel
3. 選擇 `TLamT/weather` 倉庫
4. 按 Deploy 完成
