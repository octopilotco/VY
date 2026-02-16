import { Star } from "lucide-react";

const testimonials = [
  {
    stars: 5,
    text: "I must say... your app is literally the 1st X app I see real value in and will not regret handing my money over for! 💪",
    name: "arielonlinecouk",
    date: "July 9, 2025",
    avatar: "https://i.pravatar.cc/40?img=10",
  },
  {
    stars: 5,
    text: "I thought all these tools were the same until I used Vyxlo. The Content Studio + Inspiration feature combo makes this OP. Makes showing up daily so much easier.",
    name: "Jazz",
    date: "Jul 15, 2025",
    avatar: "https://i.pravatar.cc/40?img=11",
  },
  {
    stars: 5,
    text: "I really love about Vyxlo that it copies and helps me to find good tweet ideas tweets. It is so good. Also I love that I find tweets to post about good ideas 💛🥳",
    name: "T1MO.",
    date: "Jul 14, 2025",
    avatar: "https://i.pravatar.cc/40?img=12",
  },
  {
    stars: 5,
    text: "After discovering Vyxlo, I found myself posting consistently. The AI suggestions match my voice perfectly and engagement doubled.",
    name: "Abdullah Elsayed",
    date: "Jul 17, 2025",
    avatar: "https://i.pravatar.cc/40?img=13",
  },
  {
    stars: 5,
    text: "The scheduling feature alone is worth the price. Combined with the AI writer, I've 3x'd my engagement in just two weeks.",
    name: "MarketingMike",
    date: "Jul 20, 2025",
    avatar: "https://i.pravatar.cc/40?img=14",
  },
  {
    stars: 5,
    text: "Vyxlo's inspiration engine is like having a content team working 24/7. I never run out of ideas anymore!",
    name: "Sarah Chen",
    date: "Jul 18, 2025",
    avatar: "https://i.pravatar.cc/40?img=15",
  },
];

const TestimonialsCarousel = () => {
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="overflow-hidden border-b border-border py-16">
      <div className="animate-scroll-left flex gap-6 px-6">
        {doubled.map((t, i) => (
          <div
            key={i}
            className="glass-card w-[340px] shrink-0 rounded-2xl p-6"
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, s) => (
                <Star
                  key={s}
                  className={`h-4 w-4 ${
                    s < t.stars ? "fill-yellow-500 text-yellow-500" : "fill-muted text-muted"
                  }`}
                />
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
            <div className="mt-4 flex items-center gap-3">
              <img src={t.avatar} alt={t.name} className="h-8 w-8 rounded-full" />
              <div>
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
