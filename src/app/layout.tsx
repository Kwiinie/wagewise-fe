import type { Metadata } from "next";
import {Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ['latin', 'vietnamese'] });

export const metadata: Metadata = {
  title: 'Ước Tính Lương Từ CV',
  description: 'Tải lên CV của bạn và chọn tỉnh/thành phố để nhận ước tính lương ngay lập tức',
  keywords: 'cv, sơ yếu lý lịch, lương, ước tính, công việc, nghề nghiệp, tỉnh thành',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FDF2F8" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}