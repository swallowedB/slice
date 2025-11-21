import localFont from 'next/font/local';
import './globals.css'

const pretendard = localFont({
  src: [
    {
      path: '../../public/fonts/PretendardVariable.woff2',
      style: 'normal',
      weight: '100 900'
    },
  ],
  display: 'swap',
  variable: '--font-pretendard',
})



export default function Rootlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko' className={pretendard.variable}>
      <body>{children}</body>
    </html>
  );
}
