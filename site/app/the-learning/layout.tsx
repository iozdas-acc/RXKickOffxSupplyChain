export default function TheLearningLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`html, body { overflow: auto !important; height: auto !important; }`}</style>
      {children}
    </>
  )
}
