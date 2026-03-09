// app/blog/components/BlogNewsletter.tsx
"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle } from "lucide-react";

export default function BlogNewsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // TODO: Connect to your newsletter service (ConvertKit, Mailchimp, etc.)
    setTimeout(() => {
      setSubscribed(true);
      setLoading(false);
      setEmail("");
      
      setTimeout(() => setSubscribed(false), 3000);
    }, 1000);
  };

  return (
    <section className="w-full py-10 md:py-16 bg-[#7B3F00] mt-8 md:mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          
          <div className="text-center md:text-left text-white">
            <h2 className="font-brisa text-3xl md:text-[45px] leading-tight mb-2">
              Never Miss a Post
            </h2>
            <p className="font-jost text-base md:text-xl opacity-90 max-w-xl">
              Subscribe to our newsletter for the latest recipes, stories, and event updates
            </p>
          </div>

          <div className="w-full md:w-auto">
            {subscribed ? (
              <div className="bg-green-500/20 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3 text-white">
                <CheckCircle size={24} />
                <span className="font-jost">Thanks for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full sm:w-72 pl-10 pr-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:border-[#F28C28] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#F28C28] text-white px-6 py-3 rounded-lg font-jost font-medium hover:bg-[#E07B17] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>Subscribing...</>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Subscribe</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-6 md:mt-8 text-center md:text-left">
          <p className="text-white/50 text-xs md:text-sm">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}