import FaqItem from "./FaqItem"

function FaqSection() {
  const faqItems = [
    {
      number: "01",
      question: "What is MovieSync?",
      answer:
        "MovieSync is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices. You can watch as much as you want, whenever you want, without a single commercial – all for one low monthly price.",
      isOpen: true,
    },
    {
      number: "02",
      question: "How much does MovieSync cost?",
      answer: "MovieSync offers three different subscription plans: Basic ($9.99/month), Standard ($12.99/month), and Premium ($15.99/month). The Basic plan allows streaming on one device, Standard allows streaming on two devices simultaneously, and Premium allows streaming on up to four devices with Ultra HD available.",
      isOpen: false,
    },
    {
      number: "03",
      question: "What content is available on MovieSync?",
      answer: "MovieSync offers a vast library of movies, TV shows, documentaries, anime, and original content across various genres including action, comedy, drama, horror, romance, sci-fi, and more. New titles are added regularly to keep the content fresh and exciting.",
      isOpen: false,
    },
    {
      number: "04",
      question: "How can I watch MovieSync?",
      answer: "You can watch MovieSync on virtually any device with an internet connection, including smart TVs, game consoles, streaming media players, set-top boxes, smartphones, tablets, and computers. You can also download the MovieSync app from your device's app store.",
      isOpen: false,
    },
    {
      number: "05",
      question: "How do I sign up for MovieSync?",
      answer: "You can sign up for MovieSync by visiting our website and clicking on the 'Sign Up' button. Follow the instructions to create your account, choose a subscription plan, and enter your payment information. The entire process takes just a few minutes.",
      isOpen: false,
    },
    {
      number: "06",
      question: "What is the MovieSync free trial?",
      answer: "MovieSync offers a 30-day free trial to new subscribers. You can enjoy all the features of your chosen subscription plan during this period. You can cancel anytime during the trial period and you won't be charged.",
      isOpen: false,
    },
    {
      number: "07",
      question: "How do I contact MovieSync customer support?",
      answer: "You can contact our customer support team through the 'Support' section on our website, by emailing support@moviesync.com, or by calling our 24/7 customer service line at 1-800-MOVIESYNC. Our team is always ready to assist you with any questions or issues.",
      isOpen: false,
    },
    {
      number: "08",
      question: "What are the MovieSync payment methods?",
      answer: "MovieSync accepts all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and gift cards. In some regions, we also offer payment through mobile carrier billing and other local payment methods.",
      isOpen: false,
    },
  ]

  return (
    <section className="w-full py-16 bg-black border-t border-gray-800" id="support">
      <div className="container px-4 md:px-6 max-w-[1124px] mx-auto">
        <div className="flex flex-wrap gap-10 items-end w-full">
          <div className="flex-1 shrink basis-10 min-w-60">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Frequently Asked Questions
            </h2>
            <p className="mt-2.5 text-base leading-6 text-neutral-400">
              Got questions? We've got answers! Check out our FAQ section to find
              answers to the most common questions about MovieSync.
            </p>
          </div>

          <button className="gap-2.5 px-5 py-3.5 text-sm font-semibold text-white bg-[#E50000] rounded-md hover:bg-red-700 transition-colors">
            Ask a Question
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-16">
          <div>
            {faqItems.slice(0, 4).map((item, index) => (
              <div key={index}>
                <FaqItem
                  number={item.number}
                  question={item.question}
                  answer={item.answer}
                  isOpen={item.isOpen}
                />
                {index < 3 && (
                  <div className="h-px mx-auto w-full" style={{ background: 'linear-gradient(to right, rgba(229, 0, 0, 0) 0%, rgba(229, 0, 0, 0.5) 50%, rgba(229, 0, 0, 0) 100%)' }} />
                )}
              </div>
            ))}
          </div>

          <div>
            {faqItems.slice(4).map((item, index) => (
              <div key={index + 4}>
                <FaqItem
                  number={item.number}
                  question={item.question}
                  answer={item.answer}
                  isOpen={item.isOpen}
                />
                {index < 3 && (
                  <div className="h-px mx-auto w-full" style={{ background: 'linear-gradient(to right, rgba(229, 0, 0, 0) 0%, rgba(229, 0, 0, 0.5) 50%, rgba(229, 0, 0, 0) 100%)' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FaqSection
