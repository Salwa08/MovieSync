"use client"

import { useState } from "react"
import PropTypes from "prop-types"
import { ChevronDown, ChevronUp } from 'lucide-react'
FaqItem.propTypes = {
  number: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
};


function FaqItem({ number, question, answer, isOpen: initialIsOpen = false }) {
  const [isOpen, setIsOpen] = useState(initialIsOpen)

  return (
    <div className="w-full text-white">
      <div className="flex gap-4 items-start p-6 w-full max-md:px-5">
        <div 
          className={`flex items-center justify-center ${
            isOpen ? "bg-stone-900" : "bg-stone-900"
          } h-[53px] w-[53px] text-base font-semibold text-white rounded-lg border border-[#262626]`}
        >
          {number}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-medium text-white">{question}</h3>

          {isOpen && answer && (
            <p className="mt-3.5 text-base leading-6 text-neutral-400">{answer}</p>
          )}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none shrink-0 self-start mt-3"
          aria-label={isOpen ? "Collapse answer" : "Expand answer"}
        >
          {isOpen ? (
            <ChevronUp className="w-6 h-6 text-white" />
          ) : (
            <ChevronDown className="w-6 h-6 text-white" />
          )}
        </button>
      </div>
    </div>
  )
}

export default FaqItem
