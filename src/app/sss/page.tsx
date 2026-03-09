// ─── src/app/sss/page.tsx ─────────────────────────────────────────────────────
"use client"

import { useState } from "react"

const faqData = [
  {
    question: "Kimler katılabilir?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at augue nec metus elementum suscipit.",
  },
  {
    question: "Takım sayısı?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet velit sed turpis fermentum ultrices.",
  },
  {
    question: "Donanım sağlanacak mı?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.",
  },
  {
    question: "Konaklama var mı?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur luctus dui vitae massa facilisis, sed ultricies sapien.",
  },
  {
    question: "Sertifika verilecek mi?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed ex nec metus lacinia sagittis a vel velit.",
  },
]

export default function SSSPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    if (openIndex === index) setOpenIndex(null)
    else setOpenIndex(index)
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="text-4xl font-black text-gray-900 mb-8">Sıkça Sorulan Sorular</h1>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              className="w-full text-left px-4 py-3 flex justify-between items-center focus:outline-none focus:ring"
              onClick={() => toggle(index)}
            >
              <span className="font-medium">{item.question}</span>
              <span>{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <div className="px-4 py-3 border-t border-gray-200 text-gray-700">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}