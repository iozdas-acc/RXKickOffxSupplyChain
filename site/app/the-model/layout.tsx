export default function TheModelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`html, body { overflow: auto !important; height: auto !important; }`}</style>
      {children}
    </>
  )
}
