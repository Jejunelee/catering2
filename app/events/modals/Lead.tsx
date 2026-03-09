"use client";

import { X, Calendar, Users, MapPin, Mail, Phone, ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

interface LeadProps {
  open: boolean;
  onClose: () => void;
  initialDate?: string;
}

export default function Lead({ open, onClose, initialDate }: LeadProps) {
  if (!open) return null;

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    venue: "",
    guests: "",
    message: ""
  });

  // Pre-fill message with the date from footer
  useEffect(() => {
    if (initialDate) {
      setFormData(prev => ({
        ...prev,
        message: `Event Date: ${initialDate}`
      }));
    }
  }, [initialDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email) {
      setSubmitStatus({
        type: 'error',
        message: 'Name and email are required fields'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Send data to our API endpoint
      const response = await fetch('/api/send-mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit inquiry');
      }

      // Success!
      setSubmitStatus({
        type: 'success',
        message: 'Inquiry sent successfully! We\'ll respond within 24 hours.'
      });

      // Reset form after 3 seconds and close modal
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          eventType: "",
          venue: "",
          guests: "",
          message: ""
        });
        setStep(1);
        setSubmitStatus({ type: null, message: '' });
        onClose();
      }, 3000);

    } catch (error: any) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Failed to send inquiry. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear status when user starts typing again
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: '' });
    }
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const isStepValid = () => {
    switch(step) {
      case 1:
        return formData.name.trim() !== "" && formData.email.trim() !== "";
      case 2:
        return true; // Phone is optional
      case 3:
        return true; // All optional
      case 4:
        return true; // Message is optional
      default:
        return false;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 font-jost"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-white shadow-2xl overflow-hidden rounded-xl md:rounded-lg max-h-[90vh] flex flex-col md:grid md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 z-30 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
          onClick={onClose}
          disabled={isSubmitting}
        >
          <X size={18} />
        </button>

        {/* LEFT SIDE - Orange Panel */}
        <div className="bg-[#F26522] text-white p-5 flex flex-col md:p-8">
          
          {/* Logo */}
          <div className="flex justify-center md:justify-start mb-1">
            <Image
              src="/LogoWhite.png"
              alt="Cravings Logo"
              width={60}
              height={36}
              className="brightness-100 md:hidden"
            />
            <Image
              src="/LogoWhite.png"
              alt="Cravings Logo"
              width={180}
              height={54}
              className="brightness-100 hidden md:block mb-6"
            />
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-4xl font-medium text-white text-center md:text-left">
            Catering Made For You
          </h2>

          {/* Description */}
          <p className="text-sm md:text-base text-white/90 leading-relaxed text-center md:text-left mb-1">
            Tell us about your event and our specialists will help craft the perfect menu. We will respond to you in 24 hours.
          </p>

          {/* Show submitted date on mobile */}
          {initialDate && (
            <p className="text-sm md:text-base text-white/80 text-center md:text-left mt-2 md:hidden">
              Event Date: <span className="font-medium text-white">{initialDate}</span>
            </p>
          )}

          {/* Mobile Progress Steps */}
          <div className="md:hidden mt-1">
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex flex-col items-center flex-1">
                  <div 
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                      s === step 
                        ? "bg-white text-[#F26522]" 
                        : s < step 
                        ? "bg-white/60 text-[#F26522]" 
                        : "bg-white/30 text-white"
                    }`}
                  >
                    {s < step ? "✓" : s}
                  </div>
                  <div 
                    className={`h-1 w-full mt-1 transition-colors ${
                      s <= step ? "bg-white" : "bg-white/30"
                    } ${s === 1 ? "rounded-l-full" : ""} ${s === 4 ? "rounded-r-full" : ""}`}
                  />
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-white/80 mt-1">
              {step === 1 && "Contact Information"}
              {step === 2 && "Phone Number (Optional)"}
              {step === 3 && "Event Details"}
              {step === 4 && "Additional Message"}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE FORM - Scrollable */}
        <div className="p-5 md:p-8 bg-white overflow-y-auto">
          <form className="space-y-4" onSubmit={handleSubmit}>
            
            {/* Status Message */}
            {submitStatus.type && (
              <div className={`p-3 rounded-lg text-sm ${
                submitStatus.type === 'success' 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {submitStatus.message}
              </div>
            )}
            
            {/* Show submitted date on desktop */}
            {initialDate && (
              <div className="hidden md:flex items-center gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <Calendar size={16} className="text-[#F26522]" />
                <span className="text-sm text-gray-700">
                  Event Date: <span className="font-medium text-[#F26522]">{initialDate}</span>
                </span>
              </div>
            )}

            {/* DESKTOP VIEW */}
            <div className="hidden md:block space-y-4">
              {/* Name */}
              <div>
                <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                  FULL NAME <span className="text-[#F26522]">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                  disabled={isSubmitting}
                  className="w-full mt-1 h-11 px-3 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26522] focus:border-transparent outline-none transition placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                    <Mail size={14} className="text-gray-500" /> EMAIL <span className="text-[#F26522]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@email.com"
                    required
                    disabled={isSubmitting}
                    className="w-full mt-1 h-11 px-3 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26522] focus:border-transparent outline-none transition placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                    <Phone size={14} className="text-gray-500" /> PHONE
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0917 000 0000"
                    disabled={isSubmitting}
                    className="w-full mt-1 h-11 px-3 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26522] focus:border-transparent outline-none transition placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Event Info */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-700">EVENT TYPE</label>
                  <input
                    type="text"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    placeholder="Wedding, Birthday..."
                    disabled={isSubmitting}
                    className="w-full mt-1 h-11 px-3 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26522] focus:border-transparent outline-none transition placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">VENUE</label>
                  <input
                    type="text"
                    name="venue"
                    value={formData.venue}
                    onChange={handleChange}
                    placeholder="Venue name"
                    disabled={isSubmitting}
                    className="w-full mt-1 h-11 px-3 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26522] focus:border-transparent outline-none transition placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">GUESTS</label>
                  <input
                    type="number"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    placeholder="100"
                    disabled={isSubmitting}
                    className="w-full mt-1 h-11 px-3 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26522] focus:border-transparent outline-none transition placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-xs font-medium text-gray-700">MESSAGE</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Tell us more about your event..."
                  disabled={isSubmitting}
                  className="w-full mt-1 px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26522] focus:border-transparent outline-none transition resize-none placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* Desktop Submit */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-3 pt-2">
                <p className="text-xs text-gray-500 order-2 md:order-1">
                  *Required fields
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto bg-[#F26522] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-medium hover:bg-[#e35a1b] transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 order-1 md:order-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span>Sending...</span>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </>
                  ) : (
                    <>
                      <span>Submit Inquiry</span>
                      <Mail size={16} />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* MOBILE VIEW - Progressive form */}
            <div className="md:hidden">
              {/* Form steps content remains the same but add disabled prop */}
              {/* Name & Email (Step 1) */}
              {step === 1 && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                      FULL NAME <span className="text-[#F26522]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                      disabled={isSubmitting}
                      className="w-full mt-1 h-9 px-3 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26522] focus:border-transparent outline-none transition placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                      <Mail size={14} className="text-gray-500" /> EMAIL <span className="text-[#F26522]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@email.com"
                      required
                      disabled={isSubmitting}
                      className="w-full mt-1 h-9 px-3 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26522] focus:border-transparent outline-none transition placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              )}

              {/* Phone (Step 2) */}
              {step === 2 && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                      <Phone size={14} className="text-gray-500" /> PHONE (Optional)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0917 000 0000"
                      disabled={isSubmitting}
                      className="w-full mt-1 h-9 px-3 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26522] focus:border-transparent outline-none transition placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              )}

              {/* Event Details (Step 3) */}
              {step === 3 && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-gray-700">EVENT TYPE</label>
                    <input
                      type="text"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      placeholder="Wedding, Birthday..."
                      disabled={isSubmitting}
                      className="w-full mt-1 h-9 px-3 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26522] focus:border-transparent outline-none transition placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">VENUE</label>
                    <input
                      type="text"
                      name="venue"
                      value={formData.venue}
                      onChange={handleChange}
                      placeholder="Venue name"
                      disabled={isSubmitting}
                      className="w-full mt-1 h-9 px-3 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26522] focus:border-transparent outline-none transition placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">GUESTS</label>
                    <input
                      type="number"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      placeholder="Number of guests"
                      disabled={isSubmitting}
                      className="w-full mt-1 h-9 px-3 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26522] focus:border-transparent outline-none transition placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              )}

              {/* Message (Step 4) */}
              {step === 4 && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-gray-700">MESSAGE (Optional)</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Tell us more about your event..."
                      disabled={isSubmitting}
                      className="w-full mt-1 px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26522] focus:border-transparent outline-none transition resize-none placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              )}

              {/* Mobile Navigation Buttons */}
              <div className="flex gap-2 mt-6">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={isSubmitting}
                    className="flex-1 bg-gray-100 text-gray-700 px-4 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>
                )}
                
                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!isStepValid() || isSubmitting}
                    className={`flex-1 bg-[#F26522] text-white px-4 py-2.5 rounded-lg font-medium transition flex items-center justify-center gap-1 ${
                      !isStepValid() || isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#e35a1b]'
                    }`}
                  >
                    Next
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-[#F26522] text-white px-4 py-2.5 rounded-lg font-medium hover:bg-[#e35a1b] transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span>Sending...</span>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      </>
                    ) : (
                      <>
                        <span>Submit</span>
                        <Mail size={16} />
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Mobile Required Fields Note */}
              {step === 1 && (
                <p className="text-xs text-gray-500 mt-3">
                  *Required fields
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}